import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import edited1 from "@/public/edited1.png";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-background py-12 overflow-hidden">
      {/* Immersive Background Reveal */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-50" />

      <div className="container relative z-10 mx-auto px-6 py-24 flex flex-col lg:flex-row items-center">
        {/* left side - Car Image */}
        <div className="w-full lg:w-3/5 flex justify-center relative hero-image">
          <div className="absolute inset-0 bg-brand/10 blur-[120px] rounded-full -z-10 animate-pulse" />
          <Image
            src={edited1}
            alt="Premium Performance Vehicle"
            className="shadow-2xl max-w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            width={860}
            height={860}
            priority
          />
        </div>
        {/* right side - Text */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8 lg:pl-12">
          <div className="space-y-4">
            <span
              className="text-primary text-xs font-bold uppercase tracking-[0.4em] opacity-80 animate-in"
              style={{ animationDelay: "0s" }}
            >
              Exclusivity Defined
            </span>
            <h1 className="hero-title text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] text-foreground">
              Drive Your{" "}
              <span className="text-primary hero-accent">Dream Machine</span>
            </h1>
          </div>
          <p className="text-lg lg:text-xl hero-subtitle text-muted-foreground leading-relaxed max-w-md">
            Experience the pinnacle of automotive engineering. Curated luxury
            and performance, delivered with precision.
          </p>
          <div className="flex flex-col sm:flex-row hero-buttons gap-4 pt-4 w-full">
            <Link href="/shop" passHref className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-[200px] h-[56px] text-lg font-bold rounded-full"
              >
                Explore Collection
              </Button>
            </Link>

            <Link href="/contact" passHref className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-[200px] h-[56px] text-lg font-bold rounded-full border-brand/30 hover:border-brand"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
