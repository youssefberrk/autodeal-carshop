import BrandsSection from "@/components/BrandsSection";
import HeroSection from "@/components/HeroSection";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";

export default function Home() {
	return (
		<div className="border-0">
			<HeroSection />
			<BrandsSection />
			<Story />
			<Testimonials />
		</div>
	);
}
