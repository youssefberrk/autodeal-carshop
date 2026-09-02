import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Car } from "@/types/Order";
import {
	CheckCircle2,
	Sparkles,
	ArrowRight,
	X,
	Gauge,
	Palette,
	Tag,
	Package,
	BatteryCharging,
} from "lucide-react";
import { getValidImageSrc } from "@/lib/utils";

interface OrderSummaryProps {
	cars: Car[];
	subtotal: number;
	customConfiguration: number;
	deliveryFee: number;
	totalAllocation: number;
	onUnlockSlot: (carId: number) => void;
}

interface VehicleSummaryCardProps {
	car: Car;
	index: number;
	onUnlockSlot: (carId: number) => void;
}

function VehicleSummaryCard({
	car,
	index,
	onUnlockSlot,
}: VehicleSummaryCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const quantity = car.quantity || 1;
	const itemTotal = car.price * quantity;

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.15 },
		);

		observer.observe(card);
		return () => observer.disconnect();
	}, []);

	return (
		<article
			ref={cardRef}
			style={
				{
					"--stagger-delay": `${index * 60}ms`,
				} as React.CSSProperties
			}
			className={`group relative rounded-2xl border border-[#dae6d8]/10 border-l-2 bg-[#06180f]/85 p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-5
				transition-[transform,opacity,border-color,box-shadow] duration-500
				${
					isVisible
						? "opacity-100 translate-y-0 border-l-[#00ff87]/0"
						: "opacity-0 translate-y-3 border-l-[#00ff87]/0"
				}
				hover:border-l-[#00ff87] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6),0_0_20px_rgba(0,255,135,0.08)]
				motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100`}
			/*
			 * Note: transition-delay driven by --stagger-delay is applied inline via style
			 * since Tailwind JIT cannot resolve dynamic CSS variable delays.
			 * The delay only applies during the entrance (opacity/translate transition).
			 */
		>
			{/* Slot header */}
			<div className="mb-4 flex items-center justify-between gap-2">
				<span className="inline-flex items-center gap-1.5 rounded-full border border-[#00ff87]/25 bg-[#0a0f0a]/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#00ff87] shadow-[0_0_10px_rgba(0,255,135,0.1)] font-['Orbitron']">
					<BatteryCharging size={12} aria-hidden="true" />
					Slot {String(index + 1).padStart(2, "0")}
				</span>
				<div className="flex min-w-20 flex-col items-end gap-1.5">
					<span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-[#dae6d8]/60">
						<span
							className="h-1.5 w-1.5 rounded-full bg-[#00ff87] shadow-[0_0_6px_#00ff87] motion-reduce:animate-none"
							aria-hidden="true"
						/>
						Reserved
					</span>
					<span
						className="h-0.5 w-full overflow-hidden rounded-full bg-[#1e2d2b]"
						aria-label="Reservation slot active">
						<span
							className={`block h-full origin-left bg-[#00ff87] shadow-[0_0_8px_#00ff87] transition-transform duration-700 ease-out motion-reduce:transition-none ${
								isVisible ? "scale-x-100" : "scale-x-0"
							}`}
						/>
					</span>
				</div>
			</div>

			{/* Vehicle image + name */}
			<div className="mb-4 grid grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(160px,0.7fr)]">
				<div className="relative aspect-[6/5] w-full overflow-hidden rounded-xl border border-[#dae6d8]/10 bg-[#030c07] shadow-md group-hover:border-[#00ff87]/30 transition-[border-color] duration-300">
					<Image
						src={getValidImageSrc(car.image)}
						alt={`${car.brand} ${car.model}`}
						fill
						sizes="(max-width: 1024px) 100vw, 300px"
						className="object-cover grayscale-[0.03] contrast-[1.05] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105 transition-transform duration-500"
					/>
					{car.badge && (
						<span className="absolute left-2 top-2 z-20 inline-flex items-center gap-1 border border-[#00ff87] bg-[#00ff87] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#0a0f0a] shadow-[0_4px_14px_rgba(0,0,0,0.45)] [clip-path:polygon(0_0,100%_0,100%_82%,92%_100%,8%_100%,0_82%)]">
							<Tag size={11} aria-hidden="true" /> {car.badge}
						</span>
					)}
				</div>
				<div className="min-w-0">
					<p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff87] font-['Orbitron']">
						{car.brand}
					</p>
					<h3 className="text-xl font-bold italic leading-tight tracking-tight text-[#e5efe3] transition-colors duration-200 group-hover:text-[#00ff87] sm:text-2xl font-['Newsreader']">
						{car.model}
					</h3>
				</div>
			</div>

			{/* Spec grid */}
			<div className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#dae6d8]/10 bg-[#dae6d8]/10">
				<div className="bg-[#041009]/70 p-3">
					<div className="mb-1 flex items-center gap-1.5 text-[#dae6d8]/40">
						<Gauge size={12} />
						<span className="text-[8px] font-bold uppercase tracking-widest">
							Type
						</span>
					</div>
					<p className="truncate text-xs font-bold text-[#e5efe3]">
						{car.bodySilhouette || "Performance"}
					</p>
				</div>
				<div className="bg-[#041009]/70 p-3">
					<div className="mb-1 flex items-center gap-1.5 text-[#dae6d8]/40">
						<Palette size={12} />
						<span className="text-[8px] font-bold uppercase tracking-widest">
							Finish
						</span>
					</div>
					<div className="flex min-w-0 items-center gap-2">
						<span
							className="h-3 w-3 shrink-0 rounded-full border border-white/20"
							style={{ backgroundColor: car.color?.hex || "#ffffff" }}
						/>
						<p className="truncate text-xs font-bold text-[#e5efe3]">
							{car.color?.id || "Standard"}
						</p>
					</div>
				</div>
			</div>

			{/* Specs prose */}
			{car.specs && (
				<p className="mb-4 border-l-2 border-[#00ff87]/40 pl-3 text-xs leading-relaxed text-[#dae6d8]/60">
					{car.specs}
				</p>
			)}

			{/* Quantity + item total */}
			<div className="mb-4 flex items-end justify-between gap-4 border-t border-[#dae6d8]/10 pt-4">
				<div className="flex items-center gap-2 text-[#dae6d8]/60">
					<Package size={15} className="text-[#00ff87]" />
					<div>
						<span className="block text-[8px] font-bold uppercase tracking-widest font-['Orbitron']">
							Quantity
						</span>
						<span className="text-sm font-bold text-[#e5efe3]">
							{quantity} Unit{quantity > 1 ? "s" : ""}
						</span>
					</div>
				</div>
				<div className="text-right">
					<span className="block text-[8px] font-bold uppercase tracking-widest text-[#dae6d8]/40 font-['Orbitron']">
						Vehicle total
					</span>
					<span className="text-lg font-bold text-[#00ff87]">
						${itemTotal.toLocaleString()}
					</span>
				</div>
			</div>

			{/* Actions */}
			<div className="flex gap-2.5">
				<Link
					href={`/details/${car.id}`}
					className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#e5efe3]
						transition-[transform,background-color,border-color,color] duration-150 ease-out
						[@media(hover:hover)_and_(pointer:fine)]:hover:border-[#00ff87] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#00ff87]/10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#00ff87]
						active:scale-[0.97]
						focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff87] sm:text-xs">
					<span>See Details</span>
					<ArrowRight size={13} />
				</Link>
				<button
					type="button"
					onClick={() => onUnlockSlot(car.id)}
					aria-label={`Remove ${car.brand} ${car.model} from your reservation`}
					className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-red-400
						transition-[transform,background-color,border-color,color] duration-150 ease-out
						[@media(hover:hover)_and_(pointer:fine)]:hover:border-red-500/40 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-red-500/15 [@media(hover:hover)_and_(pointer:fine)]:hover:text-red-300
						active:scale-[0.97]
						focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:text-xs">
					<X size={13} />
					<span>Remove vehicle</span>
				</button>
			</div>
		</article>
	);
}

