"use client";

import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.png";
import { featCars, carsData } from "@/public/cars/CarsData";
import { useState, useMemo, useRef } from "react";
import FeaturedCard from "@/components/FeaturedCard";
import CarsCard from "@/components/CarsCard";
import ManufacturerDropdown from "@/components/filters/ManufacturerDropdown";
import BrandAtelier from "@/components/shop/BrandAtelier";
import DriveCategories from "@/components/shop/DriveCategories";
import EditorialSpotlight from "@/components/shop/EditorialSpotlight";

import BodySilhouette from "@/components/filters/BodySilhouette";
import PriceCeiling from "@/components/filters/PriceCeiling";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  Check,
  RotateCcw,
  Compass,
  Sparkles,
  ArrowDown,
  Gauge,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useConcierge } from "@/components/ConciergeProvider";

const ShopPage = () => {
  const { openConcierge } = useConcierge();
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

  // Shared scroll target for curated sections that apply a filter and jump to inventory.
  const marketplaceRef = useRef<HTMLElement>(null);

  const scrollToMarketplace = () => {
    requestAnimationFrame(() => {
      marketplaceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

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
      <section className="shop-hero-section">
        <Image
          src={Gclass}
          alt="Curated Luxury Automobiles"
          fill
          sizes="100vw"
          className="shop-hero-bg-image"
          priority
        />
        <div className="shop-hero-gradient-overlay" />
        <div className="shop-hero-spotlight" />

        <div className="shop-hero-container">
          <div className="shop-hero-content-wrapper -translate-x-2 md:-translate-x-0">
            <motion.div
              className="shop-hero-inner"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Status / Atelier Badge */}
              <div className="shop-hero-badge">
                <span className="shop-hero-badge-pulse" />
                <span>AutoDeal Atelier • Curated Collection</span>
              </div>

              {/* Main Headline */}
              <h1 className="shop-hero-headline">
                <span className="shop-hero-headline-eyebrow">The Curated</span>
                <span className="shop-hero-headline-title">Collection</span>
              </h1>

              {/* Editorial Description */}
              <p className="shop-hero-description">
                An extraordinary portfolio of hand-selected cars and certified
                heritage — <br />
                ready for global acquisition.
              </p>

              <div className="shop-hero-stat-pill">
                <span className="shop-hero-stat-dot" />
                <span>
                  <strong>{carsData.length}</strong> Vehicles In Showroom
                </span>
              </div>

              {/* Actions & Showroom Stat */}
              <div className="shop-hero-actions-row">
                <button
                  type="button"
                  onClick={scrollToMarketplace}
                  className="shop-hero-cta group"
                >
                  <span className="shop-hero-cta-text">Browse Inventory</span>

                  <ArrowDown size={19} className="shop-hero-cta-arrow" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openConcierge(
                      undefined,
                      "I would like private advisory on curating a luxury vehicle from the collection.",
                    )
                  }
                  className="shop-hero-cta-secondary group"
                >
                  <span
                    className="shop-hero-secondary-icon-box"
                    aria-hidden="true"
                  >
                    <Sparkles size={22} className="shop-hero-secondary-icon" />
                  </span>
                  <span className="shop-hero-cta-text-secondary">
                    Private Advisory
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Luxury Highlights / Trust Metrics Ribbon */}
          <div className="shop-trust-bar">
            <div className="shop-trust-grid">
              {/* Item 1 */}
              <motion.div
                className="shop-trust-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="shop-trust-icon-box">
                  <Gauge size={36} className="shop-trust-icon" />
                </div>
                <div className="shop-trust-text">
                  <div className="shop-trust-val-row">
                    <span className="shop-trust-val">100+</span>
                    <span className="shop-trust-title">
                      Exotics & Supercars
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                className="shop-trust-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="shop-trust-icon-box">
                  <ShieldCheck size={26} className="shop-trust-icon" />
                </div>
                <div className="shop-trust-text">
                  <div className="shop-trust-val-row">
                    <span className="shop-trust-val">100%</span>
                    <span className="shop-trust-title">
                      Verified Provenance
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                className="shop-trust-card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.19,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="shop-trust-icon-box">
                  <Globe size={26} className="shop-trust-icon" />
                </div>
                <div className="shop-trust-text">
                  <div className="shop-trust-val-row">
                    <span className="shop-trust-val">Tier-1</span>
                    <span className="shop-trust-title">Global Logistics</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Marques */}
      <BrandAtelier
        brands={carBrands.filter((brand) => brand !== "ALL BRANDS")}
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          setBodySilhouette("");
          setPriceRange(minPrice);
          scrollToMarketplace();
        }}
      />

      {/* Drive Categories */}
      <DriveCategories
        onSelectCategory={(bodyType) => {
          setSelectedBrand("ALL BRANDS");
          setBodySilhouette(bodyType);
          setPriceRange(minPrice);
          scrollToMarketplace();
        }}
      />

      {/* Editorial Spotlight */}
      <EditorialSpotlight
        onExplore={() => {
          setSelectedBrand("Porsche");
          setBodySilhouette("Coupe");
          setPriceRange(minPrice);
          scrollToMarketplace();
        }}
      />

      {/* Signature Selection */}
      <section className="featured-section">
        <motion.div
          className="shop-section-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="shop-eyebrow">Signature Selection</span>
          <h2 className="shop-display-title">Exceptional Automobiles</h2>
          <p className="shop-section-description">
            A rare ensemble of limited-production icons and showroom
            centerpieces available for immediate allocation.
          </p>
        </motion.div>

        <div className="featured-grid">
          {featCars.map((car, index) => (
            <motion.div
              key={car.id}
              className="featured-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <FeaturedCard
                id={car.id}
                album={car.album}
                model={car.model}
                info={car.info}
                price={car.price}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Concierge CTA */}
      <section className="concierge-cta-section">
        <motion.div
          className="concierge-cta-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="concierge-cta-ambient" />
          <div className="concierge-cta-copy">
            <span className="concierge-cta-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
              <Sparkles size={13} className="text-[#00ff87]" />
              Private Concierge Desk
            </span>
            <h2 className="concierge-cta-title">
              Seeking something <em>extraordinary?</em>
            </h2>
            <p className="concierge-cta-text">
              Let our AI Concierge curate a tailored shortlist from the live
              catalog based on your performance intent, design aesthetic, and
              acquisition timeline.
            </p>
            <div className="concierge-cta-actions">
              <button
                type="button"
                onClick={() => openConcierge()}
                className="concierge-cta-primary group"
              >
                <Sparkles
                  size={15}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                <span>Begin Private Consultation</span>
              </button>
              <span className="concierge-cta-note">
                Catalog-grounded • Discreet • 24/7 Availability
              </span>
            </div>
          </div>

          <div
            className="concierge-cta-aside"
            aria-label="Example concierge requests"
          >
            <span className="concierge-cta-aside-label">Curated Inquiries</span>
            <div className="concierge-cta-prompts">
              {[
                "A bespoke grand tourer under $120k",
                "Silent electric luxury with supercar agility",
                "Pure naturally aspirated track character",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => openConcierge(undefined, prompt)}
                  className="concierge-cta-prompt"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marketplace Section */}
      <section ref={marketplaceRef} className="marketplace-section">
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
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#091a11]/90 border border-[#00ff87]/30 text-[#dae6d8] hover:border-[#00ff87] transition-all shadow-[0_0_25px_rgba(0,255,135,0.1)] active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87]">
                <SlidersHorizontal size={20} />
              </div>
              <div className="text-left">
                <span
                  className="block text-xs font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
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
                  title="Reset all filters"
                >
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
              <label className="filter-label">Price Floor</label>
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
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                No Matching Vehicles Available
              </h3>
              <p className="text-slate-400 text-xs md:text-sm max-w-md mb-6 leading-relaxed">
                No vehicles currently meet your specified criteria. Try
                adjusting your manufacturer, body silhouette, or price floor
                parameters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff87] text-[#050e0a] hover:bg-emerald-300 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,135,0.25)] active:scale-[0.98] cursor-pointer"
              >
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
                  style={{ animationDelay: `${index * 50}ms` }}
                >
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
      </section>

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
              className="w-full max-w-lg bg-[#050e0a]/95 border border-[#00ff87]/30 rounded-3xl p-6 shadow-[0_0_60px_rgba(0,255,135,0.2)] flex flex-col gap-6 max-h-[88vh] overflow-y-auto my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#00ff87]/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="text-[#00ff87]" size={20} />
                  <h2
                    className="text-lg font-bold text-white tracking-widest uppercase"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
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
                      className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-[#00ff87] hover:bg-[#00ff87]/10 px-2.5 py-1 rounded-lg border border-[#00ff87]/20 transition-all cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      <span>Reset</span>
                    </button>
                  )}
                  <button
                    onClick={handleCancelMobileFilters}
                    className="p-2 hover:text-[#00ff87] text-slate-400 transition-colors rounded-full hover:bg-white/5 active:scale-95 cursor-pointer"
                    aria-label="Close filter options"
                  >
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
                  className="flex-1 py-3.5 px-4 rounded-xl border border-white/15 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10"
                >
                  <X size={15} />
                  <span>Cancel</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyMobileFilters}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#00ff87] text-[#050e0a] hover:bg-emerald-300 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,135,0.3)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
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
