import Image from "next/image";
import React from "react";
import curly from "@/public/testimonials/curly.jpg";
import elena from "@/public/testimonials/elena.jpg";

const StarRating = ({ rating }: { rating: number }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	const emptyStars = 5 - Math.ceil(rating);

	return (
		<div className="flex items-center gap-1">
			{/* Full stars */}
			{[...Array(fullStars)].map((_, i) => (
				<svg
					key={`full-${i}`}
					className="h-5 w-5 fill-yellow-400"
					viewBox="0 0 24 24">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}

			{/* Half star */}
			{hasHalfStar && (
				<svg className="h-5 w-5" viewBox="0 0 24 24">
					<defs>
						<linearGradient id="half-star">
							<stop offset="50%" stopColor="#facc15" />
							<stop offset="50%" stopColor="#374151" />
						</linearGradient>
					</defs>
					<path
						fill="url(#half-star)"
						d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
					/>
				</svg>
			)}

			{/* Empty stars */}
			{[...Array(emptyStars)].map((_, i) => (
				<svg
					key={`empty-${i}`}
					className="h-5 w-5 fill-gray-700"
					viewBox="0 0 24 24">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
				</svg>
			))}
		</div>
	);
};
const Testimonials = () => {
	// Star rating component

	return (
		<section className="relative overflow-hidden bg-[#0a0f0d] py-20">
			{/* Background Effects - matching your Story section */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#0d1f1a]/30 via-transparent to-[#0d1f1a]/30" />
			<div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39ff14]/3 blur-[100px]" />

			<div className="relative z-10 mx-10 text-white">
				{/* Header */}
				<div className="mb-16 text-center">
					<span className="text-sm uppercase tracking-[0.3em] text-green-400">
						The Inner Circle
					</span>
					<h1 className="mt-4 text-5xl font-bold tracking-wide text-white md:text-6xl">
						Curating Excellence Together
					</h1>
					<div className="mx-auto mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent" />
				</div>

				{/* Testimonials Grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{/* Testimonial 1 - Julian Vance - 5 stars */}
					<div className="group relative overflow-hidden rounded-lg border border-green-400/10 bg-gradient-to-br from-[#0d1f1a]/40 to-[#0a0f0d]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
						{/* Quote */}
						<p className="mb-6 text-lg leading-relaxed text-gray-300">
							<span className="text-3xl text-green-400/60 md:text-5xl">❞</span>{" "}
							AutoDeal doesn&apos;t just deliver a vehicle; they deliver a
							symphony of mechanical perfection. Their attention to detail is
							unparalleled in the industry.
						</p>

						{/* Divider */}
						<div className="mb-6 h-[1px] w-16 bg-gradient-to-r from-green-400/50 to-transparent" />

						{/* Author */}
						<div className="flex items-center gap-4">
							<div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-green-400/20">
								<Image
									src={curly}
									fill
									alt="Julian Vance"
									className="object-cover"
								/>
							</div>
							<div>
								<h3 className="font-semibold text-white">Julian Vance</h3>
								<p className="text-sm text-gray-400">
									Private Collector, Geneva
								</p>
							</div>
						</div>

						{/* Rating */}
						<div className="mt-4">
							<StarRating rating={5} />
						</div>
					</div>

					{/* Testimonial 2 - Elena Moretti - 4.5 stars */}
					<div className="group relative overflow-hidden rounded-lg border border-green-400/10 bg-gradient-to-br from-[#0d1f1a]/40 to-[#0a0f0d]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
						{/* Quote */}
						<p className="mb-6 text-lg leading-relaxed text-gray-300">
							<span className="text-3xl text-green-400/60 md:text-5xl">❞</span>{" "}
							Finding a partner that understands the visceral connection between
							driver and machine is rare. AutoDeal is that rare exception.
						</p>

						{/* Divider */}
						<div className="mb-6 h-[1px] w-16 bg-gradient-to-r from-green-400/50 to-transparent" />

						{/* Author */}
						<div className="flex items-center gap-4">
							<div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-green-400/20">
								<Image src={elena} fill alt="elena" className="object-cover" />
							</div>
							<div>
								<h3 className="font-semibold text-white">Elena Moretti</h3>
								<p className="text-sm text-gray-400">
									Tech Entrepreneur, Milan
								</p>
							</div>
						</div>

						{/* Rating */}
						<div className="mt-4">
							<StarRating rating={4.5} />
						</div>
					</div>

					{/* Testimonial 3 - Julian Vance - 5 stars */}
					<div className="group relative overflow-hidden rounded-lg border border-green-400/10 bg-gradient-to-br from-[#0d1f1a]/40 to-[#0a0f0d]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]">
						{/* Quote */}
						<p className="mb-6 text-lg leading-relaxed text-gray-300">
							<span className="text-3xl text-green-400/60 md:text-5xl">❞</span>{" "}
							AutoDeal doesn&apos;t just deliver a vehicle; they deliver a symphony
							of mechanical perfection. Their attention to detail is
							unparalleled in the industry.
						</p>

						{/* Divider */}
						<div className="mb-6 h-[1px] w-16 bg-gradient-to-r from-green-400/50 to-transparent" />

						{/* Author */}
						<div className="flex items-center gap-4">
							<div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-green-400/20">
								<Image
									src={curly}
									fill
									alt="Julian Vance"
									className="object-cover"
								/>
							</div>
							<div>
								<h3 className="font-semibold text-white">Julian Vance</h3>
								<p className="text-sm text-gray-400">
									Private Collector, Geneva
								</p>
							</div>
						</div>

						{/* Rating */}
						<div className="mt-4">
							<StarRating rating={5} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
