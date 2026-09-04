"use client";
import VehicleSummaryCard from "./VehicleSummaryCard";
import { useEffect, useRef, useState } from "react";
import { Car } from "@/types/Order";
import { CheckCircle2, Sparkles } from "lucide-react";

interface OrderSummaryProps {
  cars: Car[];
  subtotal: number;
  customConfiguration: number;
  deliveryFee: number;
  totalAllocation: number;
  onUnlockSlot: (carId: number) => void;
}

// --- Price lock sweep signature animation ---
// Plays once when the pricing card enters the viewport.
// A fine green line clips left-to-right across the total number, then fades.
function usePriceLock() {
  const ref = useRef<HTMLDivElement>(null);
  const [swept, setSwept] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !swept) {
          // Small delay so the card itself can finish animating in first
          setTimeout(() => setSwept(true), 300);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [swept]);

  return { ref, swept };
}

export default function OrderSummary({
  cars,
  subtotal,
  customConfiguration,
  deliveryFee,
  totalAllocation,
  onUnlockSlot,
}: OrderSummaryProps) {
  const { ref: priceLockRef, swept: priceLocked } = usePriceLock();

  return (
    <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-24 lg:self-start space-y-6">
      {/* Header */}
      <header className="flex items-end justify-between border-b border-[#dae6d8]/10 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#00ff87] font-bold mb-1.5 flex items-center gap-1.5 font-['Orbitron']">
            <Sparkles size={12} aria-hidden="true" /> Reservation Summary
          </span>
          <h2 className="text-3xl md:text-4xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3]">
            Allocated Vehicles
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-[#00ff87] font-bold bg-[#00ff87]/10 px-3 py-1 rounded-full border border-[#00ff87]/20 font-['Orbitron']">
            {cars.length} {cars.length === 1 ? "Vehicle" : "Vehicles"}
          </span>
        </div>
      </header>

      {/* Scrollable vehicle list */}
      <div className="space-y-4 overflow-y-auto max-h-[620px] pr-2 pb-2 luxury-scrollbar rounded-2xl">
        {cars.map((car, index) => (
          <VehicleSummaryCard
            key={car.id}
            car={car}
            index={index}
            onUnlockSlot={onUnlockSlot}
          />
        ))}
      </div>

      {/* Pricing Summary Card */}
      <div
        ref={priceLockRef}
        className="bg-[#2a3c34]/85 backdrop-blur-2xl p-6 border border-[#00ff87]/20 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_25px_rgba(0,255,135,0.04)] space-y-4"
      >
        {/* Line items */}
        <div className="space-y-3 pb-4 border-b border-[#dae6d8]/10 text-xs">
          {/* Subtotal MSRP — base price dot */}
          <div className="flex justify-between items-center tracking-wide">
            <span className="flex items-center gap-2 text-[#dae6d8]/60">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#e5efe3]/40 shrink-0"
                aria-hidden="true"
              />
              Subtotal MSRP
            </span>
            <span className="font-bold text-[#e5efe3] tabular-nums">
              ${subtotal.toLocaleString()}
            </span>
          </div>
          {/* Custom config — add-on amber dot */}
          <div className="flex justify-between items-center tracking-wide">
            <span className="flex items-center gap-2 text-[#dae6d8]/60">
              <span
                className="h-1.5 w-1.5 rounded-full bg-amber-400/60 shrink-0"
                aria-hidden="true"
              />
              Bespoke Custom Configuration
            </span>
            <span className="font-bold text-[#e5efe3] tabular-nums">
              ${customConfiguration.toLocaleString()}
            </span>
          </div>
          {/* Delivery — logistics teal dot */}
          <div className="flex justify-between items-center tracking-wide">
            <span className="flex items-center gap-2 text-[#dae6d8]/60">
              <span
                className="h-1.5 w-1.5 rounded-full bg-sky-400/60 shrink-0"
                aria-hidden="true"
              />
              Global Delivery &amp; Concierge
            </span>
            <span className="font-bold text-[#e5efe3] tabular-nums">
              ${deliveryFee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Total row — signature price lock sweep */}
        <div className="flex justify-between items-end pt-1">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#00ff87] font-bold mb-1 font-['Orbitron']">
              Total Allocation
            </span>
            {/*
             * Price lock sweep: a ::after pseudo element (via Tailwind's after:) clips
             * left-to-right across the number using clip-path. We drive this via a
             * data attribute to keep it in CSS land — animating clip-path is GPU-accelerated.
             */}
            <div className="relative inline-block">
              <span
                data-price-locked={priceLocked}
                className={`text-3xl md:text-4xl font-bold font-['Newsreader'] italic tracking-tight text-[#00ff87]
									transition-[filter] duration-700 ease-out
									${priceLocked ? "drop-shadow-[0_0_20px_rgba(0,255,135,0.3)]" : "drop-shadow-[0_0_10px_rgba(0,255,135,0.1)]"}`}
              >
                ${totalAllocation.toLocaleString()}
              </span>
              {/* Scan-line sweep overlay */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-sm
									bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,135,0.18)_50%,transparent_100%)]
									transition-[clip-path,opacity] motion-reduce:hidden
									${
                    priceLocked
                      ? "clip-path-[inset(0_0%_0_0)] opacity-0 duration-[1400ms]"
                      : "clip-path-[inset(0_100%_0_0)] opacity-100 duration-0"
                  }`}
                style={{
                  clipPath: priceLocked
                    ? "inset(0 0% 0 0)"
                    : "inset(0 100% 0 0)",
                  transitionProperty: "clip-path, opacity",
                  transitionDuration: priceLocked ? "700ms, 800ms" : "0ms, 0ms",
                  transitionDelay: priceLocked ? "0ms, 700ms" : "0ms, 0ms",
                  transitionTimingFunction:
                    "cubic-bezier(0.22, 1, 0.36, 1), ease",
                }}
              />
            </div>
          </div>

          {/* Price guaranteed badge */}
          <div
            className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#00ff87] font-bold bg-[#00ff87]/10 px-3 py-1.5 rounded-full border border-[#00ff87]/20 font-['Orbitron']
							transition-[opacity,transform] duration-500 ease-out
							${priceLocked ? "opacity-100 translate-y-0" : "opacity-50 translate-y-1"}`}
          >
            <CheckCircle2 size={12} aria-hidden="true" />
            Price Guaranteed
          </div>
        </div>
      </div>
    </div>
  );
}
