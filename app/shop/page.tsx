"use client";

import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.jpg";
import { featCars, carsData } from "@/public/cars/CarsData";
import { useState, useMemo, useEffect, useRef } from "react";
import FeaturedCard from "@/components/FeaturedCard";
import CarsCard from "@/components/CarsCard";
import ManufacturerDropdown from "@/components/filters/ManufacturerDropdown";

import BodySilhoette from "@/components/filters/BodySilhoette";
import PriceCeiling from "@/components/filters/PriceCeiling";

const ShopPage = () => {
	const carBrands = [
		...new Set(carsData.map((car) => car.brand)),
		"ALL BRANDS",
	];
	const [selectedBrand, setSelectedBrand] = useState<string>("ALL BRANDS");
	const [bodySilhouette, setBodySilhouette] = useState<string>("");
	const [visibleCarsCount, setVisibleCarsCount] = useState<number>(6);
	const [isLoaded, setIsLoaded] = useState(false);

	const minPrice = Math.min(...carsData.map((c) => Number(c.price)));
	const maxPrice = Math.max(...carsData.map((c) => Number(c.price)));
	const [priceRange, setPriceRange] = useState<number>(minPrice);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const filteredCars = useMemo(() => {
		return carsData.filter((car) => {
			const brandMatch =
				selectedBrand === "ALL BRANDS" || car.brand === selectedBrand;
			const bodyMatch =
				bodySilhouette === "All" ||
				bodySilhouette === "" ||
				car.bodySilhouette === bodySilhouette;
			const priceFilter = Number(car.price) >= priceRange;

			return brandMatch && bodyMatch && priceFilter;
		});
	}, [selectedBrand, bodySilhouette, priceRange]);

	return (
		<div className="shop-page">
			{/* Hero Section */}
			<div className="hero-section">
				<Image
					src={Gclass}
					alt="G-class"
					width={1920}
					height={400}
					className="hero-image"
					priority
				/>
				<div className="hero-overlay" />
				<div className="hero-content">
					<h1 className="hero-title">Luxury Cars</h1>
					<p className="hero-subtitle">
						Explore 100+ luxury cars, supercars and exotic cars for sale worldwide in one simple search
					</p>
				</div>
			</div>

			{/* Featured Section */}
			<div className="featured-section">
				<div className="section-header">
					<span className="section-label">Curated Selection</span>
					<h2 className="section-title">Featured</h2>
				</div>
				<div className="featured-grid">
					{featCars.map((car, index) => (
						<div
							key={car.id}
							className="featured-item"
							style={{ animationDelay: `${index * 80}ms` }}
						>
							<FeaturedCard
								id={car.id}
								album={car.album}
								model={car.model}
								info={car.info}
								price={car.price}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Marketplace Section */}
			<div className="marketplace-section">
				<div className="section-header">
					<span className="section-label">Browse Inventory</span>
					<h2 className="section-title">Your Shop</h2>
					<p className="section-count">{filteredCars.length} vehicles available</p>
				</div>

				<div className="marketplace-layout">
					{/* Glassmorphism Filters */}
					<aside className="filters-panel">
						<div className="filters-header">
							<h3>Refine</h3>
							<span className="filters-divider" />
						</div>

						<div className="filter-group">
							<label className="filter-label">Manufacturer</label>
							<ManufacturerDropdown
								brands={carBrands}
								selectedBrand={selectedBrand}
								onBrandChange={setSelectedBrand}
							/>
						</div>

						<div className="filter-group">
							<label className="filter-label">Body Type</label>
							<BodySilhoette
								bodySilhouette={bodySilhouette}
								onBsChange={setBodySilhouette}
							/>
						</div>

						<div className="filter-group">
							<label className="filter-label">Price Floor</label>
							<PriceCeiling
								onPriceChange={setPriceRange}
								min={minPrice}
								max={maxPrice}
								initialValue={minPrice}
								step={1000}
							/>
						</div>
					</aside>

					{/* Cars Grid */}
					<div className="cars-grid">
						{filteredCars.slice(0, visibleCarsCount).map((car, index) => (
							<div
								key={`${car.id}-${index}`}
								className="car-item"
								style={{ animationDelay: `${index * 50}ms` }}
							>
								<CarsCard
									id={car.id}
									brand={car.brand}
									bodySilhouette={car.bodySilhouette}
									price={car.price}
									specs={car.specs}
									badge={car.badge}
									image={car.image}
									model={car.model}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Load More */}
				{visibleCarsCount < filteredCars.length && (
					<div className="load-more">
						<button
							onClick={() => setVisibleCarsCount(prev =>
								Math.min(prev + 6, filteredCars.length)
							)}
							className="btn-primary"
						>
							<span>Show More</span>
							<span className="btn-count">
								{Math.min(6, filteredCars.length - visibleCarsCount)} cars
							</span>
						</button>
						{filteredCars.length - visibleCarsCount > 6 && (
							<button
								onClick={() => setVisibleCarsCount(filteredCars.length)}
								className="btn-secondary"
							>
								<span>Show All</span>
								<span className="btn-count">
									{filteredCars.length - visibleCarsCount} more
								</span>
							</button>
						)}
					</div>
				)}
			</div>

			<style>{`
				/* ===== CSS Variables ===== */
				:root {
					--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
					--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
					--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
					--color-accent: #00ff87;
					--color-accent-dim: rgba(0, 255, 135, 0.15);
					--color-text: #dae6d8;
					--color-text-muted: rgba(218, 230, 216, 0.4);
					--color-bg-dark: #0c160e;
					--color-glass: rgba(12, 22, 14, 0.7);
					--color-glass-border: rgba(218, 230, 216, 0.08);
				}

				/* ===== Hero Section ===== */
				.hero-section {
					position: relative;
					width: 100%;
					height: 50vh;
					min-height: 400px;
					max-height: 500px;
					overflow: hidden;
				}

				.hero-section .hero-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					opacity: 0.6;
					animation: heroZoom 20s ease-out forwards;
				}

				@keyframes heroZoom {
					from { transform: scale(1.05); }
					to { transform: scale(1); }
				}

				.hero-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						to top,
						rgba(2, 6, 8, 0.95) 0%,
						rgba(2, 6, 8, 0.4) 40%,
						rgba(2, 6, 8, 0.2) 100%
					);
				}

				.hero-content {
					position: absolute;
					left: clamp(1rem, 5vw, 4rem);
					bottom: clamp(1.5rem, 5vw, 3rem);
					max-width: 700px;
					z-index: 10;
				}

				.hero-title {
					font-family: var(--font-news), serif;
					font-size: clamp(2.5rem, 8vw, 5rem);
					font-weight: 700;
					font-style: italic;
					color: var(--color-text);
					line-height: 1;
					margin-bottom: 0.75rem;
					opacity: 0;
					transform: translateY(30px);
					animation: fadeInUp 1s var(--ease-out-expo) 0.3s forwards;
				}

				.hero-subtitle {
					font-family: var(--font-sans), sans-serif;
					font-size: clamp(0.75rem, 2vw, 1.125rem);
					font-weight: 400;
					font-style: italic;
					color: var(--color-text-muted);
					letter-spacing: 0.05em;
					line-height: 1.6;
					opacity: 0;
					transform: translateY(20px);
					animation: fadeInUp 1s var(--ease-out-expo) 0.5s forwards;
				}

				/* ===== Section Headers ===== */
				.section-header {
					text-align: center;
					margin-bottom: 3rem;
				}

				.section-label {
					display: inline-block;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.65rem;
					font-weight: 500;
					letter-spacing: 0.3em;
					text-transform: uppercase;
					color: var(--color-accent);
					padding: 0.5rem 1.25rem;
					border: 1px solid var(--color-accent);
					border-radius: 100px;
					margin-bottom: 1rem;
				}

				.section-title {
					font-family: 'Playfair Display', serif;
					font-size: clamp(2.5rem, 6vw, 4rem);
					font-weight: 600;
					color: var(--color-text);
					margin-bottom: 0.5rem;
				}

				.section-count {
					font-family: var(--font-sans), sans-serif;
					font-size: 0.875rem;
					color: var(--color-text-muted);
					letter-spacing: 0.05em;
				}

				/* ===== Featured Section ===== */
				.featured-section {
					padding: 5rem 5%;
					max-width: 1400px;
					margin: 0 auto;
				}

				.featured-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
					gap: 2rem;
					justify-items: center;
				}

				.featured-item {
					width: 100%;
					max-width: 420px;
					opacity: 0;
					transform: translateY(30px);
					animation: fadeInUp 0.8s var(--ease-out-expo) forwards;
				}

				/* ===== Marketplace Section ===== */
				.marketplace-section {
					padding: 4rem 5% 6rem;
					max-width: 1600px;
					margin: 0 auto;
				}

				.marketplace-layout {
					display: grid;
					grid-template-columns: 280px 1fr;
					gap: 3rem;
					align-items: start;
				}

				@media (max-width: 1024px) {
					.marketplace-layout {
						grid-template-columns: 1fr;
					}
				}

				/* ===== Glassmorphism Filters ===== */
				.filters-panel {
					position: sticky;
					top: 100px;
					background: var(--color-glass);
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					border: 1px solid var(--color-glass-border);
					border-radius: 1.5rem;
					padding: 2rem;
					transition: border-color 0.3s ease;
				}

				.filters-panel:hover {
					border-color: rgba(218, 230, 216, 0.12);
				}

				.filters-header {
					margin-bottom: 2rem;
				}

				.filters-header h3 {
					font-family: 'Playfair Display', serif;
					font-size: 1.5rem;
					font-weight: 600;
					color: var(--color-text);
					margin-bottom: 1rem;
				}

				.filters-divider {
					display: block;
					width: 40px;
					height: 2px;
					background: linear-gradient(90deg, var(--color-accent), transparent);
				}

				.filter-group {
					margin-bottom: 1.75rem;
				}

				.filter-group:last-child {
					margin-bottom: 0;
				}

				.filter-label {
					display: block;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.6rem;
					font-weight: 500;
					letter-spacing: 0.2em;
					text-transform: uppercase;
					color: var(--color-text-muted);
					margin-bottom: 0.75rem;
				}

				/* ===== Cars Grid ===== */
				.cars-grid {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
					gap: 1.5rem;
				}

				@media (max-width: 480px) {
					.cars-grid {
						grid-template-columns: 1fr;
					}
				}

				.car-item {
					opacity: 0;
					transform: translateY(20px);
					animation: fadeInUp 0.6s var(--ease-out-expo) forwards;
				}

				/* ===== Load More Buttons ===== */
				.load-more {
					display: flex;
					justify-content: center;
					gap: 1rem;
					margin-top: 3rem;
					flex-wrap: wrap;
				}

				.btn-primary,
				.btn-secondary {
					display: flex;
					align-items: center;
					gap: 0.75rem;
					padding: 1rem 2rem;
					font-family: 'Orbitron', sans-serif;
					font-size: 0.7rem;
					font-weight: 600;
					letter-spacing: 0.15em;
					text-transform: uppercase;
					border-radius: 100px;
					cursor: pointer;
					transition: transform 160ms var(--ease-out-expo),
					            box-shadow 0.3s ease,
					            background-color 0.3s ease;
				}

				.btn-primary {
					background: var(--color-accent);
					color: var(--color-bg-dark);
					border: none;
				}

				.btn-primary:hover {
					background: #00e07a;
					box-shadow: 0 0 30px rgba(0, 255, 135, 0.4);
				}

				.btn-primary:active {
					transform: scale(0.97);
				}

				.btn-secondary {
					background: transparent;
					color: var(--color-accent);
					border: 1px solid var(--color-accent);
				}

				.btn-secondary:hover {
					background: var(--color-accent-dim);
					box-shadow: 0 0 20px rgba(0, 255, 135, 0.2);
				}

				.btn-secondary:active {
					transform: scale(0.97);
				}

				.btn-count {
					opacity: 0.6;
					font-weight: 400;
				}

				/* ===== Animations ===== */
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				/* ===== Reduced Motion ===== */
				@media (prefers-reduced-motion: reduce) {
					.hero-title,
					.hero-subtitle,
					.featured-item,
					.car-item {
						animation: none;
						opacity: 1;
						transform: none;
					}

					.hero-section .hero-image {
						animation: none;
					}

					.btn-primary:hover,
					.btn-secondary:hover {
						box-shadow: none;
					}
				}
			`}</style>
		</div>
	);
};

export default ShopPage;