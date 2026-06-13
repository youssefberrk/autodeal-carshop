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

			{/*  */}
		</div>
	);
};

export default ShopPage;