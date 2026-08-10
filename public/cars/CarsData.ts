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
		info: "a high-performance grand tourer available as a V8 or V12 coupe and Performance (Volante)",
		price: "150K",
	},
];

// i want to handle car purchase quantity, we re gonna add availability prop to each car in carsdata its gonna be a number betwen 1 and 5, then the user can't purchase a car more than its availability number if he exceeds the number we wanna display a message like this quantity its not available on this car, then store the quantity chosen to the purchase informations
export const carsData: Cars[] = [
	{
		id: 1,
		brand: "Porsche",
		badge: "Popular",
		model: "911 Turbo S",
		specs: "3.8L Twin-Turbo Flat-6, 640 HP",
		bodySilhouette: "Coupe",
		price: 120000,
		availability: 3,
		image: "/cars/shop-featured/911/p1.jpg",
		carAlbum: {
			photo1: "/cars/shop-featured/911/p1.jpg",
			photo2: "/cars/shop-featured/911/p2.jpg",
			photo3: "/cars/shop-featured/911/p3.jpg",
		},
		features: [
			{
				icon: "ArrowDown",
				title: "Active Aerodynamics",
				description:
					"Engineered for maximum downforce and stability at high speeds, utilizing advanced airflow management.",
			},
			{
				icon: "Settings2",
				title: "Precision Engineering",
				description:
					"Every component is tuned for the ultimate driving experience, from the suspension to the drivetrain.",
			},
			{
				icon: "BarChart3",
				title: "Performance Tracking",
				description:
					"Integrated telemetry systems to monitor and improve your lap times and vehicle health in real-time.",
			},
		],
		colors: [
			{
				id: "lightgreen",
				hex: "#90EE90",
			},
			{
				id: "grey",
				hex: "#D3D3D3",
			},
		],
	},
	{
		id: 2,
		brand: "Ferrari",
		badge: "Top Speed",
		model: "F8 Tributo",
		specs: "3.9L V8 Twin-Turbo, 710 HP",
		bodySilhouette: "Coupe",
		price: 280000,
		availability: 2,
		image: "/cars/ferrari/f8-1.jpg",
		carAlbum: {
			photo1: "/cars/ferrari/f8-1.jpg",
			photo2: "/cars/ferrari/f8-2.jpg",
			photo3: "/cars/ferrari/f8-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "S-Duct Technology",
				description:
					"Derived from Formula 1, the S-Duct increases downforce by 15% compared to its predecessor.",
			},
			{
				icon: "Cpu",
				title: "Side Slip Control",
				description:
					"State-of-the-art SSC 6.1 electronics for ultimate control during aggressive cornering.",
			},
			{
				icon: "Wind",
				title: "V8 Masterpiece",
				description:
					"The most powerful V8 in Ferrari history, delivering instantaneous power without turbo lag.",
			},
		],
		colors: [
			{ id: "red", hex: "#FF0000" },
			{ id: "yellow", hex: "#FFD700" },
			{ id: "black", hex: "#000000" },
		],
	},
	{
		id: 3,
		brand: "Mercedes",
		badge: "Eco-Friendly",
		model: "EQS 580",
		specs: "Dual Electric Motors, 516 HP",
		bodySilhouette: "Electric",
		price: 95000,
		availability: 4,
		image: "/cars/shop-featured/am/am1.jpeg",
		carAlbum: {
			photo1: "/cars/mercedes/eqs-1.avif",
			photo2: "/cars/mercedes/eqs-2.avif",
			photo3: "/cars/mercedes/eqs-3.jpg",
		},
		features: [
			{
				icon: "Maximize",
				title: "Hyperscreen",
				description:
					"A 56-inch curved glass surface that seamlessly integrates three individual displays.",
			},
			{
				icon: "ShieldCheck",
				title: "Drive Pilot",
				description:
					"Advanced Level 3 autonomous driving capabilities for stress-free long-distance travel.",
			},
			{
				icon: "Zap",
				title: "Ultra Fast Charging",
				description:
					"Gain up to 300km of range in just 15 minutes with high-power DC charging stations.",
			},
		],
		colors: [
			{ id: "silver", hex: "#C0C0C0" },
			{ id: "blue", hex: "#000080" },
			{ id: "white", hex: "#FFFFFF" },
		],
	},
	{
		id: 4,
		brand: "Audi",
		badge: "Spacious",
		model: "Q8",
		specs: "3.0L V6 Turbo, 335 HP",
		bodySilhouette: "SUV",
		price: 80000,
		availability: 5,
		image: "/cars/shop-featured/911/p3.jpg",
		carAlbum: {
			photo1: "/cars/audi/q8-1.webp",
			photo2: "/cars/audi/q8-2.webp",
			photo3: "/cars/audi/q8-3.webp",
		},
		features: [
			{
				icon: "Settings2",
				title: "Quattro AWD",
				description:
					"Legendary all-wheel drive system for superior traction in all weather conditions.",
			},
			{
				icon: "Maximize",
				title: "Virtual Cockpit",
				description:
					"Fully digital instrument cluster with customizable high-resolution map views.",
			},
			{
				icon: "ShieldCheck",
				title: "Matrix LED",
				description:
					"Intelligent lighting system that adjusts to traffic without blinding other drivers.",
			},
		],
		colors: [
			{ id: "grey", hex: "#808080" },
			{ id: "blue", hex: "#4169E1" },
			{ id: "black", hex: "#1A1A1A" },
		],
	},
	{
		id: 5,
		brand: "BMW",
		badge: "New Arrival",
		model: "i4 M50",
		specs: "Dual Electric Motors, 536 HP",
		bodySilhouette: "Electric",
		price: 70000,
		availability: 4,
		image: "/cars/bmw/m5-1.jpg",
		carAlbum: {
			photo1: "/cars/bmw/m5-1.jpg",
			photo2: "/cars/bmw/m5-2.jpg",
			photo3: "/cars/bmw/m5-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "M Performance",
				description:
					"The first purely electric performance car from BMW M with dual-motor all-wheel drive.",
			},
			{
				icon: "BarChart3",
				title: "Adaptive M Suspension",
				description:
					"Electronically controlled dampers that adapt to road conditions and driving style.",
			},
			{
				icon: "Cpu",
				title: "iDrive 8.5",
				description:
					"Intuitive curved display with advanced voice control and connected digital services.",
			},
		],
		colors: [
			{ id: "frozen-blue", hex: "#A2C4C9" },
			{ id: "portimao-blue", hex: "#1E3A8A" },
			{ id: "black-sapphire", hex: "#0B0B0B" },
		],
	},
	{
		id: 6,
		brand: "Bentley",
		badge: "Luxury",
		model: "Flying Spur Hybrid",
		specs: "2.9L V6 + Electric Motor, 536 HP",
		bodySilhouette: "Electric",
		price: 220000,
		availability: 1,
		image: "/cars/bentley/flyingspur-1.jpg",
		carAlbum: {
			photo1: "/cars/bentley/flyingspur-1.jpg",
			photo2: "/cars/bentley/flyingspur-2.jpg",
			photo3: "/cars/bentley/flyingspur-3.jpg",
		},
		features: [
			{
				icon: "User",
				title: "Handcrafted Luxury",
				description:
					"Unrivalled craftsmanship with ethically sourced wood veneers and premium leathers.",
			},
			{
				icon: "CircleOff",
				title: "Silent Progress",
				description:
					"EV mode allows for silent, emission-free city driving with a range of over 40km.",
			},
			{
				icon: "Settings2",
				title: "Dynamic Ride",
				description:
					"World's first 48V electric active anti-roll system for ultimate comfort and control.",
			},
		],
		colors: [
			{ id: "emerald", hex: "#50C878" },
			{ id: "beluga", hex: "#000000" },
			{ id: "white-sand", hex: "#F5F5DC" },
		],
	},
	{
		id: 7,
		brand: "Aston Martin",
		badge: "Elegant",
		model: "DB11",
		specs: "4.0L V8 Twin-Turbo, 503 HP",
		bodySilhouette: "Coupe",
		price: 180000,
		availability: 2,
		image: "/cars/astonmartin/db11-1.jpg",
		carAlbum: {
			photo1: "/cars/astonmartin/db11-1.jpg",
			photo2: "/cars/astonmartin/db11-2.jpg",
			photo3: "/cars/astonmartin/db11-3.jpg",
		},
		features: [
			{
				icon: "ArrowDown",
				title: "Aeroblade",
				description:
					"Innovative hidden air ducts that channel airflow through the bodywork to reduce lift.",
			},
			{
				icon: "Wind",
				title: "V8 Character",
				description:
					"A characterful 4.0-liter twin-turbo V8 engine with a distinctive British soundtrack.",
			},
			{
				icon: "Settings2",
				title: "Grand Touring",
				description:
					"The ultimate grand tourer, balancing long-distance comfort with agile handling.",
			},
		],
		colors: [
			{ id: "magnetic-silver", hex: "#4C5153" },
			{ id: "morning-frost", hex: "#F0F0F0" },
			{ id: "arden-green", hex: "#2E473B" },
		],
	},
	{
		id: 8,
		brand: "Lamborghini",
		badge: "Iconic",
		model: "Huracan Evo",
		specs: "5.2L V10, 631 HP",
		bodySilhouette: "Coupe",
		price: 300000,
		availability: 1,
		image: "/cars/lamborghini/huracan-1.jpg",
		carAlbum: {
			photo1: "/cars/lamborghini/huracan-1.jpg",
			photo2: "/cars/lamborghini/huracan-2.jpg",
			photo3: "/cars/lamborghini/huracan-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "LDVI System",
				description:
					"Lamborghini Dinamica Veicolo Integrata - a super-brain that anticipates driver needs.",
			},
			{
				icon: "ArrowDown",
				title: "Aerodinamica ALA",
				description:
					"Active aerodynamic system that varies between high downforce and low drag modes.",
			},
			{
				icon: "Wind",
				title: "V10 Symphony",
				description:
					"Naturally aspirated V10 engine that delivers a raw and visceral driving experience.",
			},
		],
		colors: [
			{ id: "verde-mantis", hex: "#2E8B57" },
			{ id: "arancio-borealis", hex: "#FF8C00" },
			{ id: "giallo-belenus", hex: "#FFFF00" },
		],
	},
	{
		id: 9,
		brand: "Porsche",
		badge: "Family Sport",
		model: "Cayenne Turbo",
		specs: "4.0L V8 Twin-Turbo, 541 HP",
		bodySilhouette: "SUV",
		price: 90000,
		availability: 3,
		image: "/cars/porsche/cayenne-1.jpg",
		carAlbum: {
			photo1: "/cars/porsche/cayenne-1.jpg",
			photo2: "/cars/porsche/cayenne-2.jpg",
			photo3: "/cars/porsche/cayenne-3.jpg",
		},
		features: [
			{
				icon: "Settings2",
				title: "Adaptive Air Suspension",
				description: "Provides a range of height settings and damping for superior comfort and performance.",
			},
			{
				icon: "Cpu",
				title: "4D Chassis Control",
				description: "Centrally analyzes the driving situation in all three dimensions to synchronize chassis systems.",
			},
			{
				icon: "ShieldCheck",
				title: "Surface Coated Brake",
				description: "Tungsten carbide coating for better response and significantly reduced brake dust.",
			},
		],
		colors: [
			{ id: "white", hex: "#FFFFFF" },
			{ id: "carrara-white", hex: "#F0F0F0" },
			{ id: "jet-black", hex: "#050505" },
		],
	},
	{
		id: 10,
		brand: "Ferrari",
		badge: "Classic",
		model: "Roma",
		specs: "3.9L V8 Twin-Turbo, 612 HP",
		bodySilhouette: "Performance",
		price: 350000,
		availability: 2,
		image: "/cars/ferrari/roma-1.jpg",
		carAlbum: {
			photo1: "/cars/ferrari/roma-1.jpg",
			photo2: "/cars/ferrari/roma-2.jpg",
			photo3: "/cars/ferrari/roma-3.jpg",
		},
		features: [
			{
				icon: "User",
				title: "La Nuova Dolce Vita",
				description: "A contemporary representation of the carefree, pleasurable way of life that characterized Rome in the 1950s.",
			},
			{
				icon: "Zap",
				title: "8-Speed Dual-Clutch",
				description: "Derived from the SF90 Stradale, it is more compact and 6kg lighter than its 7-speed predecessor.",
			},
			{
				icon: "Cpu",
				title: "Side Slip Control 6.0",
				description: "Integrates the E-Diff, F1-Trac, SCM-E Frs and Ferrari Dynamic Enhancer for unparalleled control.",
			},
		],
		colors: [
			{ id: "rosso-corsa", hex: "#D40000" },
			{ id: "grigio-silverstone", hex: "#7E7E7E" },
			{ id: "nero", hex: "#000000" },
		],
	},
	{
		id: 11,
		brand: "Mercedes",
		badge: "Track Ready",
		model: "AMG GT",
		specs: "4.0L V8 Twin-Turbo, 523 HP",
		bodySilhouette: "Coupe",
		price: 140000,
		availability: 3,
		image: "/cars/mercedes/amg-gt-1.jpg",
		carAlbum: {
			photo1: "/cars/mercedes/amg-gt-1.avif",
			photo2: "/cars/mercedes/amg-gt-2.avif",
			photo3: "/cars/mercedes/amg-gt-3.avif",
		},
		features: [
			{
				icon: "Cpu",
				title: "Hand-Built V8",
				description: "Each AMG V8 engine is hand-assembled by a single master technician according to the 'one man, one engine' philosophy.",
			},
			{
				icon: "Settings2",
				title: "AMG RIDE CONTROL",
				description: "Electronically controlled damping system that automatically adapts the damping at each wheel to the current situation.",
			},
			{
				icon: "Wind",
				title: "Performance Exhaust",
				description: "Adjustable exhaust flaps allow you to change the sound of the vehicle at the press of a button.",
			},
		],
		colors: [
			{ id: "solarbeam-yellow", hex: "#FFD700" },
			{ id: "selenite-grey", hex: "#5A5A5A" },
			{ id: "obsidian-black", hex: "#0A0A0A" },
		],
	},
	{
		id: 12,
		brand: "Audi",
		badge: "Next Gen",
		model: "e-tron GT",
		specs: "Dual Electric Motors, 469 HP",
		bodySilhouette: "Electric",
		price: 85000,
		availability: 4,
		image: "/cars/audi/rs7-1.jpg",
		carAlbum: {
			photo1: "/cars/audi/etron-1.webp",
			photo2: "/cars/audi/etron-2.webp",
			photo3: "/cars/audi/etron-3.webp",
		},
		features: [
			{
				icon: "Zap",
				title: "Electric Quattro",
				description: "Fully variable torque distribution between the front and rear axles for maximum traction and agility.",
			},
			{
				icon: "Wind",
				title: "e-tron Sport Sound",
				description: "An innovative sound design that expresses the power and dynamics of the electric drive system.",
			},
			{
				icon: "Cpu",
				title: "800V Architecture",
				description: "Enables extremely short charging times with a peak charging capacity of up to 270 kW.",
			},
		],
		colors: [
			{ id: "kemora-gray", hex: "#718187" },
			{ id: "mythos-black", hex: "#0E0E0E" },
			{ id: "suzuka-gray", hex: "#E2E2E2" },
		],
	},
	{
		id: 13,
		brand: "BMW",
		badge: "Agile",
		model: "M4 Competition",
		specs: "3.0L Inline-6 Twin-Turbo, 503 HP",
		bodySilhouette: "Coupe",
		price: 110000,
		availability: 3,
		image: "/cars/bmw/m4-1.jpg",
		carAlbum: {
			photo1: "/cars/bmw/m4-1.jpg",
			photo2: "/cars/bmw/m4-2.jpg",
			photo3: "/cars/bmw/m4-3.jpg",
		},
		features: [
			{
				icon: "Settings2",
				title: "M xDrive",
				description: "Rear-wheel-biased all-wheel drive system that provides maximum traction and handling dynamics.",
			},
			{
				icon: "Maximize",
				title: "Carbon Fiber Roof",
				description: "Reduces the vehicle's weight and lowers the center of gravity for improved agility.",
			},
			{
				icon: "BarChart3",
				title: "M Drift Analyser",
				description: "Records and evaluates your drifting performance, providing detailed statistics and feedback.",
			},
		],
		colors: [
			{ id: "isle-of-man-green", hex: "#004B49" },
			{ id: "sao-paulo-yellow", hex: "#D7E100" },
			{ id: "brooklyn-grey", hex: "#A5AAB0" },
		],
	},
	{
		id: 14,
		brand: "Bentley",
		badge: "Refined",
		model: "Continental GT",
		specs: "6.0L W12 Twin-Turbo, 626 HP",
		bodySilhouette: "Coupe",
		price: 250000,
		availability: 1,
		image: "/cars/bentley/continental-1.jpg",
		carAlbum: {
			photo1: "/cars/bentley/continental-1.webp",
			photo2: "/cars/bentley/continental-2.webp",
			photo3: "/cars/bentley/continental-3.webp",
		},
		features: [
			{
				icon: "User",
				title: "Mulliner Craftsmanship",
				description: "The pinnacle of luxury tailoring, allowing for near-infinite customization of materials and finishes.",
			},
			{
				icon: "Cpu",
				title: "W12 Powerhouse",
				description: "The most advanced 12-cylinder engine in the world, delivering effortless power and refinement.",
			},
			{
				icon: "Maximize",
				title: "Rotating Display",
				description: "A three-sided unit that allows you to choose between the touchscreen, three analog dials, or a clean veneer.",
			},
		],
		colors: [
			{ id: "british-racing-green", hex: "#004225" },
			{ id: "onyx", hex: "#0F0F0F" },
			{ id: "glacier-white", hex: "#F8F8F8" },
		],
	},
	{
		id: 15,
		brand: "Aston Martin",
		badge: "Powerful SUV",
		model: "DBX707",
		specs: "4.0L V8 Twin-Turbo, 697 HP",
		bodySilhouette: "SUV",
		price: 160000,
		availability: 2,
		image: "/cars/astonmartin/dbx-1.jpg",
		carAlbum: {
			photo1: "/cars/astonmartin/dbx-1.webp",
			photo2: "/cars/astonmartin/dbx-2.webp",
			photo3: "/cars/astonmartin/dbx-3.webp",
		},
		features: [
			{
				icon: "Zap",
				title: "Unmatched Power",
				description: "The 707PS V8 engine makes it the most powerful luxury SUV in the world.",
			},
			{
				icon: "ShieldCheck",
				title: "Carbon Ceramic Brakes",
				description: "High-performance braking system providing exceptional stopping power and reduced unsprung weight.",
			},
			{
				icon: "Settings2",
				title: "Electronic Rear Diff",
				description: "Actively manages torque distribution to maximize traction and cornering performance.",
			},
		],
		colors: [
			{ id: "podium-green", hex: "#004B49" },
			{ id: "apex-grey", hex: "#4E5452" },
			{ id: "lunar-white", hex: "#EAEAEA" },
		],
	},
	{
		id: 16,
		brand: "Lamborghini",
		badge: "Super SUV",
		model: "Urus Performante",
		specs: "4.0L V8 Twin-Turbo, 657 HP",
		bodySilhouette: "SUV",
		price: 230000,
		availability: 2,
		image: "/cars/lamborghini/urus-1.jpg",
		carAlbum: {
			photo1: "/cars/lamborghini/urus-1.png",
			photo2: "/cars/lamborghini/urus-2.png",
			photo3: "/cars/lamborghini/urus-3.png",
		},
		features: [
			{
				icon: "Settings2",
				title: "Rally Mode",
				description: "Optimized for dirt and loose surfaces, enhancing the Urus's versatility and performance.",
			},
			{
				icon: "Maximize",
				title: "Carbon Components",
				description: "Extensive use of lightweight carbon fiber to improve the power-to-weight ratio.",
			},
			{
				icon: "Wind",
				title: "Akrapovic Exhaust",
				description: "Titanium exhaust system that enhances the V8's roar while reducing overall weight.",
			},
		],
		colors: [
			{ id: "giallo-auge", hex: "#FFD700" },
			{ id: "verde-mantis", hex: "#00FF41" },
			{ id: "grigio-telesto", hex: "#707070" },
		],
	},
	{
		id: 17,
		brand: "Porsche",
		badge: "Electric Beast",
		model: "Taycan Turbo S",
		specs: "Dual Electric Motors, 750 HP",
		bodySilhouette: "Electric",
		price: 100000,
		availability: 3,
		image: "/cars/porsche/taycan-1.jpg",
		carAlbum: {
			photo1: "/cars/porsche/taycan-1.jpg",
			photo2: "/cars/porsche/taycan-2.jpg",
			photo3: "/cars/porsche/taycan-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "Overboost Power",
				description: "Temporarily increases power output for explosive acceleration from a standstill.",
			},
			{
				icon: "Settings2",
				title: "Two-Speed Transmission",
				description: "Unique electric drivetrain component that maximizes both acceleration and top speed.",
			},
			{
				icon: "BarChart3",
				title: "Recuperation System",
				description: "Highly efficient energy recovery system that recaptures energy during braking.",
			},
		],
		colors: [
			{ id: "gentian-blue", hex: "#003087" },
			{ id: "frozen-berry", hex: "#C08081" },
			{ id: "chalk", hex: "#D1D1D1" },
		],
	},
	{
		id: 18,
		brand: "Ferrari",
		badge: "Hybrid King",
		model: "SF90 Stradale",
		specs: "4.0L V8 + 3 Electric Motors, 986 HP",
		bodySilhouette: "Coupe",
		price: 320000,
		availability: 1,
		image: "/cars/ferrari/sf90-1.jpg",
		carAlbum: {
			photo1: "/cars/ferrari/sf90-1.jpg",
			photo2: "/cars/ferrari/sf90-2.jpg",
			photo3: "/cars/ferrari/sf90-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "PHEV Powertrain",
				description: "Combines a V8 turbo with three electric motors for a total output of nearly 1,000 HP.",
			},
			{
				icon: "Settings2",
				title: "Assetto Fiorano",
				description: "A specific racing-oriented version for enhanced track performance and weight reduction.",
			},
			{
				icon: "Cpu",
				title: "Digital Cockpit",
				description: "A fully digital 16-inch curved instrument cluster with customizable displays.",
			},
		],
		colors: [
			{ id: "rosso-scuderia", hex: "#FF2800" },
			{ id: "giallo-modena", hex: "#FFE302" },
			{ id: "blu-tour-de-france", hex: "#005BA6" },
		],
	},
	{
		id: 19,
		brand: "Mercedes",
		badge: "Premium",
		model: "GLE 53 AMG",
		specs: "3.0L Inline-6 Turbo, 429 HP",
		bodySilhouette: "SUV",
		price: 125000,
		availability: 4,
		image: "/cars/mercedes/gle-1.jpg",
		carAlbum: {
			photo1: "/cars/mercedes/gle-1.webp",
			photo2: "/cars/mercedes/gle-2.webp",
			photo3: "/cars/mercedes/gle-3.webp",
		},
		features: [
			{
				icon: "Zap",
				title: "EQ Boost",
				description: "An integrated starter-generator that provides an additional burst of power and efficiency.",
			},
			{
				icon: "Cpu",
				title: "MBUX Assistant",
				description: "Intuitive voice and gesture control system that learns from the driver's habits.",
			},
			{
				icon: "Settings2",
				title: "4MATIC+",
				description: "Fully variable all-wheel drive system for optimal traction in all conditions.",
			},
		],
		colors: [
			{ id: "emerald-green", hex: "#004B23" },
			{ id: "brilliant-blue", hex: "#004C91" },
			{ id: "polar-white", hex: "#FFFFFF" },
		],
	},
	{
		id: 20,
		brand: "Audi",
		badge: "Last of V10",
		model: "R8 V10 Performance",
		specs: "5.2L V10, 602 HP",
		bodySilhouette: "Coupe",
		price: 150000,
		availability: 2,
		image: "/cars/audi/r8-1.jpg",
		carAlbum: {
			photo1: "/cars/audi/r8-1.webp",
			photo2: "/cars/audi/r8-2.webp",
			photo3: "/cars/audi/r8-3.webp",
		},
		features: [
			{
				icon: "Wind",
				title: "Naturally Aspirated V10",
				description: "The heart of the R8, delivering an incomparable sound and linear power delivery.",
			},
			{
				icon: "Maximize",
				title: "Sigma Sideblades",
				description: "Iconic design elements made from carbon fiber that help funnel air into the engine.",
			},
			{
				icon: "User",
				title: "Racing Shell Seats",
				description: "Deeply bolstered seats that provide maximum support during high-lateral acceleration.",
			},
		],
		colors: [
			{ id: "vegas-yellow", hex: "#FDB813" },
			{ id: "tango-red", hex: "#E3001B" },
			{ id: "daytona-grey", hex: "#3B444B" },
		],
	},
	{
		id: 21,
		brand: "BMW",
		model: "X6 M",
		badge: "Sport Activity",
		specs: "4.4L V8 Twin-Turbo, 600 HP",
		bodySilhouette: "SUV",
		price: 90000,
		availability: 3,
		image: "/cars/bmw/x6-1.jpg",
		carAlbum: {
			photo1: "/cars/bmw/x6-1.jpg",
			photo2: "/cars/bmw/x6-2.jpg",
			photo3: "/cars/bmw/x6-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "M TwinPower Turbo",
				description: "High-revving V8 engine with two TwinScroll turbochargers for instant response.",
			},
			{
				icon: "Settings2",
				title: "Adaptive M Suspension",
				description: "Damping characteristics that can be adjusted from comfortable to extremely sporty.",
			},
			{
				icon: "Cpu",
				title: "M Setup",
				description: "Individual configuration of the powertrain and chassis according to personal preference.",
			},
		],
		colors: [
			{ id: "marina-bay-blue", hex: "#004C97" },
			{ id: "toronto-red", hex: "#C41230" },
			{ id: "carbon-black", hex: "#000A14" },
		],
	},
	{
		id: 22,
		brand: "Bentley",
		model: "Bentayga S",
		badge: "Luxury SUV",
		specs: "4.0L V8 Twin-Turbo, 542 HP",
		bodySilhouette: "SUV",
		price: 210000,
		availability: 1,
		image: "/cars/bentley/bentayga-1.jpg",
		carAlbum: {
			photo1: "/cars/bentley/bentayga-1.jpg",
			photo2: "/cars/bentley/bentayga-2.jpg",
			photo3: "/cars/bentley/bentayga-3.jpg",
		},
		features: [
			{
				icon: "User",
				title: "Bentley Dynamic Ride",
				description: "Electric active roll control system that minimizes body roll while cornering.",
			},
			{
				icon: "Maximize",
				title: "Enhanced Interior",
				description: "Hand-stitched leather and sustainable wood veneers for an unmatched cabin experience.",
			},
			{
				icon: "Wind",
				title: "Sports Exhaust",
				description: "A free-flowing exhaust system that delivers a more evocative V8 sound.",
			},
		],
		colors: [
			{ id: "dragon-red", hex: "#8B0000" },
			{ id: "st-james-red", hex: "#B22222" },
			{ id: "silver-frost", hex: "#D3D3D3" },
		],
	},
	{
		id: 23,
		brand: "Aston Martin",
		model: "Vantage",
		badge: "Pure Sport",
		specs: "4.0L V8 Twin-Turbo, 503 HP",
		bodySilhouette: "Coupe",
		price: 200000,
		availability: 2,
		image: "/cars/astonmartin/vantage-1.jpg",
		carAlbum: {
			photo1: "/cars/astonmartin/vantage-1.jpg",
			photo2: "/cars/astonmartin/vantage-2.jpg",
			photo3: "/cars/astonmartin/vantage-3.jpg",
		},
		features: [
			{
				icon: "Zap",
				title: "Raw Performance",
				description: "A predatory stance and agility that makes it a true hunter on the road.",
			},
			{
				icon: "Settings2",
				title: "Dynamic Torque Vectoring",
				description: "Actively controls torque at the rear wheels for sharpened cornering and stability.",
			},
			{
				icon: "Wind",
				title: "Aerodynamic Balance",
				description: "Calculated airflow manages heat and provides significant downforce without drag.",
			},
		],
		colors: [
			{ id: "hyper-red", hex: "#FF0000" },
			{ id: "lime-essence", hex: "#9EFD38" },
			{ id: "china-grey", hex: "#919191" },
		],
	},
	{
		id: 24,
		brand: "Lamborghini",
		model: "Aventador SVJ",
		badge: "Ultimate V12",
		specs: "6.5L V12, 770 HP",
		bodySilhouette: "Performance",
		price: 340000,
		availability: 1,
		image: "/cars/lamborghini/aventador-1.webp",
		carAlbum: {
			photo1: "/cars/lamborghini/aventador-1.webp",
			photo2: "/cars/lamborghini/aventador-2.webp",
			photo3: "/cars/lamborghini/aventador-3.webp",
		},
		features: [
			{
				icon: "ArrowDown",
				title: "ALA 2.0",
				description: "Aerodinamica Lamborghini Attiva - active aerodynamics for maximum performance.",
			},
			{
				icon: "Zap",
				title: "V12 Mastery",
				description: "The most powerful naturally aspirated V12 in Lamborghini history.",
			},
			{
				icon: "Cpu",
				title: "LMS Suspension",
				description: "Magneto-rheological suspension system for lightning-fast response to road conditions.",
			},
		],
		colors: [
			{ id: "san-remo-green", hex: "#004B23" },
			{ id: "arancio-atlas", hex: "#FF8C00" },
			{ id: "bianco-isis", hex: "#FFFFFF" },
		],
	},
	
];
