"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Quote,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Award,
} from "lucide-react";
import curly from "@/public/testimonials/curly.jpg";
import elena from "@/public/testimonials/elena.jpg";
import viktor from "@/public/testimonials/viktor.jpg";
import starBg from "@/public/testimonials/star_bg.png";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative h-4 w-4">
          <Star className="absolute inset-0 h-4 w-4 text-gray-800 fill-gray-800" />
          <div className="absolute inset-0 w-[50%] overflow-hidden">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 fill-gray-800 text-gray-800"
        />
      ))}

      <span className="ml-1.5 font-mono text-xs font-semibold text-amber-300/90">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

const testimonialData = [
  {
    id: "julian-vance",
    name: "Julian Vance",
    title: "Private Collector",
    location: "Geneva, Switzerland",
    category: "Hypercars",
    acquiredVehicle: "Ferrari SF90 XX Stradale",
    verifiedStatus: "Verified Collector",
    avatar: curly,
    rating: 5.0,
    quote:
      "AutoDeal doesn't just deliver a vehicle; they deliver a symphony of mechanical perfection. Their provenance tracking and white-glove concierge standards are completely unparalleled in the industry.",
  },
  {
    id: "elena-moretti",
    name: "Elena Moretti",
    title: "Tech Entrepreneur & Racer",
    location: "Milan, Italy",
    category: "Track Specials",
    acquiredVehicle: "Porsche 911 GT3 RS",
    verifiedStatus: "Verified Owner",
    avatar: elena,
    rating: 4.9,
    quote:
      "Finding a partner that understands the visceral connection between driver, track telemetry, and machine is extraordinarily rare. AutoDeal exceeded every expectation from acquisition to delivery.",
  },
  {
    id: "viktor-sterling",
    name: "Viktor Sterling",
    title: "Motorsport Team Principal",
    location: "Monte Carlo, Monaco",
    category: "Hypercars",
    acquiredVehicle: "Aston Martin Valkyrie",
    verifiedStatus: "VIP Member",
    avatar: viktor,
    rating: 5.0,
    quote:
      "The acquisition process was as smooth as the high-revving V12 they sourced for my collection. AutoDeal has fundamentally redefined what a high-end automotive experience should be.",
  },
];

