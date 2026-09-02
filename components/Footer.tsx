"use client";

import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState, FormEvent } from "react";

const Footer = () => {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");

	const handleSubscribe = async (e: FormEvent) => {
		e.preventDefault();
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

		setStatus("loading");
		try {
			const res = await fetch("/api/subscribe-newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			if (!res.ok) throw new Error("Failed");
			setStatus("success");
			setEmail("");
			setTimeout(() => setStatus("idle"), 4000);
		} catch {
			setStatus("error");
			setTimeout(() => setStatus("idle"), 4000);
		}
	};

	return (
		<footer className="relative text-white pt-20 pb-12 border-t border-[rgba(34,197,94,0.12)] mt-32">
			{/* Subtle top glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent" />

			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				{/* Main grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
					{/* Brand — left column */}
					<div className="lg:col-span-3 flex flex-col items-start gap-5">
						<Link href="/">
							<h1
								className="text-2xl font-black leading-tight tracking-tight"
								style={{ fontFamily: "'Orbitron', sans-serif" }}>
								<span className="text-white">AUTO</span>
								<span className="text-[#00ff87]">DEAL</span>
							</h1>
						</Link>
						<p className="text-gray-500 text-xs leading-relaxed max-w-[220px]">
							Curating the world&apos;s finest automotive acquisitions since
							2026.
						</p>
						<div className="flex gap-3 pt-1">
							<FaLinkedin className="text-gray-500 hover:text-[#00ff87] transition-colors duration-200 cursor-pointer text-sm" />
							<FaGithub className="text-gray-500 hover:text-[#00ff87] transition-colors duration-200 cursor-pointer text-sm" />
							<FaInstagram className="text-gray-500 hover:text-[#00ff87] transition-colors duration-200 cursor-pointer text-sm" />
						</div>
					</div>

					{/* Explore */}
					<div className="lg:col-span-2">
						<h3 className="mb-5 text-[10px] font-[Orbitron] uppercase tracking-[0.25em] text-[#00ff87]/70">
							Explore
						</h3>
						<ul className="space-y-3">
							{[
								{ label: "New Arrivals", href: "/new-arrivals" },
								{ label: "Pre-Owned", href: "/pre-owned" },
								{ label: "All Inventory", href: "/shop" },
								{ label: "Bespoke Division", href: "/about" },
								{ label: "Search", href: "/search" },
							].map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="group inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs uppercase tracking-[0.12em] transition-colors duration-200">
										<span className="w-0 group-hover:w-3 h-px bg-[#00ff87] transition-all duration-300" />
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div className="lg:col-span-2">
						<h3 className="mb-5 text-[10px] font-[Orbitron] uppercase tracking-[0.25em] text-[#00ff87]/70">
							Quick Links
						</h3>
						<ul className="space-y-3">
							{[
								{ label: "Contact", href: "/contact" },
								{ label: "About Us", href: "/about" },
								{ label: "Wishlist", href: "/wishlist" },
								{ label: "Track Order", href: "/orders" },
								{ label: "Sign In", href: "/login" },
							].map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="group inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs uppercase tracking-[0.12em] transition-colors duration-200">
										<span className="w-0 group-hover:w-3 h-px bg-[#00ff87] transition-all duration-300" />
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal */}
					<div className="lg:col-span-2">
						<h3 className="mb-5 text-[10px] font-[Orbitron] uppercase tracking-[0.25em] text-[#00ff87]/70">
							Legal
						</h3>
						<ul className="space-y-3">
							{[
								{ label: "Privacy Policy", href: "/privacy" },
								{ label: "Terms of Service", href: "/terms" },
								{ label: "Cookie Settings", href: "/cookies" },
							].map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="group inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs uppercase tracking-[0.12em] transition-colors duration-200">
										<span className="w-0 group-hover:w-3 h-px bg-[#00ff87] transition-all duration-300" />
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div className="lg:col-span-3 flex flex-col gap-4">
						<h3 className="text-[10px] font-[Orbitron] uppercase tracking-[0.25em] text-[#00ff87]/70">
							Newsletter
						</h3>
						<p className="text-gray-500 text-xs leading-relaxed">
							Be the first to receive new arrivals, private collection drops,
							and exclusive invitations.
						</p>
						<form onSubmit={handleSubscribe} className="relative group">
							<div className="relative flex items-center">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									required
									disabled={status === "loading" || status === "success"}
									className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 pr-14 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00ff87]/40 focus:bg-white/[0.06] transition-all duration-300 disabled:opacity-50"
								/>
								<button
									type="submit"
									disabled={status === "loading" || status === "success"}
									className="absolute right-1.5 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-md bg-[#00ff87]/10 text-[#00ff87] hover:bg-[#00ff87] hover:text-black transition-all duration-200 active:scale-90 disabled:hover:bg-[#00ff87]/10 disabled:hover:text-[#00ff87] disabled:active:scale-100">
									{status === "loading" ? (
										<Loader2 size={14} className="animate-spin" />
									) : status === "success" ? (
										<Check size={14} />
									) : (
										<ArrowRight size={16} strokeWidth={1.5} />
									)}
								</button>
							</div>
							<p
								className={`text-[10px] mt-2 tracking-wide transition-colors duration-300 ${
									status === "success"
										? "text-[#00ff87]"
										: status === "error"
											? "text-red-400"
											: "text-gray-600"
								}`}>
								{status === "success"
									? "Welcome to the Inner Circle — check your inbox."
									: status === "error"
										? "Something went wrong. Try again."
										: "No spam. Unsubscribe anytime."}
							</p>
						</form>
					</div>
				</div>

				{/* Bottom divider */}
				<div className="relative mt-16 mb-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-white/[0.05]" />
					</div>
				</div>

				{/* Bottom bar */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-gray-600 text-[10px] uppercase tracking-[0.25em]">
						&copy; 2026 AutoDeal. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
						<Link
							href="/privacy"
							className="hover:text-gray-400 transition-colors duration-200">
							Privacy
						</Link>
						<span className="text-white/[0.08]">/</span>
						<Link
							href="/terms"
							className="hover:text-gray-400 transition-colors duration-200">
							Terms
						</Link>
						<span className="text-white/[0.08]">/</span>
						<Link
							href="/cookies"
							className="hover:text-gray-400 transition-colors duration-200">
							Cookies
						</Link>
					</div>
					<p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
						by <span className="italic text-gray-500">youssefberrk</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
