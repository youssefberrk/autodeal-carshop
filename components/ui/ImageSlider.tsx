"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleDot, Circle } from "lucide-react";

interface ImageSliderProps {
	album: string[];
	activeImage?: number;
	onImageChange?: (index: number) => void;
}

const ImageSlider = ({
	album,
	activeImage = 0,
	onImageChange,
}: ImageSliderProps) => {
	const [index, setIndex] = useState<number>(activeImage + 1);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
	const lastPropIndex = useRef<number>(activeImage);

	// Sync from external prop
	useEffect(() => {
		if (activeImage !== lastPropIndex.current) {
			const timer = setTimeout(() => {
				setIsTransitioning(true);
				setIndex(activeImage + 1);
				lastPropIndex.current = activeImage;
			}, 0);
			return () => clearTimeout(timer);
		}
	}, [activeImage]);

	// Handle internal index changes
	useEffect(() => {
		if (album.length <= 1) return;

		// 1. Handle Infinite Loop Wraparound
		if (index >= album.length + 1) {
			const timer = setTimeout(() => {
				setIsTransitioning(false);
				setIndex(1);
			}, 500);
			return () => clearTimeout(timer);
		}
		if (index <= 0) {
			const timer = setTimeout(() => {
				setIsTransitioning(false);
				setIndex(album.length);
			}, 500);
			return () => clearTimeout(timer);
		}

		// 2. Notify parent if the change was internal (manual slide)
		const realIndex = (index - 1 + album.length) % album.length;
		if (realIndex !== activeImage) {
			lastPropIndex.current = realIndex;
			onImageChange?.(realIndex);
		}
	}, [index, album.length, activeImage, onImageChange]);

	const nextImg = useCallback(() => {
		if (album.length <= 1 || index > album.length) return;
		setIsTransitioning(true);
		setIndex((prev) => prev + 1);
	}, [album.length, index]);

	const prevImg = useCallback(() => {
		if (album.length <= 1 || index < 1) return;
		setIsTransitioning(true);
		setIndex((prev) => prev - 1);
	}, [album.length, index]);

	if (!album || album.length === 0) return null;

	return (
		<div className="relative overflow-hidden w-full h-full group">
			<div
				className={`flex h-full w-full ${
					isTransitioning
						? "transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"
						: ""
				}`}
				style={{
					transform: `translateX(-${index * 100}%)`,
				}}>
				{album.length > 1 ? (
					[album[album.length - 1], ...album, album[0]].map((photo, i) => (
						<div key={i} className="relative w-full h-full flex-shrink-0">
							<Image
								src={photo}
								alt="car"
								fill
								sizes="(max-width: 768px) 100vw, 800px"
								className="object-cover"
								priority={i === 1}
								unoptimized={photo.startsWith("http")}
							/>
						</div>
					))
				) : (
					<div className="relative w-full h-full flex-shrink-0">
						<Image
							src={album[0]}
							alt="car"
							fill
							sizes="(max-width: 768px) 100vw, 800px"
							className="object-cover"
							priority
							unoptimized={album[0].startsWith("http")}
						/>
					</div>
				)}
			</div>

			{album.length > 1 && (
				<>
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
						{album.map((_, i) => (
							<button
								onClick={(e) => {
									e.stopPropagation();
									setIsTransitioning(true);
									setIndex(i + 1);
								}}
								key={i}
								className="transition-transform active:scale-75 cursor-pointer">
								{i === (index - 1 + album.length) % album.length ? (
									<CircleDot
										strokeWidth={3}
										size={17}
										className="text-white drop-shadow-md"
									/>
								) : (
									<Circle
										strokeWidth={3}
										size={8}
										className="text-white/60 drop-shadow-md hover:text-white transition-colors"
									/>
								)}
							</button>
						))}
					</div>

					<button
						onClick={(e) => {
							e.stopPropagation();
							prevImg();
						}}
						className="absolute h-full left-0 top-0 bg-black/10 hover:bg-black/20 text-white cursor-pointer p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
						<ChevronLeft size={32} />
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							nextImg();
						}}
						className="absolute h-full right-0 top-0 bg-black/10 hover:bg-black/20 text-white cursor-pointer p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
						<ChevronRight size={32} />
					</button>
				</>
			)}
		</div>
	);
};

export default ImageSlider;
