"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { showroomsData } from "@/public/showrooms/ShowroomsData";

const DiscoverShowrooms = () => {
	const showrooms = showroomsData;
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
		<section ref={sectionRef} className="py-20 overflow-x-hidden">
			<div className="text-center mb-16">
				<span
					style={{ transitionDelay: "0ms" }}
					className={`text-sm uppercase tracking-widest text-green-400 font-manrope mb-6 block transition duration-700 ease-out ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
					}`}>
					GLOBAL PRESENCE
				</span>
				<h1
					style={{ transitionDelay: "120ms" }}
					className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white heading transition duration-700 ease-out ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
					}`}>
					Discover Our Showrooms
				</h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{showrooms.map((att, index) => (
					<div
						key={att.id}
						style={{ transitionDelay: `${300 + index * 150}ms` }}
						className={`border border-green-400/10 bg-gradient-to-br from-[#0d1f1a]/40 to-[#0a0f0d]/60 p-8 backdrop-blur-sm transition-all duration-700 ease-out hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-6 opacity-0"
						}`}>
						<div className="mb-6">
							<iframe
								src={att.mapUrl}
								className="w-full h-64 rounded-lg border-0"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
						<div className="text-white">
							<h3 className="text-2xl md:text-3xl font-newsreader font-bold mb-6">
								{att.city}
							</h3>
							<div className="space-y-4 font-manrope">
								<div className="flex items-start gap-3">
									<MapPin size={20} color="#46ac02" className="shrink-0 mt-1" />
									<p className="text-sm md:text-base leading-relaxed text-gray-200">
										{att.address}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<Phone size={20} color="#46ac02" className="shrink-0" />
									<p className="text-sm md:text-base text-gray-200">
										{att.phone}
									</p>
								</div>
								<div className="flex items-start gap-3">
									<Clock size={20} color="#46ac02" className="shrink-0 mt-1" />
									<div className="text-sm md:text-base leading-relaxed">
										<p className="text-gray-200">{att.timing.weekdays}</p>
										<p className="text-green-400">{att.timing.weekends}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default DiscoverShowrooms;
