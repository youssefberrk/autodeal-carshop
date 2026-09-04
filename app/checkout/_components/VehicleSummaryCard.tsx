"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  Gauge,
  ArrowRight,
  X,
  Pencil,
  Plus,
  Minus,
  Check,
  Palette,
  Tag,
  BatteryCharging,
  Package,
} from "lucide-react";
import { useCarStore } from "@/store/useCarStore";
import { carsData } from "@/public/cars/CarsData";
import { Car } from "@/types/Order";
import { getValidImageSrc } from "@/lib/utils";

interface VehicleSummaryCardProps {
  car: Car;
  index: number;
  onUnlockSlot: (carId: number) => void;
}

export default function VehicleSummaryCard({
  car,
  index,
  onUnlockSlot,
}: VehicleSummaryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);

  const [tempQuantity, setTempQuantity] = useState(car.quantity || 1);

  const { quantityChosen, updateCarColor } = useCarStore();

  const quantity = car.quantity || 1;
  const itemTotal = car.price * quantity;

  // Retrieve car details & colors from catalog
  const catalogCar = carsData.find((c) => c.id === car.id);
  const availableColors =
    catalogCar?.colors && catalogCar.colors.length > 0
      ? catalogCar.colors
      : [
          { id: "signature-emerald", hex: "#00ff87" },
          { id: "nero-black", hex: "#0a0a0a" },
          { id: "rosso-red", hex: "#e63946" },
          { id: "bianco-white", hex: "#ffffff" },
          { id: "blu-nethuns", hex: "#1e3a8a" },
        ];
  const maxAvailability = catalogCar?.availability || 5;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleColorSelect = (colorObj: { id: string; hex: string }) => {
    updateCarColor(car.id, colorObj);
    setIsColorModalOpen(false);
  };

  const handleOpenQuantityModal = () => {
    setTempQuantity(car.quantity || 1);
    setIsQuantityModalOpen(true);
  };

  const handleConfirmQuantity = () => {
    quantityChosen(tempQuantity, car.id);
    setIsQuantityModalOpen(false);
  };

  return (
    <article
      ref={cardRef}
      style={
        {
          "--stagger-delay": `${index * 60}ms`,
        } as React.CSSProperties
      }
      className={`group relative overflow-hidden rounded-2xl border border-[#dae6d8]/10 bg-gradient-to-b from-[#091b12]/95 via-[#06140d]/90 to-[#030b07]/95 p-4 sm:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl
				transition-[transform,opacity,border-color,box-shadow] duration-500 ease-out
				${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
				hover:border-[#00ff87]/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_20px_40px_-10px_rgba(0,0,0,0.7),0_0_24px_rgba(0,255,135,0.08)]
				motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100`}
    >
      {/* Ambient studio glow behind vehicle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(0,255,135,0.08)_0%,transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
      />

      {/* Top Bar: Slot allocation & Live reservation beacon */}
      <div className="relative z-10 mb-3.5 flex items-center justify-between gap-3 border-b border-[#dae6d8]/8 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00ff87]/25 bg-[#00ff87]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#00ff87] shadow-[0_0_10px_rgba(0,255,135,0.1)] font-['Orbitron']">
            <BatteryCharging
              size={11}
              aria-hidden="true"
              className="animate-pulse"
            />
            Slot {String(index + 1).padStart(2, "0")}
          </span>
          {car.badge && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#00ff87]/20 bg-[#0a2318]/70 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#dae6d8]/90">
              <Tag size={10} className="text-[#00ff87]" aria-hidden="true" />
              {car.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff87] opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff87] shadow-[0_0_6px_#00ff87]" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#00ff87]/80 font-['Orbitron']">
            Reserved
          </span>
        </div>
      </div>

      {/* Main Content Area: Side-by-side layout */}
      <div className="relative z-10 mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-center">
        {/* Vehicle Image Stage */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#dae6d8]/10 bg-gradient-to-b from-[#0a1f15] via-[#040e08] to-[#020704] p-2 transition-[border-color] duration-300 group-hover:border-[#00ff87]/25 sm:aspect-[4/3]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_60%,rgba(0,255,135,0.12)_0%,rgba(3,13,8,0.4)_60%,transparent_100%)]"
          />
          <Image
            src={getValidImageSrc(car.image)}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-contain object-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
          />
        </div>

        {/* Title, Brand, and Spec Details */}
        <div className="min-w-0 flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00ff87] font-['Orbitron'] mb-0.5">
            {car.brand}
          </p>
          <h3 className="truncate font-['Newsreader'] text-xl font-bold italic tracking-tight text-[#e5efe3] transition-colors duration-200 group-hover:text-[#00ff87] sm:text-2xl mb-2.5">
            {car.model}
          </h3>

          {/* Spec Chips Matrix */}
          <div className="grid grid-cols-2 gap-2">
            {/* Body Style Chip */}
            <div className="flex items-center gap-1.5 rounded-lg border border-[#dae6d8]/8 bg-[#040e08]/75 px-2 py-1.5 backdrop-blur-sm">
              <Gauge
                size={11}
                className="text-[#00ff87] shrink-0"
                aria-hidden="true"
              />
              <span className="truncate text-[11px] font-semibold text-[#e5efe3]">
                {car.bodySilhouette || "Performance"}
              </span>
            </div>

            {/* Interactive Color Switcher Chip */}
            <button
              type="button"
              onClick={() => setIsColorModalOpen(true)}
              title="Click to customize exterior finish"
              className="flex items-center justify-between gap-1.5 rounded-lg border border-[#dae6d8]/15 bg-[#040e08]/90 px-2 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-[#00ff87]/50 hover:bg-[#00ff87]/10 active:scale-[0.97] group/color cursor-pointer min-w-0"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/40 shadow-[0_0_6px_rgba(255,255,255,0.3)] transition-transform duration-200 group-hover/color:scale-110"
                  style={{ backgroundColor: car.color?.hex || "#00ff87" }}
                  aria-hidden="true"
                />
                <span className="truncate text-[11px] font-semibold text-[#e5efe3] group-hover/color:text-[#00ff87]">
                  {car.color?.id || "Signature"}
                </span>
              </div>
              <Pencil
                size={10}
                className="text-[#00ff87]/70 shrink-0 transition-transform duration-200 group-hover/color:scale-110 group-hover/color:text-[#00ff87]"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Custom specs note if provided */}
      {car.specs && (
        <div className="relative z-10 mb-3.5 rounded-lg border-l-2 border-[#00ff87] bg-[#00ff87]/5 py-1.5 pl-3 pr-2.5 text-xs leading-relaxed text-[#dae6d8]/70">
          {car.specs}
        </div>
      )}

      {/* Subtotal & Interactive Quantity Summary Line */}
      <div className="relative z-10 mb-3.5 flex items-center justify-between border-t border-[#dae6d8]/10 pt-3">
        <button
          type="button"
          onClick={handleOpenQuantityModal}
          title="Click to modify car quantity"
          className="flex items-center gap-2 rounded-lg border border-[#dae6d8]/10 bg-[#040e08]/60 px-2.5 py-1 text-[#dae6d8]/80 transition-all duration-200 hover:border-[#00ff87]/40 hover:bg-[#00ff87]/10 hover:text-[#00ff87] active:scale-[0.97] cursor-pointer group/qty"
        >
          <Package
            size={14}
            className="text-[#00ff87] group-hover/qty:scale-110 transition-transform"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold">
            Qty:{" "}
            <strong className="text-[#00ff87] font-bold">{quantity}</strong>
          </span>
          <Pencil
            size={10}
            className="text-[#00ff87]/70 ml-0.5 shrink-0 transition-transform duration-200 group-hover/qty:scale-110 group-hover/qty:text-[#00ff87]"
          />
        </button>

        <div className="text-right">
          <span className="text-xs text-[#dae6d8]/50 mr-1.5 uppercase font-['Orbitron'] tracking-wider text-[9px]">
            Slot Total:
          </span>
          <span className="text-base font-bold text-[#00ff87] tabular-nums sm:text-lg">
            ${itemTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="relative z-10 flex items-center gap-2 pt-0.5">
        <Link
          href={`/details/${car.id}`}
          className="group/link flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#00ff87]/30 bg-[#00ff87]/10 py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-[#e5efe3]
						transition-[transform,background-color,border-color,color] duration-150 ease-out
						[@media(hover:hover)_and_(pointer:fine)]:hover:border-[#00ff87] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#00ff87]/20 [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#00ff87]
						active:scale-[0.97]
						focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff87]"
        >
          <span>View Details</span>
          <ArrowRight
            size={13}
            className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/link:translate-x-0.5"
          />
        </Link>

        <button
          type="button"
          onClick={() => onUnlockSlot(car.id)}
          aria-label={`Remove ${car.brand} ${car.model} from allocation`}
          className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-red-400/90
						transition-[transform,background-color,border-color,color] duration-150 ease-out
						[@media(hover:hover)_and_(pointer:fine)]:hover:border-red-500/40 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-red-500/15 [@media(hover:hover)_and_(pointer:fine)]:hover:text-red-300
						active:scale-[0.97]
						focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          <X size={13} aria-hidden="true" />
          <span className="hidden sm:inline">Unlock Slot</span>
          <span className="sm:hidden">Remove</span>
        </button>
      </div>

      {/* ── COLOR SELECTION MODAL ───────────────────────────────────────────── */}
      {isColorModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Select finish for ${car.brand} ${car.model}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsColorModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#00ff87]/30 bg-gradient-to-b from-[#0a1e14] via-[#05140c] to-[#020a05] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_30px_rgba(0,255,135,0.15)] transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#dae6d8]/10 pb-3.5 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87]">
                  <Palette size={16} />
                </div>
                <div>
                  <h4 className="text-base font-bold font-['Newsreader'] italic text-[#e5efe3]">
                    Bespoke Exterior Finish
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00ff87] font-['Orbitron']">
                    {car.brand} {car.model}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsColorModalOpen(false)}
                className="rounded-full p-1.5 text-[#dae6d8]/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Color Swatch Options */}
            <div className="space-y-2 mb-5 max-h-60 overflow-y-auto luxury-scrollbar pr-1">
              {availableColors.map((colorObj) => {
                const isSelected =
                  car.color?.id?.toLowerCase() === colorObj.id.toLowerCase() ||
                  car.color?.hex?.toLowerCase() === colorObj.hex.toLowerCase();

                return (
                  <button
                    key={colorObj.id}
                    type="button"
                    onClick={() => handleColorSelect(colorObj)}
                    className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 active:scale-[0.98] ${
                      isSelected
                        ? "border-[#00ff87] bg-[#00ff87]/15 text-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.15)]"
                        : "border-[#dae6d8]/10 bg-[#040e08]/80 text-[#e5efe3] hover:border-[#00ff87]/40 hover:bg-[#00ff87]/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-5 w-5 rounded-full border border-white/40 shadow-md shrink-0 relative"
                        style={{ backgroundColor: colorObj.hex }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full ring-2 ring-[#00ff87] ring-offset-2 ring-offset-[#05140c]" />
                        )}
                      </span>
                      <span className="text-xs font-semibold capitalize tracking-wide">
                        {colorObj.id.replace(/-/g, " ")}
                      </span>
                    </div>

                    {isSelected && (
                      <Check size={16} className="text-[#00ff87]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsColorModalOpen(false)}
                className="w-full rounded-xl border border-[#dae6d8]/20 bg-[#dae6d8]/5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#dae6d8] hover:bg-[#dae6d8]/15 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── QUANTITY SELECTION MODAL ────────────────────────────────────────── */}
      {isQuantityModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Adjust quantity for ${car.brand} ${car.model}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsQuantityModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#00ff87]/30 bg-gradient-to-b from-[#0a1e14] via-[#05140c] to-[#020a05] p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_30px_rgba(0,255,135,0.15)] transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#dae6d8]/10 pb-3.5 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87]">
                  <Package size={16} />
                </div>
                <div>
                  <h4 className="text-base font-bold font-['Newsreader'] italic text-[#e5efe3]">
                    Allocation Quantity
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00ff87] font-['Orbitron']">
                    {car.brand} {car.model}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuantityModalOpen(false)}
                className="rounded-full p-1.5 text-[#dae6d8]/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Stepper & Selector */}
            <div className="space-y-4 mb-5">
              <p className="text-xs text-[#dae6d8]/70 leading-relaxed text-center">
                Select build slots for this vehicle. Maximum available:{" "}
                <span className="text-[#00ff87] font-bold">
                  {maxAvailability} Units
                </span>
              </p>

              {/* Stepper control */}
              <div className="flex items-center justify-center gap-4 py-2">
                <button
                  type="button"
                  disabled={tempQuantity <= 1}
                  onClick={() =>
                    setTempQuantity((prev) => Math.max(1, prev - 1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dae6d8]/20 bg-[#040e08] text-white transition-all hover:border-[#00ff87]/50 hover:bg-[#00ff87]/10 disabled:opacity-30 disabled:pointer-events-none active:scale-95 cursor-pointer"
                >
                  <Minus size={16} />
                </button>

                <span className="text-2xl font-bold font-['Orbitron'] text-[#00ff87] min-w-12 text-center">
                  {tempQuantity}
                </span>

                <button
                  type="button"
                  disabled={tempQuantity >= maxAvailability}
                  onClick={() =>
                    setTempQuantity((prev) =>
                      Math.min(maxAvailability, prev + 1),
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dae6d8]/20 bg-[#040e08] text-white transition-all hover:border-[#00ff87]/50 hover:bg-[#00ff87]/10 disabled:opacity-30 disabled:pointer-events-none active:scale-95 cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Price Calculation Box */}
              <div className="rounded-xl border border-[#dae6d8]/10 bg-[#040e08]/90 p-3 text-xs flex justify-between items-center">
                <span className="text-[#dae6d8]/60">Updated Slot Total</span>
                <span className="text-sm font-bold text-[#00ff87] tabular-nums">
                  ${(car.price * tempQuantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsQuantityModalOpen(false)}
                className="flex-1 rounded-xl border border-[#dae6d8]/20 bg-[#dae6d8]/5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#dae6d8] hover:bg-[#dae6d8]/15 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmQuantity}
                className="flex-1 rounded-xl border border-[#00ff87]/40 bg-[#00ff87]/10 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00ff87] hover:bg-[#00ff87]/20 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
