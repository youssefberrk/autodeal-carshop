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
				className={`flex h-[300px] hover:scale-[120%]  ${
					isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
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

			<div className="absolute bottom-1 left-1/2 -translate-x-1/2  hidden group-hover:flex  gap-2">
				{album.map((_, i) => (
					<button onClick={() => setIndex(i + 1)} key={i}>
						{i === index - 1 ? (
							<CircleDot
								strokeWidth={3}
								size={17}
								className="text-black cursor-pointer"
							/>
						) : (
							<Circle
								strokeWidth={3}
								size={8}
								className="text-gray-500 opacity-60 cursor-pointer"
							/>
						)}
					</button>
				))}
			</div>

			{/* BUTTONS */}
			<button
				onClick={prevImg}
				className="absolute h-full hidden group-hover:block left-0 top-1/2 -translate-y-1/2 bg-black/20 text-white cursor-pointer p-0">
				<ChevronLeft size={48} />
			</button>

			<button
				onClick={nextImg}
				className="absolute h-full hidden group-hover:block right-0 top-1/2 -translate-y-1/2 bg-black/20 text-white cursor-pointer p-0 ">
				<ChevronRight size={48} />
			</button>
		</div>
	);
};
