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
        type: "spring" as const,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020503]/50 backdrop-blur-xl p-4"
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#050d08]/70 backdrop-blur-2xl border border-[#dae6d8]/10 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsQuickViewClicked(false)}
          className="absolute top-1 right-1 text-[#dae6d8]/40 hover:text-[#00ff87] p-2 hover:bg-white/5 rounded-full transition-all duration-200 z-30 cursor-pointer active:scale-95"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Slider & Thumbnails */}
        <div className="w-full md:w-[460px] flex flex-col">
          {/* Main Image Slider Wrapper with fixed dimensions */}
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-[#020503] border border-[#dae6d8]/5">
            <ImageSlider
              album={carPics}
              activeImage={activeIdx}
              onImageChange={setActiveIdx}
            />
          </div>

          {/* Interactive Thumbnails */}
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#00ff87]/20 scrollbar-track-transparent">
            {carPics.map((pic, index) => (
              <button
                key={index}
                onClick={() => setActiveIdx(index)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  activeIdx === index
                    ? "border-[#00ff87] ring-2 ring-[#00ff87]/20 scale-[1.02] opacity-100"
                    : "border-[#dae6d8]/5 opacity-50 hover:opacity-100 hover:scale-[1.02] hover:border-[#00ff87]/30"
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
              <span className="text-[10px] tracking-[0.25em] font-bold text-[#00ff87] uppercase font-['Orbitron']">
                {car.brand}
              </span>
              {car.badge && (
                <span className="px-2.5 py-1 text-[8px] tracking-[0.15em] font-extrabold uppercase bg-[#00ff87] text-[#020503] rounded-md font-['Orbitron'] shadow-[0_0_15px_rgba(0,255,135,0.15)]">
                  {car.badge}
                </span>
              )}
            </div>

            {/* Model Name */}
            <h2 className="text-2xl md:text-3xl font-['Newsreader'] italic font-bold text-[#e5efe3] leading-tight mt-2">
              {car.model}
            </h2>

            {/* Body Type */}
            <p className="text-[10px] text-[#dae6d8]/40 uppercase tracking-[0.2em] mt-1 font-semibold">
              {car.bodySilhouette}
            </p>

            {/* Spec Badges */}
            {specList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {specList.map((spec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-[#07130c]/50 border border-[#dae6d8]/5 text-[10px] font-['Orbitron'] tracking-widest text-[#dae6d8]/75 uppercase"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Price section */}
            <div className="mt-6 border-t border-[#dae6d8]/10 pt-5">
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#dae6d8]/40 font-bold font-['Orbitron']">
                Pricing
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl md:text-4xl font-extrabold text-[#00ff87] font-['Manrope'] leading-none">
                  {typeof car.price === "number"
                    ? car.price.toLocaleString()
                    : car.price}
                </span>
                <span className="text-[10px] font-extrabold text-[#dae6d8]/30 tracking-widest font-['Orbitron']">
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
              className="mt-6 w-full flex items-center justify-center gap-2 py-4 px-6 font-['Orbitron'] text-xs font-bold tracking-[0.15em] text-[#020503] bg-[#00ff87] hover:bg-[#00e07a] active:scale-[0.97] rounded-xl uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(0,255,135,0.2)] hover:shadow-[0_4px_30px_rgba(0,255,135,0.35)] cursor-pointer"
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
