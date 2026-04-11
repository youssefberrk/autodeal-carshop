import { ArrowRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-[#0f1a17] text-white py-16  border-t  border-[rgba(34,197,94,0.18)]">
			<div className="container text-center mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_2fr] gap-24">
				<div className="flex flex-col items-center gap-4">
					<h1
						className="text-2xl font-black leading-tight"
						style={{ fontFamily: "'Orbitron', sans-serif" }}>
						<span className="text-white">AUTO</span>
						<span className="text-green-400">DEAL</span>
					</h1>
					<p className="text-gray-400 text-xs  manrope pb-2">
						© 2026 AutoDeal. Kinetic Prestige Engineering.
					</p>
				</div>
				<div>
					<h2 className="mb-6 font-label uppercase tracking-[0.2em] text-[#00ff87] text-[15px]">
						explore
					</h2>
					<ul className="space-y-4 text-gray-400 text-xs uppercase tracking-widest">
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							new arrivals
						</li>
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							pre-owned
						</li>
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							bespoke division
						</li>
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							financing
						</li>
					</ul>
				</div>
				<div>
					<h2 className="mb-6 font-label uppercase tracking-[0.2em] text-[#00ff87] text-[15px]">
						legal
					</h2>
					<ul className="space-y-4 text-gray-400 text-xs uppercase">
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							privacy policy
						</li>
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							Terms of Service
						</li>
						<li className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer">
							Cookie Settings
						</li>
					</ul>
				</div>
				<div>
					<h2 className="mb-6 font-label uppercase tracking-[0.2em] text-[#00ff87] text-[15px]">
						newsletter
					</h2>

					<form action="" className="relative flex items-center w-full mb-4">
						<input
							type="email"
							placeholder="Join The Inner Circle"
							className="focus:outline-none w-full border-b border-green-900/40 px-4 py-3 pr-12 text-sm bg-transparent"
						/>

						<button className="absolute right-0 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-600 cursor-pointer">
							<ArrowRight size={34} strokeWidth={1} />
						</button>
					</form>
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-center justify-between p-3 mt-16 gap-5 text-gray-200 border-t border-[rgba(34,197,94,0.18)]">
				<p>by youssefberrk</p>
				<div className="flex flex-col md:flex-row gap-4">
					<FaLinkedin className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer" />
					<FaGithub className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer" />
					<FaInstagram className="hover:text-[#00ff87] transition-colors delay-75 cursor-pointer" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
