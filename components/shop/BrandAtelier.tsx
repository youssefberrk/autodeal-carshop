"use client";

import Image from "next/image";
import { brands as allBrands } from "../BrandsSection";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";

interface BrandAtelierProps {
  brands: string[];
  onSelectBrand: (brand: string) => void;
}

export const brandLogos: Record<string, string> = Object.fromEntries(
  allBrands.map((brand) => [brand.name, brand.logo]),
);

/* Inventory brands come from car data, so match them case-insensitively. */
const logoKeyByLowerName: Record<string, string> = Object.fromEntries(
  Object.keys(brandLogos).map((name) => [name.toLowerCase(), name]),
);

const resolveLogoUrl = (brand: string): string | undefined =>
  brandLogos[brand] ?? brandLogos[logoKeyByLowerName[brand.toLowerCase()] ?? ""];

/* Dark marks (black paths on transparent) need inverting on the dark atelier. */
const isLightMark = (brand: string): boolean => {
  const normalized = brand.toLowerCase();
  return normalized === "audi" || normalized === "aston martin";
};

/* One shared spring so every tilt settles with the same weight. */
const TILT_SPRING = { stiffness: 240, damping: 24, mass: 0.6 };
const CARD_TILT = 7; // max card rotation, degrees
const HEADING_TILT = 5; // the display headline is large enough to turn further than body copy
const CARD_LIFT = 22; // card depth toward the viewer, px
const HEADING_REST_LIFT = 16; // the headline always floats ahead of the flat small text, px
const HEADING_ACTIVE_LIFT = 40; // extra depth while the cursor is over the intro, px

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

interface BrandAtelierItemProps {
  brand: string;
  index: number;
  onSelectBrand: (brand: string) => void;
}

const BrandAtelierItem = ({
  brand,
  index,
  onSelectBrand,
}: BrandAtelierItemProps) => {
  const reduceMotion = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), TILT_SPRING);
  const rotateY = useSpring(useMotionValue(0), TILT_SPRING);
  const lift = useSpring(useMotionValue(0), TILT_SPRING);
  const glareX = useSpring(useMotionValue(50), TILT_SPRING);
  const glareY = useSpring(useMotionValue(50), TILT_SPRING);

  // The highlight slides across the card surface as the cursor moves.
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(184, 216, 194, 0.26) 0%, rgba(184, 216, 194, 0.06) 30%, transparent 62%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = clamp01((event.clientX - rect.left) / rect.width);
    const py = clamp01((event.clientY - rect.top) / rect.height);

    rotateY.set((0.5 - px) * CARD_TILT * 2);
    rotateX.set((py - 0.5) * CARD_TILT * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    lift.set(CARD_LIFT);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const logoUrl = resolveLogoUrl(brand);

  return (
    <div className="brand-atelier-item-scene">
      <motion.button
        type="button"
        onClick={() => onSelectBrand(brand)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="brand-atelier-item group"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.1 + index * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ rotateX, rotateY, z: lift }}
      >
        <motion.span
          aria-hidden
          className="brand-atelier-glare"
          style={{ background: glare }}
        />

        <span className="brand-atelier-index">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="brand-atelier-logo-container">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={`${brand} logo`}
              width={72}
              height={72}
              unoptimized
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className={`brand-atelier-logo ${
                isLightMark(brand) ? "brightness-0 invert" : ""
              }`}
            />
          )}
        </div>

        <span className="brand-atelier-name">{brand}</span>
        <ArrowUpRight size={16} strokeWidth={1.4} />
      </motion.button>
    </div>
  );
};

const BrandAtelier = ({ brands, onSelectBrand }: BrandAtelierProps) => {
  const reduceMotion = useReducedMotion();

  const headingRotateX = useSpring(useMotionValue(0), TILT_SPRING);
  const headingRotateY = useSpring(useMotionValue(0), TILT_SPRING);
  const headingLift = useSpring(useMotionValue(HEADING_REST_LIFT), TILT_SPRING);
  const spotX = useSpring(useMotionValue(50), TILT_SPRING);
  const spotY = useSpring(useMotionValue(40), TILT_SPRING);

  // A soft spotlight behind the headline that tracks the cursor, so the
  // raised title casts its own light as it turns.
  const headingGlow = useMotionTemplate`radial-gradient(circle at ${spotX}% ${spotY}%, rgba(184, 216, 194, 0.24) 0%, rgba(184, 216, 194, 0.07) 36%, transparent 70%)`;

  const handleIntroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = clamp01((event.clientX - rect.left) / rect.width);
    const py = clamp01((event.clientY - rect.top) / rect.height);

    headingRotateY.set((0.5 - px) * HEADING_TILT * 2);
    headingRotateX.set((py - 0.5) * HEADING_TILT * 2);
    spotX.set(px * 100);
    spotY.set(py * 100);
    headingLift.set(HEADING_ACTIVE_LIFT);
  };

  const handleIntroPointerLeave = () => {
    headingRotateX.set(0);
    headingRotateY.set(0);
    headingLift.set(HEADING_REST_LIFT);
    spotX.set(50);
    spotY.set(40);
  };

  return (
    <motion.section
      className="shop-editorial-section brand-atelier-section"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="shop-section-intro"
        onPointerMove={handleIntroPointerMove}
        onPointerLeave={handleIntroPointerLeave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          aria-hidden
          className="brand-atelier-heading-glow"
          style={{ background: headingGlow }}
        />

        <span className="shop-eyebrow">Curated Marques</span>
        <motion.h2
          className="shop-display-title"
          style={{
            rotateX: headingRotateX,
            rotateY: headingRotateY,
            z: headingLift,
          }}
        >
          Explore the <em>marques</em>
        </motion.h2>
        <p className="shop-section-description">
          A considered selection of the world&apos;s most distinctive automotive
          names.
        </p>
        <div className="brand-atelier-list">
          {brands.map((brand, index) => (
            <BrandAtelierItem
              key={brand}
              brand={brand}
              index={index}
              onSelectBrand={onSelectBrand}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default BrandAtelier;
