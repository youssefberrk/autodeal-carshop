"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MapPin, Phone, Clock, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { carsData } from "@/public/cars/CarsData";
import { showroomsData } from "@/public/showrooms/ShowroomsData";
import CarsCard from "@/components/CarsCard";

interface SearchClientProps {
  initialQuery: string;
}

const SearchClient = ({ initialQuery }: SearchClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  // Sync state with URL changes (e.g. if navigated from elsewhere or popstate)
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchTerm(q);
  }, [searchParams]);

  // Compute filtered cars and showrooms
  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return { cars: [], showrooms: [] };
    }

    return {
      cars: carsData.filter(
        (car) =>
          car.brand.toLowerCase().includes(query) ||
          car.model?.toLowerCase().includes(query) ||
          car.specs?.toLowerCase().includes(query) ||
          car.bodySilhouette.toLowerCase().includes(query) ||
          car.badge?.toLowerCase().includes(query)
      ),
      showrooms: showroomsData.filter(
        (showroom) =>
          showroom.city.toLowerCase().includes(query) ||
          showroom.adress.toLowerCase().includes(query)
      ),
    };
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the URL search query
    const params = new URLSearchParams(window.location.search);
    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    } else {
      params.delete("q");
    }
    router.replace(`/search?${params.toString()}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    const params = new URLSearchParams(window.location.search);
    params.set("q", suggestion);
    router.replace(`/search?${params.toString()}`);
  };

  const popularTags = ["Porsche", "Ferrari", "Lamborghini", "SUV", "Electric", "London", "New York"];
  const totalResults = filteredData.cars.length + filteredData.showrooms.length;

  return (
    <div className="min-h-screen bg-[#050e0a] text-white pt-28 pb-20 px-6 font-manrope">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Page Header */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <span
            className="text-xs uppercase tracking-widest text-[#00ff87] font-semibold"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Search Results
          </span>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wide capitalize"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {searchTerm.trim() ? (
              <>
                Showing results for &quot;<span className="text-[#00ff87]">{searchTerm}</span>&quot;
              </>
            ) : (
              "Explore Inventory"
            )}
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            {searchTerm.trim() ? (
              <>Found {totalResults} matching results across showroom inventory and locations</>
            ) : (
              "Enter a term to search for vehicles, specifications, or showrooms"
            )}
          </p>
        </div>

        {/* Inline Search Bar */}
        <div className="w-full max-w-2xl mx-auto md:mx-0">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by brand, model, silhouette, location..."
              className="w-full py-4 pl-12 pr-12 rounded-2xl bg-[#0d1f1a]/55 border border-[#00ff87]/20 focus:border-[#00ff87] outline-none text-white text-base md:text-lg transition-all shadow-[0_0_20px_rgba(0,255,135,0.02)] focus:shadow-[0_0_30px_rgba(0,255,135,0.08)] placeholder-slate-500 font-manrope"
            />
            <FaSearch className="absolute left-4 text-slate-400 text-lg pointer-events-none" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  router.replace("/search");
                }}
                className="absolute right-4 p-1.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 active:scale-90"
              >
                <FaTimes size={16} />
              </button>
            )}
          </form>
          
          {/* Quick suggestions below search bar */}
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-[10px] uppercase tracking-widest text-[#00ff87]/65 font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Suggested:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSuggestionClick(tag)}
                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#00ff87]/5 border border-[#00ff87]/15 hover:border-[#00ff87]/40 hover:bg-[#00ff87]/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Sections */}
        <AnimatePresence mode="wait">
          {totalResults > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-16 mt-4"
            >
              {/* Vehicles Results */}
              {filteredData.cars.length > 0 && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#00ff87]/10 pb-3">
                    <h2
                      className="text-lg md:text-2xl font-bold tracking-widest uppercase text-white"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Matching Vehicles ({filteredData.cars.length})
                    </h2>
                    <span className="text-xs text-slate-400">Inventory match</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.cars.map((car, index) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CarsCard
                          id={car.id}
                          brand={car.brand}
                          bodySilhouette={car.bodySilhouette}
                          price={car.price}
                          specs={car.specs}
                          badge={car.badge}
                          carAlbum={car.carAlbum}
                          model={car.model}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Showrooms Results */}
              {filteredData.showrooms.length > 0 && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-[#00ff87]/10 pb-3">
                    <h2
                      className="text-lg md:text-2xl font-bold tracking-widest uppercase text-white"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      Matching Showrooms ({filteredData.showrooms.length})
                    </h2>
                    <span className="text-xs text-slate-400">Location match</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredData.showrooms.map((showroom, index) => (
                      <motion.div
                        key={showroom.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="border border-[#00ff87]/10 bg-gradient-to-br from-[#0d1f1a]/40 to-[#0a0f0d]/60 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-[#00ff87]/30 hover:shadow-[0_0_30px_rgba(0,255,135,0.06)] flex flex-col justify-between"
                      >
                        <div>
                          <div className="mb-4 aspect-video rounded-xl overflow-hidden border border-white/5 relative">
                            <iframe
                              src={showroom.mapUrl}
                              className="w-full h-full border-0 absolute inset-0"
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                            {showroom.city} Showroom
                          </h3>
                          <div className="space-y-3 font-manrope text-sm text-slate-300">
                            <div className="flex items-start gap-2.5">
                              <MapPin size={16} className="text-[#00ff87] shrink-0 mt-0.5" />
                              <p className="leading-relaxed">{showroom.adress}</p>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <Phone size={16} className="text-[#00ff87] shrink-0" />
                              <p>{showroom.phone}</p>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <Clock size={16} className="text-[#00ff87] shrink-0 mt-0.5" />
                              <div>
                                <p>{showroom.timing.weekdays}</p>
                                <p className="text-[#00ff87] text-xs font-semibold mt-0.5">{showroom.timing.weekends}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => router.push("/contact")}
                          className="mt-6 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00ff87]/30 hover:bg-[#00ff87]/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Contact Showroom
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col items-center justify-center py-20 text-center border border-[#00ff87]/10 rounded-3xl bg-[#00ff87]/2 p-8 max-w-2xl mx-auto mt-8 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
            >
              <div className="w-16 h-16 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 flex items-center justify-center text-[#00ff87] mb-6 animate-pulse">
                <Compass size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
                No matches found
              </h3>
              <p className="text-slate-400 text-sm max-w-md mb-8">
                {searchTerm.trim() ? (
                  <>We couldn&apos;t find any vehicles or showrooms matching &quot;<span className="text-white font-semibold">{searchTerm}</span>&quot;.</>
                ) : (
                  "Type a query in the search bar above to begin exploring our luxury collection."
                )}
              </p>
              <div className="flex flex-col gap-3 w-full">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Try searching for
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Porsche", "Electric", "Coupe", "Dubai", "SUV", "Ferrari"].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSuggestionClick(term)}
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:border-[#00ff87]/30 hover:bg-[#00ff87]/5 text-slate-300 hover:text-white transition-all cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchClient;
