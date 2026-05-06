"use client";

import { useState } from "react";
import {
	ChevronRight,
	Minus,
	Plus,
	Zap,
	Gauge,
	User,
	ArrowDown,
	Settings2,
	BarChart3,
	Heart,
	Cpu,
	Wind,
	Maximize,
	ShieldCheck,
	LucideIcon,
	CircleOff,
} from "lucide-react";
import { Cars } from "@/types/Cars";
import Image from "next/image";
import Link from "next/link";

interface CarDetailsClientProps {
	car: Cars;
}

const iconMap: Record<string, LucideIcon> = {
	ArrowDown,
	Settings2,
	BarChart3,
	Zap,
	Cpu,
	Wind,
	Maximize,
	ShieldCheck,
	User,
	CircleOff,
	Gauge,
};

const CarDetailsClient = ({ car }: CarDetailsClientProps) => {
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(
		car.colors?.[0]?.id || "blue",
	);
	const [activeImage, setActiveImage] = useState(0);

	const colors = car.colors || [
		{ id: "blue", hex: "#3b82f6" },
		{ id: "white", hex: "#ffffff" },
		{ id: "charcoal", hex: "#262626" },
		{ id: "red", hex: "#ef4444" },
	];

	const thumbnails = car.carAlbum
		? [car.carAlbum.photo1, car.carAlbum.photo2, car.carAlbum.photo3].filter(
				Boolean,
			)
		: [car.image].filter(Boolean);

	// Basic parsing of specs if it's a string, otherwise fallback to defaults
	const specs = [
		{ icon: Zap, label: "Performance", value: car.specs || "High Performance" },
		{ icon: Gauge, label: "Type", value: car.bodySilhouette },
		{ icon: Settings2, label: "Brand", value: car.brand },
		{ icon: User, label: "Model", value: car.model || "GT Edition" },
	];

	const features = car.features || [
		{
			icon: ArrowDown,
			title: "Active Aerodynamics",
			description:
				"Engineered for maximum downforce and stability at high speeds, utilizing advanced airflow management.",
		},
		{
			icon: Settings2,
			title: "Precision Engineering",
			description:
				"Every component is tuned for the ultimate driving experience, from the suspension to the drivetrain.",
		},
		{
			icon: BarChart3,
			title: "Performance Tracking",
			description:
				"Integrated telemetry systems to monitor and improve your lap times and vehicle health in real-time.",
		},
	];

	return (
		<div className="min-h-screen bg-[#0c160e] text-[#dae6d8] font-['Manrope'] pb-20">
			{/* Navigation Breadcrumb */}
			<nav className="px-8 py-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#dae6d8]/40">
				<Link href="/" className="hover:text-[#00ff87] transition-colors">
					Home
				</Link>
				<ChevronRight size={10} />
				<Link href="/shop" className="hover:text-[#00ff87] transition-colors">
					Shop
				</Link>
				<ChevronRight size={10} />
				<span className="text-[#dae6d8]">
					{car.brand} {car.model}
				</span>
			</nav>

			{/* Main Hero Section */}
			<section className="px-8 mb-24">
				<h1 className="text-6xl md:text-8xl font-['Newsreader'] italic font-bold mb-16 tracking-tighter">
					{car.brand} <span className="block md:inline">{car.model}</span>
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Gallery Column */}
					<div className="lg:col-span-7">
						<div className="aspect-[16/10] bg-[#141e16] mb-6 overflow-hidden relative group">
							<Image
								src={
									thumbnails[activeImage] ||
									car.image ||
									"/api/placeholder/1200/750"
								}
								alt={`${car.brand} ${car.model}`}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
						</div>
						<div className="grid grid-cols-4 gap-4">
							{thumbnails.map((thumb, idx) => (
								<button
									key={idx}
									onClick={() => setActiveImage(idx)}
									className={`aspect-video bg-[#141e16] border relative overflow-hidden transition-all duration-300 ${
										activeImage === idx
											? "border-[#00ff87]"
											: "border-transparent opacity-60 hover:opacity-100"
									}`}>
									<Image
										src={thumb}
										alt={`View ${idx + 1}`}
										fill
										className="object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Configuration Column */}
					<div className="lg:col-span-5 flex flex-col justify-center">
						<div className="max-w-md">
							<p className="font-['Newsreader'] italic text-3xl mb-2 text-[#dae6d8]">
								{car.bodySilhouette} excellence in its purest form.
							</p>
							<div className="mb-8">
								<span className="text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/40 block mb-1">
									Starting At
								</span>
								<span className="text-4xl font-bold font-['Manrope'] text-[#00ff87]">
									$
									{typeof car.price === "number"
										? car.price.toLocaleString()
										: car.price}
								</span>
							</div>

							<p className="text-sm text-[#dae6d8]/60 leading-relaxed mb-12">
								The {car.brand} {car.model} is a masterpiece of automotive
								engineering. Featuring a {car.specs}, it delivers an
								unparalleled driving experience that blurs the line between
								track performance and road-going luxury.
							</p>

							{/* Quantity and CTA */}
							<div className="flex gap-4 mb-12">
								<div className="flex items-center bg-[#141e16] border border-[#dae6d8]/10">
									<button
										onClick={() => setQuantity(Math.max(1, quantity - 1))}
										className="px-4 py-4 text-[#dae6d8]/40 hover:text-[#00ff87] transition-colors">
										<Minus size={16} />
									</button>
									<span className="px-4 py-4 text-sm font-bold min-w-[3rem] text-center">
										{quantity.toString().padStart(2, "0")}
									</span>
									<button
										onClick={() => setQuantity(quantity + 1)}
										className="px-4 py-4 text-[#dae6d8]/40 hover:text-[#00ff87] transition-colors">
										<Plus size={16} />
									</button>
								</div>
								<button className="flex-1 bg-[#00ff87] text-[#0c160e] text-[11px] uppercase tracking-[0.2em] font-bold px-8 py-4 hover:bg-white transition-all active:scale-[0.98]">
									Secure Allocation
								</button>
								<button className="p-4 border border-[#dae6d8]/10 text-[#dae6d8]/40 hover:text-[#00ff87] hover:border-[#00ff87]/30 transition-all duration-300">
									<Heart
										className={`w-5 h-5 ${car.isFavorite ? "fill-[#00ff87] text-[#00ff87]" : ""}`}
									/>
								</button>
							</div>

							{/* Specs Grid */}
							<div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12">
								{specs.map((spec, idx) => {
									const Icon = spec.icon;
									return (
										<div key={idx} className="flex items-center gap-4">
											<div className="w-10 h-10 rounded-full border border-[#dae6d8]/10 flex items-center justify-center text-[#00ff87]">
												<Icon size={18} />
											</div>
											<div>
												<span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40">
													{spec.label}
												</span>
												<span className="block text-xs font-bold">
													{spec.value}
												</span>
											</div>
										</div>
									);
								})}
							</div>

							{/* Configuration */}
							<div>
								<span className="block text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/40 mb-4 font-bold">
									Exterior Configuration
								</span>
								<div className="flex gap-3">
									{colors.map((color) => (
										<button
											key={color.id}
											onClick={() => setSelectedColor(color.id)}
											className={`w-8 h-8 rounded-full transition-all duration-300 ring-offset-4 ring-offset-[#0c160e] ${
												selectedColor === color.id
													? "ring-2 ring-[#00ff87]"
													: "hover:scale-110"
											}`}
											style={{ backgroundColor: color.hex }}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Performance Features Section */}
			<section className="px-8 border-t border-[#dae6d8]/10 pt-24">
				<h2 className="text-5xl font-['Newsreader'] italic font-bold mb-16 tracking-tight">
					Performance Features
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, idx) => {
						const Icon = iconMap[feature.icon] || Settings2;
						return (
							<div
								key={idx}
								className="group bg-[#141e16] border border-[#dae6d8]/5 p-10 hover:border-[#00ff87]/30 transition-all duration-500">
								<div className="mb-8 text-[#00ff87] transition-transform duration-500 group-hover:-translate-y-1">
									<Icon size={32} strokeWidth={1.5} />
								</div>
								<h3 className="text-xl font-bold mb-4 font-['Manrope'] tracking-tight">
									{feature.title}
								</h3>
								<p className="text-sm text-[#dae6d8]/50 leading-relaxed group-hover:text-[#dae6d8]/70 transition-colors">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
};

export default CarDetailsClient;
