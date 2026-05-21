"use client";

import { useEffect, useRef } from "react";
import { Brand, BrandItemProps } from "@/types/brandItem";
import Image from "next/image";

const brands: Brand[] = [
	{ name: "Audi", logo: "https://cdn.worldvectorlogo.com/logos/audi-2.svg" },
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
			width={22}
			height={22}
			className="h-12 w-auto opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 ease-out"
		/>
		<span className="text-gray-600 text-xs uppercase tracking-wider group-hover:text-[#00C853] transition-colors duration-300">
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
		<section className="flex flex-col bg-background border-y border-border py-12 overflow-hidden relative">
			<div className="absolute inset-0 bg-brand/5 blur-[100px] pointer-events-none" />
			
			<div className="text-center mb-8 relative z-10">
				<p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.4em] opacity-60">
					Engineering Partners
				</p>
				<h2 className="text-foreground text-2xl lg:text-3xl font-bold mt-2">
					Trusted Brands We Carry
				</h2>
			</div>

			<div className="marquee-wrapper marquee-mask mb-5 mt-8 relative z-10">
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
