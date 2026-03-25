"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Logo from "./ui/Logo";

const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	const cartCount = 3;

	return (
		<nav
			className="sticky top-0 z-50 backdrop-blur-md"
			style={{
				background: "rgba(6, 13, 16, 0.75)",
				borderBottom: "1px solid rgba(34, 197, 94, 0.18)",
			}}>
			<div className="flex flex-1 items-center justify-between  px-6 py-4">
				{/* Logo */} 
				<div className=" ">

				<Link href="/" className="text-xl font-bold">
					<Logo />
				</Link>
				</div>

				{/* Desktop Links */}
				<div className="hidden md:flex items-center justify-between w-1/3 font-medium text-slate-300 text-l tracking-wide  ">
					{[
						{ href: "/", label: "Home" },
						{ href: "/shop", label: "Shop" },
						{ href: "/about", label: "About" },
						{ href: "/contact", label: "Contact" },
					].map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className="relative group hover:text-green-400 transition-colors duration-300">
							{label}
							<span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-green-400 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
						</Link>
					))}
				</div>

				{/* Right Side */}
				<div className="flex  items-center justify-end gap-6 text-lg relative  text-slate-300">
					{/* Search */}
					<button aria-label="Search">
						<FaSearch className="hover:text-green-400 hover:scale-110 transition" />
					</button>

					{/* Cart with badge */}
					<div className="relative cursor-pointer">
						<FaShoppingCart className="hover:text-green-400 hover:scale-110 transition" />
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
								{cartCount}
							</span>
						)}
					</div>

					{/* Profile */}
					<div className="relative">
						<button
							onClick={() => setProfileOpen(!profileOpen)}
							aria-label="Profile">
							<CgProfile className="hover:text-green-400 hover:scale-110 transition text-xl" />
						</button>

						{/* Dropdown */}
						{profileOpen && (
							<div
								className="absolute right-0 mt-3 w-40 rounded-lg p-2 backdrop-blur-md"
								style={{
									background: "rgba(6, 13, 16, 0.90)",
									border: "1px solid rgba(34, 197, 94, 0.18)",
								}}>
								<Link
									href="/profile"
									className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm">
									Profile
								</Link>
								<Link
									href="/orders"
									className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm">
									Orders
								</Link>
								<button className="w-full text-left px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm">
									Logout
								</button>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-slate-300 hover:text-green-400 transition-colors"
						onClick={() => setMenuOpen(!menuOpen)}>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{/* Mobile Menu */}
			{menuOpen && (
				<div
					className="md:hidden px-6 pb-4 flex flex-col gap-4 font-medium text-slate-300 text-sm"
					style={{ borderTop: "1px solid rgba(34, 197, 94, 0.1)" }}>
					{[
						{ href: "/", label: "Home" },
						{ href: "/shop", label: "Shop" },
						{ href: "/about", label: "About" },
						{ href: "/contact", label: "Contact" },
					].map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className="relative group hover:text-green-400 transition-colors duration-300 pt-3 first:pt-3 w-fit">
							{label}
							<span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-green-400 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
						</Link>
					))}
				</div>
			)}
		</nav>
	);
};

export default NavBar;
