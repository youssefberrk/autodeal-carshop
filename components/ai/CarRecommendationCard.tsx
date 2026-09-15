"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Cars } from "@/types/Cars";
import { CarRecommendation } from "@/types/Concierge";

interface CarRecommendationCardProps {
  car: Cars;
  recommendation: CarRecommendation;
}

const CarRecommendationCard = ({ car, recommendation }: CarRecommendationCardProps) => {
  const router = useRouter();

  return (
    <article className="ai-recommendation-card group">
      <div className="rec-card-image-wrap">
        <Image
          src={car.image || car.carAlbum?.photo1 || "/edited.png"}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 640px) 100vw, 420px"
          className="rec-card-image object-cover"
        />
        <div className="rec-card-overlay" />
        <span className="rec-card-badge">Curated Match</span>
      </div>

      <div className="rec-card-content">
        <div className="rec-card-header">
          <div className="rec-card-title">
            <p className="rec-card-brand">{car.brand}</p>
            <h4 className="rec-card-model uppercase">{car.model}</h4>
          </div>
          <div className="rec-card-price">
            <span className="rec-card-price-label">Guide Price</span>
            <span className="rec-card-price-val">
              {typeof car.price === "number" ? `$${car.price.toLocaleString()}` : car.price}
            </span>
          </div>
        </div>

        <div className="rec-card-details">
          <p className="rec-card-specs">{car.specs}</p>
          <div className="rec-card-reason-wrap">
            <span className="rec-card-reason-label">Concierge rationale</span>
            <p className="rec-card-reason">{recommendation.reason}</p>
          </div>
        </div>

        <button
          type="button"
          className="btn-details"
          onClick={() => router.push(`/details/${car.id}`)}
        >
          <span>View Vehicle Dossier</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CarRecommendationCard;
