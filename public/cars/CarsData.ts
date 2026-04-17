import { featuredCars } from "@/types/CarsTypes";

export const featCars: featuredCars[] = [
	{
		id: 1,
		album: {
			photo1: "/public/cars/shop-featured/lambo/lambo1.jpeg",
			photo2: "/public/cars/shop-featured/lambo/lambo2.jpeg",
			photo3: "/public/cars/shop-featured/lambo/lambo3.jpeg",
		},
		model: "Lamborghini Revuelto",
		info: "a 1,001-horsepower HPEV (High Performance Electrified Vehicle) plug-in hybrid, serving as the V12 flagship successor to the Aventador.",
		price: "Price On Request",
	},
	{
		id: 2,
		album: {
			photo1: "/public/cars/shop-featured/911/p1.jpeg",
			photo2: "/public/cars/shop-featured/911/p2.jpeg",
			photo3: "/public/cars/shop-featured/911/p3.jpeg",
		},
		model: "Porsche 911 Carrera GTS ",
		info: "a revolutionary 'T-Hybrid' system, combining a new 3.6L flat-six engine with electric turbocharging to produce 532 hp and 449 lb-ft of torque",
		price: "315K",
	},
	{
		id: 3,
		album: {
			photo1: "/public/cars/shop-featured/am/am1.jpeg",
			photo2: "/public/cars/shop-featured/am/am2.jpg",
			photo3: "/public/cars/shop-featured/am/am3.jpeg",
		},
		model: "aston martin db11",
		info: "a high-performance grand tourer available as a V8 or V12 coupe and convertible (Volante)",
		price: "150K",
	},
];
