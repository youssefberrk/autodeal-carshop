"use client";

import { Cars } from "@/types/Cars";
import { Heart, CircleOff } from "lucide-react";
import Image from "next/image";
import { useCarStore } from "@/store/useCarStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const CarsCard = ({
  id,
  image,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addToWhishList, removeFromWhishList } = useCarStore();

  const isLiked = useCarStore(
    (state) => state.whishListCars?.some((car) => car.id === id) || false,
  );

  const [toast, setToast] = useState<{
    show: boolean;
    visible: boolean;
    message: string;
    type: "add" | "remove";
  } | null>(null);

  // Manage toast notification lifecycle
  useEffect(() => {
    if (!toast || !toast.show) return;

    if (toast.visible) {
      const fadeOutTimer = setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, visible: false } : null));
      }, 2500);
      return () => clearTimeout(fadeOutTimer);
    } else {
      const unmountTimer = setTimeout(() => {
        setToast(null);
      }, 300);
      return () => clearTimeout(unmountTimer);
    }
  }, [toast?.visible, toast?.message]);

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
      setToast({
        show: true,
        visible: true,
        message: "Added successfully to your wish list",
        type: "add",
      });
    } else {
      removeFromWhishList(carItem);
      setToast({
        show: true,
        visible: true,
        message: "Removed from your wish list",
        type: "remove",
      });
    }
  };

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
      {mounted &&
        toast &&
        toast.show &&
        createPortal(
          <div className={`fav-notif ${toast.visible ? "show" : ""}`}>
            <div className={`fav-notif-icon ${toast.type}`}>
              {toast.type === "add" ? (
                <Heart className="w-3.5 h-3.5 fill-[#00ff87] text-[#00ff87]" />
              ) : (
                <CircleOff className="w-3.5 h-3.5" />
              )}
            </div>
            <span>{toast.message}</span>
            <div className="progress-bar" />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default CarsCard;
