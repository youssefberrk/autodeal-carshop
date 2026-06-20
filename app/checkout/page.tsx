"use client";

import React, { useState, useEffect } from 'react';
import { useCarStore } from '@/store/useCarStore';
import { Car } from '@/types/Order';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  ShieldCheck,
  Info,
  Truck,
  ArrowRight,
  Loader2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import CarWheelLoader from '@/components/ui/CarWheelLoader';
import CountrySelect from '@/components/ui/CountrySelect';

const CheckoutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { allocatedCars, addToPurchased, clearAllocation, setCurrentOrder } = useCarStore();
  
  // State for using mock car if garage is empty
  const [useMock, setUseMock] = useState(false);
  
  // Form fields state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("United States");
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  // UI states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [purchasedCarsList, setPurchasedCarsList] = useState<Car[]>([]);
  const [successTotalAllocation, setSuccessTotalAllocation] = useState<number>(0);

  // Pre-fill user info if logged in
  useEffect(() => {
    if (session?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFullName(session.user.name || "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(session.user.email || "");
    }
  }, [session]);

  // Handle Stripe redirect query parameters
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const success = query.get('success');
    const sessionId = query.get('session_id');
    const canceled = query.get('canceled');

    if (success === 'true' && sessionId) {
      const verifySession = async () => {
        setIsSubmitting(true);
        try {
          const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
          if (!res.ok) throw new Error('Verification failed');
          const data = await res.json();
          
          if (data.paymentStatus === 'paid') {
            const metadata = data.metadata;
            const compactCars = JSON.parse(metadata.carsJson);
            
            // Map compact keys back to Car type
            const cars: Car[] = compactCars.map((c: any) => ({
              id: c.id,
              brand: c.b,
              model: c.m,
              price: c.p,
              image: c.i,
              bodySilhouette: c.bs,
              specs: c.s,
              quantity: c.q || 1
            }));
            
            const name = metadata.fullName;
            const mail = metadata.email;
            
            // Reconstruct order details
            setFullName(name);
            setEmail(mail);
            setAddress(metadata.address);
            setCity(metadata.city);
            setPostalCode(metadata.zipCode);
            setStateName(metadata.state);
            setCountryName(metadata.country);
            setPhoneNumber(metadata.phone);
            
            // Process purchase client-side
            cars.forEach((car: Car) => addToPurchased(car));
            
            setPurchasedCarsList(cars);
            const orderId = sessionId.slice(-12).toUpperCase();
            setCreatedOrderId(orderId);
            
            const sub = cars.reduce((sum: number, car: Car) => sum + car.price * (car.quantity || 1), 0);
            const customConfig = Math.round(sub * 0.1);
            const delivery = 1650;
            const totalAlloc = sub + customConfig + delivery;
            setSuccessTotalAllocation(totalAlloc);

            const orderObj = {
              id: orderId,
              cars: cars,
              totalAmount: totalAlloc,
              paymentStatus: "paid" as const,
              orderStatus: "processing" as const,
              shippingAddress: {
                fullName: name,
                email: mail,
                phone: metadata.phone || "Not provided",
                address: metadata.address,
                city: metadata.city,
                state: metadata.state || "Not provided",
                zipCode: metadata.zipCode,
                country: metadata.country,
              },
              createdAt: new Date().toISOString().split('T')[0]
            };
            
            setCurrentOrder(orderObj);
            clearAllocation();
            setIsSuccessModalOpen(true);
            
            // Trigger confirmation email
            try {
              await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: mail,
                  fullName: name,
                  orderId: orderId,
                  totalAmount: totalAlloc,
                  cars: cars,
                }),
              });
            } catch (emailError) {
              console.error('Failed to send confirmation email:', emailError);
            }

            // Clean up query params from URL
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
      };

      verifySession();
    } else if (canceled === 'true') {
      setErrors({ stripe: 'Stripe payment process was canceled.' });
      router.replace('/checkout');
    }
  }, [addToPurchased, clearAllocation, setCurrentOrder, router]);

  const mockCar: Car = {
    id: 999,
    brand: 'Porsche',
    model: '911 GT3 RS',
    price: 223800,
    image: '/cars/shop-featured/911/p1.jpg',
    bodySilhouette: 'Coupe',
    specs: '4.0L Flat-6 Naturally Aspirated',
    quantity: 1,
    color: {
      id: 'Lizard Green',
      hex: '#00ff87'
    }
  };

  const activeCars = useMock ? [mockCar] : allocatedCars;
  const isGarageEmpty = activeCars.length === 0;

  // Calculate pricing
  const subtotal = activeCars.reduce((sum, car) => sum + car.price * (car.quantity || 1), 0);
  // Custom configuration fee representing premium bespoke choices (10% of subtotal)
  const customConfiguration = Math.round(subtotal * 0.1);
  const deliveryFee = activeCars.length > 0 ? 1650 : 0;
  const totalAllocation = subtotal + customConfiguration + deliveryFee;
  const totalQuantity = activeCars.reduce((sum, car) => sum + (car.quantity || 1), 0);
  const depositRequired = totalQuantity > 0 ? 10000 * totalQuantity : 0;

  const displayCars = purchasedCarsList.length > 0 ? purchasedCarsList : activeCars;
  const displayTotal = successTotalAllocation || totalAllocation;

  const handleValidation = () => {
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Valid email is required";
    if (!address.trim()) tempErrors.address = "Destination address is required";
    if (!city.trim()) tempErrors.city = "City is required";
    if (!postalCode.trim()) tempErrors.postalCode = "Postal code is required";
    
    // Card inputs are handled on Stripe Hosted Checkout page, so we don't validate them locally.
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    if (paymentMethod === 'credit_card') {
      try {
        const response = await fetch('/api/checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cars: activeCars,
            fullName,
            email,
            address,
            city,
            postalCode,
            stateName,
            countryName,
            phoneNumber,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        if (data.url) {
          // Redirect to Stripe Hosted Checkout
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

    // Simulate wire transfer booking (offline payment)
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedOrderId(orderId);
      
      const orderObj = {
        id: orderId,
        cars: activeCars,
        totalAmount: totalAllocation,
        paymentStatus: "paid" as const,
        orderStatus: "processing" as const,
        shippingAddress: {
          fullName,
          email,
          phone: phoneNumber || "Not provided",
          address,
          city,
          state: stateName || "Not provided",
          zipCode: postalCode,
          country: countryName,
        },
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      // Save order to store and clear allocations
      activeCars.forEach(car => addToPurchased(car));
      setPurchasedCarsList([...activeCars]);
      setSuccessTotalAllocation(totalAllocation);
      setCurrentOrder(orderObj);
      
      if (!useMock) {
        clearAllocation();
      }
      
      // Trigger confirmation email for wire transfer
      try {
        fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            fullName: fullName,
            orderId: orderId,
            totalAmount: totalAllocation,
            cars: activeCars,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email for wire transfer:', emailError);
      }

      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 2500);
  };

  if (isGarageEmpty && !isSuccessModalOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c160e] text-[#dae6d8] font-['Manrope'] px-6 py-24 relative overflow-hidden">
        {/* Dynamic ambient backgrounds */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,135,0.06),transparent_50%)]" />
        
        <div className="max-w-md w-full text-center relative z-10 border border-[#dae6d8]/10 bg-[#141e16]/80 p-10 rounded-2xl backdrop-blur-md shadow-2xl">
          <div className="w-16 h-16 bg-[#00ff87]/10 rounded-full flex items-center justify-center text-[#00ff87] mx-auto mb-6 border border-[#00ff87]/20">
            <Truck size={28} />
          </div>
          <h2 className="text-3xl font-['Newsreader'] italic font-bold tracking-tight mb-4 text-[#e5efe3]">Your Garage is Empty</h2>
          <p className="text-sm text-[#dae6d8]/60 leading-relaxed mb-8">
            You haven&apos;t allocated any vehicles to your reservation slots yet. Browse our inventory of luxury and performance machines to secure your build slot.
          </p>
          
          <div className="flex flex-col gap-4">
            <Link 
              href="/shop" 
              className="w-full bg-[#00ff87] text-[#0c160e] py-4 rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,255,135,0.15)]"
            >
              Browse Inventory <ArrowRight size={14} />
            </Link>
            <button 
              onClick={() => setUseMock(true)}
              className="w-full py-4 border border-[#dae6d8]/10 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#dae6d8]/5 transition-all text-[#dae6d8]/80"
            >
              Preview with Mock Car
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c160e] text-[#dae6d8] font-['Manrope'] pb-24 pt-20 relative">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,255,135,0.06),transparent_38%),radial-gradient(circle_at_82%_0%,rgba(148,163,184,0.04),transparent_32%)]" />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Summary */}
        <div className="lg:col-span-5 flex flex-col">
          <header className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#00ff87] font-bold mb-3 block flex items-center gap-2">
              <Sparkles size={12} /> Reservation Summary
            </span>
            <h2 className="text-5xl md:text-6xl font-['Newsreader'] italic font-bold tracking-tighter text-[#e5efe3]">
              Allocated Vehicles
            </h2>
          </header>

          <div className="space-y-20 mb-12">
            {activeCars.map((car, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#00ff87] font-bold">Slot {String(index + 1).padStart(2, '0')}</span>
                  <div className="h-[1px] flex-1 bg-[#dae6d8]/10" />
                </div>

                <div className="mb-8">
                  <h3 className="text-4xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3] group-hover:text-[#00ff87] transition-colors duration-300">
                    {car.brand} {car.model}
                  </h3>
                </div>

                <div className="aspect-[16/10] bg-[#141e16] mb-8 overflow-hidden border border-[#dae6d8]/5 rounded-xl shadow-lg relative">
                  <img 
                    src={car.image || '/api/placeholder/1200/800'} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-full h-full object-cover grayscale-[0.1] contrast-[1.05] transition-all group-hover:scale-105 duration-700"
                  />
                  {useMock && index === 0 && (
                    <div className="absolute top-4 left-4 bg-emerald-500/90 text-black text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-md">
                      Preview Mode
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-[#dae6d8]/10 px-4 py-2 rounded-lg">
                    <span className="text-sm font-bold text-[#00ff87]">${(car.price * (car.quantity || 1)).toLocaleString()}</span>
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-y-8 gap-x-8 border-b border-[#dae6d8]/5 pb-10">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1.5">Model Specification</span>
                    <span className="text-sm font-bold text-[#e5efe3]">{car.model}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1.5">Quantity Selected</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#e5efe3] leading-tight block">{car.quantity || 1} Unit{(car.quantity || 1) > 1 ? 's' : ''}</span>
                      <span className="text-[10px] text-[#dae6d8]/40 mt-1 uppercase tracking-tight font-medium">
                        {(car.quantity || 1)} × ${car.price.toLocaleString()} = ${(car.price * (car.quantity || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1.5">Color Selected</span>
                    <div className="flex flex-col gap-4">
                      <span className="text-sm font-bold text-[#e5efe3] leading-tight block">{car.color?.id}</span>
                      <span className="h-5 w-5 rounded-full ring-offset-4 ring-offset-[#0c160e]  ring-2 ring-[#00ff87] shadow-[0_0_0_5px_rgba(0,255,135,0.12)]" 
												style={{ backgroundColor: car.color?.hex }} />
                     
                    
                    </div>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1.5">Body Silhouette</span>
                    <span className="text-sm font-bold text-[#e5efe3]">{car.bodySilhouette || "Sports Edition"}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1.5">Allocation Status</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#00ff87] flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                      Locked for Reservation
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary Card */}
          <div className="bg-[#141e16] p-8 border border-[#dae6d8]/5 rounded-xl shadow-xl">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs tracking-wide">
                <span className="text-[#dae6d8]/50">Subtotal MSRP</span>
                <span className="font-bold text-[#e5efe3]">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs tracking-wide">
                <span className="text-[#dae6d8]/50">Bespoke Custom Configuration</span>
                <span className="font-bold text-[#e5efe3]">${customConfiguration.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs tracking-wide border-b border-[#dae6d8]/10 pb-4">
                <span className="text-[#dae6d8]/50">Global Delivery & Concierge</span>
                <span className="font-bold text-[#e5efe3]">${deliveryFee.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#00ff87] font-bold mb-1.5">Total Allocation</span>
                <span className="text-3xl font-bold font-['Manrope'] tracking-tighter text-[#e5efe3]">${totalAllocation.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00ff87] font-bold opacity-75">
                <CheckCircle2 size={12} className="text-[#00ff87]" />
                Price Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Form */}
        <div className="lg:col-span-7 lg:pl-12 lg:border-l border-[#dae6d8]/5">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section: Delivery */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] border border-[#00ff87]/20 rounded-lg">
                  <Truck size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-['Newsreader'] italic font-bold text-[#e5efe3]">Delivery Concierge</h3>
                  <p className="text-[10px] text-[#dae6d8]/40 uppercase tracking-widest mt-0.5">Where your build should be delivered</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full bg-[#141e16] border ${errors.fullName ? 'border-red-500' : 'border-[#dae6d8]/10'} rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10`} 
                    placeholder="Julian Obsidian" 
                  />
                  {errors.fullName && <span className="text-red-500 text-[10px] mt-1 block">{errors.fullName}</span>}
                </div>
                
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-[#141e16] border ${errors.email ? 'border-red-500' : 'border-[#dae6d8]/10'} rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10`} 
                    placeholder="concierge@obsidian.com" 
                  />
                  {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">Phone Number</label>
                  <input 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#141e16] border border-[#dae6d8]/10 rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10" 
                    placeholder="+1 (555) 0199" 
                  />
                </div>

                <div>
                  <CountrySelect 
                    label="Country"
                    value={countryName}
                    onChange={setCountryName}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">Destination Address</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full bg-[#141e16] border ${errors.address ? 'border-red-500' : 'border-[#dae6d8]/10'} rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10`} 
                    placeholder="128 Kinetic Way, Beverly Hills, CA" 
                  />
                  {errors.address && <span className="text-red-500 text-[10px] mt-1 block">{errors.address}</span>}
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">City</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full bg-[#141e16] border ${errors.city ? 'border-red-500' : 'border-[#dae6d8]/10'} rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10`} 
                    placeholder="Los Angeles" 
                  />
                  {errors.city && <span className="text-red-500 text-[10px] mt-1 block">{errors.city}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">State / Region</label>
                    <input 
                      type="text" 
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full bg-[#141e16] border border-[#dae6d8]/10 rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10" 
                      placeholder="CA" 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-2 font-bold">Postal Code</label>
                    <input 
                      type="text" 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={`w-full bg-[#141e16] border ${errors.postalCode ? 'border-red-500' : 'border-[#dae6d8]/10'} rounded-lg px-5 py-4 text-sm focus:border-[#00ff87]/50 focus:outline-none transition-all placeholder:text-[#dae6d8]/10`} 
                      placeholder="90210" 
                    />
                    {errors.postalCode && <span className="text-red-500 text-[10px] mt-1 block">{errors.postalCode}</span>}
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Payment */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] border border-[#00ff87]/20 rounded-lg">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-['Newsreader'] italic font-bold text-[#e5efe3]">Secure Payment</h3>
                  <p className="text-[10px] text-[#dae6d8]/40 uppercase tracking-widest mt-0.5">Encrypting mechanical acquisitions</p>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex-1 flex flex-col items-center justify-center gap-3 py-6 rounded-xl border transition-all ${
                    paymentMethod === 'credit_card' ? 'bg-[#00ff87]/5 border-[#00ff87]' : 'bg-transparent border-[#dae6d8]/10 hover:border-[#dae6d8]/30'
                  }`}
                >
                  <CreditCard size={18} className={paymentMethod === 'credit_card' ? 'text-[#00ff87]' : 'text-[#dae6d8]/40'} />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#e5efe3]">Credit Card</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('wire_transfer')}
                  className={`flex-1 flex flex-col items-center justify-center gap-3 py-6 rounded-xl border transition-all ${
                    paymentMethod === 'wire_transfer' ? 'bg-[#00ff87]/5 border-[#00ff87]' : 'bg-transparent border-[#dae6d8]/10 hover:border-[#dae6d8]/30'
                  }`}
                >
                  <Building2 size={18} className={paymentMethod === 'wire_transfer' ? 'text-[#00ff87]' : 'text-[#dae6d8]/40'} />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#e5efe3]">Wire Transfer</span>
                </button>
              </div>

              {errors.stripe && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-xs tracking-wide mb-6 flex items-start gap-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{errors.stripe}</p>
                </div>
              )}

              {paymentMethod === 'credit_card' ? (
                <div className="bg-[#141e16] p-6 border border-[#00ff87]/20 rounded-lg space-y-4 shadow-[0_0_20px_rgba(0,255,135,0.02)]">
                  <div className="flex justify-between items-center border-b border-[#dae6d8]/5 pb-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-[#e5efe3]">Stripe Secure Payment</h4>
                    <span className="text-[9px] bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Test Mode</span>
                  </div>
                  <p className="text-[11px] text-[#dae6d8]/60 leading-relaxed">
                    You will be securely redirected to Stripe Test Checkout to complete your payment. You can use standard Stripe test cards (e.g. <code className="text-[#00ff87] bg-black/30 px-1 py-0.5 rounded">4242 4242 4242 4242</code>) on the checkout page.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <span className="text-[#dae6d8]/40 block text-[9px] uppercase tracking-widest">Transaction Type</span>
                      <span className="font-bold text-[#e5efe3]">Reservation Deposit</span>
                    </div>
                    <div>
                      <span className="text-[#dae6d8]/40 block text-[9px] uppercase tracking-widest">Immediate Charge</span>
                      <span className="font-bold text-[#00ff87]">${depositRequired.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#141e16] p-6 border border-[#dae6d8]/10 rounded-lg space-y-4">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#e5efe3]">Obsidian Wire Instructions</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#dae6d8]/40 block text-[9px] uppercase tracking-widest">Bank Name</span>
                      <span className="font-bold text-[#e5efe3]">Sovereign Prestige Bank</span>
                    </div>
                    <div>
                      <span className="text-[#dae6d8]/40 block text-[9px] uppercase tracking-widest">Routing Number</span>
                      <span className="font-bold text-[#e5efe3]">021000021</span>
                    </div>
                    <div>
                      <span className="text-[#dae6d8]/40 block text-[9px] uppercase tracking-widest">Account Number</span>
                      <span className="font-bold text-[#e5efe3]">8888-00911-305</span>
                    </div>
                    <div>
                      <span className="text-[#dae6d8]/40 block text-[9px] uppercase tracking-widest">Reference Code</span>
                      <span className="font-bold text-[#00ff87]">OBS-{fullName.slice(0,3).toUpperCase() || "BUILD"}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#dae6d8]/40 leading-relaxed pt-2 border-t border-[#dae6d8]/5">
                    Please trigger the transfer within 24 hours. Your allocation slot is temporarily locked pending confirmation.
                  </p>
                </div>
              )}

              <div className="bg-[#141e16]/50 border-l-2 border-[#00ff87] p-6 flex gap-4 mt-8 rounded-r-lg">
                <Info size={20} className="text-[#00ff87] shrink-0" />
                <p className="text-[11px] text-[#dae6d8]/60 leading-relaxed">
                  By selecting &apos;Secure Allocation&apos;, you agree to our terms of premium delivery and vehicle reservation. A ${depositRequired.toLocaleString()} non-refundable deposit will be charged to secure your build slot allocation.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                {useMock && (
                  <button 
                    type="button"
                    onClick={() => {
                      setUseMock(false);
                      // Clear details if resetting
                      setErrors({});
                    }}
                    className="px-5 border border-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500/5 transition-all active:scale-[0.98]"
                    title="Exit Preview"
                  >
                    Exit Preview
                  </button>
                )}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#00ff87] text-[#0c160e] py-5 rounded-lg flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(0,255,135,0.18)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <CarWheelLoader size={16} color="#0c160e" />
                      Locking Slot Allocation...
                    </>
                  ) : (
                    <>
                      Secure Allocation <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </section>
          </form>
        </div>
      </main>

      {/* Processing Loader Overlay */}
      {isSubmitting && (
        <CarWheelLoader
          fullPage
          text="Securing your premium slot allocation..."
          size={80}
        />
      )}

      {/* Success Modal Overlay */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl animate-in font-['Manrope'] p-6">
          <div className="max-w-xl w-full border border-[#00ff87]/30 bg-[#0c160e]/95 p-10 rounded-2xl shadow-[0_0_80px_rgba(0,255,135,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-[#00ff87] to-teal-500" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#00ff87]/10 border border-[#00ff87]/30 rounded-full flex items-center justify-center text-[#00ff87] mb-6">
                <CheckCircle2 size={32} />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-['Newsreader'] italic font-bold tracking-tight mb-2 text-[#e5efe3]">
                Reservation Secured
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#00ff87] font-bold mb-6">
                Allocation Slot ID: {createdOrderId}
              </p>
              
              <p className="text-sm text-[#dae6d8]/60 leading-relaxed mb-8 max-w-md">
                Congratulations, {fullName}. Your allocation has been secured with premium delivery services. A confirmation email and vehicle configuration specs have been dispatched to <span className="text-[#e5efe3] font-bold">{email}</span>.
              </p>

              {/* Order breakdown */}
              <div className="w-full bg-[#141e16] border border-[#dae6d8]/5 p-6 rounded-xl text-left space-y-4 mb-8">
                <div className="border-b border-[#dae6d8]/5 pb-3">
                  <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1">Vehicles Locked</span>
                  <div className="space-y-1">
                    {displayCars.map((car, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-sm font-bold text-[#e5efe3]">{car.brand} {car.model}</p>
                        <p className="text-[10px] text-[#00ff87] font-bold">
                          {(car.quantity || 1) > 1 ? `x${car.quantity}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1">Delivery Destination</span>
                    <p className="text-xs font-bold text-[#e5efe3] truncate">{city}, {stateName || "USA"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1">Total Guarantee</span>
                    <p className="text-xs font-bold text-[#00ff87]">${displayTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    router.push('/orders');
                  }}
                  className="flex-1 bg-[#dae6d8]/10 border border-[#dae6d8]/10 text-[#dae6d8] py-4 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#dae6d8]/15 active:scale-[0.98] transition-all"
                >
                  View Order History
                </button>
                <button 
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    router.push('/');
                  }}
                  className="flex-1 bg-[#00ff87] text-[#0c160e] py-4 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,255,135,0.2)]"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;