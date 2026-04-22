"use client";

import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.jpg";
import { featCars } from "@/public/cars/CarsData";
import { featuredCars } from "@/types/CarsTypes";
import { useState, useEffect } from "react";

const page = () => {
	const ImageSlider = ({ album }: { album: string[] }) => {
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
			<div className="relative overflow-hidden w-full h-[300px]">
				{/* SLIDER TRACK */}
				<div
					className={`flex h-[300px] ${
						isTransitioning
							? "transition-transform duration-500 ease-in-out"
							: ""
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

				{/* BUTTONS */}
				<button
					onClick={prevImg}
					className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1">
					&lt;
				</button>

				<button
					onClick={nextImg}
					className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1">
					&gt;
				</button>
			</div>
		);
	};

	const FeaturedCard = ({ id, album, model, info, price }: featuredCars) => {
		return (
			<div className="w-full max-w-xl">
				<div>
					<ImageSlider album={[album.photo1, album.photo2, album.photo3]} />
				</div>
				<div className="text-white">
					<h1>{model}</h1>
					<p>{info}</p>
					<p>{price}</p>
				</div>
			</div>
		);
	};
	return (
		<div>
			<div className="relative flex items-center justify-center w-full ">
				<Image
					src={Gclass}
					alt="G-class"
					height={400}
					className="w-full opacity-70"
				/>
				<div className="absolute left-1 md:left-4 bottom-0 md:bottom-4 space-y-2 md:space-y-3.5 ">
					<h1 className="md:text-7xl text-xl newsreader font-bold text-gray-200">
						Luxury Cars
					</h1>
					<p className="text-green-200 body text-xs md:text-xl italic tracking-wide md:w-[70%]">
						Explore 100+ luxury cars, supercars and exotic cars for sale
						worldwide in one simple search
					</p>
				</div>
			</div>
			<div className="py-12 mx-12 flex flex-col items-center justify-center gap-20">
				<h1 className=" text-white md:text-8 xl heading font-bold">Featured</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-8">
					{featCars.map((car) => (
						<FeaturedCard
							key={car.id}
							id={car.id}
							album={car.album}
							model={car.model}
							info={car.info}
							price={car.price}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
