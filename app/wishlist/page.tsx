"use client";
import React from "react";
import { useCarStore } from "@/store/useCarStore";
import WishlistCarsCard from "@/components/WishlistCarsCard";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

const WishlistPage = () => {
	const { wishlistCars, removeFromWishlist } = useCarStore();

	return (
		<div className="min-h-screen bg-[#020503] text-[#dae6d8] font-['Manrope'] pb-24 pt-28 relative overflow-hidden">
			{/* Ambient Background Glows */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,255,135,0.12),transparent_70%),radial-gradient(circle_at_0%_100%,rgba(0,255,135,0.04),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(218,230,216,0.03),transparent_35%)]" />

			<div className="max-w-[1000px] mx-auto px-6 relative z-10">
				<div className="mb-12">
					<Link
						href="/shop"
						className="inline-flex items-center gap-2 text-[#dae6d8]/40 hover:text-[#00ff87] text-[10px] uppercase tracking-[0.2em] font-bold transition-colors mb-8">
						<ArrowLeft size={14} />
						Back to Shop
					</Link>

					<div className="flex items-center gap-4">
						<div className="w-12 h-12 rounded-xl bg-[#00ff87]/10 flex items-center justify-center border border-[#00ff87]/20">
							<Heart size={24} className="text-[#00ff87] fill-[#00ff87]/20" />
						</div>
						<div>
							<h1 className="text-4xl md:text-5xl font-['Newsreader'] uppercase font-bold tracking-tight text-[#e5efe3]">
								Your Wishlist
							</h1>
							<p className="text-[#dae6d8]/40 text-xs uppercase tracking-widest mt-1">
								{wishlistCars.length}{" "}
								{wishlistCars.length === 1 ? "vehicle" : "vehicles"} saved for
								later
							</p>
						</div>
					</div>
				</div>

				{wishlistCars.length > 0 ? (
					<div className="grid grid-cols-1 gap-6">
						{wishlistCars.map((car) => (
							<WishlistCarsCard
								car={car}
								key={car.id}
								onRemoveFromWishlist={removeFromWishlist}
								variant="detailed"
							/>
						))}
					</div>
				) : (
					<div className="bg-[#050d08]/85 backdrop-blur-xl rounded-2xl p-20 border border-[#dae6d8]/5 text-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
						<Heart size={48} className="text-[#dae6d8]/10 mx-auto mb-6" />
						<h2 className="text-2xl font-['Newsreader'] italic font-bold text-[#e5efe3] mb-3">
							Your wishlist is empty
						</h2>
						<p className="text-[#dae6d8]/40 text-sm max-w-xs mx-auto mb-8">
							Explore our curated selection of luxury vehicles and save your
							favorites here.
						</p>
						<Link
							href="/shop"
							className="inline-block bg-[#00ff87] text-[#020503] px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-emerald-300 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(0,255,135,0.2)]">
							Start Exploring
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default WishlistPage;
