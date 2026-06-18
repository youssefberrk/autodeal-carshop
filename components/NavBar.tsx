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

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const { allocatedCars, whishListCars } = useCarStore();
  const carCount = allocatedCars.length;
  const whishListCount = whishListCars.length;
  const isScrolled = scrollProgress > 0.02;
  // console.log(session);
  return (
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
          ? "rgba(25, 42, 32, 0.45)"
          : "rgba(20, 32, 24, 0.3)",
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
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-1.5 rounded-full">
                  {carCount}
                </span>
              )}
            </button>
            {carDropdownOpen && (
              <CarDropDown onClose={() => setCarDropdownOpen(false)} />
            )}
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
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-1.5 rounded-full">
                  {whishListCount}
                </span>
              )}
            </button>

            {/* Dropdown */}

            <div ref={dropdownRef}>
              {profileOpen &&
                (session ? (
                  <div
                    className="absolute right-0 mt-3  w-40 rounded-lg p-2 backdrop-blur-md animate-in origin-top-right"
                    style={{
                      background: "rgba(6, 13, 16, 0.90)",
                      border: "1px solid rgba(34, 197, 94, 0.18)",
                    }}
                  >
                    <Link
                      onClick={() => setProfileOpen(false)}
                      href="/profile"
                      className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm"
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => setProfileOpen(false)}
                      href="/whishlist"
                      className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm"
                    >
                      Whishlist
                      {whishListCount > 0 && (
                        <span className="ml-2 bg-emerald-500 text-white text-xs px-1.5 rounded-full">
                          {whishListCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      onClick={() => setProfileOpen(false)}
                      href="/orders"
                      className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm"
                    >
                      Orders
                    </Link>
                    <button
                      className="w-full text-left px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm"
                      onClick={() => {
                        signOut();
                        setProfileOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div
                    className="absolute right-0 mt-3  w-40 rounded-lg p-2 backdrop-blur-md animate-in origin-top-right"
                    style={{
                      background: "rgba(6, 13, 16, 0.90)",
                      border: "1px solid rgba(34, 197, 94, 0.18)",
                    }}
                  >
                    <Link
                      onClick={() => setProfileOpen(false)}
                      href="/login"
                      className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={() => setProfileOpen(false)}
                      href="/login"
                      className="block px-3 py-2 text-slate-300 hover:text-green-400 hover:bg-white/5 rounded transition-colors text-sm"
                    >
                      Sign in
                    </Link>
                  </div>
                ))}
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
  );
};

export default NavBar;
