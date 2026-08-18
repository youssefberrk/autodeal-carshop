"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Globe2, ShieldCheck, Quote, Sparkles } from "lucide-react";
import ferari from "@/public/ferari.jpg";
import porscheEngine from "@/public/porsche-w-engine-ai.jpg";
import showroom from "@/public/showroom.png";

const principles = [
  {
    index: "01",
    label: "Mission",
    title: "Bespoke acquisition",
    copy: "Provide a focused acquisition experience that honors the engineering mastery of the world's most prestigious automotive brands.",
    metric: "24/7",
    metricLabel: "concierge desk",
    phase: "Intake",
  },
  {
    index: "02",
    label: "Vision",
    title: "Global showroom standard",
    copy: "Set the benchmark for luxury automotive retail through digital precision and concierge-level physical service.",
    metric: "1:1",
    metricLabel: "curator matching",
    phase: "Curation",
  },
  {
    index: "03",
    label: "Values",
    title: "Enduring craftsmanship",
    copy: "Champion timeless engineering, curated provenance, and concierge care across every stage of ownership.",
    metric: "100%",
    metricLabel: "quality assurance",
    phase: "Handover",
  },
];

const principleIcons = [Compass, Globe2, ShieldCheck];

const images: Array<{
  src: StaticImageData;
  alt: string;
  label: string;
  className: string;
}> = [
  {
    src: showroom,
    alt: "AutoDeal showroom with performance vehicles on display",
    label: "Berlin showroom HQ",
    className: "md:translate-y-10",
  },
  {
    src: ferari,
    alt: "Curated Ferrari performance vehicle",
    label: "Curated V8 performance",
    className: "md:-translate-y-4",
  },
];

const stats = [
  { target: 2024, label: "founded", suffix: "" },
  { target: 3, label: "curator teams", suffix: "" },
  { target: 48, label: "source review", suffix: "h" },
];

const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      options || { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
};

