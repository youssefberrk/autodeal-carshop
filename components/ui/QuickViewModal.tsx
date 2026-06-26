"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";
import { Cars } from "@/types/Cars";

interface QuickViewModalProps {
  car: Cars;
  setIsQuickViewClicked: (value: boolean) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  car,
  setIsQuickViewClicked,
}) => {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);

  const album = car.carAlbum;
  const carPics = [album.photo1, album.photo2, album.photo3];

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsQuickViewClicked(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsQuickViewClicked]);

  const specList = car.specs ? car.specs.split("|").map((s) => s.trim()) : [];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 15,
      transition: { duration: 0.2 },
    },
  };

  return createPortal(
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={() => setIsQuickViewClicked(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0c160e]/95 border border-[rgba(218,230,216,0.1)] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsQuickViewClicked(false)}
          className="absolute top-0 right-0 text-zinc-400 hover:text-white p-2 hover:bg-zinc-800/80 rounded-full transition-colors duration-200 z-30 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Slider & Thumbnails */}
        <div className="w-full md:w-[460px] flex flex-col">
          {/* Main Image Slider Wrapper with fixed dimensions */}
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <ImageSlider
              album={carPics}
              activeImage={activeIdx}
              onImageChange={setActiveIdx}
            />
          </div>

          {/* Interactive Thumbnails */}
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {carPics.map((pic, index) => (
              <button
                key={index}
                onClick={() => setActiveIdx(index)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  activeIdx === index
                    ? "border-[#00ff87] ring-2 ring-[#00ff87]/20 scale-102 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100 hover:scale-102"
                }`}
              >
                <Image
                  src={pic}
                  alt={`car-thumbnail-${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Car Details */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            {/* Brand & Badge */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-[#00ff87] uppercase font-mono">
                {car.brand}
              </span>
              {car.badge && (
                <span className="px-2 py-0.5 text-[8px] tracking-[0.1em] font-extrabold uppercase bg-[#00ff87] text-black rounded font-mono">
                  {car.badge}
                </span>
              )}
            </div>

            {/* Model Name */}
            <h2 className="text-2xl md:text-3xl font-semibold text-white uppercase italic leading-tight mt-1 font-serif">
              {car.model}
            </h2>

            {/* Body Type */}
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              {car.bodySilhouette}
            </p>

            {/* Spec Badges */}
            {specList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {specList.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono tracking-wider text-zinc-300 uppercase"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Price section */}
            <div className="mt-6 border-t border-zinc-800/80 pt-5">
              <span className="block text-[9px] uppercase tracking-widest text-zinc-500 font-mono">
                Pricing
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-[#00ff87] italic leading-none font-serif">
                  {typeof car.price === "number"
                    ? car.price.toLocaleString()
                    : car.price}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-wider font-mono">
                  USD
                </span>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                setIsQuickViewClicked(false);
                router.push(`/details/${car.id}`);
              }}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 font-mono text-xs font-bold tracking-widest text-black bg-[#00ff87] hover:bg-[#00e07a] active:scale-[0.97] rounded-full uppercase transition-all duration-200 shadow-[0_0_20px_rgba(0,255,135,0.15)] hover:shadow-[0_0_30px_rgba(0,255,135,0.3)] cursor-pointer"
            >
              <span>View Full Details</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("portal-root") ?? document.body,
  );
};

export default QuickViewModal;
