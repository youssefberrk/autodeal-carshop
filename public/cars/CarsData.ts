import { featuredCars } from "@/types/CarsTypes";
import { Cars } from "@/types/Cars";


export const featCars: featuredCars[] = [
	{
		id: 1,
		album: {
			photo1: "/cars/shop-featured/lambo/lambo1.jpeg",
			photo2: "/cars/shop-featured/lambo/lambo2.jpeg",
			photo3: "/cars/shop-featured/lambo/lambo3.jpeg",
		},
		model: "Lamborghini Revuelto",
		info: "a 1,001-horsepower HPEV (High Performance Electrified Vehicle) plug-in hybrid, serving as the V12 flagship successor to the Aventador.",
		price: "Price On Request",
	},
	{
		id: 2,
		album: {
			photo1: "/cars/shop-featured/911/p1.jpg",
			photo2: "/cars/shop-featured/911/p2.jpg",
			photo3: "/cars/shop-featured/911/p3.jpg",
		},
		model: "Porsche 911 Carrera GTS ",
		info: "a revolutionary 'T-Hybrid' system, combining a new 3.6L flat-six engine with electric turbocharging to produce 532 hp and 449 lb-ft of torque",
		price: "315K",
	},
	{
		id: 3,
		album: {
			photo1: "/cars/shop-featured/am/am1.jpeg",
			photo2: "/cars/shop-featured/am/am2.jpg",
			photo3: "/cars/shop-featured/am/am3.jpeg",
		},
		model: "aston martin db11",
		info: "a high-performance grand tourer available as a V8 or V12 coupe and convertible (Volante)",
		price: "150K",
	},
];


