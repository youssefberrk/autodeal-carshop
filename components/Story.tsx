"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
  },
  {
    index: "02",
    label: "Vision",
    title: "Global showroom standard",
    copy: "Set the benchmark for luxury automotive retail through digital precision and concierge-level physical service.",
    metric: "1:1",
    metricLabel: "curator matching",
  },
];

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
    className={`group relative min-h-[320px] overflow-hidden rounded-lg border border-[#00ff87]/10 bg-[#08110c] shadow-[0_28px_80px_rgba(0,0,0,0.42)] ${className}`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 100vw"
      className="object-cover opacity-80 transition duration-500 ease-out group-hover:scale-[1.035] group-hover:opacity-95"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/90 via-[#050806]/10 to-transparent" />
    <figcaption className="absolute bottom-4 left-4 right-4 inline-flex max-w-max items-center border border-[#00ff87]/20 bg-[#020503]/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00ff87]/85 backdrop-blur-sm">
      {label}
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
}: (typeof principles)[number]) => (
  <article className="group relative overflow-hidden rounded-lg border border-[#00ff87]/10 bg-[#08100c]/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-1 hover:border-[#00ff87]/30 hover:shadow-[0_24px_80px_rgba(0,255,135,0.08)] sm:p-7">
    <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,135,0.05)_1px,transparent_1px)] [background-size:18px_18px] opacity-50" />
    <div className="relative flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#00ff87]/70">
            <span>{index}</span>
            <span aria-hidden="true"> / </span>
            <span>{label}</span>
          </p>
          <h3 className="mt-3 max-w-[13rem] [font-family:Orbitron,sans-serif] text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            {title}
          </h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#00ff87]/20 bg-[#00ff87]/5 font-mono text-xs text-[#00ff87]">
          {index}
        </span>
      </div>

      <p className="max-w-xl text-base leading-7 text-[#dae6d8]/72">{copy}</p>

      <div className="flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <p className="[font-family:Orbitron,sans-serif] text-3xl font-semibold text-[#00ff87]">
            {metric}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dae6d8]/45">
            {metricLabel}
          </p>
        </div>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00ff87]/50" />
      </div>
    </div>
  </article>
);

const Story = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-y border-[#00ff87]/10 bg-[#050806] px-4 py-20 text-white sm:px-6 lg:py-28"
    >
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

      <div
        className={`mx-auto grid max-w-7xl gap-12 transition duration-700 ease-out lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:gap-16 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex flex-col justify-between gap-10">
          <div>
            <span className="inline-flex max-w-full border border-[#00ff87]/20 bg-[#00ff87]/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#00ff87] backdrop-blur-sm sm:tracking-[0.42em]">
              Origin & heritage
            </span>
            <h2 className="mt-6 max-w-3xl [font-family:Orbitron,sans-serif] text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              The Auto<span className="text-[#00ff87]">Deal</span> Story
            </h2>
          </div>

          <div className="space-y-6 border-l border-[#00ff87]/30 pl-5 sm:pl-7">
            <p className="max-w-2xl text-2xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-3xl">
              Founded in 2024, AutoDeal was born from a singular obsession: the
              intersection of kinetic energy and mechanical art.
            </p>
            <p className="max-w-xl text-base leading-8 text-[#dae6d8]/68 sm:text-lg">
              We do not just sell vehicles. We curate high-performance legacies
              for discerning drivers through provenance research, mechanical
              expertise, and a showroom standard built around trust.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
            {[
              ["2024", "founded"],
              ["3", "curator teams"],
              ["48h", "source review"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="[font-family:Orbitron,sans-serif] text-xl font-semibold text-[#00ff87] sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#dae6d8]/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {images.map((image) => (
            <StoryImage key={image.label} {...image} />
          ))}
        </div>
      </div>

      <div
        className={`mx-auto mt-14 grid max-w-7xl gap-4 transition duration-700 ease-out sm:grid-cols-2 lg:mt-20 lg:gap-6 ${
          isVisible
            ? "translate-y-0 opacity-100 delay-150"
            : "translate-y-6 opacity-0"
        }`}
      >
        {principles.map((principle) => (
          <PrincipleCard key={principle.label} {...principle} />
        ))}
      </div>
    </section>
  );
};

export default Story;
