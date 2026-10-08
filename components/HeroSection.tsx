"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import edited1 from "@/public/edited1.png";
import { Sparkles, ArrowRight } from "lucide-react";

const easeCustom = [0.16, 1, 0.3, 1] as const;

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center lg:pb-16 bg-gradient-to-r from-[#020d02] via-[#032f36] to-[#0f0101] from-[5%] via-[29%] to-[68%] overflow-hidden border-b border-[#00ff87]/10">
      <div className="container relative z-10  pr-11  py-12 lg:py-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        {/* Left Side - Car Image with Reveal */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.25, ease: easeCustom }}
          className="w-full lg:w-8/12 flex justify-center relative"
        >
          <div className="relative w-full flex justify-center">
            <Image
              src={edited1}
              alt="Premium Performance Vehicle"
              className="max-w-full h-auto object-contain"
              width={990}
              height={990}
              priority
            />
          </div>
        </motion.div>

        {/* Right Side - Staggered Text & CTAs */}
        <div className="w-full lg:w-4/12 flex flex-col gap-6 lg:pl-6 text-left">
          {/* Brand Heritage Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeCustom }}
            className="font-['Newsreader'] italic text-2xl md:text-3xl font-light text-[#00ff87] tracking-tight block"
          >
            Exclusivity Defined
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.5, ease: easeCustom }}
            className="font-['Orbitron'] text-4xl md:text-7xl font-black tracking-tight leading-[1.05] text-white"
          >
            Drive Your{" "}
            <span className="bg-gradient-to-r from-[#00ff87] via-[#38ef7d] to-emerald-400 bg-clip-text text-transparent">
              Dream Machine
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.65, ease: easeCustom }}
            className="font-mono  leading-relaxed tracking-wide italic text-sm  text-[#dae6d8]/80 max-w-lg "
          >
            Experience the pinnacle of automotive engineering. Curated luxury
            and high performance, delivered with concierge precision.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-3 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8, ease: easeCustom }}
              className="w-full sm:w-auto"
            >
              <Link href="/shop" passHref className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-[210px] h-[74px]  text-[18px] md:text-[20px] font-['Orbitron'] tracking-tight font-bold rounded-full bg-[#00ff87] text-[#02130a] hover:bg-[#00ff87]/90  transition-all duration-300 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4  transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.92, ease: easeCustom }}
              className="w-full sm:w-auto"
            >
              <Link href="/contact" passHref className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-[190px] h-[74px] text-[18px] font-['Orbitron'] font-bold tracking-wide rounded-full border-[#00ff87]/30 text-white hover:border-[#00ff87] hover:bg-[#00ff87]/10 transition-all duration-300"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
