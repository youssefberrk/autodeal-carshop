"use client";

import { Cars } from "@/types/Cars";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CarsCard = ({
	id,
	image,
	badge,
	brand,
	model,
	bodySilhouette,
	specs,
	price,
	isFavorite = false,
}: Cars) => {
	const router = useRouter();
	const [isHovered, setIsHovered] = useState(false);
	const [isLiked, setIsLiked] = useState(isFavorite);

	return (
		<div
			className="cars-card"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Image Container */}
			<div className="card-image-wrap">
				<Image
					src={image || ""}
					width={600}
					height={400}
					alt={`${brand} ${model}`}
					className="card-image"
				/>
				<div className="card-image-overlay" />

				{/* Badge */}
				{badge && (
					<div className="card-badge-wrap">
						<span className="card-badge">{badge}</span>
					</div>
				)}

				{/* Favorite Button */}
				<button
					className="card-favorite"
					onClick={(e) => {
						e.stopPropagation();
						setIsLiked(!isLiked);
					}}
					aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
				>
					<Heart
						className={`heart-icon ${isLiked ? "is-liked" : ""}`}
						size={18}
					/>
				</button>

				{/* Hover reveal CTA */}
				<div className="card-quick-view" data-visible={isHovered}>
					<span>Quick View</span>
				</div>
			</div>

			{/* Content */}
			<div className="card-content">
				<div className="card-header">
					<div className="card-brand-wrap">
						<p className="card-brand">{brand}</p>
						<h3 className="card-model">{model}</h3>
						<p className="card-body-type">{bodySilhouette}</p>
					</div>
					<div className="card-price-wrap">
						<span className="card-price">{price}</span>
						<span className="card-currency">USD</span>
					</div>
				</div>

				<p className="card-specs">{specs}</p>

				<div className="card-actions">
					<button
						className="btn-details"
						onClick={() => router.push(`/details/${id}`)}
					>
						<span>View Details</span>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
			</div>

			<style>{`
				.cars-card {
					position: relative;
					background: linear-gradient(
						165deg,
						rgba(20, 30, 22, 0.98),
						rgba(12, 22, 14, 0.99)
					);
					border: 1px solid rgba(218, 230, 216, 0.05);
					border-radius: 1.5rem;
					overflow: hidden;
					transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
					            border-color 0.4s ease,
					            box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.cars-card:hover {
					border-color: rgba(0, 255, 135, 0.25);
					box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6),
					            0 0 50px -15px rgba(0, 255, 135, 0.2);
				}

				/* Image */
				.card-image-wrap {
					position: relative;
					aspect-ratio: 16 / 10;
					overflow: hidden;
					background: #0a120d;
				}

				.card-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					opacity: 0.75;
					transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
					            opacity 0.4s ease;
				}

				.cars-card:hover .card-image {
					transform: scale(1.08);
					opacity: 0.9;
				}

				.card-image-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						to top,
						rgba(12, 22, 14, 0.9) 0%,
						rgba(12, 22, 14, 0.2) 40%,
						transparent 70%
					);
					pointer-events: none;
				}

				/* Badge */
				.card-badge-wrap {
					position: absolute;
					top: 1rem;
					left: 1rem;
					z-index: 10;
				}

				.card-badge {
					display: block;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.5rem;
					font-weight: 800;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: #0c160e;
					background: #00ff87;
					padding: 0.35rem 0.75rem;
					border-radius: 4px;
				}

				/* Favorite */
				.card-favorite {
					position: absolute;
					top: 1rem;
					right: 1rem;
					z-index: 10;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 40px;
					height: 40px;
					background: rgba(12, 22, 14, 0.6);
					backdrop-filter: blur(8px);
					-webkit-backdrop-filter: blur(8px);
					border: 1px solid rgba(218, 230, 216, 0.1);
					border-radius: 50%;
					cursor: pointer;
					transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.card-favorite:hover {
					background: rgba(12, 22, 14, 0.9);
					border-color: rgba(218, 230, 216, 0.2);
				}

				.heart-icon {
					color: rgba(218, 230, 216, 0.5);
					transition: color 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
				}

				.card-favorite:hover .heart-icon {
					color: #ff6b8a;
				}

				.heart-icon.is-liked {
					color: #ff6b8a;
					fill: #ff6b8a;
					animation: heartPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
				}

				@keyframes heartPop {
					0% { transform: scale(1); }
					50% { transform: scale(1.3); }
					100% { transform: scale(1); }
				}

				/* Quick View reveal */
				.card-quick-view {
					position: absolute;
					bottom: 1rem;
					left: 50%;
					transform: translateX(-50%) translateY(10px);
					opacity: 0;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.55rem;
					font-weight: 600;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					color: #0c160e;
					background: rgba(255, 255, 255, 0.95);
					backdrop-filter: blur(8px);
					padding: 0.5rem 1.25rem;
					border-radius: 100px;
					white-space: nowrap;
					transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
					z-index: 10;
				}

				.card-quick-view[data-visible="true"] {
					opacity: 1;
					transform: translateX(-50%) translateY(0);
				}

				/* Content */
				.card-content {
					padding: 1.5rem;
				}

				.card-header {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					gap: 1rem;
					margin-bottom: 0.875rem;
				}

				.card-brand {
					font-family: 'Orbitron', sans-serif;
					font-size: 0.6rem;
					font-weight: 600;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: rgba(218, 230, 216, 0.5);
					margin-bottom: 0.25rem;
				}

				.card-model {
					font-family: 'Newsreader', serif;
					font-size: 1.375rem;
					font-weight: 500;
					font-style: italic;
					color: #dae6d8;
					line-height: 1.2;
					margin-bottom: 0.125rem;
					transition: color 0.3s ease;
				}

				.cars-card:hover .card-model {
					color: #00ff87;
				}

				.card-body-type {
					font-family: 'Inter', sans-serif;
					font-size: 0.7rem;
					font-weight: 400;
					color: rgba(218, 230, 216, 0.4);
					letter-spacing: 0.03em;
				}

				.card-price-wrap {
					text-align: right;
					flex-shrink: 0;
				}

				.card-price {
					display: block;
					font-family: 'Newsreader', serif;
					font-size: 1.5rem;
					font-weight: 600;
					font-style: italic;
					color: #00ff87;
					line-height: 1;
				}

				.card-currency {
					display: block;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.5rem;
					font-weight: 500;
					letter-spacing: 0.1em;
					color: rgba(218, 230, 216, 0.3);
					margin-top: 0.25rem;
				}

				.card-specs {
					font-family: 'Inter', sans-serif;
					font-size: 0.7rem;
					font-weight: 400;
					color: rgba(218, 230, 216, 0.35);
					line-height: 1.7;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					margin-bottom: 1.25rem;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				/* Actions */
				.card-actions {
					display: flex;
					gap: 0.75rem;
					padding-top: 1.25rem;
					border-top: 1px solid rgba(218, 230, 216, 0.06);
				}

				.btn-details {
					flex: 1;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.6rem;
					font-weight: 700;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					color: #0c160e;
					background: #00ff87;
					border: none;
					padding: 1rem 1.5rem;
					border-radius: 100px;
					cursor: pointer;
					transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.btn-details svg {
					transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.btn-details:hover {
					background: #00e07a;
					box-shadow: 0 0 25px rgba(0, 255, 135, 0.4);
				}

				.btn-details:hover svg {
					transform: translateX(3px);
				}

				.btn-details:active {
					transform: scale(0.97);
				}

				/* Responsive */
				@media (max-width: 480px) {
					.card-content {
						padding: 1.25rem;
					}

					.card-model {
						font-size: 1.2rem;
					}

					.card-price {
						font-size: 1.25rem;
					}
				}

				/* Reduced motion */
				@media (prefers-reduced-motion: reduce) {
					.cars-card:hover {
						transform: none;
					}

					.heart-icon.is-liked {
						animation: none;
					}

					.cars-card:hover .card-image {
						transform: none;
					}
				}
			`}</style>
		</div>
	);
};

export default CarsCard;