"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Eye,
  ArrowRight,
  Activity,
  Globe,
} from "lucide-react";
import viktorPic from "@/public/about/viktor-vance.jpg";
import elenaPic from "@/public/about/elena-rostova.jpg";

interface AnimatedCounterProps {
  value: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasNumericValue = /[\d.]+/.test(value);
  const [displayValue, setDisplayValue] = useState(hasNumericValue ? "0" : value);

  useEffect(() => {
    if (!isInView) return;

    const numMatch = value.match(/([\d.]+)/);
    if (!numMatch) {
      return;
    }

    const targetNumber = parseFloat(numMatch[1]);
    const suffix = value.replace(numMatch[1], "");
    const isDecimal = numMatch[1].includes(".");

    const duration = 1600; // Snappy yet premium count duration
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Premium expo-ease-out curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = targetNumber * easeProgress;

      if (isDecimal) {
        setDisplayValue(currentVal.toFixed(1) + suffix);
      } else {
        setDisplayValue(Math.floor(currentVal) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const AboutClient = () => {
  // Animation Easing & Timing from DESIGN.md and SKILL.md
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOutExpo },
    },
  };

  const cardHoverEffect = {
    whileHover: {
      y: -8,
      borderColor: "rgba(0, 255, 135, 0.3)",
      boxShadow: "0 20px 40px -15px rgba(0, 255, 135, 0.08)",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  const stats = [
    { value: "500+", label: "Curated Legacies", icon: Award },
    { value: "150", label: "Audit Touchpoints", icon: ShieldCheck },
    { value: "12", label: "Global Showrooms", icon: Globe },
    { value: "99.8%", label: "Precision Index", icon: Activity },
  ];

  const pillars = [
    {
      title: "Mechanical Precision",
      icon: ShieldCheck,
      desc: "Every machine undergoes a rigorous 150-point engineering audit. We check compression, diagnostics, and legacy heritage. We verify the soul of the vehicle, not just the catalog specifications.",
    },
    {
      title: "High-Performance Legacy",
      icon: Award,
      desc: "We curate vehicles that represent historical and technological milestones—from rare analogue supercars to pioneering electric hypercars, preserving engineering history for the future.",
    },
    {
      title: "Bespoke Concierge",
      icon: Eye,
      desc: "A fully personalized procurement workflow. Custom paint-to-sample configurations, private showroom preview sessions, and covered transport delivery directly to your collection vault.",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "The Genesis",
      desc: "AutoDeal is founded from a singular obsession with kinetic energy and engineering art, originally serving as a private acquisition registry for discerning collectors.",
    },
    {
      year: "2025",
      title: "Bespoke Division",
      desc: "We expanded our global network, establishing custom paint-to-sample curations and securing allocations for some of the world's most limited hypercar production runs.",
    },
    {
      year: "2026",
      title: "The Digital Showroom",
      desc: "Merging cutting-edge, high-craft web software with physical showrooms, offering collectors a flawless, interactive, and transparent digital-to-physical acquisition experience.",
    },
  ];

  return (
    <div className="w-full relative overflow-hidden bg-transparent">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-[#00ff87]/4 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-[#00ff87]/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-[#00ff87]/3 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* HERO SECTION */}
        <section className="py-24 md:py-36 text-center flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.span
              variants={heroItemVariants}
              className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.3em] mb-4 flex items-center gap-2 px-3 py-1 bg-[#00ff87]/10 rounded-full border border-[#00ff87]/20"
            >
              <Activity size={12} className="animate-pulse" />
              The Obsession is Real
            </motion.span>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-none uppercase mb-8"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              CURATING KINETIC <br />
              <span className="text-[#00ff87] bg-clip-text">PRESTIGE</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-lg md:text-2xl text-[#dae6d8]/90 max-w-3xl leading-relaxed font-light mb-12 font-sans"
            >
              AutoDeal is a digital-first sanctuary for high-performance
              automotive art. We bridge the gap between{" "}
              <span className="newsreader text-white text-xl md:text-2xl">
                mechanical purity
              </span>{" "}
              and digital sophistication for the global collector.
            </motion.p>

            <motion.div variants={heroItemVariants} className="flex gap-4">
              <Link
                href="/shop"
                className="group relative flex items-center gap-2 px-8 py-4 bg-[#00ff87] text-[#050e0a] font-mono text-sm uppercase font-bold tracking-widest rounded-lg overflow-hidden transition-transform duration-150 active:scale-97 hover:shadow-[0_0_30px_rgba(0,255,135,0.4)]"
              >
                Explore Showroom
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* PILLARS SECTION */}
        <section className="py-20 border-t border-[rgba(218,230,216,0.06)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <span className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.2em] block mb-2">
                Strategic Principles
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold uppercase text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                THE AUTO<span className="text-[#00ff87]">DEAL</span> CODE
              </h2>
            </div>
            <p className="text-[#dae6d8]/60 text-sm md:text-base max-w-md">
              We live by a set of uncompromising design and engineering
              principles to guarantee that every vehicle is a lasting legacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardHoverEffect}
                  whileHover="whileHover"
                  whileTap="whileTap"
                  className="p-8 bg-[#050e0a]/50 backdrop-blur-md rounded-xl border border-[rgba(218,230,216,0.06)] flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] mb-8 border border-[#00ff87]/25">
                      <Icon size={24} />
                    </div>
                    <h3
                      className="text-xl font-bold uppercase text-white mb-4 tracking-wider"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-[#dae6d8]/75 text-sm leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="py-20 border-t border-[rgba(218,230,216,0.06)] bg-[#050e0a]/20 backdrop-blur-sm rounded-2xl px-8 my-10 border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center text-center p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="text-[#00ff87]/40 mb-3">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <span
                    className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2 font-mono"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-[#dae6d8]/50 text-xs md:text-sm uppercase tracking-widest font-mono">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="py-20 border-t border-[rgba(218,230,216,0.06)]">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.2em] block mb-2">
              Our Journey
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase text-white mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              CHRONOLOGY OF MOTION
            </h2>
            <p className="text-[#dae6d8]/60 text-sm md:text-base">
              A high-precision look at how AutoDeal evolved from a dedicated
              vision to a global standard in digital automotive acquisition.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center Line for desktop */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00ff87]/30 via-[#00ff87]/10 to-transparent"></div>

            <div className="space-y-16">
              {milestones.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-start relative ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-[6.5px] w-[14px] h-[14px] rounded-full bg-[#050e0a] border-2 border-[#00ff87] z-20 shadow-[0_0_10px_#00ff87]"></div>

                    {/* Content Panel */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                      <motion.div
                        className="p-8 bg-[#050e0a]/50 backdrop-blur-md rounded-xl border border-[rgba(218,230,216,0.05)] shadow-lg"
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                      >
                        <span
                          className="text-[#00ff87] text-3xl font-black font-mono tracking-tight block mb-2"
                          style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold uppercase text-white mb-3 tracking-wider">
                          {item.title}
                        </h3>
                        <p className="text-[#dae6d8]/70 text-sm leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Spacer for other half */}
                    <div className="hidden md:block w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CURATORS SECTION (THE TEAM) */}
        <section className="py-20 border-t border-[rgba(218,230,216,0.06)]">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.2em] block mb-2">
              The Keepers of the Art
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase text-white mb-6"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              MEET THE CURATORS
            </h2>
            <p className="text-[#dae6d8]/60 text-sm md:text-base">
              A private circle of engineering purists, collectors, and design
              professionals dedicated to sourcing and validating excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Curator 1 */}
            <motion.div
              className="group relative flex flex-col md:flex-row items-center gap-8 p-6 bg-[#050e0a]/30 rounded-2xl border border-[rgba(218,230,216,0.05)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-44 h-56 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-zinc-950">
                <Image
                  src={viktorPic}
                  alt="Viktor Vance - Chief Automotive Curator"
                  fill
                  sizes="176px"
                  placeholder="blur"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[#00ff87] text-xs font-mono uppercase tracking-widest mb-1">
                  Founder & Chief Curator
                </span>
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Viktor Vance
                </h3>
                <p className="text-[#dae6d8]/80 text-sm font-sans leading-relaxed mb-4">
                  A former F1 diagnostics lead with a mechanical engineering PhD
                  from Stuttgart. Viktor personally audits mechanical components
                  and validates the structural purity of every acquisition.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-[#dae6d8]/60 rounded">
                    15+ Yrs F1 Eng
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-[#dae6d8]/60 rounded">
                    Aerodynamics
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Curator 2 */}
            <motion.div
              className="group relative flex flex-col md:flex-row items-center gap-8 p-6 bg-[#050e0a]/30 rounded-2xl border border-[rgba(218,230,216,0.05)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="relative w-44 h-56 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-zinc-950">
                <Image
                  src={elenaPic}
                  alt="Elena Rostova - Bespoke Division Director"
                  fill
                  sizes="176px"
                  placeholder="blur"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[#00ff87] text-xs font-mono uppercase tracking-widest mb-1">
                  Bespoke Director
                </span>
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Elena Rostova
                </h3>
                <p className="text-[#dae6d8]/80 text-sm font-sans leading-relaxed mb-4">
                  Elena guides paint-to-sample configurations and rare collector
                  historical audits. Her background in high-end design ensures
                  every acquisition is configured to become a modern classic.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-[#dae6d8]/60 rounded">
                    Heritage Restorations
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-[#dae6d8]/60 rounded">
                    Bespoke Art
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 text-center relative rounded-2xl overflow-hidden border border-[#00ff87]/20 my-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050e0a]/50 to-[#00ff87]/5 z-0"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2
              className="text-3xl md:text-6xl font-bold uppercase text-white mb-6 tracking-wide"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              ACQUIRE YOUR <br />
              <span className="text-[#00ff87]">NEXT LEGACY</span>
            </h2>
            <p className="text-[#dae6d8]/80 text-base md:text-lg mb-10 max-w-xl mx-auto font-sans">
              Enter the showroom to preview our vetted allocations, historic
              masterpieces, and electric performance hypercars.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ff87] text-[#050e0a] font-mono text-sm uppercase font-black tracking-widest rounded-lg hover:shadow-[0_0_30px_rgba(0,255,135,0.4)] transition-transform duration-150 active:scale-97"
            >
              Enter Showroom
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutClient;