export const carsData: Cars[] = [
  {
    id: 1,
    brand: "Porsche",
    bodySilhouette: "Coupe",
    price: 120000,
    carAlbum: {
			photo1: "/cars/shop-featured/911/p1.jpg",
			photo2: "/cars/shop-featured/911/p2.jpg",
			photo3: "/cars/shop-featured/911/p3.jpg",
		},
  },
  {
    id: 2,
    brand: "Ferrari",
    bodySilhouette: "Coupe",
    price: 280000,
    carAlbum: {
      photo1: "/cars/ferrari/f8-1.jpg",
      photo2: "/cars/ferrari/f8-2.jpg",
      photo3: "/cars/ferrari/f8-3.jpg",
    },
  },
  {
    id: 3,
    brand: "Mercedes",
    bodySilhouette: "Sedan",
    price: 95000,
    carAlbum: {
      photo1: "/cars/mercedes/sclass-1.jpg",
      photo2: "/cars/mercedes/sclass-2.jpg",
      photo3: "/cars/mercedes/sclass-3.jpg",
    },
  },
  {
    id: 4,
    brand: "Audi",
    bodySilhouette: "SUV",
    price: 80000,
    carAlbum: {
      photo1: "/cars/audi/q8-1.jpg",
      photo2: "/cars/audi/q8-2.jpg",
      photo3: "/cars/audi/q8-3.jpg",
    },
  },
  {
    id: 5,
    brand: "BMW",
    bodySilhouette: "Sedan",
    price: 70000,
    carAlbum: {
      photo1: "/cars/bmw/m5-1.jpg",
      photo2: "/cars/bmw/m5-2.jpg",
      photo3: "/cars/bmw/m5-3.jpg",
    },
  },
  {
    id: 6,
    brand: "Bentley",
    bodySilhouette: "Sedan",
    price: 220000,
    carAlbum: {
      photo1: "/cars/bentley/flyingspur-1.jpg",
      photo2: "/cars/bentley/flyingspur-2.jpg",
      photo3: "/cars/bentley/flyingspur-3.jpg",
    },
  },
  {
    id: 7,
    brand: "Aston Martin",
    bodySilhouette: "Coupe",
    price: 180000,
    carAlbum: {
      photo1: "/cars/astonmartin/db11-1.jpg",
      photo2: "/cars/astonmartin/db11-2.jpg",
      photo3: "/cars/astonmartin/db11-3.jpg",
    },
  },
  {
    id: 8,
    brand: "Lamborghini",
    bodySilhouette: "Coupe",
    price: 300000,
    carAlbum: {
      photo1: "/cars/lamborghini/huracan-1.jpg",
      photo2: "/cars/lamborghini/huracan-2.jpg",
      photo3: "/cars/lamborghini/huracan-3.jpg",
    },
  },
  {
    id: 9,
    brand: "Porsche",
    bodySilhouette: "SUV",
    price: 90000,
    carAlbum: {
      photo1: "/cars/porsche/cayenne-1.jpg",
      photo2: "/cars/porsche/cayenne-2.jpg",
      photo3: "/cars/porsche/cayenne-3.jpg",
    },
  },
  {
    id: 10,
    brand: "Ferrari",
    bodySilhouette: "Convertible",
    price: 350000,
    carAlbum: {
      photo1: "/cars/ferrari/roma-1.jpg",
      photo2: "/cars/ferrari/roma-2.jpg",
      photo3: "/cars/ferrari/roma-3.jpg",
    },
  },
  {
    id: 11,
    brand: "Mercedes",
    bodySilhouette: "Coupe",
    price: 140000,
    carAlbum: {
      photo1: "/cars/mercedes/amg-gt-1.jpg",
      photo2: "/cars/mercedes/amg-gt-2.jpg",
      photo3: "/cars/mercedes/amg-gt-3.jpg",
    },
  },
  {
    id: 12,
    brand: "Audi",
    bodySilhouette: "Sedan",
    price: 85000,
    carAlbum: {
      photo1: "/cars/audi/rs7-1.jpg",
      photo2: "/cars/audi/rs7-2.jpg",
      photo3: "/cars/audi/rs7-3.jpg",
    },
  },
  {
    id: 13,
    brand: "BMW",
    bodySilhouette: "Coupe",
    price: 110000,
    carAlbum: {
      photo1: "/cars/bmw/m4-1.jpg",
      photo2: "/cars/bmw/m4-2.jpg",
      photo3: "/cars/bmw/m4-3.jpg",
    },
  },
  {
    id: 14,
    brand: "Bentley",
    bodySilhouette: "Coupe",
    price: 250000,
    carAlbum: {
      photo1: "/cars/bentley/continental-1.jpg",
      photo2: "/cars/bentley/continental-2.jpg",
      photo3: "/cars/bentley/continental-3.jpg",
    },
  },
  {
    id: 15,
    brand: "Aston Martin",
    bodySilhouette: "SUV",
    price: 160000,
    carAlbum: {
      photo1: "/cars/astonmartin/dbx-1.jpg",
      photo2: "/cars/astonmartin/dbx-2.jpg",
      photo3: "/cars/astonmartin/dbx-3.jpg",
    },
  },
  {
    id: 16,
    brand: "Lamborghini",
    bodySilhouette: "SUV",
    price: 230000,
    carAlbum: {
      photo1: "/cars/lamborghini/urus-1.jpg",
      photo2: "/cars/lamborghini/urus-2.jpg",
      photo3: "/cars/lamborghini/urus-3.jpg",
    },
  },
  {
    id: 17,
    brand: "Porsche",
    bodySilhouette: "Sedan",
    price: 100000,
    carAlbum: {
      photo1: "/cars/porsche/taycan-1.jpg",
      photo2: "/cars/porsche/taycan-2.jpg",
      photo3: "/cars/porsche/taycan-3.jpg",
    },
  },
  {
    id: 18,
    brand: "Ferrari",
    bodySilhouette: "Coupe",
    price: 320000,
    carAlbum: {
      photo1: "/cars/ferrari/sf90-1.jpg",
      photo2: "/cars/ferrari/sf90-2.jpg",
      photo3: "/cars/ferrari/sf90-3.jpg",
    },
  },
  {
    id: 19,
    brand: "Mercedes",
    bodySilhouette: "SUV",
    price: 125000,
    carAlbum: {
      photo1: "/cars/mercedes/gle-1.jpg",
      photo2: "/cars/mercedes/gle-2.jpg",
      photo3: "/cars/mercedes/gle-3.jpg",
    },
  },
  {
    id: 20,
    brand: "Audi",
    bodySilhouette: "Coupe",
    price: 150000,
    carAlbum: {
      photo1: "/cars/audi/r8-1.jpg",
      photo2: "/cars/audi/r8-2.jpg",
      photo3: "/cars/audi/r8-3.jpg",
    },
  },
  {
    id: 21,
    brand: "BMW",
    bodySilhouette: "SUV",
    price: 90000,
    carAlbum: {
      photo1: "/cars/bmw/x6-1.jpg",
      photo2: "/cars/bmw/x6-2.jpg",
      photo3: "/cars/bmw/x6-3.jpg",
    },
  },
  {
    id: 22,
    brand: "Bentley",
    bodySilhouette: "SUV",
    price: 210000,
    carAlbum: {
      photo1: "/cars/bentley/bentayga-1.jpg",
      photo2: "/cars/bentley/bentayga-2.jpg",
      photo3: "/cars/bentley/bentayga-3.jpg",
    },
  },
  {
    id: 23,
    brand: "Aston Martin",
    bodySilhouette: "Coupe",
    price: 200000,
    carAlbum: {
      photo1: "/cars/astonmartin/vantage-1.jpg",
      photo2: "/cars/astonmartin/vantage-2.jpg",
      photo3: "/cars/astonmartin/vantage-3.jpg",
    },
  },
  {
    id: 24,
    brand: "Lamborghini",
    bodySilhouette: "Convertible",
    price: 340000,
    carAlbum: {
      photo1: "/cars/lamborghini/aventador-1.jpg",
      photo2: "/cars/lamborghini/aventador-2.jpg",
      photo3: "/cars/lamborghini/aventador-3.jpg",
    },
  },
  {
    id: 25,
    brand: "BMW",
    bodySilhouette: "Sedan",
    price: 60000,
    carAlbum: {
      photo1: "/cars/bmw/series3-1.jpg",
      photo2: "/cars/bmw/series3-2.jpg",
      photo3: "/cars/bmw/series3-3.jpg",
    },
  },
];