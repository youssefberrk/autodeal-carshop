"use client";

import { featuredCars } from "@/types/CarsTypes";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { useState } from "react";

const FeaturedCard = ({ album, model, info, price }: featuredCars) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="featured-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-media">
        <ImageSlider album={[album.photo1, album.photo2, album.photo3]} />
        <div className="card-overlay" />
        <div className="card-shine" data-visible={isHovered} />
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span className="card-badge">Featured</span>
        </div>

        <div className="card-body">
          <h3 className="card-model uppercase">{model}</h3>
          <p className="card-info">{info}</p>
        </div>

        <div className="card-footer">
          <span className="card-price">{price}$</span>
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

      <style>{`
				.featured-card {
					width: 100%;
					max-width: 420px;
					background: linear-gradient(145deg, rgba(20, 30, 22, 0.95), rgba(12, 22, 14, 0.98));
					border: 1px solid rgba(218, 230, 216, 0.06);
					border-radius: 1.25rem;
					overflow: hidden;
					transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
					            border-color 0.3s ease,
					            box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.featured-card:hover {
					transform: translateY(-8px);
					border-color: rgba(0, 255, 135, 0.2);
					box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5),
					            0 0 40px -10px rgba(0, 255, 135, 0.15);
				}

				/* Media container */
				.card-media {
					position: relative;
					aspect-ratio: 16 / 10;
					overflow: hidden;
				}

				.card-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						to top,
						rgba(12, 22, 14, 0.8) 0%,
						transparent 50%
					);
					pointer-events: none;
					z-index: 2;
				}

				/* Animated shine effect on hover */
				.card-shine {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						105deg,
						transparent 40%,
						rgba(255, 255, 255, 0.03) 45%,
						rgba(255, 255, 255, 0.05) 50%,
						rgba(255, 255, 255, 0.03) 55%,
						transparent 60%
					);
					transform: translateX(-100%);
					z-index: 3;
					pointer-events: none;
				}

				.card-shine[data-visible="true"] {
					animation: shineSweep 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
				}

				@keyframes shineSweep {
					from { transform: translateX(-100%); }
					to { transform: translateX(100%); }
				}

				/* Content */
				.card-content {
					padding: 1.5rem;
				}

				.card-meta {
					margin-bottom: 1rem;
				}

				.card-badge {
					display: inline-flex;
					align-items: center;
					gap: 0.375rem;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.55rem;
					font-weight: 600;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: var(--color-accent, #00ff87);
					padding: 0.375rem 0.875rem;
					background: rgba(0, 255, 135, 0.1);
					border: 1px solid rgba(0, 255, 135, 0.2);
					border-radius: 100px;
				}

				.card-badge::before {
					content: '';
					width: 6px;
					height: 6px;
					background: var(--color-accent, #00ff87);
					border-radius: 50%;
					animation: pulse 2s ease-in-out infinite;
				}

				@keyframes pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.5; transform: scale(0.8); }
				}

				.card-body {
					margin-bottom: 1.5rem;
				}

				.card-model {
					font-family: var(--font-news), serif;
					font-size: 1.75rem;
					font-weight: 500;
					font-style: italic;
					color: #dae6d8;
					line-height: 1.2;
					margin-bottom: 0.5rem;
					transition: color 0.3s ease;
				}

				.featured-card:hover .card-model {
					color: #00ff87;
				}

				.card-info {
					font-family: var(--font-sans), sans-serif;
					font-size: 0.8rem;
					font-weight: 400;
					color: rgba(218, 230, 216, 0.5);
					line-height: 1.6;
					letter-spacing: 0.02em;
				}

				.card-footer {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 1.25rem;
					border-top: 1px solid rgba(218, 230, 216, 0.06);
				}

				.card-price {
					font-family: 'Newsreader', serif;
					font-size: 1.5rem;
					font-weight: 600;
					font-style: italic;
					color: #00ff87;
				}

				.card-cta {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.6rem;
					font-weight: 600;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					color: #dae6d8;
					background: transparent;
					border: 1px solid rgba(218, 230, 216, 0.15);
					padding: 0.625rem 1.125rem;
					border-radius: 100px;
					cursor: pointer;
					transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.card-cta svg {
					transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.card-cta:hover {
					color: #0c160e;
					background: #00ff87;
					border-color: #00ff87;
					box-shadow: 0 0 20px rgba(0, 255, 135, 0.3);
				}

				.card-cta:hover svg {
					transform: translateX(4px);
				}

				.card-cta:active {
					transform: scale(0.97);
				}

				@media (prefers-reduced-motion: reduce) {
					.card-shine,
					.card-badge::before {
						animation: none;
					}

					.featured-card:hover {
						transform: none;
					}
				}
			`}</style>
    </div>
  );
};

export default FeaturedCard;
