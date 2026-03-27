"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ferari from "@/public/ferari.jpg";
import porscheEngine from "@/public/porsche-w-engine-ai.jpg";

const Story = () => {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(entry.isIntersecting);
				}
			},
			{
				threshold: 0.2, // Trigger when 20% of component is visible
				rootMargin: "0px 0px -100px 0px", // Trigger slightly before it's fully in view
			},
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	return (
		<section ref={sectionRef} className="py-15 px-6 h-auto  border-0">
			<div className="w-auto  relative z-10 p-14 ">
				{/* Radial Spotlight */}

				{/* Green Accents */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1f1a]/50 to-transparent"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#39ff14]/5 rounded-full blur-[120px]"></div>
				<div className="text-white flex flex-col lg:flex-row items-center justify-center  gap-10">
					{/* Paragraph */}
					<div className="w-full lg:w-1/2 mb-11 p-6 ">
						<h1
							className={`text-4xl md:text-5xl font-bold pb-22 pt-12 ${
								isVisible ? "story-title" : "opacity-0"
							}`}>
							The AutoDeal Story
						</h1>
						<p
							className={`text-lg text-gray-300 pt-22 leading-relaxed ${
								isVisible ? "story-para" : "opacity-0"
							}`}>
							Founded in 2024, AutoDeal was born from a singular obsession: the
							intersection of kinetic energy and mechanical art. We don't just
							sell vehicles — we curate high-performance legacies for the
							discerning driver.
						</p>
					</div>

					{/* Images */}
					<div
						className={`w-full lg:w-1/2 flex flex-col sm:flex-row gap-6 sm:items-start ${
							isVisible ? "story-image" : "opacity-0"
						}`}>
						<div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
							<Image
								src={porscheEngine}
								alt="Porsche Engine"
								fill
								className="object-cover opacity-80  hover:opacity-100  transition-all duration-300"
							/>
						</div>

						<div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg self-end sm:self-start sm:mt-9 ">
							<Image
								src={ferari}
								alt="Ferrari"
								fill
								className="object-cover opacity-80  hover:opacity-100  transition-all duration-300"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Story;
