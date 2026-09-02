import React from "react";
import Image from "next/image";
import { Trash2, ArrowUpRight, Gauge, Info } from "lucide-react";
import { Car } from "@/types/Order";
import Link from "next/link";
import { getValidImageSrc } from "@/lib/utils";

interface WishlistCarsCardProps {
	car: Car;
	onRemoveFromWishlist: (car: Car) => void;
	variant?: "compact" | "detailed";
}

const WishlistCarsCard = ({
	car,
	onRemoveFromWishlist,
	variant = "compact",
}: WishlistCarsCardProps) => {
	const isDetailed = variant === "detailed";
	const imageSrc = getValidImageSrc(car?.image, car?.id);

	return (
		<div
			className={`bg-[#07130c]/50 rounded-xl border border-[#dae6d8]/5 flex flex-col sm:flex-row gap-4 relative group hover:border-[#00ff87]/20 hover:shadow-[0_0_20px_rgba(0,255,135,0.03)] transition-all duration-300 ${isDetailed ? "p-6 sm:p-7" : "p-5"}`}>
			<div className={`${isDetailed ? "w-full sm:w-2/5" : "w-full sm:w-1/3"}`}>
				<div
					className={`bg-[#020503] rounded-lg overflow-hidden border border-[#dae6d8]/5 relative ${isDetailed ? "aspect-video" : "aspect-[4/3]"}`}>
					<Image
						src={imageSrc}
						alt={car?.model || "Car"}
						fill
						sizes={
							isDetailed
								? "(max-width: 640px) 100vw, 40vw"
								: "(max-width: 640px) 100vw, 33vw"
						}
						className="object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex justify-between items-start mb-1">
					<div>
						<h4
							className={`font-['Newsreader'] italic font-bold text-[#e5efe3] leading-tight ${isDetailed ? "text-2xl mb-1" : "text-xl"}`}>
							{car.model}
						</h4>
						<p className="text-[#dae6d8]/50 text-xs uppercase tracking-wider mb-2">
							{car.brand}
						</p>
					</div>

					<div className="text-right">
						<span
							className={`text-[#00ff87] font-bold font-['Manrope'] block ${isDetailed ? "text-xl" : "text-sm"}`}>
							${car.price.toLocaleString()}
						</span>
					</div>
				</div>

				{isDetailed && (
					<div className="space-y-3 mb-6 flex-1">
						<div className="flex flex-wrap gap-4 mt-2">
							<div className="flex items-center gap-2 bg-[#020503]/60 px-3 py-1.5 rounded-md border border-[#dae6d8]/5">
								<Gauge size={14} className="text-[#00ff87]" />
								<span className="text-[10px] uppercase tracking-widest text-[#dae6d8]/70 font-medium">
									{car.bodySilhouette || "Performance"}
								</span>
							</div>
						</div>

						{car.specs && (
							<div className="flex items-start gap-2 text-[#dae6d8]/50">
								<Info size={14} className="mt-0.5 flex-shrink-0" />
								<p className="text-xs leading-relaxed italic">{car.specs}</p>
							</div>
						)}
					</div>
				)}

				<div className="flex items-center gap-3 mt-auto">
					{isDetailed && (
						<Link
							href={`/details/${car.id}`}
							className="flex-1 bg-[#00ff87]/5 hover:bg-[#00ff87] text-[#00ff87] hover:text-[#020503] border border-[#00ff87]/20 hover:border-[#00ff87] py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn">
							View Details
							<ArrowUpRight
								size={14}
								className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
							/>
						</Link>
					)}

					{!isDetailed && car.badge && (
						<span className="bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold">
							{car.badge}
						</span>
					)}

					<button
						onClick={() => onRemoveFromWishlist(car)}
						className={`${isDetailed ? "p-2.5" : "absolute bottom-3 right-3 p-2"} rounded-lg bg-black/40 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-gray-700/50 hover:border-red-500/30 transition-all duration-200 cursor-pointer`}
						title="Remove from wishlist">
						<Trash2 size={16} />
					</button>
				</div>
			</div>

			{isDetailed && car.badge && (
				<span className="absolute top-4 left-4 bg-[#00ff87] text-[#020503] px-3 py-1 rounded-md text-[10px] uppercase tracking-wider font-extrabold shadow-[0_0_20px_rgba(0,255,135,0.2)]">
					{car.badge}
				</span>
			)}
		</div>
	);
};

export default WishlistCarsCard;
