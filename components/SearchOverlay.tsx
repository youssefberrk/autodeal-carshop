"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { carsData } from "@/public/cars/CarsData";
import { showroomsData } from "@/public/showrooms/ShowroomsData";
import { Cars } from "@/types/Cars";
import { Showroom } from "@/types/Showroom";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter cars & showrooms based on query
  const searchResults = {
    cars: query.trim()
      ? carsData.filter(
          (car) =>
            car.brand.toLowerCase().includes(query.toLowerCase()) ||
            car.model?.toLowerCase().includes(query.toLowerCase()) ||
            car.specs?.toLowerCase().includes(query.toLowerCase()) ||
            car.bodySilhouette.toLowerCase().includes(query.toLowerCase()) ||
            car.badge?.toLowerCase().includes(query.toLowerCase())
        )
      : [],
    showrooms: query.trim()
      ? showroomsData.filter(
          (showroom) =>
            showroom.city.toLowerCase().includes(query.toLowerCase()) ||
            showroom.adress.toLowerCase().includes(query.toLowerCase())
        )
      : [],
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
    inputRef.current?.focus();
  };

  const popularSuggestions = ["Porsche", "Ferrari", "Lamborghini", "SUV", "Electric", "London", "New York"];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      {/* Background click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-3xl bg-[#0a120c]/90 border border-[#00ff87]/20 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,135,0.15)] flex flex-col gap-6"
      >
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-[#00ff87]/15 pb-4">
          <h2
            className="text-lg md:text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2.5"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <FaSearch className="text-[#00ff87]" />
            Search Showroom
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:text-[#00ff87] text-slate-400 transition-colors rounded-full hover:bg-white/5 active:scale-95"
            aria-label="Close search"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type brand, model, specs or showroom..."
            className="w-full bg-transparent border-b-2 border-slate-700 focus:border-[#00ff87] outline-none text-white text-lg md:text-xl pb-3 pr-10 transition-all font-manrope placeholder-slate-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 p-1 text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}
        </form>

        {/* Suggestions */}
        {!query && (
          <div className="flex flex-col gap-3">
            <span
              className="text-[10px] uppercase tracking-widest text-[#00ff87]/75 font-semibold"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              Popular Suggestions
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#00ff87]/5 border border-[#00ff87]/10 hover:border-[#00ff87]/40 hover:bg-[#00ff87]/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Real-time Results */}
        {query && (
          <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto pr-1">
            {searchResults.cars.length === 0 && searchResults.showrooms.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-manrope">
                No instant matches found for &quot;<span className="text-[#00ff87] font-semibold">{query}</span>&quot;.
                <p className="text-xs text-slate-500 mt-1">Press Enter to search more broadly.</p>
              </div>
            ) : (
              <>
                {/* Cars Section */}
                {searchResults.cars.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span
                      className="text-[10px] uppercase tracking-widest text-[#00ff87]/75 font-semibold border-b border-[#00ff87]/10 pb-1"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Matching Vehicles ({searchResults.cars.length})
                    </span>
                    <div className="flex flex-col gap-2">
                      {searchResults.cars.slice(0, 4).map((car) => (
                        <div
                          key={car.id}
                          onClick={() => {
                            router.push(`/details/${car.id}`);
                            onClose();
                          }}
                          className="flex items-center gap-4 p-2.5 rounded-xl bg-[#00ff87]/5 border border-white/5 hover:border-[#00ff87]/30 hover:bg-[#00ff87]/10 transition-all cursor-pointer group"
                        >
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-white/5">
                            <Image
                              src={car.carAlbum.photo1}
                              alt={`${car.brand} ${car.model}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-white uppercase truncate">
                                {car.brand} {car.model}
                              </h4>
                              <span className="text-xs font-semibold text-[#00ff87]">
                                {typeof car.price === "number" ? `$${car.price.toLocaleString()}` : car.price}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{car.specs}</p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-slate-500 group-hover:text-[#00ff87] group-hover:translate-x-1 transition-all shrink-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Showrooms Section */}
                {searchResults.showrooms.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span
                      className="text-[10px] uppercase tracking-widest text-[#00ff87]/75 font-semibold border-b border-[#00ff87]/10 pb-1"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Showrooms ({searchResults.showrooms.length})
                    </span>
                    <div className="flex flex-col gap-2">
                      {searchResults.showrooms.map((showroom) => (
                        <div
                          key={showroom.id}
                          onClick={() => {
                            router.push(`/contact`);
                            onClose();
                          }}
                          className="flex items-center gap-4 p-2.5 rounded-xl bg-[#00ff87]/5 border border-white/5 hover:border-[#00ff87]/30 hover:bg-[#00ff87]/10 transition-all cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#00ff87]/10 border border-[#00ff87]/20 flex items-center justify-center text-[#00ff87] shrink-0">
                            <MapPin size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white uppercase truncate">{showroom.city} Showroom</h4>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{showroom.adress}</p>
                          </div>
                          <ArrowRight
                            size={16}
                            className="text-slate-500 group-hover:text-[#00ff87] group-hover:translate-x-1 transition-all shrink-0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* View All Button */}
            <button
              onClick={() => handleSearchSubmit()}
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#00ff87]/20 to-emerald-500/10 border border-[#00ff87]/30 hover:border-[#00ff87]/60 text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(0,255,135,0.1)] active:scale-[0.98] cursor-pointer"
            >
              <span>See all results for &quot;{query}&quot;</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchOverlay;
