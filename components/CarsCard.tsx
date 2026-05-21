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
						oklch(0.16 0.02 160 / 98%),
						oklch(0.12 0.015 160 / 99%)
					);
					border: 1px solid oklch(0.95 0.01 160 / 5%);
					border-radius: 1.5rem;
					overflow: hidden;
					transition: transform 0.3s var(--ease-out),
					            border-color 0.3s ease,
					            box-shadow 0.3s var(--ease-out);
				}

				.cars-card:hover {
					border-color: oklch(var(--brand) / 25%);
					box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6),
					            0 0 40px -15px oklch(var(--brand) / 15%);
				}

				/* Image */
				.card-image-wrap {
					position: relative;
					aspect-ratio: 16 / 10;
					overflow: hidden;
					background: var(--background);
				}

				.card-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					opacity: 0.75;
					transition: transform 0.6s var(--ease-out),
					            opacity 0.3s ease;
				}

				.cars-card:hover .card-image {
					transform: scale(1.04);
					opacity: 0.9;
				}

				.card-image-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						to top,
						oklch(0.12 0.015 160 / 90%) 0%,
						oklch(0.12 0.015 160 / 20%) 40%,
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
					color: var(--primary-foreground);
					background: var(--primary);
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
					background: oklch(0.12 0.015 160 / 60%);
					backdrop-filter: blur(8px);
					-webkit-backdrop-filter: blur(8px);
					border: 1px solid oklch(0.95 0.01 160 / 10%);
					border-radius: 50%;
					cursor: pointer;
					transition: all 0.2s var(--ease-out);
				}

				.card-favorite:hover {
					background: oklch(0.12 0.015 160 / 90%);
					border-color: oklch(0.95 0.01 160 / 20%);
					transform: scale(1.05);
				}

				.card-favorite:active {
					transform: scale(0.92);
				}

				.heart-icon {
					color: oklch(0.95 0.01 160 / 50%);
					transition: color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
				}

				.card-favorite:hover .heart-icon {
					color: oklch(0.55 0.20 25);
				}

				.heart-icon.is-liked {
					color: oklch(0.55 0.20 25);
					fill: oklch(0.55 0.20 25);
					animation: heartPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
				}

				@keyframes heartPop {
					0% { transform: scale(1); }
					50% { transform: scale(1.25); }
					100% { transform: scale(1); }
				}

				/* Quick View reveal */
				.card-quick-view {
					position: absolute;
					bottom: 1rem;
					left: 50%;
					transform: translateX(-50%) translateY(8px);
					opacity: 0;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.55rem;
					font-weight: 600;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					color: var(--primary-foreground);
					background: oklch(0.95 0.01 160 / 95%);
					backdrop-filter: blur(8px);
					padding: 0.5rem 1.25rem;
					border-radius: 100px;
					white-space: nowrap;
					transition: opacity 0.2s ease, transform 0.2s var(--ease-out);
					z-index: 10;
					pointer-events: none;
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
					color: var(--muted-foreground);
					margin-bottom: 0.25rem;
				}

				.card-model {
					font-family: 'Newsreader', serif;
					font-size: 1.375rem;
					font-weight: 500;
					font-style: italic;
					color: var(--foreground);
					line-height: 1.2;
					margin-bottom: 0.125rem;
					transition: color 0.3s ease;
				}

				.cars-card:hover .card-model {
					color: var(--primary);
				}

				.card-body-type {
					font-family: 'Inter', sans-serif;
					font-size: 0.7rem;
					font-weight: 400;
					color: var(--muted-foreground);
					opacity: 0.6;
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
					color: var(--primary);
					line-height: 1;
				}

				.card-currency {
					display: block;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.5rem;
					font-weight: 500;
					letter-spacing: 0.1em;
					color: var(--muted-foreground);
					opacity: 0.4;
					margin-top: 0.25rem;
				}

				.card-specs {
					font-family: 'Inter', sans-serif;
					font-size: 0.7rem;
					font-weight: 400;
					color: var(--muted-foreground);
					opacity: 0.8;
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
					border-top: 1px solid var(--border);
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
					color: var(--primary-foreground);
					background: var(--primary);
					border: none;
					padding: 1rem 1.5rem;
					border-radius: 100px;
					cursor: pointer;
					transition: all 0.2s var(--ease-out);
				}

				.btn-details svg {
					transition: transform 0.2s var(--ease-out);
				}

				.btn-details:hover {
					background: var(--brand-hover);
					box-shadow: 0 0 25px oklch(var(--brand) / 40%);
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