import Image from "next/image";
import Link from "next/link";
import { featCars, carsData } from "@/public/cars/CarsData";
import type { Metadata } from "next";
import FeaturedCard from "@/components/FeaturedCard";
import CarsCard from "@/components/CarsCard";

export const metadata: Metadata = {
	title: "New Arrivals | AutoDeal - Fresh Inventory",
	description:
		"Discover the latest additions to our curated collection — newly listed luxury, exotic, and performance vehicles.",
	openGraph: {
		title: "New Arrivals | AutoDeal",
		description: "Discover the latest additions to our curated collection.",
	},
};

const newSpots = [
	{ label: "zero miles", desc: "Factory-fresh examples" },
	{ label: "certified", desc: "Manufacturer-backed warranty" },
	{ label: "concierge delivery", desc: "White-glove anywhere" },
];

export default function NewArrivalsPage() {
	const newCars = carsData
		.filter((c) => c.badge === "New" || c.badge === "Popular")
		.slice(0, 8);

	return (
		<div className="new-arrivals-page">
			{/* Hero */}
			<section className="hero-section">
				<Image
					src={featCars[0].album.photo1}
					alt="New arrivals"
					fill
					sizes="100vw"
					className="hero-image object-cover"
					priority
				/>
				<div className="hero-overlay" />
				<div className="hero-content">
					<span className="section-label">Fresh Inventory</span>
					<h1 className="hero-title">New Arrivals</h1>
					<p className="hero-subtitle">
						The latest additions to our global collection — each one
						hand-selected and meticulously inspected.
					</p>
				</div>
			</section>

			{/* What makes them new */}
			<section className="featured-section">
				<div className="section-header">
					<span className="section-label">The Standard</span>
					<h2 className="section-title uppercase">Why Our New Arrivals</h2>
				</div>
				<div className="new-spots-grid">
					{newSpots.map((spot) => (
						<div key={spot.label} className="new-spot-card">
							<div className="new-spot-dot" />
							<h3 className="new-spot-label">{spot.label}</h3>
							<p className="new-spot-desc">{spot.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Featured highlights */}
			<section className="featured-section" style={{ paddingTop: 0 }}>
				<div className="section-header">
					<span className="section-label">Headliners</span>
					<h2 className="section-title uppercase">Just Landed</h2>
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
			</section>

			{/* Full inventory */}
			<section className="marketplace-section" style={{ paddingTop: 0 }}>
				<div className="section-header">
					<span className="section-label">Browse All</span>
					<h2 className="section-title uppercase">New Inventory</h2>
					<p className="section-count">{newCars.length} vehicles available</p>
				</div>
				<div className="cars-grid">
					{newCars.map((car, index) => (
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
			</section>

			{/* CTA */}
			<section className="new-cta-section">
				<div className="new-cta-inner">
					<span className="section-label">Not seeing what you want?</span>
					<h2 className="new-cta-title">Bespoke Commission</h2>
					<p className="new-cta-text">
						Work directly with our curators to source the exact model,
						specification, and history you seek.
					</p>
					<Link
						href="/contact"
						className="btn-primary"
						style={{ display: "inline-flex" }}>
						Enquire Now
					</Link>
				</div>
			</section>
		</div>
	);
}
