"use client";

import Image from "next/image";
import { brands as allBrands } from "../BrandsSection";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface BrandAtelierProps {
  brands: string[];
  onSelectBrand: (brand: string) => void;
}

export const brandLogos: Record<string, string> = Object.fromEntries(
  allBrands.map((brand) => [brand.name, brand.logo]),
);

const BrandAtelier = ({ brands, onSelectBrand }: BrandAtelierProps) => (
  <motion.section
    className="shop-editorial-section brand-atelier-section"
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    <motion.div
      className="shop-section-intro"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="shop-eyebrow">Curated Marques</span>
      <h2 className="shop-display-title">Explore the marques</h2>
      <p className="shop-section-description">
        A considered selection of the world&apos;s most distinctive automotive
        names.
      </p>
    </motion.div>
    <div className="brand-atelier-list">
      {brands.map((brand, index) => {
        const logoUrl = brandLogos[brand];

        return (
          <motion.button
            key={brand}
            type="button"
            onClick={() => onSelectBrand(brand)}
            className="brand-atelier-item group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="brand-atelier-index">
              {String(index + 1).padStart(2, "0")}
            </span>

            {logoUrl && (
              <div className="brand-atelier-logo-container">
                <Image
                  src={logoUrl}
                  alt={`${brand} logo`}
                  width={24}
                  height={24}
                  unoptimized
                  className={`brand-atelier-logo ${
                    brand === "Audi" ? "brightness-0 invert" : ""
                  }`}
                />
              </div>
            )}

            <span className="brand-atelier-name">{brand}</span>
            <ArrowUpRight size={16} strokeWidth={1.4} />
          </motion.button>
        );
      })}
    </div>
  </motion.section>
);

export default BrandAtelier;
