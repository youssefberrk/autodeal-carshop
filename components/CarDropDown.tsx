"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { useCarStore } from "@/store/useCarStore";
import { motion } from "framer-motion";
import { getValidImageSrc } from "@/lib/utils";

interface CarDropDownProps {
	onClose: () => void;
}

export default function CarDropDown({ onClose }: CarDropDownProps) {
	const { allocatedCars, removeFromAllocation } = useCarStore();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest("[aria-label='My Cars']")
			) {
				onClose();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	const totalPrice = allocatedCars.reduce((sum, car) => sum + car.price * (car.quantity || 1), 0);

	return (
		<motion.div
			ref={dropdownRef}
			initial={{ opacity: 0, scale: 0.95, y: -10 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95, y: -10 }}
			transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
			className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-xs sm:w-80 md:w-[26rem] rounded-2xl p-5 backdrop-blur-2xl z-50 origin-top-right border border-[#00ff87]/15 shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
			style={{
				background: "rgba(5, 13, 8, 0.95)",
			}}>
			{/* Header */}
			<div className="flex justify-between items-center mb-4 pb-2.5 border-b border-emerald-500/10">
				<h3 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
					<ShoppingCart size={16} className="text-emerald-400 animate-pulse" />
					My Garage
				</h3>
				<button 
					onClick={onClose} 
					className="text-slate-400 hover:text-white transition-colors duration-200 p-1 hover:bg-white/5 rounded-lg active:scale-95"
					aria-label="Close garage">
					<X size={16} />
				</button>
			</div>

			{/* Empty State */}
			{allocatedCars.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-10 px-4 text-center">
					<div className="w-16 h-16 rounded-full bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_20px_rgba(0,255,135,0.05)]">
						<ShoppingCart size={28} className="stroke-[1.5]" />
					</div>
					<h4 className="text-white text-xs font-semibold mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
						GARAGE IS EMPTY
					</h4>
					<p className="text-slate-400 text-xs max-w-[200px] mb-5 leading-normal">
						Your virtual showroom is waiting for its first high-performance addition.
					</p>
					<Link
						href="/shop"
						className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00ff87]/5 hover:bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/10 hover:border-[#00ff87]/35 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.97] group"
						style={{ fontFamily: 'Orbitron, sans-serif' }}
						onClick={onClose}>
						Browse Showroom
						<ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
					</Link>
				</div>
			) : (
				<>
					{/* Cars List */}
					<div className="space-y-2.5 max-h-64 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/[0.01] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#00ff87]/20 [&::-webkit-scrollbar-thumb:hover]:bg-[#00ff87]/50 [&::-webkit-scrollbar-thumb:active]:bg-[#00ff87]/85 [&::-webkit-scrollbar-thumb]:rounded-full">
						{allocatedCars.map((car) => (
							<div
								key={car.id}
								className="flex items-center justify-between gap-3 p-3 bg-[#07130c]/30 border border-white/[0.04] hover:border-[#00ff87]/20 hover:shadow-[0_0_15px_rgba(0,255,135,0.02)] rounded-xl transition-all duration-200 group/item">
								
								{/* Left/Middle: Image, Model & Metadata */}
								<Link href={`/details/${car.id}`} onClick={onClose} className="flex items-center gap-3.5 flex-1 min-w-0">
									{/* Image */}
									<div className="w-16 h-12 relative rounded-lg overflow-hidden border border-white/10 ring-1 ring-white/5 flex-shrink-0">
										<Image
											src={getValidImageSrc(car.image, car.id)}
											alt={car.model || "Car"}
											fill
											sizes="64px"
											className="object-cover transition-transform duration-300 group-hover/item:scale-105"
										/>
									</div>
									
									{/* Info */}
									<div className="flex-1 min-w-0">
										<p className="text-white text-xs font-semibold truncate group-hover/item:text-emerald-400 transition-colors duration-200">
											{car.model}
										</p>
										
										{/* Metadata Row */}
										<div className="flex items-center gap-2 mt-1 flex-wrap">
											<span className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
												{car.brand}
											</span>
											<span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
											{/* Color Dot */}
											<span className="h-3 w-3 rounded-full ring-1 ring-[#00ff87]/30 flex-shrink-0" 
												style={{ backgroundColor: car.color?.hex || '#ffffff' }}
												title={car.color?.id} 
											/>
											<span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
											{/* Qty */}
											<span className="text-[9px] text-slate-300 font-bold font-mono">
												x{car.quantity || 1}
											</span>
										</div>
									</div>
								</Link>

								{/* Right: Price & Remove action */}
								<div className="flex items-center gap-3 flex-shrink-0 pl-1">
									<span className="text-emerald-400 text-xs font-bold font-mono">
										${car.price.toLocaleString()}
									</span>
									<button
										onClick={() => removeFromAllocation(car.id)}
										className="text-slate-400 hover:text-red-400 hover:rotate-90 transition-all duration-300 p-1 flex-shrink-0"
										aria-label="Remove car">
										<X size={14} />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Total & Checkout */}
					<div className="mt-5 pt-4 border-t border-emerald-500/10">
						<div className="flex justify-between items-center mb-4">
							<span className="text-slate-400 text-xs font-medium uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>Total:</span>
							<span className="text-white text-lg font-bold font-mono shadow-sm">
								${totalPrice.toLocaleString()}
							</span>
						</div>
						<Link
							href="/checkout"
							onClick={onClose}
							className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-[#00ff87] text-[#020503] text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(0,255,135,0.25)] hover:shadow-[0_4px_30px_rgba(0,255,135,0.4)] active:scale-[0.98] group"
							style={{ fontFamily: 'Orbitron, sans-serif' }}>
							Confirm Purchase
							<ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
						</Link>
					</div>
				</>
			)}
		</motion.div>
	);
}
