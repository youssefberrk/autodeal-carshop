import { Brand, BrandItemProps } from "@/types/brandItem";
import Image from "next/image";
import React from "react";

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
	<div className="flex flex-col items-center gap-3 group cursor-pointer  px-8">
		<Image
			src={brand.logo}
			alt={brand.name}
			width={22}
			height={22}
			className="h-12 w-auto opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
		/>
		<span className="text-gray-600 text-xs uppercase tracking-wider group-hover:text-[#00C853] transition-colors duration-300">
			{brand.name}
		</span>
	</div>
);

const BrandsSection: React.FC = () => {
	return (
		<section className="bg-[#0a0a0a] border-y border-[#1a1a1a] py-10 overflow-hidden">
			{/* Header */}
			<div className="text-center mb-8">
				<p className="text-gray-500 text-sm uppercase tracking-widest">
					Trusted Brands We Carry
				</p>
			</div>

			{/* Wrapper */}

			<div className="marquee-wrapper  ">
				{/* Track 1 */}
				<div className="marquee-track">
					{brands.map((brand, index) => (
						<div key={index} className="item">
							<BrandItem key={`a-${index}`} brand={brand} />
						</div>
					))}
				</div>

				{/* Track 2 (duplicate) */}
				<div className="marquee-track">
					{brands.map((brand, index) => (
						<div key={index} className="item">
							<BrandItem key={`a-${index}`} brand={brand} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BrandsSection;
