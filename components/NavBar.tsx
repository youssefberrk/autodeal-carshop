"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
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

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);
  const [isWishListCountChecked, setIsWhishListCountChecked] = useState(false);
  const [isCarCountChecked, setIsCarCountChecked] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Global search keyboard shortcuts: "/" or "Ctrl+K"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputActive = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.getAttribute("contenteditable") === "true");
      
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

        const progress = scrollTop / docHeight;
        setScrollProgress(progress);
      });
    };

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

  const { allocatedCars, whishListCars, isPopUp, isPurchasedPopUp } =
    useCarStore();
  const carCount = allocatedCars.length;
  const whishListCount = whishListCars.length;
  const isScrolled = scrollProgress > 0.02;

  // Reset checked state when wishlist count changes (e.g. when an item is added)
  useEffect(() => {
    setIsWhishListCountChecked(false);
  }, [whishListCount]);

  return (
    <>
      <nav
        className={`sticky z-50 transition duration-300 backdrop-blur-md
		${
      isScrolled
        ? "mt-22 top-2 w-full max-w-6xl md:w-6xl mx-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        : "w-full lg:mx-0 top-0"
    }
`}
      style={{
        background: isScrolled
          ? "rgba(9, 26, 17, 0.45)"
          : "rgba(9, 26, 17, 0.3)",
        border: isScrolled ? "1px solid rgba(0, 255, 135, 0.2)" : "none",
        borderBottom: isScrolled
          ? "none"
          : "1px solid rgba(218, 230, 216, 0.08)",
      }}
    >
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-green-400"
        style={{
          width: `${scrollProgress * 100}%`,
          transition: "width 0.1s ease-out",
        }}
      />
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        {/* Logo */}
        <div className=" ">
          <Link href="/" className="text-xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center gap-[10em] w-2/3 logo fon uppercase text-slate-300 text-[10px] tracking-[0.2em]  ">
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative group hover:text-green-400 transition-colors duration-300"
            >
              {label}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-green-400 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex  items-center justify-end gap-6 text-lg relative  text-slate-300">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="transition-transform active:scale-90"
          >
            <FaSearch className="hover:text-green-400 transition cursor-pointer" />
          </button>

          {/* Car cart with badge */}
          <div className="relative">
            <button
              onClick={() => setCarDropdownOpen(!carDropdownOpen)}
              aria-label="My Cars"
              className="relative transition-transform active:scale-90"
            >
              <IoCarSport className="hover:text-green-400 transition text-xl cursor-pointer" />
              {carCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 ${isPurchasedPopUp ? "PopUp" : ""} bg-emerald-500 text-white text-xs px-1.5 rounded-full`}
                >
                  {carCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {carDropdownOpen && (
                <CarDropDown onClose={() => setCarDropdownOpen(false)} />
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Profile"
              className="transition-transform active:scale-90"
            >
              <CgProfile className="hover:text-green-400 transition text-xl cursor-pointer" />
              {whishListCount > 0 && (
                <span
                  className={`absolute -top-2 -right-2 transition-transform  ${isPopUp ? "PopUp" : ""} bg-red-600 text-white text-xs px-1.5 rounded-full`}
                >
                  {isWishListCountChecked ? " " : whishListCount}
                </span>
              )}
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
                    }}
                  >
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
                                style={{ fontFamily: "Orbitron, sans-serif" }}
                              >
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
                            className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]"
                          >
                            <User
                              size={16}
                              className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
                            />
                            <span>Profile</span>
                          </Link>
                          <Link
                            onClick={() => {
                              setProfileOpen(false);
                              setIsWhishListCountChecked(true);
                            }}
                            href="/whishlist"
                            className="flex items-center justify-between px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]"
                          >
                            <div className="flex items-center gap-3">
                              <Heart
                                size={16}
                                className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
                              />
                              <span>Wishlist</span>
                            </div>
                            {whishListCount > 0 && (
                              <span className="bg-red-500 text-white text-[10px] font-bold py-0.5 px-2 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                                {whishListCount}
                              </span>
                            )}
                          </Link>
                          <Link
                            onClick={() => setProfileOpen(false)}
                            href="/orders"
                            className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]"
                          >
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
                            }}
                          >
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
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                          >
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
                            className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]"
                          >
                            <LogIn
                              size={16}
                              className="text-slate-400 group-hover/item:text-[#00ff87] transition-colors duration-200"
                            />
                            <span>Sign In</span>
                          </Link>
                          <Link
                            onClick={() => setProfileOpen(false)}
                            href="/login"
                            className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-[#00ff87] hover:bg-[#00ff87]/5 rounded-lg transition-all duration-200 text-sm group/item active:scale-[0.97]"
                          >
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
            className="md:hidden text-slate-300 hover:text-green-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-4 font-medium text-slate-300 text-sm"
          style={{ borderTop: "1px solid rgba(34, 197, 94, 0.1)" }}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative group hover:text-green-400 transition-colors duration-300 pt-3 first:pt-3 w-fit"
            >
              {label}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] w-0 bg-green-400 rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>
      )}
    </nav>

    {/* Search overlay component */}
    <AnimatePresence>
      {isSearchOpen && (
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </AnimatePresence>
  </>
);
};

export default NavBar;
