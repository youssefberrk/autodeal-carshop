"use client";

import Image from "next/image";
import { ArrowUpRight, Zap, Gauge, CarFront, Crown } from "lucide-react";
import { motion } from "framer-motion";

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
	<motion.section 
		className="shop-editorial-section drive-categories-section"
		initial={{ opacity: 0, y: 35 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-40px" }}
		transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
	>
		<motion.div 
			className="shop-section-intro"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
		>
			<span className="shop-eyebrow">Choose Your Drive</span>
			<h2 className="shop-display-title">Find your character</h2>
			<p className="shop-section-description">
				Start with the way you want the car to feel. We&apos;ll take you to the right part of the collection.
			</p>
		</motion.div>
		<div className="drive-category-grid">
			{categories.map(({ title, bodyType, image, kicker, icon: Icon }, index) => (
				<motion.button
					key={title}
					type="button"
					onClick={() => onSelectCategory(bodyType)}
					className="drive-category-card"
					initial={{ opacity: 0, y: 25 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
				>
					<Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" />
					<span className="drive-category-overlay" />
					<span className="drive-category-copy">
						<span className="drive-category-kicker"><Icon size={13} /> {kicker}</span>
						<span className="drive-category-title">{title}</span>
						<span className="drive-category-link">Explore <ArrowUpRight size={15} /></span>
					</span>
				</motion.button>
			))}
		</div>
	</motion.section>
);

export default DriveCategories;

