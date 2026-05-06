"use client";

import { Cars } from "@/types/Cars";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CarsCard = ({
	id,
	image,
	badge,
	brand,
	model,
	bodySilhouette,
	specs,
	price,
	isFavorite = false,
}: Cars) => {
	const router = useRouter();

	return (
		<div className="group relative bg-[#141e16] border border-[#dae6d8]/5 overflow-hidden transition-all duration-500 hover:border-[#00ff87]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
			{/* Badge */}
			{badge && (
				<div className="absolute top-4 left-4 z-10">
					<span className="bg-[#00ff87] text-[#0c160e] text-[9px] font-black uppercase tracking-widest px-2 py-1">
						{badge}
					</span>
				</div>
			)}

			{/* Image Container */}
			<div className="relative aspect-[16/10] overflow-hidden bg-black">
				<Image
					src={image}
					width={100}
					height={100}
					alt={`${brand} ${model}`}
					className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#0c160e] via-transparent to-transparent opacity-60" />
			</div>

			{/* Content */}
			<div className="p-6 space-y-4">
				<div className="flex justify-between items-start">
					<div>
						<p className="text-[#dae6d8] text-xl uppercase tracking-[0.2em] font-bold mb-1">
							{brand}
						</p>
						<h3 className="text-[#dae6d8] text-2xl font-['Newsreader'] italic font-medium tracking-tight group-hover:text-[#00ff87] transition-colors duration-300">
							{model}
						</h3>
						<h4 className="text-[#dae6d8] text-s font-['Newsreader']  font-medium tracking-tight group-hover:text-[#00ff87] transition-colors duration-300">
							{bodySilhouette}
						</h4>
					</div>
					<p className="text-[#00ff87] text-xl font-['Newsreader'] italic font-bold">
						{price}$
					</p>
				</div>

				<p className="text-[#dae6d8]/40 text-xs leading-relaxed font-['Manrope'] max-w-[80%] uppercase tracking-wider">
					{specs}
				</p>

				<div className="pt-4 flex items-center gap-3">
					<button
						className="flex-1 bg-[#00ff87] text-[#0c160e] py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,135,0.4)]"
						onClick={() => router.push(`/details/${id}`)}>
						View Details
					</button>
					<button className="p-4 border border-[#dae6d8]/10 text-[#dae6d8]/40 hover:text-[#00ff87] hover:border-[#00ff87]/30 transition-all duration-300">
						<Heart
							className={`w-4 h-4 ${isFavorite ? "fill-[#00ff87] text-[#00ff87]" : ""}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CarsCard;