// --- Price lock sweep signature animation ---
// Plays once when the pricing card enters the viewport.
// A fine green line clips left-to-right across the total number, then fades.
function usePriceLock() {
	const ref = useRef<HTMLDivElement>(null);
	const [swept, setSwept] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !swept) {
					// Small delay so the card itself can finish animating in first
					setTimeout(() => setSwept(true), 300);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.6 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [swept]);

	return { ref, swept };
}

export default function OrderSummary({
	cars,
	subtotal,
	customConfiguration,
	deliveryFee,
	totalAllocation,
	onUnlockSlot,
}: OrderSummaryProps) {
	const { ref: priceLockRef, swept: priceLocked } = usePriceLock();

	return (
		<div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24 lg:self-start space-y-6">
			{/* Header */}
			<header className="flex items-end justify-between border-b border-[#dae6d8]/10 pb-4">
				<div>
					<span className="text-[10px] uppercase tracking-[0.25em] text-[#00ff87] font-bold mb-1.5 flex items-center gap-1.5 font-['Orbitron']">
						<Sparkles size={12} aria-hidden="true" /> Reservation Summary
					</span>
					<h2 className="text-3xl md:text-4xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3]">
						Allocated Vehicles
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-[10px] uppercase tracking-widest text-[#00ff87] font-bold bg-[#00ff87]/10 px-3 py-1 rounded-full border border-[#00ff87]/20 font-['Orbitron']">
						{cars.length} {cars.length === 1 ? "Vehicle" : "Vehicles"}
					</span>
				</div>
			</header>

			{/* Scrollable vehicle list — stagger driven by CSS custom property on each card */}
			<div className="relative space-y-5 overflow-y-auto max-h-[560px] pr-3.5 luxury-scrollbar rounded-2xl after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-10 after:bg-gradient-to-t after:from-[#0a0f0a] after:to-transparent after:content-['']">
				{cars.map((car, index) => (
					<VehicleSummaryCard
						key={car.id}
						car={car}
						index={index}
						onUnlockSlot={onUnlockSlot}
					/>
				))}
			</div>

			{/* Pricing Summary Card */}
			<div
				ref={priceLockRef}
				className="bg-[#2a3c34]/85 backdrop-blur-2xl p-6 border border-[#00ff87]/20 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_25px_rgba(0,255,135,0.04)] space-y-4">
				{/* Line items */}
				<div className="space-y-3 pb-4 border-b border-[#dae6d8]/10 text-xs">
					{/* Subtotal MSRP — base price dot */}
					<div className="flex justify-between items-center tracking-wide">
						<span className="flex items-center gap-2 text-[#dae6d8]/60">
							<span
								className="h-1.5 w-1.5 rounded-full bg-[#e5efe3]/40 shrink-0"
								aria-hidden="true"
							/>
							Subtotal MSRP
						</span>
						<span className="font-bold text-[#e5efe3] tabular-nums">
							${subtotal.toLocaleString()}
						</span>
					</div>
					{/* Custom config — add-on amber dot */}
					<div className="flex justify-between items-center tracking-wide">
						<span className="flex items-center gap-2 text-[#dae6d8]/60">
							<span
								className="h-1.5 w-1.5 rounded-full bg-amber-400/60 shrink-0"
								aria-hidden="true"
							/>
							Bespoke Custom Configuration
						</span>
						<span className="font-bold text-[#e5efe3] tabular-nums">
							${customConfiguration.toLocaleString()}
						</span>
					</div>
					{/* Delivery — logistics teal dot */}
					<div className="flex justify-between items-center tracking-wide">
						<span className="flex items-center gap-2 text-[#dae6d8]/60">
							<span
								className="h-1.5 w-1.5 rounded-full bg-sky-400/60 shrink-0"
								aria-hidden="true"
							/>
							Global Delivery &amp; Concierge
						</span>
						<span className="font-bold text-[#e5efe3] tabular-nums">
							${deliveryFee.toLocaleString()}
						</span>
					</div>
				</div>

				{/* Total row — signature price lock sweep */}
				<div className="flex justify-between items-end pt-1">
					<div>
						<span className="block text-[9px] uppercase tracking-[0.2em] text-[#00ff87] font-bold mb-1 font-['Orbitron']">
							Total Allocation
						</span>
						{/*
						 * Price lock sweep: a ::after pseudo element (via Tailwind's after:) clips
						 * left-to-right across the number using clip-path. We drive this via a
						 * data attribute to keep it in CSS land — animating clip-path is GPU-accelerated.
						 */}
						<div className="relative inline-block">
							<span
								data-price-locked={priceLocked}
								className={`text-3xl md:text-4xl font-bold font-['Newsreader'] italic tracking-tight text-[#00ff87]
									transition-[filter] duration-700 ease-out
									${priceLocked ? "drop-shadow-[0_0_20px_rgba(0,255,135,0.3)]" : "drop-shadow-[0_0_10px_rgba(0,255,135,0.1)]"}`}>
								${totalAllocation.toLocaleString()}
							</span>
							{/* Scan-line sweep overlay */}
							<span
								aria-hidden="true"
								className={`pointer-events-none absolute inset-0 rounded-sm
									bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,135,0.18)_50%,transparent_100%)]
									transition-[clip-path,opacity] motion-reduce:hidden
									${
										priceLocked
											? "clip-path-[inset(0_0%_0_0)] opacity-0 duration-[1400ms]"
											: "clip-path-[inset(0_100%_0_0)] opacity-100 duration-0"
									}`}
								style={{
									clipPath: priceLocked
										? "inset(0 0% 0 0)"
										: "inset(0 100% 0 0)",
									transitionProperty: "clip-path, opacity",
									transitionDuration: priceLocked ? "700ms, 800ms" : "0ms, 0ms",
									transitionDelay: priceLocked ? "0ms, 700ms" : "0ms, 0ms",
									transitionTimingFunction:
										"cubic-bezier(0.22, 1, 0.36, 1), ease",
								}}
							/>
						</div>
					</div>

					{/* Price guaranteed badge */}
					<div
						className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#00ff87] font-bold bg-[#00ff87]/10 px-3 py-1.5 rounded-full border border-[#00ff87]/20 font-['Orbitron']
							transition-[opacity,transform] duration-500 ease-out
							${priceLocked ? "opacity-100 translate-y-0" : "opacity-50 translate-y-1"}`}>
						<CheckCircle2 size={12} aria-hidden="true" />
						Price Guaranteed
					</div>
				</div>
			</div>
		</div>
	);
}
