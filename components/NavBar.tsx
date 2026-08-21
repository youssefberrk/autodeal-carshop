"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCarStore } from "@/store/useCarStore";
import CarDropDown from "./CarDropDown";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Logo from "./ui/Logo";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
	User,
	Heart,
	ShoppingBag,
	LogOut,
	LogIn,
	UserPlus,
} from "lucide-react";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/shop", label: "Shop" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];

const containerVariants = {
	hidden: { opacity: 0, height: 0 },
	visible: {
		opacity: 1,
		height: "auto",
		transition: {
			height: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
			opacity: { duration: 0.25 },
			staggerChildren: 0.05,
			delayChildren: 0.05,
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		transition: {
			height: { duration: 0.25, ease: [0.23, 1, 0.32, 1] },
			opacity: { duration: 0.15 },
			staggerChildren: 0.03,
			staggerDirection: -1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: -16 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.2 },
	},
	exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [carDropdownOpen, setCarDropdownOpen] = useState(false);
	const [checkedWishListCount, setCheckedWishListCount] = useState<
		number | null
	>(null);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const pathname = usePathname();

	const { data: session } = useSession();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);

	// Global search keyboard shortcuts: "/" or "Ctrl+K"
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const activeEl = document.activeElement;
			const isInputActive =
				activeEl &&
				(activeEl.tagName === "INPUT" ||
					activeEl.tagName === "TEXTAREA" ||
					activeEl.getAttribute("contenteditable") === "true");

			if (e.key === "/" && !isInputActive) {
				e.preventDefault();
				setIsSearchOpen(true);
			} else if ((e.ctrlKey || e.metaKey) && e.key?.toLowerCase() === "k") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			requestAnimationFrame(() => {
				const scrollTop = window.scrollY;
				const docHeight =
					document.documentElement.scrollHeight - window.innerHeight;

				const progress = docHeight > 0 ? scrollTop / docHeight : 0;
				setScrollProgress(progress);
			});
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (!profileOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest("[aria-label='Profile']")
			) {
				setProfileOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [profileOpen]);
	useEffect(() => {
		if (!menuOpen) return;

		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [menuOpen]);

	const { allocatedCars, whishListCars, isPopUp, isPurchasedPopUp } =
		useCarStore();
	const carCount = allocatedCars.length;
	const whishListCount = whishListCars.length;
	const isScrolled = scrollProgress > 0;

	return (
		<>
			<nav
				ref={navRef}
				className={`sticky z-50 transition-all duration-300 backdrop-blur-md
		${
			isScrolled
				? "top-2 sm:top-3 w-[calc(100%-1.5rem)] max-w-6xl mx-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(218,230,216,0.08)] pb-1"
				: "top-0 w-full"
		}
`}
				style={{
					background: isScrolled
						? "rgba(9, 26, 17, 0.72)"
						: "rgba(9, 26, 17, 0.3)",
					border: isScrolled ? "0.5px solid rgba(218, 230, 216, 0.28)" : "none",
					borderBottom: isScrolled
						? "1px solid rgba(218, 230, 216, 0.28)"
						: "1px solid rgba(218, 230, 216, 0.08)",
					borderRadius: isScrolled ? "1rem" : "0",
				}}>
				<div
					className={`pointer-events-none absolute bottom-px left-2 right-2 h-0.5 overflow-hidden ${
						isScrolled ? "rounded-b-[calc(1rem-1px)]" : "rounded-none"
					}`}>
					<div
						className="h-full bg-green-400"
						style={{
							width: `${scrollProgress * 100}%`,
							transition: "width 0.1s ease-out",
						}}
					/>
				</div>
				<div
					className={`relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 transition-all duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-6 xl:gap-8 xl:px-8 ${
						isScrolled ? "py-1.5 sm:py-2" : "py-3 sm:py-4"
					}`}>
					{/* Logo (Far Left) */}
					<div className="flex min-w-0 items-center justify-self-start">
						<Link
							href="/"
							className="inline-flex min-w-0 items-center text-xl font-bold">
							<Logo shrink={isScrolled} />
						</Link>
					</div>

					{/* Desktop Links (Centered In The Open Lane) */}
					<nav className="hidden min-w-0 items-center justify-center justify-self-center px-2 py-1.5 uppercase text-slate-300  logo lg:flex">
						<div
							className={`flex items-center justify-center gap-8 ${isScrolled ? "md:gap-10" : "md:gap-24"} px-2 text-[10px] tracking-[0.2em]`}>
							{navLinks.map(({ href, label }) => {
								const isActive = pathname === href;

								return (
									<Link
										key={href}
										href={href}
										className={`group relative px-1.5 py-1.5 transition-colors duration-300 ${
											isActive
												? "text-[#00ff87]"
												: "text-slate-300 hover:text-[#00ff87]"
										}`}>
										{label}
										<span
											className={`absolute -bottom-1 left-1/2 h-[1.5px] -translate-x-1/2 rounded-full bg-[#00ff87] transition-all duration-300 ease-out ${
												isActive ? "w-5" : "w-0 group-hover:w-full"
											}`}
										/>
									</Link>
								);
							})}
						</div>
					</nav>

					{/* Right Side Actions (Far Right) */}
					<div
						className={`flex items-center justify-self-end transition-all duration-300 relative text-slate-300 ${
							isScrolled
								? "gap-1 sm:gap-1.5 lg:gap-2"
								: "gap-1 sm:gap-1.5 lg:gap-2.5"
						}`}>
						{/* Search */}
						<button
							onClick={() => setIsSearchOpen(true)}
							aria-label="Search"
							className="grid size-9 place-items-center rounded-full border border-transparent transition-all duration-200 hover:border-[#00ff87]/20 hover:bg-[#00ff87]/10 hover:text-[#00ff87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff87]/70 active:scale-90 sm:size-10">
							<FaSearch
								className={`transition-all duration-300 ${
									isScrolled
										? "text-sm sm:text-base md:text-lg"
										: "text-base sm:text-lg"
								}`}
							/>
						</button>

						{/* Car cart with premium badge */}
						<div className="relative">
							<button
								onClick={() => setCarDropdownOpen(!carDropdownOpen)}
								aria-label="My Cars"
								className="relative grid size-9 place-items-center rounded-full border border-transparent text-slate-300 transition-all duration-200 hover:border-[#00ff87]/20 hover:bg-[#00ff87]/10 hover:text-[#00ff87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff87]/70 active:scale-90 sm:size-10">
								<IoCarSport
									className={`transition-all duration-300 ${
										isScrolled
											? "text-base sm:text-lg md:text-xl"
											: "text-lg sm:text-xl"
									}`}
								/>
								<AnimatePresence>
									{carCount > 0 && (
										<motion.span
											key="cart-badge"
											initial={{ scale: 0, opacity: 0, y: -2 }}
											animate={{
												scale: isPurchasedPopUp ? 1.35 : 1,
												opacity: 1,
												y: 0,
											}}
											exit={{ scale: 0, opacity: 0, y: 2 }}
											transition={{ type: "spring", stiffness: 500, damping: 14 }}
											className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] sm:text-[11px] font-mono font-black text-[#02130a] bg-gradient-to-r from-[#00ff87] via-emerald-400 to-emerald-500 rounded-full shadow-[0_0_14px_rgba(0,255,135,0.8)] border border-[#a3ffe0]/60 ring-2 ring-[#07170e] z-10 pointer-events-none select-none">
											{isPurchasedPopUp && (
												<span className="absolute -inset-0.5 rounded-full bg-[#00ff87]/60 animate-ping" />
											)}
											<span className="relative z-10">{carCount > 99 ? "99+" : carCount}</span>
										</motion.span>
									)}
								</AnimatePresence>
							</button>
							<AnimatePresence>
								{carDropdownOpen && (
									<CarDropDown onClose={() => setCarDropdownOpen(false)} />
								)}
							</AnimatePresence>
						</div>

						{/* Profile with Wishlist badge */}
						<div className="relative">
							<button
								onClick={() => setProfileOpen(!profileOpen)}
								aria-label="Profile"
								className="relative grid size-9 place-items-center rounded-full border border-transparent text-slate-300 transition-all duration-200 hover:border-[#00ff87]/20 hover:bg-[#00ff87]/10 hover:text-[#00ff87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff87]/70 active:scale-90 sm:size-10">
								<CgProfile
									className={`transition-all duration-300 ${
										isScrolled
											? "text-base sm:text-lg md:text-xl"
											: "text-lg sm:text-xl"
									}`}
								/>
								<AnimatePresence>
									{whishListCount > 0 && (
										<motion.span
											key="wishlist-profile-badge"
											initial={{ scale: 0, opacity: 0, y: -2 }}
											animate={{
												scale: isPopUp ? 1.35 : 1,
												opacity: 1,
												y: 0,
											}}
											exit={{ scale: 0, opacity: 0, y: 2 }}
											transition={{ type: "spring", stiffness: 500, damping: 14 }}
											className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] sm:text-[11px] font-mono font-bold text-white bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.7)] border border-rose-300/40 ring-2 ring-[#07170e] z-10 pointer-events-none select-none">
											{isPopUp && (
												<span className="absolute -inset-0.5 rounded-full bg-rose-500/60 animate-ping" />
											)}
											<span className="relative z-10">
												{whishListCount > 99 ? "99+" : whishListCount}
											</span>
										</motion.span>
									)}
								</AnimatePresence>
							</button>

							{/* Dropdown */}
							<div ref={dropdownRef}>
								<AnimatePresence>
									{profileOpen && (
										<motion.div
											initial={{ opacity: 0, scale: 0.95, y: -10 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											exit={{ opacity: 0, scale: 0.95, y: -10 }}
											transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
											className="absolute right-0 mt-3 w-56 md:w-64 rounded-2xl p-2.5 backdrop-blur-xl z-50 origin-top-right border border-[#00ff87]/15 shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
											style={{
												background: "rgba(5, 13, 8, 0.95)",
											}}>
											{session ? (
												<>
													{/* User Header */}
													<div className="px-3 py-2.5 border-b border-[#00ff87]/10 mb-2">
														<div className="flex items-center gap-2.5">
															{session.user?.image ? (
																<img
																	src={session.user.image}
																	alt={session.user.name || "User"}
																	className="w-9 h-9 rounded-full object-cover ring-2 ring-[#00ff87]/30"
																/>
															) : (
																<div className="w-9 h-9 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] font-bold text-sm shadow-[0_0_10px_rgba(0,255,135,0.1)]">
																	{session.user?.name
																		? session.user.name.charAt(0).toUpperCase()
																		: "U"}
																</div>
															)}
															<div className="flex flex-col min-w-0">
																<span
																	className="text-white text-s font-semibold truncate leading-tight"
																	style={{
																		fontFamily: "Orbitron, sans-serif",
																	}}>
																	{session.user?.name || "Premium User"}
																</span>
																<span className="text-[10px] text-slate-400 truncate mt-0.5 leading-none">
																	{session.user?.email || ""}
																</span>
															</div>
														</div>
													</div>

													{/* Menu Options */}
													<div className="space-y-0.5 uppercase">
														<Link
															onClick={() => setProfileOpen(false)}
															href="/profile"
															className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]">
															<User
																size={16}
																className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
															/>
															<span>Profile</span>
														</Link>
														<Link
															onClick={() => {
																setProfileOpen(false);
																setCheckedWishListCount(whishListCount);
															}}
															href="/whishlist"
															className="flex items-center justify-between px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]">
															<div className="flex items-center gap-3">
																<Heart
																	size={16}
																	className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
																/>
																<span>Wishlist</span>
															</div>
															{whishListCount > 0 && (
																<span className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white text-[10px] font-bold font-mono py-0.5 px-2 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] border border-rose-300/30">
																	{whishListCount}
																</span>
															)}
														</Link>
														<Link
															onClick={() => setProfileOpen(false)}
															href="/orders"
															className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]">
															<ShoppingBag
																size={16}
																className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
															/>
															<span>Orders</span>
														</Link>

														<div className="h-[1px] bg-[#00ff87]/10 my-1" />

														<button
															className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97] text-left"
															onClick={() => {
																signOut();
																setProfileOpen(false);
															}}>
															<LogOut
																size={16}
																className="text-slate-400 group-hover/item:text-red-400 transition-colors duration-200"
															/>
															<span>Logout</span>
														</button>
													</div>
												</>
											) : (
												<>
													{/* Logged Out Header */}
													<div className="px-3 py-2 border-b border-[#00ff87]/10 mb-2">
														<p
															className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-medium"
															style={{ fontFamily: "Orbitron, sans-serif" }}>
															Welcome to AutoDeal
														</p>
														<p className="text-[10px] text-[#00ff87]/80 mt-0.5">
															Explore premium showroom
														</p>
													</div>

													{/* Menu Options */}
													<div className="space-y-0.5">
														<Link
															onClick={() => setProfileOpen(false)}
															href="/login"
															className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]">
															<LogIn
																size={16}
																className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
															/>
															<span>Sign In</span>
														</Link>
														<Link
															onClick={() => setProfileOpen(false)}
															href="/login"
															className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]">
															<UserPlus
																size={16}
																className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
															/>
															<span>Register</span>
														</Link>
													</div>
												</>
											)}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						{/* Mobile Menu Button */}
						<button
							aria-label={menuOpen ? "Close menu" : "Open menu"}
							className={`grid size-9 place-items-center rounded-full border border-transparent text-slate-300 transition-all duration-200 hover:border-[#00ff87]/20 hover:bg-[#00ff87]/10 hover:text-[#00ff87] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff87]/70 active:scale-90 sm:size-10 lg:hidden ${
								isScrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"
							}`}
							onClick={() => setMenuOpen(!menuOpen)}>
							{menuOpen ? <FaTimes /> : <FaBars />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{menuOpen && (
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className={`lg:hidden overflow-hidden flex flex-col gap-4 font-medium text-slate-300 text-sm backdrop-blur-xl ${
								isScrolled ? "px-5 pb-5 rounded-b-xl" : "px-6 pb-6"
							}`}
							style={{
								background: "rgba(5, 13, 8, 0.97)",
								borderTop: "1px solid rgba(0, 255, 135, 0.15)",
							}}>
							{navLinks.map(({ href, label }, idx) => (
								<motion.div key={href} variants={itemVariants}>
									<Link
										href={href}
										onClick={() => setMenuOpen(false)}
										className="flex items-center gap-3 py-2.5 text-slate-200 hover:text-[#00ff87] transition-all duration-200 font-medium tracking-[0.15em] uppercase text-xs group active:scale-[0.97] w-full"
										style={{ fontFamily: "Orbitron, sans-serif" }}>
										<span className="font-mono text-[10px] text-[#00ff87]/45 tracking-normal">
											0{idx + 1} {"//"}
										</span>
										<span>{label}</span>
									</Link>
								</motion.div>
							))}

							<motion.div
								variants={itemVariants}
								className="h-[1px] bg-[#00ff87]/10 my-1"
							/>

							{session ? (
								<motion.div
									variants={itemVariants}
									className="flex flex-col gap-1.5">
									<span
										className="text-[10px] uppercase tracking-[0.15em] text-[#00ff87]/65 px-1 font-semibold"
										style={{ fontFamily: "Orbitron, sans-serif" }}>
										My Account
									</span>
									<div className="grid grid-cols-2 gap-2 mt-1">
										<Link
											href="/profile"
											onClick={() => setMenuOpen(false)}
											className="flex items-center gap-2.5 px-3 py-2.5 text-xs text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 border border-transparent hover:border-[#00ff87]/10 rounded-xl transition-all duration-200 active:scale-[0.97]">
											<User size={14} className="text-slate-400" />
											<span
												style={{ fontFamily: "Orbitron, sans-serif" }}
												className="text-[10px] tracking-wider uppercase">
												Profile
											</span>
										</Link>
										<Link
											href="/whishlist"
											onClick={() => {
												setMenuOpen(false);
												setCheckedWishListCount(whishListCount);
											}}
											className="flex items-center justify-between gap-2.5 px-3 py-2.5 text-xs text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 border border-transparent hover:border-[#00ff87]/10 rounded-xl transition-all duration-200 active:scale-[0.97]">
											<div className="flex items-center gap-2.5">
												<Heart size={14} className="text-slate-400" />
												<span
													style={{ fontFamily: "Orbitron, sans-serif" }}
													className="text-[10px] tracking-wider uppercase">
													Wishlist
												</span>
											</div>
											{whishListCount > 0 && (
												<span className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white text-[9px] font-bold font-mono py-0.5 px-2 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] border border-rose-300/30">
													{whishListCount}
												</span>
											)}
										</Link>
										<Link
											href="/orders"
											onClick={() => setMenuOpen(false)}
											className="flex items-center gap-2.5 px-3 py-2.5 text-xs text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 border border-transparent hover:border-[#00ff87]/10 rounded-xl transition-all duration-200 active:scale-[0.97]">
											<ShoppingBag size={14} className="text-slate-400" />
											<span
												style={{ fontFamily: "Orbitron, sans-serif" }}
												className="text-[10px] tracking-wider uppercase">
												Orders
											</span>
										</Link>
										<button
											onClick={() => {
												signOut();
												setMenuOpen(false);
											}}
											className="flex items-center gap-2.5 px-3 py-2.5 text-xs text-slate-300 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-xl transition-all duration-200 active:scale-[0.97] text-left">
											<LogOut size={14} className="text-slate-400" />
											<span
												style={{ fontFamily: "Orbitron, sans-serif" }}
												className="text-[10px] tracking-wider uppercase">
												Logout
											</span>
										</button>
									</div>
								</motion.div>
							) : (
								<motion.div
									variants={itemVariants}
									className="flex flex-col gap-1.5">
									<span
										className="text-[10px] uppercase tracking-[0.15em] text-[#00ff87]/65 px-1 font-semibold"
										style={{ fontFamily: "Orbitron, sans-serif" }}>
										Showroom Entry
									</span>
									<div className="grid grid-cols-2 gap-2 mt-1">
										<Link
											href="/login"
											onClick={() => setMenuOpen(false)}
											className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 border border-[#00ff87]/15 rounded-xl transition-all duration-200 active:scale-[0.97]">
											<LogIn size={14} />
											<span
												style={{ fontFamily: "Orbitron, sans-serif" }}
												className="text-[10px] tracking-wider uppercase">
												Sign In
											</span>
										</Link>
										<Link
											href="/login"
											onClick={() => setMenuOpen(false)}
											className="flex items-center justify-center gap-2 px-3 py-2.5 text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/35 hover:bg-[#00ff87]/15 rounded-xl transition-all duration-200 active:scale-[0.97]">
											<UserPlus size={14} />
											<span
												style={{ fontFamily: "Orbitron, sans-serif" }}
												className="text-[10px] tracking-wider uppercase">
												Register
											</span>
										</Link>
									</div>
								</motion.div>
							)}

							<motion.div
								variants={itemVariants}
								className="flex items-center justify-between border-t border-[#00ff87]/10 pt-3.5 mt-1 text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest"
								style={{ fontFamily: "Orbitron, sans-serif" }}>
								<span>AutoDeal Showroom</span>
								<span>Mon - Sat: 9AM - 8PM</span>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>

			{/* Search overlay component */}
			<AnimatePresence>
				{isSearchOpen && (
					<SearchOverlay
						isOpen={isSearchOpen}
						onClose={() => setIsSearchOpen(false)}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default NavBar;
