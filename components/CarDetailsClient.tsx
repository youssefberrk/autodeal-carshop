"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useCarStore } from "@/store/useCarStore";
import {
  ChevronRight,
  Minus,
  Plus,
  Zap,
  Gauge,
  User,
  ArrowDown,
  Settings2,
  BarChart3,
  Heart,
  Cpu,
  Wind,
  Maximize,
  ShieldCheck,
  CircleOff,
  type LucideIcon,
  OctagonMinus,
} from "lucide-react";
import { Cars } from "@/types/Cars";
import ImageSlider from "./ui/ImageSlider";
import { Car } from "@/types/Order";
import Image from "next/image";
import Link from "next/link";
import { carsData } from "@/public/cars/CarsData";
import CarsCard from "./CarsCard";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface CarColor {
  id: string;
  hex: string;
}

const iconMap: Record<string, LucideIcon> = {
  ArrowDown,
  Settings2,
  BarChart3,
  Zap,
  Cpu,
  Wind,
  Maximize,
  ShieldCheck,
  User,
  CircleOff,
  Gauge,
};

export interface CarDetailsClientProps {
  car: Cars;
}

const CarDetailsClient = ({ car }: CarDetailsClientProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedColor, setSelectedColor] = useState({
    id: car.colors?.[0]?.id || "blue",
    hex: car.colors?.[0]?.hex || "#00ff87",
  });
  const [activeImage, setActiveImage] = useState(0);

  // Reset active image when car changes
  useEffect(() => {
    setActiveImage(0);
  }, [car.id]);

  const handleImageChange = useCallback((idx: number) => {
    setActiveImage(idx);
  }, []);

  const {
    addToAllocation,
    removeFromAllocation,
    allocatedCars,
    quantityChosen,
    addToWhishList,
    removeFromWhishList,
    whishListCars,
    quant,
  } = useCarStore();

  const isFavorite = whishListCars?.some((c) => c.id === car.id) || false;

  // Check if this car is already allocated
  const isAllocated = allocatedCars.some((c) => c.id === car.id);

  // Get thumbnails from car album
  const thumbnails = useMemo(
    () =>
      (car.carAlbum
        ? [
            car.carAlbum.photo1,
            car.carAlbum.photo2,
            car.carAlbum.photo3,
          ].filter(Boolean)
        : [car.image].filter(Boolean)) as string[],
    [car.carAlbum, car.image],
  );

  // Specs data
  const specs = [
    { icon: Zap, label: "Performance", value: car.specs || "High Performance" },
    { icon: Gauge, label: "Type", value: car.bodySilhouette },
    { icon: Settings2, label: "Brand", value: car.brand },
    { icon: User, label: "Model", value: car.model || "GT Edition" },
  ];

  // Features data
  const features: FeatureItem[] = car.features || [
    {
      icon: "ArrowDown",
      title: "Active Aerodynamics",
      description:
        "Engineered for maximum downforce and stability at high speeds.",
    },
    {
      icon: "Settings2",
      title: "Precision Engineering",
      description:
        "Every component is tuned for the ultimate driving experience.",
    },
    {
      icon: "BarChart3",
      title: "Performance Tracking",
      description:
        "Integrated telemetry systems to monitor your vehicle's health.",
    },
  ];

  // Colors from car data
  const colors: CarColor[] = car.colors || [];

  // Similar cars logic
  const similarCars = carsData
    .filter((c) => c.bodySilhouette === car.bodySilhouette && c.id !== car.id)
    .sort((a, b) => {
      // Prioritize same brand
      if (a.brand === car.brand && b.brand !== car.brand) return -1;
      if (a.brand !== car.brand && b.brand === car.brand) return 1;
      return 0;
    })
    .slice(0, 4);

  // Handle allocation click - toggle between add/remove
  const handleAllocation = () => {
    if (isAllocated) {
      // Remove from garage
      removeFromAllocation(car.id!);
    } else {
      // Add to garage
      addToAllocation({
        id: car.id!,
        brand: car.brand,
        model: car.model || "",
        price: typeof car.price === "number" ? car.price : 0,
        color: selectedColor,
        image: car.image || "",
        badge: car.badge,
        bodySilhouette: car.bodySilhouette,
        specs: car.specs,
        quantity: quantity,
      });
    }
  };
  const handleQuantity = () => {
    const maxAvailability = car.availability ?? 0;
    if (quantity < maxAvailability) {
      const nextQuantity = quantity + 1;
      setQuantity(nextQuantity);
      quantityChosen(nextQuantity, car.id);
      return;
    } else {
      setIsAvailable(false);
    }
    console.log(quant);
  };

  const handleAddToWishList = () => {
    if (isFavorite) {
      removeFromWhishList({ id: car.id! } as Car);
    } else {
      addToWhishList({
        id: car.id!,
        brand: car.brand,
        model: car.model || "",
        price: typeof car.price === "number" ? car.price : 0,
        color: selectedColor,
        image: car.image || "",
        badge: car.badge,
        bodySilhouette: car.bodySilhouette,
        specs: car.specs,
        quantity: quantity,
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b140e] text-[#e5efe3] font-['Manrope']">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,255,135,0.18),transparent_38%),radial-gradient(circle_at_82%_0%,rgba(148,163,184,0.14),transparent_32%),linear-gradient(to_bottom,rgba(20,34,25,0.85),rgba(10,16,12,0.98))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(229,239,227,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,239,227,0.2)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 pt-10 sm:px-10 lg:px-16">
        {/* Navigation Breadcrumb */}
        <nav className="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#e5efe3]/45 sm:mb-16">
          <Link
            href="/"
            className="transition-colors duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:text-[#00ff87]"
          >
            Home
          </Link>
          <ChevronRight size={10} />
          <Link
            href="/shop"
            className="transition-colors duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:text-[#00ff87]"
          >
            Shop
          </Link>
          <ChevronRight size={10} />
          <span className="text-[#e5efe3]">
            {car.brand} {car.model}
          </span>
        </nav>

        {/* Main Hero Section */}
        <section className="mb-24 sm:mb-32">
          <div className="mb-10 sm:mb-12">
            {/* Eyebrow label */}
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#00ff87]/70"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {car.bodySilhouette} · {car.badge ?? "Performance"}
            </p>

            {/* Brand + Model — single line */}
            <h1 className="flex flex-wrap items-baseline gap-x-6 leading-none">
              <span
                className="text-[clamp(1.8rem,4.5vw,3.8rem)] font-black uppercase tracking-[-0.03em] text-transparent select-none"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  WebkitTextStroke: "1px rgba(229,239,227,0.22)",
                }}
              >
                {car.brand}
              </span>
              <span
                className="text-[clamp(2rem,5.5vw,4.5rem)] font-medium italic tracking-[-0.01em] bg-gradient-to-br from-[#f1f3f5] via-[#c8ccd1] to-[#eef1f4] bg-clip-text text-transparent"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {car.model}
              </span>
            </h1>

            {/* Accent rule */}
            <div className="mt-4 flex items-center gap-3">
              <span className="h-[1.5px] w-10 rounded-full bg-[#00ff87]" />
              <span className="h-px flex-1 rounded-full bg-[#e5efe3]/8" />
            </div>
          </div>

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Gallery Column */}
            <div className="lg:col-span-7">
              <div className="group relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-[#e5efe3]/10 bg-[#111c15] shadow-[0_30px_70px_-42px_rgba(0,0,0,0.85)]">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0c160e]/25 to-transparent opacity-80" />
                <ImageSlider
                  album={thumbnails}
                  activeImage={activeImage}
                  onImageChange={handleImageChange}
                />
              </div>
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-video overflow-hidden rounded-lg border bg-[#141e16] transition-[opacity,transform,border-color] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                      activeImage === idx
                        ? "border-[#00ff87] opacity-100"
                        : "border-[#e5efe3]/10 opacity-60 hover:border-[#00ff87]/35 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Configuration Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="max-w-xl rounded-2xl border border-[#e5efe3]/10 bg-[linear-gradient(145deg,rgba(20,32,24,0.82),rgba(12,21,16,0.68))] p-6 shadow-[0_26px_70px_-48px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-8">
                <p className="mb-3 font-['Newsreader'] text-2xl italic text-[#e5efe3] sm:text-3xl">
                  {car.bodySilhouette} excellence in its purest form.
                </p>
                <div className="mb-8 border-l-2 border-[#00ff87]/60 pl-4">
                  <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#e5efe3]/45">
                    Starting At
                  </span>
                  <span className="text-4xl font-bold font-['Manrope'] text-[#00ff87] sm:text-5xl">
                    $
                    {typeof car.price === "number"
                      ? car.price.toLocaleString()
                      : car.price}
                  </span>
                </div>

                <p className="mb-10 text-sm font-mono italic leading-relaxed text-[#e5efe3]/66 sm:mb-12">
                  The {car.brand} {car.model} is a masterpiece of automotive
                  engineering. Featuring a {car.specs}, it delivers an
                  unparalleled driving experience that blurs the line between
                  track performance and road-going luxury.
                </p>

                {/* Quantity and CTA */}

                {/* Specs Grid */}
                <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8">
                  {specs.map((spec, idx) => {
                    const Icon = spec.icon;
                    return (
                      <div key={idx} className="flex items-center gap-4 ">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5efe3]/12 bg-[#111b14] text-[#00ff87]">
                          <Icon size={18} />
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[9px] uppercase tracking-widest text-[#e5efe3]/42">
                            {spec.label}
                          </span>
                          <span className="block text-xs font-mono font-bold text-[#e5efe3]">
                            {spec.value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Configuration */}
                {colors.length > 0 && (
                  <div>
                    <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5efe3]/42">
                      Exterior Configuration
                    </span>
                    <div className="flex gap-3 mb-3">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color)}
                          className={`h-8 w-8 rounded-full ring-offset-4 ring-offset-[#0c160e] transition-[transform,box-shadow,outline-color] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] cursor-pointer ${
                            selectedColor.id === color.id
                              ? "ring-2 ring-[#00ff87] shadow-[0_0_0_5px_rgba(0,255,135,0.12)]"
                              : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-center">
                  {/* Quantity Selector */}
                  <div className="flex items-center rounded-lg border border-[#e5efe3]/12 bg-[#131f17] h-[52px]">
                    <button
                      onClick={() => {
                        const nextQuantity = Math.max(1, quantity - 1);
                        setQuantity(nextQuantity);
                        quantityChosen(nextQuantity, car.id);
                        setIsAvailable(true);
                      }}
                      className="h-full px-4 text-[#e5efe3]/45 transition-colors duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] cursor-pointer hover:text-[#00ff87] active:scale-[0.97] flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[3rem] px-2 text-center text-sm font-bold h-full flex items-center justify-center">
                      {quantity.toString().padStart(2, "0")}
                    </span>
                    <button
                      onClick={handleQuantity}
                      className="h-full px-4 text-[#e5efe3]/45 transition-colors duration-150 cursor-pointer [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:text-[#00ff87] active:scale-[0.97] flex items-center justify-center"
                    >
                      {isAvailable ? (
                        <Plus size={16} />
                      ) : (
                        <OctagonMinus size={16} />
                      )}
                    </button>
                  </div>

                  {/* Secure Allocation Button */}
                  <div className="flex-1">
                    <button
                      className={`flex w-full h-[52px] flex-col items-center justify-center gap-1 cursor-pointer rounded-lg border px-4 text-[11px] font-bold uppercase tracking-[0.18em] shadow-[0_16px_36px_-26px_rgba(0,0,0,1)] transition-[transform,background-color,color,border-color] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
                        isAllocated
                          ? "border-emerald-500/50 bg-emerald-900/40 text-emerald-300 hover:bg-emerald-900/65"
                          : "border-[#00ff87]/70 bg-[#00ff87] text-[#0c160e] hover:bg-emerald-300"
                      }`}
                      onClick={handleAllocation}
                    >
                      {isAllocated ? (
                        <span className="flex flex-col items-center justify-center h-full">
                          <span className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-[#0c160e] font-bold">
                              ✓
                            </span>
                            <span>Added to Garage</span>
                          </span>
                          <span className="text-[8px] text-emerald-400/60 lowercase tracking-normal font-medium">
                            (click to remove)
                          </span>
                        </span>
                      ) : (
                        <span>Secure Allocation</span>
                      )}
                    </button>
                  </div>

                  {/* Favorite Button */}
                  <button
                    className="rounded-lg border border-[#e5efe3]/12 h-[52px] w-[52px] flex items-center justify-center text-[#e5efe3]/45 cursor-pointer transition-[transform,color,border-color] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:border-[#00ff87]/40 hover:text-[#00ff87] active:scale-[0.97]"
                    onClick={handleAddToWishList}
                  >
                    <Heart
                      className={`w-5 h-5 heart-icon ${
                        isFavorite ? "is-liked" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Features Section */}
        <section className="mb-24 border-t border-[#e5efe3]/10 pt-16 sm:mb-32 sm:pt-24">
          <h2 className="mb-12 text-4xl font-['Newsreader'] italic font-bold tracking-tight sm:mb-16 sm:text-5xl">
            Performance Features
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
            {features.map((feature, idx: number) => {
              const Icon = iconMap[feature.icon] || Settings2;
              return (
                <div
                  key={idx}
                  className="group rounded-xl border border-[#e5efe3]/8 bg-[linear-gradient(180deg,rgba(20,31,24,0.95),rgba(16,25,20,0.62))] p-8 transition-[transform,border-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-[#00ff87]/35 hover:shadow-[0_24px_52px_-40px_rgba(0,255,135,0.55)] sm:p-10"
                >
                  <div className="mb-8 text-[#00ff87] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-mono tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#e5efe3]/55 transition-colors duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:text-[#e5efe3]/74">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Curated Alternatives Section */}
        {similarCars.length > 0 && (
          <section className="mb-16 border-t border-[#e5efe3]/10 pt-16 sm:mb-24 sm:pt-24">
            <h2 className="mb-12 text-4xl font-['Newsreader'] font-bold tracking-tight sm:text-5xl">
              Curated Alternatives
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {similarCars.map((similarCar) => (
                <CarsCard key={similarCar.id} {...similarCar} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CarDetailsClient;
