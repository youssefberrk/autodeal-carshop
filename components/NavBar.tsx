"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Logo from "./ui/Logo";

const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	const cartCount = 3; // later connect to state / backend

	return (
		<nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
			<div className="flex items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link href="/" className="text-xl font-bold">
					<Logo />
				</Link>

				{/* Desktop Links */}
				<div className="hidden md:flex items-center gap-8 font-medium">
					<Link href="/">Home</Link>
					<Link href="/shop">Shop</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</div>

				{/* Right Side */}
				<div className="flex items-center gap-6 text-lg relative">
					{/* Search */}
					<button aria-label="Search">
						<FaSearch className="hover:scale-110 transition" />
					</button>

					{/* Cart with badge */}
					<div className="relative cursor-pointer">
						<FaShoppingCart className="hover:scale-110 transition" />
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
							<CgProfile className="hover:scale-110 transition text-xl" />
						</button>

						{/* Dropdown */}
						{profileOpen && (
							<div className="absolute right-0 mt-3 w-40 bg-white shadow-md rounded-lg p-2">
								<Link
									href="/profile"
									className="block px-3 py-2 hover:bg-gray-100 rounded">
									Profile
								</Link>
								<Link
									href="/orders"
									className="block px-3 py-2 hover:bg-gray-100 rounded">
									Orders
								</Link>
								<button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
									Logout
								</button>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden px-6 pb-4 flex flex-col gap-4 font-medium">
					<Link href="/">Home</Link>
					<Link href="/shop">Shop</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
