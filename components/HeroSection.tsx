import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import edited1 from "@/public/edited1.png";

const HeroSection: React.FC = () => {
	return (
		<section className="relative bg-[#010000c0] text-white">
			<div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center overflow-hidden">
				{/* left side - Car Image */}
				<div className="w-full lg:w-2/3 flex justify-center relative hero-image border-none">
					<Image
						src={edited1}
						alt="Car"
						className="border-none shadow-2xl max-w-full h-auto "
						width={860}
						height={860}
					/>
				</div>
				{/* right side - Text */}
				<div className="w-full lg:w-1/2 flex flex-col gap-6 ">
					<h1 className="hero-title  text-5xl lg:text-6xl font-extrabold leading-tight">
						Drive Your{" "}
						<span className="text-[#00C853] hero-accent">Dream Machine</span>
					</h1>
					<p className="text-lg hero-subtitle text-gray-300">
						Discover the finest selection of luxury and performance vehicles
					</p>
					<div className="flex hero-buttons gap-4 mt-4">
						<Button className="bg-[#00C853] hover:bg-[#00e664] hover:scale-110 w-[190px] h-[50px] text-xl text-black px-6 py-3 rounded-lg">
							Explore Collection
						</Button>
						<Button className="border border-[#00C853] hover:bg-[#0f1a17] w-[190px] h-[50px] text-xl hover:scale-110 text-white px-6 py-3 rounded-lg">
							Contact Us
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
