"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface EditorialSpotlightProps {
	onExplore: () => void;
}

const EditorialSpotlight = ({ onExplore }: EditorialSpotlightProps) => (
	<section className="editorial-spotlight-section">
		<div className="editorial-spotlight">
			<Image
				src="/cars/shop-featured/911/p1.jpg"
				alt="Porsche 911 Carrera"
				fill
				sizes="(max-width: 900px) 100vw, 85vw"
				className="editorial-spotlight-image"
			/>
			<div className="editorial-spotlight-gradient" />
			<div className="editorial-spotlight-copy">
				<span className="shop-eyebrow">The Art of Performance</span>
				<h2>Porsche 911 Carrera GTS</h2>
				<p>532 HP · T-Hybrid · 3.6L Flat-Six</p>
				<button type="button" onClick={onExplore}>
					Explore model <ArrowRight size={15} />
				</button>
			</div>
		</div>
	</section>
);

export default EditorialSpotlight;
