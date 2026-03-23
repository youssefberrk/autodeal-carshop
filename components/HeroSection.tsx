import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Text */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Drive Your <span className="text-[#00C853]">Dream Machine</span>
          </h1>
          <p className="text-lg text-gray-300">
            Discover the finest selection of luxury and performance vehicles
          </p>
          <div className="flex gap-4 mt-4">
            <Button className="bg-[#00C853] hover:bg-[#00e664] text-black px-6 py-3 rounded-lg">
              Explore Collection
            </Button>
            <Button className="border border-[#00C853] hover:bg-[#0f1a17] text-white px-6 py-3 rounded-lg">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Right side - Car Image */}
        <div className="lg:w-1/2 flex justify-center relative">
          <img
            src="/images/car-hero.png"
            alt="Car"
            className="rounded-xl shadow-2xl max-w-full h-auto"
          />
          {/* Optional: subtle green glow behind car */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00C853]/20 via-transparent to-transparent rounded-xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;