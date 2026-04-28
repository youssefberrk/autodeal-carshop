"use client";

import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.jpg";
import { featCars, carsData } from "@/public/cars/CarsData";
import { featuredCars } from "@/types/CarsTypes";
import { ImageSlider } from "@/components/ui/ImageSlider";
import CarsCard from "@/components/CarsCard";
import ManufacturerDropdown from "@/components/ui/ManufacturerDropdown";
import { Cars } from "@/types/Cars";

interface Params {
	carParam: featuredCars & Cars;
}

const page = ({ carParam }: Params) => {
	const FeaturedCard = ({ album, model, info, price }: featuredCars) => {
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
	
	const carBrands = [ ...new Set(carsData.map((car) => car.brand))]
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

			{/* Marketplace */}

			<div className="py-20 mx-auto w-full text-white ">
				<div>
					<h1 className="text-3xl text-center md:text-7xl ">Your Shop</h1>
				</div>
				<div className="relative w-full  flex items-center  ">
					<div className="absolute top-18 ">
						<h1 className="text-7xl ml-8">Filters</h1>
						<div>
							<p>Manufacturers</p>
							<ManufacturerDropdown brands={carBrands} />
						</div>
						<ul>
							<p>Body Silhouette</p>
							<li>Coupe</li>
							<li>Electric</li>
							<li>Performance</li>
							<li>SUV</li>
						</ul>
						<div>Price Ceiling</div>
					</div>
					<div className="pt-44 mx-auto grid grid-cols-1 md:grid-cols-2  bg-red-600 w-[70%] mr-12">
						{carsData.map((car, index) => (
							<CarsCard
								key={index}
								id={car.id}
								brand={car.brand}
								bodySilhouette={car.bodySilhouette}
								price={car.price}
								carAlbum={car.carAlbum}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
