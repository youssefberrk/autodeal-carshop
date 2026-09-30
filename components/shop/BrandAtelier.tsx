"use client";

import { ArrowUpRight } from "lucide-react";

interface BrandAtelierProps {
	brands: string[];
	onSelectBrand: (brand: string) => void;
}

const BrandAtelier = ({ brands, onSelectBrand }: BrandAtelierProps) => (
	<section className="shop-editorial-section brand-atelier-section">
		<div className="shop-section-intro">
			<div>
				<span className="shop-eyebrow">Curated Marques</span>
				<h2 className="shop-display-title">Explore the marques</h2>
			</div>
			<p className="shop-section-description">
				A considered selection of the world&apos;s most distinctive automotive names.
			</p>
		</div>
		<div className="brand-atelier-list">
			{brands.map((brand, index) => (
				<button
					key={brand}
					type="button"
					onClick={() => onSelectBrand(brand)}
					className="brand-atelier-item">
					<span className="brand-atelier-index">{String(index + 1).padStart(2, "0")}</span>
					<span className="brand-atelier-name">{brand}</span>
					<ArrowUpRight size={16} strokeWidth={1.4} />
				</button>
			))}
		</div>
	</section>
);

export default BrandAtelier;
