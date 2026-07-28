import Image from "next/image";
import Link from "next/link";
import { carsData } from "@/public/cars/CarsData";
import type { Metadata } from "next";
import CarsCard from "@/components/CarsCard";

export const metadata: Metadata = {
  title: "Pre-Owned | AutoDeal - Certified Prestige Vehicles",
  description: "Browse our curated selection of pre-owned luxury, exotic, and performance vehicles — each fully inspected and certified.",
  openGraph: {
    title: "Pre-Owned | AutoDeal",
    description: "Browse our curated selection of pre-owned prestige vehicles.",
  },
};

const preOwnedHero = "/cars/shop-featured/g1.jpg";
const assurancePoints = [
  { label: "190-point inspection", desc: "Every vehicle undergoes a comprehensive mechanical & cosmetic audit." },
  { label: "service history", desc: "Full provenance documentation and service records verified." },
  { label: "extended warranty", desc: "Eligible for 12–24 month extended coverage plans." },
  { label: "30-day assurance", desc: "Drive with confidence — 30-day exchange guarantee included." },
];

export default function PreOwnedPage() {
  const preOwnedCars = carsData.filter((c) => c.badge !== "New").slice(0, 10);

  return (
    <div className="new-arrivals-page">
      {/* Hero */}
      <section className="hero-section">
        <Image
          src={preOwnedHero}
          alt="Pre-owned luxury vehicles"
          fill
          className="hero-image object-cover"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="section-label">Pre-Owned</span>
          <h1 className="hero-title">Certified Prestige</h1>
          <p className="hero-subtitle">
            Every pre-owned vehicle in our collection passes a rigorous certification process. Nothing less than showroom quality.
          </p>
        </div>
      </section>

      {/* Assurance */}
      <section className="featured-section">
        <div className="section-header">
          <span className="section-label">Your Peace of Mind</span>
          <h2 className="section-title uppercase">The Assurance Standard</h2>
        </div>
        <div className="new-spots-grid">
          {assurancePoints.map((point) => (
            <div key={point.label} className="new-spot-card">
              <div className="new-spot-dot" />
              <h3 className="new-spot-label">{point.label}</h3>
              <p className="new-spot-desc">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory */}
      <section className="marketplace-section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <span className="section-label">Browse Inventory</span>
          <h2 className="section-title uppercase">Pre-Owned Collection</h2>
          <p className="section-count">{preOwnedCars.length} hand-selected vehicles</p>
        </div>
        <div className="cars-grid">
          {preOwnedCars.map((car, index) => (
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
      </section>

      {/* CTA */}
      <section className="new-cta-section">
        <div className="new-cta-inner">
          <span className="section-label">Sell or Trade</span>
          <h2 className="new-cta-title">Value Your Vehicle</h2>
          <p className="new-cta-text">
            Looking to part ways with your current drive? Receive a competitive offer within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary" style={{ display: "inline-flex" }}>
            Get an Offer
          </Link>
        </div>
      </section>
    </div>
  );
}