"use client";

import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.jpg";
import { featCars, carsData } from "@/public/cars/CarsData";
import { useState, useMemo } from "react";
import FeaturedCard from "@/components/FeaturedCard";
import CarsCard from "@/components/CarsCard";
import ManufacturerDropdown from "@/components/filters/ManufacturerDropdown";

import BodySilhouette from "@/components/filters/BodySilhouette";
import PriceCeiling from "@/components/filters/PriceCeiling";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, Check, RotateCcw, Compass } from "lucide-react";

const ShopPage = () => {
	const carBrands = [
		...new Set(carsData.map((car) => car.brand)),
		"ALL BRANDS",
	];
	const [selectedBrand, setSelectedBrand] = useState<string>("ALL BRANDS");
	const [bodySilhouette, setBodySilhouette] = useState<string>("");
	const [visibleCarsCount, setVisibleCarsCount] = useState<number>(6);
	const minPrice = Math.min(...carsData.map((c) => Number(c.price)));
	const maxPrice = Math.max(...carsData.map((c) => Number(c.price)));
	const [priceRange, setPriceRange] = useState<number>(minPrice);

	// Mobile filter drawer state & draft filter values
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const [draftBrand, setDraftBrand] = useState<string>("ALL BRANDS");
	const [draftBodySilhouette, setDraftBodySilhouette] = useState<string>("");
	const [draftPriceRange, setDraftPriceRange] = useState<number>(minPrice);

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

	const activeFiltersCount = useMemo(() => {
		let count = 0;
		if (selectedBrand !== "ALL BRANDS") count++;
		if (bodySilhouette !== "" && bodySilhouette !== "All") count++;
		if (priceRange > minPrice) count++;
		return count;
	}, [selectedBrand, bodySilhouette, priceRange, minPrice]);

	const handleResetFilters = () => {
		setSelectedBrand("ALL BRANDS");
		setBodySilhouette("");
		setPriceRange(minPrice);
		setDraftBrand("ALL BRANDS");
		setDraftBodySilhouette("");
		setDraftPriceRange(minPrice);
	};

	const handleResetDraftFilters = () => {
		setDraftBrand("ALL BRANDS");
		setDraftBodySilhouette("");
		setDraftPriceRange(minPrice);
	};

	const handleOpenMobileFilters = () => {
		setDraftBrand(selectedBrand);
		setDraftBodySilhouette(bodySilhouette);
		setDraftPriceRange(priceRange);
		setIsMobileFilterOpen(true);
	};

	const handleApplyMobileFilters = () => {
		setSelectedBrand(draftBrand);
		setBodySilhouette(draftBodySilhouette);
		setPriceRange(draftPriceRange);
		setIsMobileFilterOpen(false);
	};

	const handleCancelMobileFilters = () => {
		setIsMobileFilterOpen(false);
	};

	return (
		<div className="shop-page">
			{/* Hero Section */}
			<div className="hero-section">
				<Image
					src={Gclass}
					alt="G-class"
					fill
					sizes="100vw"
					className="hero-image object-cover"
					priority
				/>
				<div className="hero-overlay" />
				<div className="hero-content">
					<h1 className="hero-title">Luxury Cars</h1>
					<p className="hero-subtitle">
						Explore 100+ luxury cars, supercars and exotic cars for sale
						worldwide in one simple search
					</p>
				</div>
			</div>

			{/* Featured Section */}
			<div className="featured-section">
				<div className="section-header">
					<span className="section-label">Curated Selection</span>
					<h2 className="section-title uppercase">Featured</h2>
				</div>
				<div className="featured-grid">
					{featCars.map((car, index) => (
						<div
							key={car.id}
							className="featured-item"
							style={{ animationDelay: `${index * 80}ms` }}>
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
					<h2 className="section-title uppercase">Your Shop</h2>
					<p className="section-count">
						{filteredCars.length} vehicles available
					</p>
				</div>

				{/* Mobile Filter Toggle Button (small screens only) */}
				<div className="lg:hidden mb-8">
					<button
						onClick={handleOpenMobileFilters}
						className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#091a11]/90 border border-[#00ff87]/30 text-[#dae6d8] hover:border-[#00ff87] transition-all shadow-[0_0_25px_rgba(0,255,135,0.1)] active:scale-[0.99] cursor-pointer">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87]">
								<SlidersHorizontal size={20} />
							</div>
							<div className="text-left">
								<span
									className="block text-xs font-bold uppercase tracking-wider text-white"
									style={{ fontFamily: "Orbitron, sans-serif" }}>
									Filter Vehicles
								</span>
								<span className="text-[11px] text-slate-400">
									{activeFiltersCount > 0
										? `${activeFiltersCount} filter${activeFiltersCount > 1 ? "s" : ""} applied`
										: "Refine by manufacturer, body & price"}
								</span>
							</div>
						</div>

						{activeFiltersCount > 0 ? (
							<span className="bg-[#00ff87] text-[#050e0a] text-xs font-extrabold px-3 py-1 rounded-full font-mono shadow-[0_0_10px_rgba(0,255,135,0.4)]">
								{activeFiltersCount} Active
							</span>
						) : (
							<span className="text-xs text-[#00ff87] font-semibold uppercase tracking-wider">
								Open
							</span>
						)}
					</button>
				</div>

				<div className="marketplace-layout">
					{/* Glassmorphism Filters (Desktop sidebar) */}
					<aside className="filters-panel hidden lg:block">
						<div className="filters-header flex items-center justify-between">
							<div>
								<h3>Refine</h3>
								<span className="filters-divider" />
							</div>
							{activeFiltersCount > 0 && (
								<button
									onClick={handleResetFilters}
									className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#00ff87]/80 hover:text-[#00ff87] hover:bg-[#00ff87]/10 px-2.5 py-1 rounded-lg border border-[#00ff87]/20 transition-all cursor-pointer"
									title="Reset all filters">
									<RotateCcw size={12} />
									<span>Reset</span>
								</button>
							)}
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
							<BodySilhouette
								bodySilhouette={bodySilhouette}
								onBsChange={setBodySilhouette}
							/>
						</div>

						<div className="filter-group">
							<label className="filter-label">Price Range</label>
							<PriceCeiling
								onPriceChange={setPriceRange}
								min={minPrice}
								max={maxPrice}
								value={priceRange}
								step={1000}
							/>
						</div>
					</aside>

					{/* Cars Grid or No Vehicles Available State */}
					{filteredCars.length === 0 ? (
						<div className="w-full py-16 px-6 text-center bg-[#07130c]/60 border border-[#00ff87]/20 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center my-4 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
							<div className="w-16 h-16 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] mb-5 shadow-[0_0_30px_rgba(0,255,135,0.15)] animate-pulse">
								<Compass size={32} />
							</div>
							<h3
								className="text-xl md:text-2xl font-bold text-white mb-2 uppercase tracking-wide"
								style={{ fontFamily: "Orbitron, sans-serif" }}>
								No Matching Vehicles Available
							</h3>
							<p className="text-slate-400 text-xs md:text-sm max-w-md mb-6 leading-relaxed">
								No vehicles currently meet your specified criteria. Try
								adjusting your manufacturer, body silhouette, or price floor
								parameters.
							</p>
							<button
								onClick={handleResetFilters}
								className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff87] text-[#050e0a] hover:bg-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] active:scale-[0.98] cursor-pointer">
								<RotateCcw size={14} />
								<span>Reset All Filters</span>
							</button>
						</div>
					) : (
						<div className="cars-grid">
							{filteredCars.slice(0, visibleCarsCount).map((car, index) => (
								<div
									key={`${car.id}-${index}`}
									className="car-item"
									style={{ animationDelay: `${index * 50}ms` }}>
									<CarsCard
										id={car.id}
										brand={car.brand}
										bodySilhouette={car.bodySilhouette}
										price={car.price}
										specs={car.specs}
										badge={car.badge}
										carAlbum={car.carAlbum}
										model={car.model}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Load More */}
				{filteredCars.length > 0 && visibleCarsCount < filteredCars.length && (
					<div className="load-more">
						<button
							onClick={() =>
								setVisibleCarsCount((prev) =>
									Math.min(prev + 6, filteredCars.length),
								)
							}
							className="btn-primary">
							<span>Show More</span>
							<span className="btn-count">
								{Math.min(6, filteredCars.length - visibleCarsCount)} cars
							</span>
						</button>
						{filteredCars.length - visibleCarsCount > 6 && (
							<button
								onClick={() => setVisibleCarsCount(filteredCars.length)}
								className="btn-secondary">
								<span>Show All</span>
								<span className="btn-count">
									{filteredCars.length - visibleCarsCount} more
								</span>
							</button>
						)}
					</div>
				)}
			</div>

			{/* Mobile Filters Modal */}
			<AnimatePresence>
				{isMobileFilterOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md lg:hidden overflow-y-auto">
						{/* Backdrop overlay click */}
						<div
							className="absolute inset-0 -z-10"
							onClick={handleCancelMobileFilters}
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
							className="w-full max-w-lg bg-[#050e0a]/95 border border-[#00ff87]/30 rounded-3xl p-6 shadow-[0_0_60px_rgba(0,255,135,0.2)] flex flex-col gap-6 max-h-[88vh] overflow-y-auto my-auto">
							{/* Modal Header */}
							<div className="flex items-center justify-between border-b border-[#00ff87]/15 pb-4">
								<div className="flex items-center gap-2.5">
									<SlidersHorizontal className="text-[#00ff87]" size={20} />
									<h2
										className="text-lg font-bold text-white tracking-widest uppercase"
										style={{ fontFamily: "Orbitron, sans-serif" }}>
										Filter Inventory
									</h2>
								</div>
								<div className="flex items-center gap-2">
									{(draftBrand !== "ALL BRANDS" ||
										(draftBodySilhouette !== "" &&
											draftBodySilhouette !== "All") ||
										draftPriceRange > minPrice) && (
										<button
											type="button"
											onClick={handleResetDraftFilters}
											className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#00ff87] hover:bg-[#00ff87]/10 px-2.5 py-1 rounded-lg border border-[#00ff87]/20 transition-all cursor-pointer">
											<RotateCcw size={12} />
											<span>Reset</span>
										</button>
									)}
									<button
										onClick={handleCancelMobileFilters}
										className="p-2 hover:text-[#00ff87] text-slate-400 transition-colors rounded-full hover:bg-white/5 active:scale-95 cursor-pointer"
										aria-label="Close filter options">
										<X size={20} />
									</button>
								</div>
							</div>

							{/* Filter Controls (Using draft values) */}
							<div className="flex flex-col gap-6">
								<div className="filter-group">
									<label className="filter-label">Manufacturer</label>
									<ManufacturerDropdown
										brands={carBrands}
										selectedBrand={draftBrand}
										onBrandChange={setDraftBrand}
									/>
								</div>

								<div className="filter-group">
									<label className="filter-label">Body Type</label>
									<BodySilhouette
										bodySilhouette={draftBodySilhouette}
										onBsChange={setDraftBodySilhouette}
									/>
								</div>

								<div className="filter-group">
									<label className="filter-label">Price Floor</label>
									<PriceCeiling
										onPriceChange={setDraftPriceRange}
										min={minPrice}
										max={maxPrice}
										value={draftPriceRange}
										step={1000}
									/>
								</div>
							</div>

							{/* Modal Actions: Cancel and Done */}
							<div className="flex items-center gap-3 pt-4 border-t border-[#00ff87]/15 mt-2">
								<button
									type="button"
									onClick={handleCancelMobileFilters}
									className="flex-1 py-3.5 px-4 rounded-xl border border-white/15 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10">
									<X size={15} />
									<span>Cancel</span>
								</button>

								<button
									type="button"
									onClick={handleApplyMobileFilters}
									className="flex-1 py-3.5 px-4 rounded-xl bg-[#00ff87] text-[#050e0a] hover:bg-emerald-300 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
									<Check size={15} />
									<span>Done</span>
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ShopPage;
