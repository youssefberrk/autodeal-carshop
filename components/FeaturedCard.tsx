"use client";

import { featuredCars } from "@/types/CarsTypes";
import ImageSlider from "@/components/ui/ImageSlider";
import { useState } from "react";
import { number } from "zod";

const FeaturedCard = ({ album, model, info, price }: featuredCars) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<article
			className="featured-card"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className="card-media">
				<ImageSlider album={[album.photo1, album.photo2, album.photo3]} />
				<div className="card-overlay" />
				<div className="card-shine" data-visible={isHovered} />
			</div>

			<div className="card-content">
				<div className="card-meta">
					<span className="card-badge">Featured</span>
				</div>

				<div className="card-body ">
					<h3 className="card-model uppercase ">{model}</h3>
					<p className="card-info flex-1 py-5 my-3 font-mono uppercase text-xs leading-relaxed tracking-wide text-[#e5efe3]/96">
						<span>&ndash;</span> {info}
					</p>
				</div>

				<div className="card-footer ">
					<span className={`${typeof price === 'number' ? "card-price" : "card-price-string" } uppercase`}>{price} {typeof price === 'number' ? "K $" : "!" } </span>
					<button className="card-cta">
						<span>Discover</span>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path
								d="M3 8h10M9 4l4 4-4 4"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</article>
	);
};

export default FeaturedCard;
