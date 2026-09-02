import BrandsSection from "@/components/BrandsSection";
import DiscoverShowrooms from "@/components/DiscoverShowrooms";
import HeroSection from "@/components/HeroSection";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";

export default function Home() {
	return (
		<div className="border-0 overflow-x-clip">
			<HeroSection />
			<BrandsSection />
			<Story />
			<Testimonials />
			<DiscoverShowrooms />
		</div>
	);
}