const categories = ["All Reviews", "Hypercars", "Track Specials"];

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState("All Reviews");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  const filteredTestimonials =
    activeCategory === "All Reviews"
      ? testimonialData
      : testimonialData.filter((item) => item.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#020503] py-24 sm:py-32 border-t border-b border-[#00ff87]/10 text-white"
    >
      {/* Darker Gradient Overlay - ensures stars in starBg pop with crisp contrast */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#020503] via-[#07130d] to-[#020503] opacity-95" />

      {/* Fixed starBg Background Image Layer - using starBg.src to ensure URL validity */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen pointer-events-none transition-opacity duration-1000"
        style={{ backgroundImage: `url(${starBg.src})` }}
      />

      {/* Radial Dark Vignette Mask for depth and focus */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020503_85%)] pointer-events-none" />

      {/* Ambient Glowing Emerald Light Orb */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff87]/8 blur-[140px] pointer-events-none" />

      {/* Subtle Decorative Star Sparkles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 h-1 w-1 rounded-full bg-[#00ff87] shadow-[0_0_12px_#00ff87] animate-pulse" />
        <div
          className="absolute top-1/3 right-1/5 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-ping"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 h-1 w-1 rounded-full bg-[#00ff87]/80 shadow-[0_0_8px_#00ff87] animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-2/3 right-1/3 h-1 w-1 rounded-full bg-amber-300 shadow-[0_0_6px_#fcd34d] animate-pulse"
          style={{ animationDuration: "5s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            style={{ transitionDelay: "0ms" }}
            className={`inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,135,0.15)] transition duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#00ff87]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ff87]">
              Client Testimonials
            </span>
          </div>

          <div
            style={{ transitionDelay: "60ms" }}
            className={`mt-5 flex items-center justify-center gap-2 transition duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                strokeWidth={1.5}
                className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
              />
            ))}
          </div>

          <h2
            style={{ transitionDelay: "120ms" }}
            className={`mt-6 [font-family:Orbitron,sans-serif] text-3xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl transition duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Curating{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-[#00ff87] to-teal-300 bg-clip-text text-transparent">
              Excellence
            </span>{" "}
            Together
          </h2>

          <p
            style={{ transitionDelay: "240ms" }}
            className={`mt-4 text-base leading-relaxed italic tracking-wide text-[#dae6d8]/70 sm:text-lg transition duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Hear directly from private collectors, race engineers, and
            automotive connoisseurs who entrust their legacy acquisitions to
            AutoDeal.
          </p>

          <div
            style={{ transitionDelay: "360ms" }}
            className={`mx-auto mt-6 h-[2px] w-28 bg-gradient-to-r from-transparent via-[#00ff87] to-transparent transition duration-700 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Filter Tabs */}
        <div
          style={{ transitionDelay: "480ms" }}
          className={`mt-10 flex items-center justify-center gap-3 transition duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 font-mono ${
                activeCategory === cat
                  ? "border border-[#00ff87]/50 bg-[#00ff87]/20 text-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.2)]"
                  : "border border-white/10 bg-white/[0.03] text-gray-400 hover:border-[#00ff87]/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((item, index) => (
            <div
              key={item.id}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#00ff87]/15 bg-gradient-to-b from-[#091610]/80 via-[#050c08]/90 to-[#020503]/95 p-8 backdrop-blur-md transition-all duration-700 ease-out hover:border-[#00ff87]/40 hover:shadow-[0_20px_50px_rgba(0,255,135,0.12)] hover:-translate-y-1.5 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {/* Top Glowing Edge Accent Line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/40 to-transparent transition-opacity duration-500 group-hover:via-[#00ff87]/80" />

              {/* Ambient Hover Light Effect */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#00ff87]/5 blur-2xl transition duration-500 group-hover:bg-[#00ff87]/15" />

              <div>
                {/* Card Header: Quote Icon & Verification Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00ff87]/20 bg-[#00ff87]/10 text-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.15)]">
                    <Quote className="h-5 w-5" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#00ff87]" />
                    <span>{item.verifiedStatus}</span>
                  </div>
                </div>

                {/* Quote Body */}
                <p className="mt-6 leading-relaxed text-xl tracking-wide text-[#dae6d8] italic">
                  &ldquo; {item.quote}&rdquo;
                </p>

                {/* Vehicle Badge */}
                <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-[#00ff87]/90">
                  <Award className="h-3.5 w-3.5 text-[#00ff87]" />
                  <span>
                    Acquired:{" "}
                    <strong className="text-white font-medium">
                      {item.acquiredVehicle}
                    </strong>
                  </span>
                </div>
              </div>

              <div>
                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent" />

                {/* Author & Rating Section */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#00ff87]/30 transition-all duration-300 group-hover:ring-[#00ff87]/70 group-hover:scale-105">
                      <Image
                        src={item.avatar}
                        fill
                        alt={item.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold tracking-wide text-white text-sm">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400">{item.title}</p>
                      <p className="text-[11px] text-[#00ff87]/70 font-mono">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Star Rating Bar */}
                <div className="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-black/40 px-3.5 py-2">
                  <StarRating rating={item.rating} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    Verified Handoff
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner & Action */}
        <div
          style={{ transitionDelay: "1050ms" }}
          className={`mt-16 rounded-2xl border border-[#00ff87]/20 bg-gradient-to-r from-[#05110b]/90 via-[#0a1c13]/80 to-[#05110b]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">
                  Guaranteed Provenance & White-Glove Handover
                </h4>
                <p className="text-sm text-[#dae6d8]/70">
                  Every acquisition includes 150-point mechanical inspection &
                  direct curator matching.
                </p>
              </div>
            </div>

            <button
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#00ff87] bg-[#00ff87] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#20ff97] hover:shadow-[0_0_30px_rgba(0,255,135,0.4)] cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              <span>Request Concierge Access</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
