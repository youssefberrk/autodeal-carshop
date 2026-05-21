"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleDot, Circle } from "lucide-react";

export const ImageSlider = ({ album }: { album: string[] }) => {
	const [index, setIndex] = useState(1); // Start at first REAL image
	const [isTransitioning, setIsTransitioning] = useState(true);

	const nextImg = () => {
		setIsTransitioning(true);
		if (index < album.length) {
			// Changed from album.length - 1
			setIndex((prev) => prev + 1);
		} else {
			setIndex(album.length + 1); // Changed from album.length
		}
	};

	const prevImg = () => {
		setIsTransitioning(true);
		if (index > 1) {
			// Changed from > 0
			setIndex((prev) => prev - 1);
		} else {
			setIndex(0); // Changed from -1
		}
	};

	useEffect(() => {
		if (index === album.length + 1) {
			// Changed from album.length
			const timer = setTimeout(() => {
				setIsTransitioning(false);
				setIndex(1); // Changed from 0 (reset to first real image)
			}, 500);
			return () => clearTimeout(timer);
		}
		if (index === 0) {
			// Changed from -1
			const timer = setTimeout(() => {
				setIsTransitioning(false);
				setIndex(album.length); // Changed from album.length - 1 (reset to last real image)
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [index, album.length]);

	return (
		<div className="relative overflow-hidden w-full h-[300px] group">
			{/* SLIDER TRACK */}
			<div
				className={`flex h-[300px] ${
					isTransitioning ? "transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" : ""
				}`}
				style={{
					transform: `translateX(-${index * 100}%)`,
				}}>
				{[album[album.length - 1], ...album, album[0]].map((photo, i) => (
					<Image
						key={i}
						src={photo}
						alt="car"
						width={600}
						height={400}
						className="w-full h-[300px] object-cover flex-shrink-0"
					/>
				))}
			</div>

			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
				{album.map((_, i) => (
					<button 
						onClick={() => setIndex(i + 1)} 
						key={i}
						className="transition-transform active:scale-75"
					>
						{i === index - 1 ? (
							<CircleDot
								strokeWidth={3}
								size={17}
								className="text-white cursor-pointer drop-shadow-md"
							/>
						) : (
							<Circle
								strokeWidth={3}
								size={8}
								className="text-white/60 cursor-pointer drop-shadow-md hover:text-white transition-colors"
							/>
						)}
					</button>
				))}
			</div>

			{/* BUTTONS */}
			<button
				onClick={prevImg}
				className="absolute h-full left-0 top-0 bg-black/10 hover:bg-black/20 text-white cursor-pointer p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<ChevronLeft size={32} />
			</button>

			<button
				onClick={nextImg}
				className="absolute h-full right-0 top-0 bg-black/10 hover:bg-black/20 text-white cursor-pointer p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<ChevronRight size={32} />
			</button>
		</div>
	);
};
