"use client";

import Image from "next/image";
import { ArrowUpRight, Zap, Gauge, CarFront, Crown } from "lucide-react";

interface DriveCategoriesProps {
	onSelectCategory: (bodyType: string) => void;
}

const categories = [
	{ title: "Performance", bodyType: "Performance", image: "/cars/ferrari/roma-1.jpg", kicker: "Track-bred character", icon: Gauge },
	{ title: "Grand Touring", bodyType: "Coupe", image: "/cars/astonmartin/db11-1.jpg", kicker: "Effortless distance", icon: Crown },
	{ title: "Electric", bodyType: "Electric", image: "/cars/mercedes/eqs-1.avif", kicker: "Silent performance", icon: Zap },
	{ title: "SUV", bodyType: "SUV", image: "/cars/lamborghini/urus-1.png", kicker: "Command the road", icon: CarFront },
];

const DriveCategories = ({ onSelectCategory }: DriveCategoriesProps) => (
	<section className="shop-editorial-section drive-categories-section">
		<div className="shop-section-intro">
			<div>
				<span className="shop-eyebrow">Choose Your Drive</span>
				<h2 className="shop-display-title">Find your character</h2>
			</div>
			<p className="shop-section-description">
				Start with the way you want the car to feel. We&apos;ll take you to the right part of the collection.
			</p>
		</div>
		<div className="drive-category-grid">
			{categories.map(({ title, bodyType, image, kicker, icon: Icon }) => (
				<button
					key={title}
					type="button"
					onClick={() => onSelectCategory(bodyType)}
					className="drive-category-card">
					<Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" />
					<span className="drive-category-overlay" />
					<span className="drive-category-copy">
						<span className="drive-category-kicker"><Icon size={13} /> {kicker}</span>
						<span className="drive-category-title">{title}</span>
						<span className="drive-category-link">Explore <ArrowUpRight size={15} /></span>
					</span>
				</button>
			))}
		</div>
	</section>
);

export default DriveCategories;
