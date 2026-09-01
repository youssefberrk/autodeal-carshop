"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, isOpen, onClose, onIndexChange }: LightboxProps) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextImg = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const prevImg = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  // Reset scale when image changes or closes
  useEffect(() => {
    const timer = setTimeout(() => setScale(1), 0);
    return () => clearTimeout(timer);
  }, [currentIndex, isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, prevImg, nextImg]);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 4));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.5, 1));
  const handleResetZoom = () => setScale(1);

  // Disable scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050e0a]/95 backdrop-blur-xl"
        >
          {/* Toolbar */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-[110] bg-gradient-to-b from-[#050e0a]/80 to-transparent">
            <div className="text-[#e5efe3]/70 font-mono text-sm tracking-[0.2em] uppercase bg-[#091a11]/80 px-4 py-2 rounded-full border border-[#e5efe3]/10">
              {currentIndex + 1} / {images.length}
            </div>
            <div className="flex items-center gap-2 sm:gap-4 bg-[#091a11]/80 px-4 py-2 rounded-full border border-[#e5efe3]/10 backdrop-blur-md">
              <button 
                onClick={handleZoomOut} 
                className="text-[#e5efe3]/70 hover:text-[#00ff87] transition-colors cursor-pointer disabled:opacity-30 disabled:hover:text-[#e5efe3]/70 p-2" 
                disabled={scale <= 1}
              >
                <ZoomOut size={20} />
              </button>
              <button 
                onClick={handleResetZoom} 
                className="text-[#e5efe3]/70 hover:text-[#00ff87] transition-colors cursor-pointer p-2"
              >
                <Maximize size={18} />
              </button>
              <button 
                onClick={handleZoomIn} 
                className="text-[#e5efe3]/70 hover:text-[#00ff87] transition-colors cursor-pointer disabled:opacity-30 disabled:hover:text-[#e5efe3]/70 p-2" 
                disabled={scale >= 4}
              >
                <ZoomIn size={20} />
              </button>
              <div className="w-px h-6 bg-[#e5efe3]/20 mx-1 sm:mx-2" />
              <button 
                onClick={onClose} 
                className="text-[#e5efe3] hover:text-[#00ff87] hover:scale-110 active:scale-95 transition-all cursor-pointer p-2 bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImg(); }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-4 text-[#e5efe3]/60 hover:text-[#00ff87] hover:bg-[#00ff87]/10 bg-[#091a11]/60 border border-[#e5efe3]/10 rounded-full backdrop-blur-md transition-all z-[110] cursor-pointer group active:scale-95"
              >
                <ChevronLeft size={32} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImg(); }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-4 text-[#e5efe3]/60 hover:text-[#00ff87] hover:bg-[#00ff87]/10 bg-[#091a11]/60 border border-[#e5efe3]/10 rounded-full backdrop-blur-md transition-all z-[110] cursor-pointer group active:scale-95"
              >
                <ChevronRight size={32} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden p-4 sm:p-12"
            onClick={onClose} 
          >
            <motion.div
              drag={scale > 1}
              dragConstraints={containerRef}
              dragElastic={0.1}
              className={`relative w-full h-full flex items-center justify-center ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (scale === 1) handleZoomIn();
              }} 
            >
              <motion.div
                animate={{ scale }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={images[currentIndex]}
                  alt="Car full view"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                  quality={100}
                  preload
                  sizes="100vw"
                  unoptimized={images[currentIndex].startsWith("http")}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
