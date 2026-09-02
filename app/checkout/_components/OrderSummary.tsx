import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types/Order";
import { CheckCircle2, Sparkles, ArrowRight, X } from "lucide-react";
import { getValidImageSrc } from "@/lib/utils";

interface OrderSummaryProps {
	cars: Car[];
	subtotal: number;
	customConfiguration: number;
	deliveryFee: number;
	totalAllocation: number;
	onUnlockSlot: (carId: number) => void;
}

export default function OrderSummary({
	cars,
	subtotal,
	customConfiguration,
	deliveryFee,
	totalAllocation,
	onUnlockSlot,
}: OrderSummaryProps) {
	return (
		<div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24 lg:self-start space-y-6">
			{/* Header */}
			<header className="flex items-end justify-between border-b border-[#dae6d8]/10 pb-4">
				<div>
					<span className="text-[10px] uppercase tracking-[0.25em] text-[#00ff87] font-bold mb-1.5 flex items-center gap-1.5">
						<Sparkles size={12} /> Reservation Summary
					</span>
					<h2 className="text-3xl md:text-4xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3]">
						Allocated Vehicles
					</h2>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-[10px] uppercase tracking-widest text-[#00ff87] font-bold bg-[#00ff87]/10 px-3 py-1 rounded-full border border-[#00ff87]/20">
						{cars.length} {cars.length === 1 ? "Vehicle" : "Vehicles"}
					</span>
				</div>
			</header>

			{/* Scrollable Vehicle List */}
			<div className="space-y-5 overflow-y-auto max-h-[640px] xl:max-h-[720px] 2xl:max-h-[780px] pr-3.5 luxury-scrollbar rounded-2xl">
				{cars.map((car, index) => {
					const itemTotal = car.price * (car.quantity || 1);
					return (
						<div
							key={car.id}
							className="bg-[#06180f]/85 backdrop-blur-xl border border-[#dae6d8]/10 hover:border-[#00ff87]/40 p-6 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6),0_0_20px_rgba(0,255,135,0.08)] group relative">
							{/* Card Top Row: Slot Badge, Status, and Price */}
							<div className="flex items-center justify-between gap-2 mb-3.5">
								<div className="flex items-center gap-2 flex-wrap">
									<span className="text-[9px] uppercase tracking-[0.2em] text-[#00ff87] font-bold bg-[#00ff87]/10 px-2.5 py-1 rounded-md border border-[#00ff87]/25 shadow-[0_0_10px_rgba(0,255,135,0.1)]">
										Slot {String(index + 1).padStart(2, "0")}
									</span>
									<span className="text-[9px] uppercase tracking-widest text-[#dae6d8]/60 font-semibold flex items-center gap-1.5 bg-[#041009]/60 px-2.5 py-1 rounded-md border border-[#dae6d8]/5">
										<span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_6px_#00ff87]" />
										Locked for Reservation
									</span>
								</div>
								<div className="text-right shrink-0">
									<span className="text-sm md:text-base font-bold text-[#00ff87] bg-[#00ff87]/10 px-3 py-1 rounded-lg border border-[#00ff87]/25 shadow-[0_0_12px_rgba(0,255,135,0.1)] inline-block">
										${itemTotal.toLocaleString()}
									</span>
								</div>
							</div>

							{/* Vehicle Title */}
							<h3 className="text-2xl md:text-3xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3] group-hover:text-[#00ff87] transition-colors mb-3.5">
								{car.brand} {car.model}
							</h3>

							{/* Vehicle Image Thumbnail */}
							<div className="aspect-[16/9] w-full bg-[#030c07] mb-4 overflow-hidden border border-[#dae6d8]/10 group-hover:border-[#00ff87]/30 rounded-xl relative shadow-md">
								<Image
									src={getValidImageSrc(car.image)}
									alt={`${car.brand} ${car.model}`}
									fill
									sizes="(max-width: 1024px) 100vw, 420px"
									className="w-full h-full object-cover grayscale-[0.03] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
								/>

								<div>
									<span className="block text-[8px] uppercase tracking-widest text-[#dae6d8]/40 mb-1 font-bold">
										Model
									</span>
									<span className="text-xs font-bold text-[#e5efe3] truncate block">
										{car.model}
									</span>
								</div>

								<div>
									<span className="block text-[8px] uppercase tracking-widest text-[#dae6d8]/40 mb-1 font-bold">
										Quantity
									</span>
									<span className="text-xs font-bold text-[#e5efe3] block">
										{car.quantity || 1} Unit{(car.quantity || 1) > 1 ? "s" : ""}
									</span>
								</div>

								<div>
									<span className="block text-[8px] uppercase tracking-widest text-[#dae6d8]/40 mb-1 font-bold">
										Color
									</span>
									<div className="flex items-center gap-2">
										<span
											className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-sm"
											style={{ backgroundColor: car.color?.hex || "#ffffff" }}
										/>
										<span className="text-xs font-bold text-[#e5efe3] truncate">
											{car.color?.id || "Standard"}
										</span>
									</div>
								</div>

								<div>
									<span className="block text-[8px] uppercase tracking-widest text-[#dae6d8]/40 mb-1 font-bold">
										Silhouette
									</span>
									<span className="text-xs font-bold text-[#e5efe3] truncate block">
										{car.bodySilhouette || "Sports"}
									</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-2.5">
								<Link
									href={`/details/${car.id}`}
									className="flex-1 py-3 px-4 rounded-xl border border-[#dae6d8]/10 hover:border-[#00ff87]/40 text-[#e5efe3] hover:text-[#00ff87] font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 bg-[#dae6d8]/5 hover:bg-[#00ff87]/10 shadow-sm">
									<span>See Details</span>
									<ArrowRight size={13} />
								</Link>

								<button
									type="button"
									onClick={() => onUnlockSlot(car.id)}
									className="flex-1 py-3 px-4 rounded-xl border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 bg-red-500/5 hover:bg-red-500/15 cursor-pointer shadow-sm">
									<X size={13} />
									<span>Unlock Slot</span>
								</button>
							</div>
						</div>
					);
				})}
			</div>

			{/* Pricing Summary Card */}
			<div className="bg-[#081d12]/90 backdrop-blur-2xl p-6 border border-[#00ff87]/20 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_25px_rgba(0,255,135,0.04)] space-y-4">
				<div className="space-y-2.5 pb-4 border-b border-[#dae6d8]/10 text-xs">
					<div className="flex justify-between tracking-wide">
						<span className="text-[#dae6d8]/60">Subtotal MSRP</span>
						<span className="font-bold text-[#e5efe3]">
							${subtotal.toLocaleString()}
						</span>
					</div>
					<div className="flex justify-between tracking-wide">
						<span className="text-[#dae6d8]/60">
							Bespoke Custom Configuration
						</span>
						<span className="font-bold text-[#e5efe3]">
							${customConfiguration.toLocaleString()}
						</span>
					</div>
					<div className="flex justify-between tracking-wide">
						<span className="text-[#dae6d8]/60">
							Global Delivery &amp; Concierge
						</span>
						<span className="font-bold text-[#e5efe3]">
							${deliveryFee.toLocaleString()}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-end pt-1">
					<div>
						<span className="block text-[9px] uppercase tracking-[0.2em] text-[#00ff87] font-bold mb-1">
							Total Allocation
						</span>
						<span className="text-2xl md:text-3xl font-bold font-['Manrope'] tracking-tighter text-[#e5efe3] drop-shadow-[0_0_15px_rgba(0,255,135,0.15)]">
							${totalAllocation.toLocaleString()}
						</span>
					</div>
					<div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#00ff87] font-bold bg-[#00ff87]/10 px-3 py-1.5 rounded-full border border-[#00ff87]/20">
						<CheckCircle2 size={12} />
						Price Guaranteed
					</div>
				</div>
			</div>
		</div>
	);
}
