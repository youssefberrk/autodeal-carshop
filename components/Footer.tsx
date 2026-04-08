import { ArrowRight } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-[#0f1a17] text-white py-16 pl-8 border-t border-[rgba(34,197,94,0.18)]">
			<div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-20">
				<div className="space-y-3">
					<h1
						className="text-2xl font-black  leading-tight"
						style={{ fontFamily: "'Orbitron', sans-serif" }}>
						<span className="text-white">AUTO</span>
						<span className="text-green-400">DEAL</span>
					</h1>
					<p className="text-gray-400 text-sm manrope pb-2">
						© 2026 AutoDeal. Kinetic Prestige Engineering.
					</p>
				</div>
				<div>
					<h2 className="mb-6 text-base tracking-wide">EXPLORE</h2>
					<ul className="space-y-3 text-gray-400 text-xs uppercase">
						<li>new arrivals</li>
						<li>pre-owned</li>
						<li>bespoke division</li>
						<li>financing</li>
					</ul>
				</div>
				<div>
					<h2 className="mb-6 text-base tracking-wide">LEGAL</h2>
					<ul className="space-y-3 text-gray-400 text-xs uppercase">
						<li>privacy policy</li>
						<li>Terms of Service</li>
						<li>Cookie Settings</li>
					</ul>
				</div>
				<div className="">
					<h2 className="mb-6 text-base tracking-wide">NEWSLETTER</h2>
					<form
						action=""
						className="relative flex items-center  w-full max-w-xs ">
						<input
							type="email"
							placeholder="Join The Inner Cicle"
							className="focus:outline-none w-full pr-10 border-b border-green-900/40  px-3 py-2 text-sm"
						/>
						<button className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-600 cursor-pointer">
							<ArrowRight size={34} strokeWidth={1} />
						</button>
					</form>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
