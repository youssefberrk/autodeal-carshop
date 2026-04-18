"use client";

import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.jpg";
import { featCars } from "@/public/cars/CarsData";
import { featuredCars } from "@/types/CarsTypes";
import { useState } from "react";

const page = () => {
	const ImageSlider = ({ album }: { album: string[] }) => {
		const [index, setIndex] = useState(0);

		const nextImg = () => {
			setIndex((prev) => (prev + 1) % album.length);
		};

		const prevImg = () => {
			setIndex((prev) => (prev - 1 + album.length) % album.length);
		};

		return (
			<div className="relative">
				<Image
					src={album[index]}
					alt="car"
					width={600}
					height={400}
					className="h-[300px] object-cover"
				/>

				<button
					onClick={prevImg}
					className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2">
					&lt;
				</button>

				<button
					onClick={nextImg}
					className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2">
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
