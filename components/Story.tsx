"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ferari from "@/public/ferari.jpg";

import showroom from "@/public/showroom.png";

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
				<h1
					className={`text-5xl text-white md:text-7xl font-bold tracking-[0.1em] leading-tight text-center font-sans pb-8 pt-4 ${
						isVisible ? "story-title" : "opacity-0"
					}`}
					style={{ fontFamily: "'fantasy', sans-serif" }}>
					The Auto<span className="text-green-400">Deal</span> Story
				</h1>
				<div className="text-white flex flex-col lg:flex-row  items-center justify-center  gap-10">
					{/* Paragraph */}

					<div className="w-full lg:w-1/2 mb-11 p-6 ">
						<div
							className={` text-gray-300 pt-22 leading-relaxed ${
								isVisible ? "story-para" : "opacity-0"
							}`}>
							<p className="mb-10 text-3xl font-bold">
								Founded in 2024, AutoDeal was born from a singular obsession:
								the intersection of kinetic energy and mechanical art. We don't
								just sell vehicles — we curate high-performance legacies for the
								discerning driver.
							</p>
							<div>
								<h2 className="font-mono text-4xl font-bold">
									<span className="text-5xl text-green-500">01.</span> Our
									Mission
								</h2>{" "}
								<p className="mt-2 font-bold text-2xl italic">
									To provide a bespoke acquisition experience that honors the
									engineering mastery of the world's most prestigious automotive
									brands.
								</p>
								<h2 className="font-mono text-4xl font-bold mt-4">
									<span className="text-5xl text-green-500">02.</span> Our
									Vision
								</h2>{" "}
								<p className="mt-2 font-bold text-2xl italic">
									Setting the global benchmark for luxury automotive retail
									through digital innovation and concierge-level physical
									service.
								</p>
							</div>
						</div>
					</div>

					{/* Images */}
					<div
						className={`w-full lg:w-1/2 flex flex-col sm:flex-row gap-6 sm:items-start mb-4 ${
							isVisible ? "story-image" : "opacity-0"
						}`}>
						<div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
							<Image
								src={showroom}
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
