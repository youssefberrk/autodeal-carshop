"use client";

import { useEffect, useRef } from "react";
import { Brand, BrandItemProps } from "@/types/brandItem";
import Image from "next/image";

export const brands: Brand[] = [
	{
		name: "Audi",
		logo: "https://cdn.worldvectorlogo.com/logos/audi-new-logo.svg",
	},

	{ name: "BMW", logo: "https://cdn.worldvectorlogo.com/logos/bmw-2.svg" },
	{
		name: "Mercedes",
		logo: "https://cdn.worldvectorlogo.com/logos/mercedes-benz-9.svg",
	},
	{
		name: "Porsche",
		logo: "https://cdn.brandfetch.io/idOSUjsXG-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1726555597451",
	},
	{
		name: "Ferrari",
		logo: "https://cdn.worldvectorlogo.com/logos/ferrari-4.svg",
	},
	{
		name: "Lamborghini",
		logo: "https://cdn.worldvectorlogo.com/logos/lamborghini.svg",
	},
	{
		name: "Maserati",
		logo: "https://cdn.worldvectorlogo.com/logos/maserati.svg",
	},
	{
		name: "Bentley",
		logo: "https://cdn.worldvectorlogo.com/logos/bentley.svg",
	},
];

const BrandItem = ({ brand }: BrandItemProps) => (
	<div className="flex flex-col items-center gap-4 group cursor-pointer px-4 sm:px-6 md:px-8 transition-transform hover:scale-105 active:scale-95">
		<Image
			src={brand.logo}
			alt={brand.name}
			width={25}
			height={25}
			className={`h-20 w-auto opacity-70  group-hover:opacity-100  transition-all duration-300 ease-outw-auto ${
				brand.name === "Audi" ? "brightness-0 invert" : ""
			}`}
		/>
		<span className="text-gray-300 text-xs uppercase font-semibold tracking-wider group-hover:text-[#00C853] transition-colors duration-300">
			{brand.name}
		</span>
	</div>
);

const BrandsSection: React.FC = () => {
	const trackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (trackRef.current) {
				const singleSetWidth = trackRef.current.scrollWidth / 3;
				trackRef.current.style.setProperty(
					"--scroll-width",
					`-${singleSetWidth}px`,
				);
			}
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);

		return () => {
			window.removeEventListener("resize", updateWidth);
		};
	}, []);
	return (
		<section className="flex flex-col border-y border-border/40 py-16 bg-background overflow-hidden gap-12 relative">
			<div className="text-center space-y-2 relative z-10">
				<p className="text-foreground opacity-60 text-s  font-light uppercase tracking-[0.3em]">
					Engineering Partners
				</p>
				<h2 className="font-['Orbitron'] font-bold uppercase text-3xl md:text-5xl tracking-wide">
					Trusted Brands We Carry
				</h2>
			</div>

			<div className="marquee-wrapper marquee-mask  relative z-10">
				<div ref={trackRef} className="marquee-track">
					{[...brands, ...brands, ...brands].map((brand, index) => (
						<div key={index} className="item">
							<BrandItem brand={brand} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BrandsSection;
