import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCarStore } from '@/store/useCarStore';
import { carsData } from '@/public/cars/CarsData';
import { Car } from '@/types/Order';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ShippingFields {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  stateName: string;
  phoneNumber: string;
  countryName: string;
}

export interface CheckoutState {
  shipping: ShippingFields;
  paymentMethod: 'credit_card' | 'wire_transfer';
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSuccessModalOpen: boolean;
  createdOrderId: string;
  purchasedCarsList: Car[];
  successTotalAllocation: number;
  useMock: boolean;
}

// ── Mock car used when the garage is empty (preview mode) ─────────────────────

const MOCK_CAR: Car = {
  id: 999,
  brand: 'Porsche',
  model: '911 GT3 RS',
  price: 223800,
  image: '/cars/shop-featured/911/p1.jpg',
  bodySilhouette: 'Coupe',
  specs: '4.0L Flat-6 Naturally Aspirated',
  quantity: 1,
  color: { id: 'Lizard Green', hex: '#00ff87' },
};

// ── Pricing helpers ───────────────────────────────────────────────────────────

export function calcPricing(cars: Car[]) {
  const subtotal = cars.reduce((s, c) => s + c.price * (c.quantity || 1), 0);
  const customConfiguration = Math.round(subtotal * 0.1);
  const deliveryFee = cars.length > 0 ? 1650 : 0;
  const totalAllocation = subtotal + customConfiguration + deliveryFee;
  const totalQuantity = cars.reduce((s, c) => s + (c.quantity || 1), 0);
  const depositRequired = totalQuantity > 0 ? 10000 * totalQuantity : 0;
  return { subtotal, customConfiguration, deliveryFee, totalAllocation, depositRequired };
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCheckout() {
  const router = useRouter();
  const { data: session } = useSession();
  const { allocatedCars, addToPurchased, clearAllocation, setCurrentOrder, removeFromAllocation } =
    useCarStore();

  // ── Mock toggle ───────────────────────────────────────────────────────────
  const [useMock, setUseMock] = useState(false);

  // ── Shipping form state ───────────────────────────────────────────────────
  const [shipping, setShipping] = useState<ShippingFields>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    stateName: '',
    phoneNumber: '',
    countryName: 'United States',
  });

  const setField = <K extends keyof ShippingFields>(key: K, value: ShippingFields[K]) =>
    setShipping((prev) => ({ ...prev, [key]: value }));

  // ── Payment method ────────────────────────────────────────────────────────
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'wire_transfer'>(
    'credit_card',
  );

  // ── UI state ──────────────────────────────────────────────────────────────
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');
  const [purchasedCarsList, setPurchasedCarsList] = useState<Car[]>([]);
  const [successTotalAllocation, setSuccessTotalAllocation] = useState(0);

  // ── Pre-fill session user data ────────────────────────────────────────────
  useEffect(() => {
    if (session?.user) {
      setShipping((prev) => ({
        ...prev,
        fullName: session.user?.name || '',
        email: session.user?.email || '',
      }));
    }
  }, [session]);

  // ── Handle Stripe redirect query params on mount ──────────────────────────
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const success = query.get('success');
    const sessionId = query.get('session_id');
    const canceled = query.get('canceled');

    if (success === 'true' && sessionId) {
      handleStripeSuccess(sessionId);
    } else if (canceled === 'true') {
      setErrors({ stripe: 'Stripe payment process was canceled.' });
      router.replace('/checkout');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived data ──────────────────────────────────────────────────────────
  const activeCars = useMock ? [MOCK_CAR] : allocatedCars;
  const isGarageEmpty = activeCars.length === 0;
  const pricing = calcPricing(activeCars);
  const displayCars = purchasedCarsList.length > 0 ? purchasedCarsList : activeCars;
  const displayTotal = successTotalAllocation || pricing.totalAllocation;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function validate(): boolean {
    const { fullName, email, address, city, postalCode } = shipping;
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required';
    if (!address.trim()) errs.address = 'Destination address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!postalCode.trim()) errs.postalCode = 'Postal code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleStripeSuccess(sessionId: string) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
      if (!res.ok) throw new Error('Verification failed');
      const data = await res.json();

      if (data.paymentStatus === 'paid') {
        const metadata = data.metadata;
        const compactCars = JSON.parse(metadata.carsJson);

        // Re-derive prices from the server-side catalog — never trust metadata prices.
        const cars: Car[] = compactCars.map((c: any) => {
          const catalogCar = carsData.find((cat) => cat.id === c.id);
          const resolvedPrice =
            catalogCar && typeof catalogCar.price === 'number' ? catalogCar.price : 0;
          return {
            id: c.id,
            brand: c.b,
            model: c.m,
            price: resolvedPrice,
            image: c.i,
            bodySilhouette: c.bs,
            specs: c.s,
            quantity: c.q || 1,
          };
        });

        // Reconstruct shipping fields from Stripe metadata
        setShipping({
          fullName: metadata.fullName,
          email: metadata.email,
          address: metadata.address,
          city: metadata.city,
          postalCode: metadata.zipCode,
          stateName: metadata.state,
          phoneNumber: metadata.phone,
          countryName: metadata.country,
        });

        cars.forEach((car: Car) => addToPurchased(car));
        setPurchasedCarsList(cars);

        const orderId = sessionId.slice(-12).toUpperCase();
        setCreatedOrderId(orderId);

        const { totalAllocation } = calcPricing(cars);
        setSuccessTotalAllocation(totalAllocation);

        setCurrentOrder({
          id: orderId,
          cars,
          totalAmount: totalAllocation,
          paymentStatus: 'paid',
          orderStatus: 'processing',
          shippingAddress: {
            fullName: metadata.fullName,
            email: metadata.email,
            phone: metadata.phone || 'Not provided',
            address: metadata.address,
            city: metadata.city,
            state: metadata.state || 'Not provided',
            zipCode: metadata.zipCode,
            country: metadata.country,
          },
          createdAt: new Date().toISOString().split('T')[0],
        });

        clearAllocation();
        setIsSuccessModalOpen(true);

        try {
          await fetch('/api/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: metadata.email,
              fullName: metadata.fullName,
              orderId,
              totalAmount: totalAllocation,
              cars,
            }),
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }

        router.replace('/checkout');
      } else {
        setErrors({ stripe: 'Stripe payment was not completed.' });
      }
    } catch (err) {
      console.error('Error verifying Stripe session:', err);
      const error = err as Error;
      setErrors({ stripe: error.message || 'Failed to verify payment session. Please contact support.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    if (paymentMethod === 'credit_card') {
      try {
        const response = await fetch('/api/checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // Only IDs and quantities — never client-supplied prices, totals, or discounts
            carIds: activeCars.map((car) => car.id),
            quantities: Object.fromEntries(activeCars.map((car) => [car.id, car.quantity ?? 1])),
            ...shipping,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned from server');
        }
      } catch (err) {
        console.error('Stripe redirect error:', err);
        const error = err as Error;
        setErrors({ stripe: error.message || 'Payment initiation failed. Please try again.' });
        setIsSubmitting(false);
      }
      return;
    }

    // ── Wire transfer (offline booking simulation) ──────────────────────────
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedOrderId(orderId);

      const { totalAllocation } = calcPricing(activeCars);

      setCurrentOrder({
        id: orderId,
        cars: activeCars,
        totalAmount: totalAllocation,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        shippingAddress: {
          fullName: shipping.fullName,
          email: shipping.email,
          phone: shipping.phoneNumber || 'Not provided',
          address: shipping.address,
          city: shipping.city,
          state: shipping.stateName || 'Not provided',
          zipCode: shipping.postalCode,
          country: shipping.countryName,
        },
        createdAt: new Date().toISOString().split('T')[0],
      });

      activeCars.forEach((car) => addToPurchased(car));
      setPurchasedCarsList([...activeCars]);
      setSuccessTotalAllocation(totalAllocation);

      if (!useMock) clearAllocation();

      fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: shipping.email,
          fullName: shipping.fullName,
          orderId,
          totalAmount: totalAllocation,
          cars: activeCars,
        }),
      }).catch((e) => console.error('Failed to send confirmation email:', e));

      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 2500);
  }

  return {
    // Derived data
    activeCars,
    isGarageEmpty,
    pricing,
    displayCars,
    displayTotal,
    // Shipping form
    shipping,
    setField,
    // Payment
    paymentMethod,
    setPaymentMethod,
    // UI state
    errors,
    isSubmitting,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    createdOrderId,
    // Mock
    useMock,
    setUseMock,
    // Actions
    handleSubmit,
    removeFromAllocation,
  };
}
