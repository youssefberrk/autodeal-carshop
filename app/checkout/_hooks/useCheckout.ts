import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCarStore } from "@/store/useCarStore";
import { carsData } from "@/public/cars/CarsData";
import { Car } from "@/types/Order";
import { shippingSchema, ShippingFormData } from "../_schemas/checkoutSchema";

// Re-export for compatibility
export type { ShippingFormData as ShippingFields };

type CompactCheckoutCar = {
	id: number;
	b: string;
	m: string;
	i: string;
	bs: string;
	s: string;
	q?: number;
};

// ── Pricing helpers ───────────────────────────────────────────────────────────

export function calcPricing(cars: Car[]) {
	const subtotal = cars.reduce((s, c) => s + c.price * (c.quantity || 1), 0);
	const customConfiguration = Math.round(subtotal * 0.1);
	const deliveryFee = cars.length > 0 ? 1650 : 0;
	const totalAllocation = subtotal + customConfiguration + deliveryFee;
	const totalQuantity = cars.reduce((s, c) => s + (c.quantity || 1), 0);
	const depositRequired = totalQuantity > 0 ? 10000 * totalQuantity : 0;
	return {
		subtotal,
		customConfiguration,
		deliveryFee,
		totalAllocation,
		depositRequired,
	};
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCheckout() {
	const router = useRouter();
	const { data: session } = useSession();
	const {
		allocatedCars,
		addToPurchased,
		clearAllocation,
		setCurrentOrder,
		removeFromAllocation,
	} = useCarStore();

	// ── React Hook Form + Zod ────────────────────────────────────────────────
	const form = useForm<ShippingFormData>({
		resolver: zodResolver(shippingSchema),
		defaultValues: {
			fullName: "",
			email: "",
			address: "",
			city: "",
			postalCode: "",
			stateName: "",
			phoneNumber: "",
			countryName: "United States",
		},
		mode: "onTouched",
	});

	// ── Payment method ────────────────────────────────────────────────────────
	const [paymentMethod, setPaymentMethod] = useState<
		"credit_card" | "wire_transfer"
	>("credit_card");

	// ── UI state ──────────────────────────────────────────────────────────────
	const [stripeError, setStripeError] = useState<string | undefined>(undefined);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [createdOrderId, setCreatedOrderId] = useState("");
	const [purchasedCarsList, setPurchasedCarsList] = useState<Car[]>([]);
	const [successTotalAllocation, setSuccessTotalAllocation] = useState(0);

	// ── Pre-fill session user data ────────────────────────────────────────────
	useEffect(() => {
		if (session?.user) {
			if (session.user.name && !form.getValues("fullName")) {
				form.setValue("fullName", session.user.name, { shouldValidate: true });
			}
			if (session.user.email && !form.getValues("email")) {
				form.setValue("email", session.user.email, { shouldValidate: true });
			}
		}
	}, [session, form]);

	// ── Handle Stripe redirect query params on mount ──────────────────────────
	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const success = query.get("success");
		const sessionId = query.get("session_id");
		const canceled = query.get("canceled");

		if (success === "true" && sessionId) {
			handleStripeSuccess(sessionId);
		} else if (canceled === "true") {
			setStripeError("Stripe payment process was canceled.");
			router.replace("/checkout");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ── Derived data ──────────────────────────────────────────────────────────
	const activeCars = allocatedCars;
	const isGarageEmpty = activeCars.length === 0;
	const pricing = calcPricing(activeCars);
	const displayCars =
		purchasedCarsList.length > 0 ? purchasedCarsList : activeCars;
	const displayTotal = successTotalAllocation || pricing.totalAllocation;
	const watchedShipping = form.watch();

	// ── Stripe Success Handler ────────────────────────────────────────────────

	async function handleStripeSuccess(sessionId: string) {
		setIsSubmitting(true);
		try {
			const res = await fetch(`/api/checkout-session?session_id=${sessionId}`);
			if (!res.ok) throw new Error("Verification failed");
			const data = await res.json();

			if (data.paymentStatus === "paid") {
				const metadata = data.metadata;
				const compactCars = JSON.parse(
					metadata.carsJson,
				) as CompactCheckoutCar[];

				// Re-derive prices from the server-side catalog — never trust metadata prices.
				const cars: Car[] = compactCars.map((c) => {
					const catalogCar = carsData.find((cat) => cat.id === c.id);
					const resolvedPrice =
						catalogCar && typeof catalogCar.price === "number"
							? catalogCar.price
							: 0;
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
				form.reset({
					fullName: metadata.fullName || "",
					email: metadata.email || "",
					address: metadata.address || "",
					city: metadata.city || "",
					postalCode: metadata.zipCode || "",
					stateName: metadata.state || "",
					phoneNumber: metadata.phone || "",
					countryName: metadata.country || "United States",
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
					paymentStatus: "paid",
					orderStatus: "processing",
					shippingAddress: {
						fullName: metadata.fullName,
						email: metadata.email,
						phone: metadata.phone || "Not provided",
						address: metadata.address,
						city: metadata.city,
						state: metadata.state || "Not provided",
						zipCode: metadata.zipCode,
						country: metadata.country,
					},
					createdAt: new Date().toISOString().split("T")[0],
				});

				clearAllocation();
				setIsSuccessModalOpen(true);

				try {
					await fetch("/api/send-confirmation", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: metadata.email,
							fullName: metadata.fullName,
							orderId,
							totalAmount: totalAllocation,
							cars,
						}),
					});
				} catch (emailError) {
					console.error("Failed to send confirmation email:", emailError);
				}

				router.replace("/checkout");
			} else {
				setStripeError("Stripe payment was not completed.");
			}
		} catch (err) {
			console.error("Error verifying Stripe session:", err);
			const error = err as Error;
			setStripeError(
				error.message ||
					"Failed to verify payment session. Please contact support.",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	// ── Form Submission (Validated by Zod via React Hook Form) ────────────────

	const onSubmit = async (data: ShippingFormData) => {
		setIsSubmitting(true);
		setStripeError(undefined);

		if (paymentMethod === "credit_card") {
			try {
				const response = await fetch("/api/checkout-session", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						// Only IDs and quantities — never client-supplied prices, totals, or discounts
						carIds: activeCars.map((car) => car.id),
						quantities: Object.fromEntries(
							activeCars.map((car) => [car.id, car.quantity ?? 1]),
						),
						...data,
					}),
				});

				const resData = await response.json();
				if (!response.ok)
					throw new Error(resData.error || "Failed to create checkout session");

				if (resData.url) {
					window.location.href = resData.url;
				} else {
					throw new Error("No checkout URL returned from server");
				}
			} catch (err) {
				console.error("Stripe redirect error:", err);
				const error = err as Error;
				setStripeError(
					error.message || "Payment initiation failed. Please try again.",
				);
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
				paymentStatus: "paid",
				orderStatus: "processing",
				shippingAddress: {
					fullName: data.fullName,
					email: data.email,
					phone: data.phoneNumber || "Not provided",
					address: data.address,
					city: data.city,
					state: data.stateName || "Not provided",
					zipCode: data.postalCode,
					country: data.countryName,
				},
				createdAt: new Date().toISOString().split("T")[0],
			});

			activeCars.forEach((car) => addToPurchased(car));
			setPurchasedCarsList([...activeCars]);
			setSuccessTotalAllocation(totalAllocation);

			clearAllocation();

			fetch("/api/send-confirmation", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: data.email,
					fullName: data.fullName,
					orderId,
					totalAmount: totalAllocation,
					cars: activeCars,
				}),
			}).catch((e) => console.error("Failed to send confirmation email:", e));

			setIsSubmitting(false);
			setIsSuccessModalOpen(true);
		}, 2500);
	};

	return {
		// React Hook Form
		form,
		watchedShipping,
		// Derived data
		activeCars,
		isGarageEmpty,
		pricing,
		displayCars,
		displayTotal,
		// Payment
		paymentMethod,
		setPaymentMethod,
		stripeError,
		// UI state
		isSubmitting,
		isSuccessModalOpen,
		setIsSuccessModalOpen,
		createdOrderId,
		// Actions
		handleSubmit: form.handleSubmit(onSubmit),
		removeFromAllocation,
	};
}