const StoryImage = ({
  src,
  alt,
  label,
  className,
}: {
  src: StaticImageData;
  alt: string;
  label: string;
  className: string;
}) => (
  <figure
    className={`group relative min-h-[400px] sm:min-h-[480px] lg:min-h-[580px] overflow-hidden rounded-lg border border-[#00ff87]/10 bg-[#08110c] shadow-[0_28px_80px_rgba(0,0,0,0.42)] ${className}`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 100vw"
      className="object-cover opacity-80 transition duration-500 ease-out group-hover:scale-[1.035] group-hover:opacity-95"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/90 via-[#050806]/10 to-transparent" />
    <figcaption className="absolute bottom-4 left-4 right-4 inline-flex max-w-max items-center gap-2 border border-[#00ff87]/25 bg-[#020503]/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00ff87] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87] animate-pulse" />
      <span>{label}</span>
    </figcaption>
  </figure>
);

const PrincipleCard = ({
  index,
  label,
  title,
  copy,
  metric,
  metricLabel,
  phase,
  isActive,
  onActivate,
}: (typeof principles)[number] & {
  isActive: boolean;
  onActivate: () => void;
}) => {
  const Icon = principleIcons[Number(index) - 1];

  return (
    <article
      className={`group relative overflow-hidden rounded-lg border bg-[linear-gradient(140deg,rgba(218,230,216,0.1),rgba(8,16,12,0.78)_34%,rgba(3,7,5,0.92))] p-6 outline outline-1 transition duration-700 ease-out focus-visible:ring-2 focus-visible:ring-[#00ff87]/55 sm:p-7 ${
        isActive
          ? "translate-y-0 border-[#00ff87]/35 opacity-100 shadow-[0_32px_120px_rgba(0,255,135,0.16)] outline-[#00ff87]/10"
          : "translate-y-3 border-white/5 opacity-42 shadow-[0_18px_60px_rgba(0,0,0,0.22)] outline-white/[0.02] grayscale-[0.2] hover:translate-y-0 hover:border-[#00ff87]/20 hover:opacity-78 hover:grayscale-0 lg:scale-[0.94] lg:hover:scale-[0.98]"
      }`}
      onClick={onActivate}
      onFocus={onActivate}
      onPointerEnter={onActivate}
      role="button"
      tabIndex={0}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-lg ring-1 transition duration-700 ${
          isActive
            ? "ring-[#00ff87]/30"
            : "ring-transparent group-hover:ring-[#00ff87]/15"
        }`}
      />
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/60 to-transparent transition-opacity duration-700 ${
          isActive ? "opacity-90" : "opacity-20"
        }`}
      />
      <div
        className={`absolute -right-20 -top-24 h-52 w-52 rounded-full blur-3xl transition duration-700 ${
          isActive ? "bg-[#00ff87]/[0.11]" : "bg-[#00ff87]/[0.025]"
        }`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_42%,transparent_48%)] transition duration-700 ${
          isActive ? "translate-x-16 opacity-45" : "opacity-0"
        }`}
      />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span
            className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] shadow-[0_0_18px_rgba(0,255,135,0.12)] transition duration-700 ${
              isActive
                ? "border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87]"
                : "border-white/10 bg-white/[0.03] text-[#dae6d8]/45"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </span>
          <span className="text-xs uppercase tracking-[0.28em] text-[#dae6d8]/45">
            {phase}
          </span>
        </div>

        <h3 className="max-w-[13rem] [font-family:Orbitron,sans-serif] text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
          {title}
        </h3>

        <p className="max-w-xl text-base leading-7 text-[#dae6d8]/72">{copy}</p>

        <div
          className={`flex items-end justify-between border-t pt-5 transition-colors duration-700 ${
            isActive ? "border-[#00ff87]/18" : "border-white/10"
          }`}
        >
          <div>
            <p
              className={`[font-family:Orbitron,sans-serif] text-3xl font-semibold transition-colors duration-700 ${
                isActive ? "text-[#00ff87]" : "text-[#dae6d8]/45"
              }`}
            >
              {metric}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dae6d8]/45">
              {metricLabel}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#dae6d8]/35">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ff87]/55" />
            <span className="font-mono text-[10px] tracking-[0.24em]">
              {index}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

const HudTimeline = ({
  isVisible,
  activeIndex,
  onSelectIndex,
}: {
  isVisible: boolean;
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
}) => {
  const activePrinciple = principles[activeIndex];
  const ActiveIcon = principleIcons[activeIndex];

  return (
    <div className="relative mx-auto flex min-h-[28rem] sm:min-h-[34rem] w-full max-w-[18rem] flex-col items-center justify-center py-10 mt-6 text-center lg:min-h-[42rem]">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00ff87]/20 to-transparent" />
      <div className="absolute inset-y-10 left-1/2 w-[72px] -translate-x-1/2 rounded-full border-x border-[#00ff87]/10 bg-[linear-gradient(90deg,transparent,rgba(0,255,135,0.035),transparent)]" />
      <div
        className={`absolute left-1/2 top-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#00ff87] via-[#00ff87]/55 to-transparent shadow-[0_0_30px_rgba(0,255,135,0.55)] transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100" : "h-0 opacity-0"
        }`}
        style={{
          height: isVisible ? `${30 + activeIndex * 24}%` : "0%",
        }}
      />

      <div className="relative z-10 flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full border border-[#00ff87]/25 bg-[#030705]/85 shadow-[inset_0_0_52px_rgba(0,255,135,0.1),0_24px_90px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-700 hover:border-[#00ff87]/45">
        <div
          className="absolute inset-2.5 sm:inset-3 rounded-full border border-dashed border-[#00ff87]/25 transition-transform duration-700"
          style={{ transform: `rotate(${activeIndex * 38}deg)` }}
        />
        <div className="absolute inset-6 sm:inset-7 rounded-full border border-white/10 bg-[#08100c]/75" />
        <div className="absolute inset-[15px] sm:inset-[18px] rounded-full bg-[conic-gradient(from_160deg,rgba(0,255,135,0.08),transparent_24%,rgba(0,255,135,0.2)_42%,transparent_54%,rgba(218,230,216,0.08)_72%,transparent)] opacity-80" />
        <div className="relative flex flex-col items-center">
          <ActiveIcon
            className="mb-2 sm:mb-3 h-6 w-6 sm:h-7 sm:w-7 text-[#00ff87]"
            aria-hidden="true"
          />
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.38em] text-[#00ff87]/65">
            {activePrinciple.phase}
          </p>
          <p className="mt-1 sm:mt-2 [font-family:Orbitron,sans-serif] text-base sm:text-lg font-semibold uppercase tracking-[0.2em] text-white">
            {activePrinciple.label}
          </p>
          <p className="mt-1 sm:mt-2 font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-[#dae6d8]/40">
            {activePrinciple.index} / 03
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex w-full flex-col gap-6 sm:gap-8">
        {principles.map(({ index, phase }, itemIndex) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectIndex?.(itemIndex)}
            style={{ transitionDelay: `${itemIndex * 150}ms` }}
            className={`relative flex items-center justify-center transition duration-700 ease-out cursor-pointer group/dot outline-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div
              className={`absolute left-1/2 h-px w-20 sm:w-28 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition duration-700 ${
                itemIndex === activeIndex
                  ? "via-[#00ff87]/70"
                  : "via-[#00ff87]/18 group-hover/dot:via-[#00ff87]/40"
              }`}
            />
            <div
              className={`relative flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border bg-[#050806] transition duration-700 ${
                itemIndex === activeIndex
                  ? "scale-110 border-[#00ff87]/70 shadow-[0_0_42px_rgba(0,255,135,0.32)]"
                  : "border-[#00ff87]/18 shadow-[0_0_22px_rgba(0,255,135,0.08)] group-hover/dot:border-[#00ff87]/40"
              }`}
            >
              <span
                className={`absolute rounded-full bg-[#00ff87] shadow-[0_0_18px_rgba(0,255,135,0.85)] transition-all duration-700 ${
                  itemIndex === activeIndex
                    ? "h-3.5 w-3.5"
                    : "h-2 w-2 opacity-55 group-hover/dot:opacity-80"
                }`}
              />
              <span
                className={`absolute -right-24 hidden font-mono text-[10px] uppercase tracking-[0.28em] transition duration-700 lg:block ${
                  itemIndex === activeIndex
                    ? "text-[#00ff87]/80"
                    : "text-[#dae6d8]/32"
                }`}
              >
                {phase}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const Story = () => {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const wheelLockRef = useRef(false);
  const wheelReleaseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Independent scroll observers for progressive reveal
  const [headerRef, headerInView] = useInView({
    threshold: 0.2,
    rootMargin: "0px 0px -40px 0px",
  });
  const [quoteRef, quoteInView] = useInView({
    threshold: 0.2,
    rootMargin: "0px 0px -40px 0px",
  });
  const [contentRef, contentInView] = useInView({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  });
  const [doctrineRef, doctrineInView] = useInView({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  });

  const [displayStats, setDisplayStats] = useState<number[]>(() =>
    stats.map(() => 0),
  );

  useEffect(() => {
    if (!contentInView) return;

    let animationFrameId = 0;
    const startTime = performance.now();
    const duration = 1200;

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      setDisplayStats(stats.map(({ target }) => Math.round(target * progress)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [contentInView]);

  useEffect(() => {
    return () => {
      if (wheelReleaseRef.current) {
        clearTimeout(wheelReleaseRef.current);
      }
    };
  }, []);

  const moveActivePrinciple = useCallback((direction: 1 | -1) => {
    setActivePrincipleIndex((current) => {
      const next = current + direction;

      if (next < 0) return principles.length - 1;
      if (next >= principles.length) return 0;

      return next;
    });
  }, []);

  const handleHudWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (Math.abs(event.deltaY) < 18) return;

      event.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      moveActivePrinciple(event.deltaY > 0 ? 1 : -1);

      if (wheelReleaseRef.current) {
        clearTimeout(wheelReleaseRef.current);
      }

      wheelReleaseRef.current = setTimeout(() => {
        wheelLockRef.current = false;
      }, 620);
    },
    [moveActivePrinciple],
  );

  const handleHudKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveActivePrinciple(1);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveActivePrinciple(-1);
      }
    },
    [moveActivePrinciple],
  );

  return (
    <section className="relative isolate overflow-hidden border-y border-[#00ff87]/10 bg-[#050806] px-4 py-20 text-white sm:px-6 lg:py-28">
      <Image
        src={porscheEngine}
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="absolute inset-0 -z-20 object-cover opacity-[0.14] saturate-75"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050806_0%,rgba(5,8,6,0.84)_34%,#050806_100%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#00ff87]/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        {/* Step 1: Centered Section Header (Scroll Animated) */}
        <div
          ref={headerRef}
          className="mx-auto max-w-3xl text-center mb-14 lg:mb-24"
        >
          <span
            style={{ transitionDelay: "0ms" }}
            className={`inline-flex max-w-full border border-[#00ff87]/20 bg-[#00ff87]/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#00ff87] backdrop-blur-sm sm:tracking-[0.42em] transition duration-700 ease-out ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            Origin & heritage
          </span>
          <h2
            style={{ transitionDelay: "120ms" }}
            className={`mt-6 [font-family:Orbitron,sans-serif] font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-7xl transition duration-700 ease-out ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            The Auto<span className="text-[#00ff87]">Deal</span> Story
          </h2>
          <div
            style={{ transitionDelay: "240ms" }}
            className={`mx-auto mt-6 h-[2px] w-28 bg-gradient-to-r from-transparent via-[#00ff87] to-transparent transition duration-700 ease-out ${
              headerInView ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Step 2: Featured Core Philosophy Quote (Scroll Animated) */}
        <div ref={quoteRef} className="mx-auto mb-16 max-w-4xl lg:mb-28">
          <div
            style={{ transitionDelay: "0ms" }}
            className={`group relative overflow-hidden rounded-2xl border border-[#00ff87]/20 bg-[linear-gradient(135deg,rgba(0,255,135,0.05),rgba(8,17,12,0.85)_40%,rgba(3,7,5,0.95))] p-8 sm:p-12 lg:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-md transition duration-700 ease-out ${
              quoteInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            {/* Decorative HUD Corner Markers */}
            <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-[#00ff87]/40" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-10 w-10 border-r-2 border-b-2 border-[#00ff87]/40" />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#00ff87]/10 blur-3xl transition duration-1000 group-hover:bg-[#00ff87]/20" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* HUD Pill Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.15)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Core Philosophy</span>
              </div>

              {/* Quote Icon */}
              <Quote className="mb-4 h-10 w-10 text-[#00ff87]/35 rotate-180" />

              {/* Main Statement */}
              <blockquote className="max-w-3xl text-2xl font-bold uppercase leading-tight tracking-wide text-white sm:text-3xl lg:text-4xl [font-family:Orbitron,sans-serif]">
                Founded in 2024, AutoDeal was born from a singular obsession:{" "}
                <span className="bg-gradient-to-r from-white via-[#00ff87] to-[#00ff87] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,255,135,0.4)]">
                  the intersection of kinetic energy and mechanical art.
                </span>
              </blockquote>

              {/* Bottom HUD Metadata */}
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ff87]/60" />
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#dae6d8]/50">
                  AutoDeal Genesis // 2024
                </span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#00ff87]/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Detailed Story Content Grid (Text, Stats & Images) */}
        <div
          ref={contentRef}
          className={`grid gap-12 transition duration-700 ease-out lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20 items-center ${
            contentInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* Narrative & Metrics Column */}
          <div className="flex flex-col justify-center gap-10 sm:gap-12">
            {/* Context Narrative */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2.5 font-mono text-[15px] uppercase tracking-[0.32em] text-[#00ff87]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
                <span>Curation Philosophy</span>
              </div>

              <div className="relative border-l-2 border-gradient pl-5 sm:pl-7 [border-image:linear-gradient(to_bottom,#00ff87_0%,rgba(0,255,135,0.3)_60%,transparent_100%)_1]">
                <p className="max-w-xl text-lg sm:text-xl lg:text-[1.45rem] font-semibold leading-relaxed uppercase text-white tracking-wide">
                  We do not just sell vehicles. We curate{" "}
                  <span className="bg-gradient-to-r from-[#00ff87] via-[#38ef7d] to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,255,135,0.2)]">
                    high-performance legacies
                  </span>{" "}
                  for discerning drivers.
                </p>
                <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed sm:leading-8 text-[#dae6d8]/75 font-normal italic tracking-wide">
                  Our approach is rooted in exhaustive{" "}
                  <span className="text-white border-b border-[#00ff87]/30 pb-0.5 font-medium transition-colors hover:text-[#00ff87]">
                    provenance research
                  </span>
                  , precision{" "}
                  <span className="text-white border-b border-[#00ff87]/30 pb-0.5 font-medium transition-colors hover:text-[#00ff87]">
                    mechanical expertise
                  </span>
                  , and an uncompromising showroom standard built around
                  absolute trust.
                </p>
              </div>
            </div>

            {/* Verified Metrics Grid */}
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 border-t border-white/10 pt-8">
              {stats.map(({ label, suffix }, index) => (
                <div
                  key={label}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  className={`group relative overflow-hidden rounded-2xl border border-[#00ff87]/15 bg-[linear-gradient(135deg,rgba(0,255,135,0.03),rgba(8,16,12,0.85))] p-4 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.4)] backdrop-blur-sm transition duration-700 ease-out hover:border-[#00ff87]/40 hover:shadow-[0_20px_60px_rgba(0,255,135,0.08)] ${
                    contentInView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="pointer-events-none absolute top-0 right-0 h-3.5 w-3.5 border-t border-r border-[#00ff87]/30 transition-colors group-hover:border-[#00ff87]/60" />
                  <p className="[font-family:Orbitron,sans-serif] text-xl font-bold text-[#00ff87] sm:text-2xl drop-shadow-[0_0_12px_rgba(0,255,135,0.2)]">
                    {displayStats[index]}
                    <span className="ml-1 text-sm font-medium text-[#dae6d8]/85">
                      {suffix}
                    </span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Staggered Gallery Column */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 items-center">
            {images.map((image) => (
              <StoryImage key={image.label} {...image} />
            ))}
          </div>
        </div>
      </div>

      {/* Step 4: Operational Doctrine & Live Cockpit HUD Timeline */}
      <div
        ref={doctrineRef}
        className={`mx-auto mt-16 max-w-7xl transition duration-700 ease-out lg:mt-28 ${
          doctrineInView
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#00ff87]/70">
              Operational doctrine
            </p>
            <h3 className="mt-3 max-w-2xl [font-family:Playfair_Display,serif] text-3xl font-semibold italic leading-tight text-white sm:text-4xl">
              A live cockpit for provenance, curation, and ownership.
            </h3>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-[#00ff87]/35 to-transparent lg:block" />
        </div>

        <div
          className="group/hud relative rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]/55"
          onWheel={handleHudWheel}
          onKeyDown={handleHudKeyDown}
          tabIndex={0}
          aria-label="AutoDeal operating principles timeline"
        >
          <div className="absolute inset-0 -z-10 rounded-lg bg-[radial-gradient(circle_at_50%_45%,rgba(0,255,135,0.12),transparent_34%)] opacity-0 blur-2xl transition duration-700 group-hover/hud:opacity-100" />
          <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00ff87]/18 to-transparent lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[18rem] -translate-x-1/2 rounded-full border border-[#00ff87]/10 opacity-0 transition duration-700 group-hover/hud:opacity-100 lg:block" />
          {/* Desktop timeline layout (large screens) */}
          <div className="hidden lg:grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.48fr)_minmax(0,1fr)] lg:items-center">
            <div className="grid gap-8 lg:pr-8">
              <div
                style={{ transitionDelay: `0ms` }}
                className={`relative transition duration-700 ease-out lg:mr-8 ${
                  doctrineInView
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-6 opacity-0"
                }`}
              >
                <div
                  className={`pointer-events-none absolute -inset-4 rounded-lg bg-[#00ff87]/[0.055] blur-xl transition duration-700 ${
                    activePrincipleIndex === 0 ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute -right-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r to-transparent transition duration-700 lg:block ${
                    activePrincipleIndex === 0
                      ? "from-[#00ff87]/70"
                      : "from-[#00ff87]/18"
                  }`}
                />
                <PrincipleCard
                  {...principles[0]}
                  isActive={activePrincipleIndex === 0}
                  onActivate={() => setActivePrincipleIndex(0)}
                />
              </div>
              <div
                style={{ transitionDelay: `300ms` }}
                className={`relative transition duration-700 ease-out lg:ml-12 ${
                  doctrineInView
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-6 opacity-0"
                }`}
              >
                <div
                  className={`pointer-events-none absolute -inset-4 rounded-lg bg-[#00ff87]/[0.055] blur-xl transition duration-700 ${
                    activePrincipleIndex === 2 ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute -right-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r to-transparent transition duration-700 lg:block ${
                    activePrincipleIndex === 2
                      ? "from-[#00ff87]/70"
                      : "from-[#00ff87]/18"
                  }`}
                />
                <PrincipleCard
                  {...principles[2]}
                  isActive={activePrincipleIndex === 2}
                  onActivate={() => setActivePrincipleIndex(2)}
                />
              </div>
            </div>

            <HudTimeline
              isVisible={doctrineInView}
              activeIndex={activePrincipleIndex}
              onSelectIndex={setActivePrincipleIndex}
            />

            <div className="grid gap-8 lg:pl-8">
              <div
                style={{ transitionDelay: `150ms` }}
                className={`relative transition duration-700 ease-out lg:ml-8 ${
                  doctrineInView
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0"
                }`}
              >
                <div
                  className={`pointer-events-none absolute -inset-4 rounded-lg bg-[#00ff87]/[0.055] blur-xl transition duration-700 ${
                    activePrincipleIndex === 1 ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute -left-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-l to-transparent transition duration-700 lg:block ${
                    activePrincipleIndex === 1
                      ? "from-[#00ff87]/70"
                      : "from-[#00ff87]/18"
                  }`}
                />
                <PrincipleCard
                  {...principles[1]}
                  isActive={activePrincipleIndex === 1}
                  onActivate={() => setActivePrincipleIndex(1)}
                />
              </div>
              <div
                className={`hidden rounded-lg border bg-[#030705]/70 p-6 text-right shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition duration-700 lg:block ${
                  activePrincipleIndex === 1
                    ? "border-[#00ff87]/20 opacity-100"
                    : "border-white/10 opacity-45"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#00ff87]/60">
                  Concierge signal
                </p>
                <p className="mt-3 text-sm leading-7 text-[#dae6d8]/62">
                  Every milestone stays visible, verified, and paired with a
                  human curator before the keys change hands.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet HUD layout (lg:hidden) */}
          <div className="flex flex-col items-center lg:hidden gap-8 sm:gap-10">
            {/* Steps Selector */}
            <div className="flex items-center justify-center gap-2 sm:gap-6 border-b border-white/10 pb-4 w-full max-w-md">
              {principles.map(({ index, label }, itemIndex) => {
                const Icon = principleIcons[itemIndex];
                const isSelected = itemIndex === activePrincipleIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActivePrincipleIndex(itemIndex)}
                    className={`flex items-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-3.5 rounded-lg border uppercase tracking-wider text-[9px] sm:text-[10px] transition-all duration-300 outline-none cursor-pointer ${
                      isSelected
                        ? "border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.1)]"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* The HUD Visual Timeline Wheel */}
            <div className="w-full flex justify-center -my-8">
              <HudTimeline
                isVisible={doctrineInView}
                activeIndex={activePrincipleIndex}
                onSelectIndex={setActivePrincipleIndex}
              />
            </div>

            {/* Active Principle Card */}
            <div className="w-full max-w-md">
              <PrincipleCard
                {...principles[activePrincipleIndex]}
                isActive={true}
                onActivate={() => {}}
              />
            </div>

            {/* Faint info tag */}
            <div className="rounded-lg border border-white/10 bg-[#030705]/70 p-5 text-center shadow-md max-w-md w-full">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#00ff87]/60">
                Concierge signal
              </p>
              <p className="mt-2 text-[11px] sm:text-xs leading-relaxed text-[#dae6d8]/60">
                Every milestone stays visible, verified, and paired with a human
                curator before the keys change hands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
