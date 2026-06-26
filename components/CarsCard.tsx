"use client";

import { Cars } from "@/types/Cars";

import { Heart, CircleOff } from "lucide-react";
import Image from "next/image";

import { useCarStore } from "@/store/useCarStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import QuickViewModal from "./ui/QuickViewModal";

const CarsCard = ({
  id,
  image,
  carAlbum,
  badge,
  brand,
  model,
  bodySilhouette,
  specs,
  price,
}: Cars) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isQuickViewClicked, setIsQuickViewClicked] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addToWhishList, removeFromWhishList } = useCarStore();

  const isLiked = useCarStore(
    (state) => state.whishListCars?.some((car) => car.id === id) || false,
  );

  const handleFavorite = () => {
    const carItem = {
      id,
      brand,
      model: model || "",
      price:
        typeof price === "number"
          ? price
          : parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0,
      image: image || "",
      badge,
      bodySilhouette,
      specs,
    };

    if (!isLiked) {
      addToWhishList(carItem);
    } else {
      removeFromWhishList(carItem);
    }
  };

  return (
    <div
      className="relative cars-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="card-image-wrap">
        <Image
          src={carAlbum.photo1}
          alt={`${brand} ${model}`}
          fill
          className="card-image object-cover"
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
            handleFavorite();
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
          <button
            onClick={() => {
              setIsQuickViewClicked((prev) => !prev);
              console.log(isQuickViewClicked);
            }}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewClicked && (
          <QuickViewModal
            car={{ id, image, carAlbum, badge, brand, model, bodySilhouette, specs, price }}
            setIsQuickViewClicked={setIsQuickViewClicked}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="card-content">
        <div className="card-header">
          <div className="card-brand-wrap">
            <p className="card-brand">{brand}</p>
            <h3 className="card-model uppercase">{model}</h3>
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
      </div>
    </div>
  );
};

export default CarsCard;
