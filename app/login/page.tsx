"use client";

import { useState } from "react";
import bgImage from "@/public/cars/login-bg/bg.webp";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { AuthHeader } from "./_components/AuthHeader";
import { LoginForm } from "./_components/LoginForm";
import { SignUpForm } from "./_components/SignUpForm";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");

  return (
    <div className="relative w-full min-h-screen h-screen flex shrink text-[#E2E8F0] font-['Manrope'] select-none ">
      {/* ─── Full-bleed background image behind everything ─── */}
      <Image
        src={bgImage}
        alt="Vantage G3 Kinetic"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="h-full w-full object-cover object-center"
      />

      {/* Dark base tint over entire page */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-[#050e0a]/50 to-[#050e0a]/85 z-0 pointer-events-none" />

      {/* ─── Visual Side (Left) ─── */}
      <div className="hidden md:flex flex-1 flex-col justify-between pl-4 relative overflow-hidden z-10 pointer-events-none">
        {/* Bottom gradient for stat legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-black/80 to-transparent z-10" />

        {/* Top-left subtle tag */}
        <div className="z-20 pt-8 pl-4 flex items-center gap-3">
          <div className="w-px h-6 bg-[#2E5BFF]" />
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#E2E8F0]/60 font-bold">
            Prestige Concierge
          </span>
        </div>

        {/* Vertical side label */}
        <div className="absolute left-8  top-1/2 -translate-y-1/2 z-20 flex flex-col items-center pb-48 gap-3">
          <div className="w-px h-12 bg-[#E2E8F0]/15" />
          <span
            className="text-[8px] uppercase tracking-[0.3em] text-[#E2E8F0]/30 font-bold"
            style={{ writingMode: "vertical-rl" }}
          >
            Prestige Fleet
          </span>
          <div className="w-px h-12 bg-[#E2E8F0]/15" />
        </div>

        {/* Car stats bottom-left */}
        <div className="z-20 relative pl-4 mb-26">
          {/* Scan line accent */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-px bg-[#2E5BFF]" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#2E5BFF]/90 font-bold">
              Featured Model
            </span>
          </div>

          <h2
            className="text-3xl xl:text-4xl font-bold tracking-tight mb-0.5 leading-none"
            style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
          >
            Vantage G3
          </h2>
          <h2
            className="text-3xl xl:text-4xl font-bold tracking-tight mb-4 leading-none text-[#E2E8F0]/50"
            style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
          >
            Kinetic
          </h2>

          <div className="flex gap-6 lg:gap-8">
            <div>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#E2E8F0]/40 mb-0.5">
                Output
              </span>
              <span className="text-lg lg:text-xl font-bold text-[#E2E8F0]">
                745{" "}
                <span className="text-xs font-normal text-[#E2E8F0]/50">
                  HP
                </span>
              </span>
            </div>
            <div className="w-px bg-[#E2E8F0]/10" />
            <div>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#E2E8F0]/40 mb-0.5">
                0 – 60
              </span>
              <span className="text-lg lg:text-xl font-bold text-[#E2E8F0]">
                2.9{" "}
                <span className="text-xs font-normal text-[#E2E8F0]/50">
                  sec
                </span>
              </span>
            </div>
            <div className="w-px bg-[#E2E8F0]/10" />
            <div>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#E2E8F0]/40 mb-0.5">
                Range
              </span>
              <span className="text-lg lg:text-xl font-bold text-[#E2E8F0]">
                430{" "}
                <span className="text-xs font-normal text-[#E2E8F0]/50">
                  mi
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Auth Side (Right) ── */}
      <aside
        aria-label="Authentication Panel"
        className="w-full md:w-105 lg:w-115 xl:w-120 md:ml-auto flex flex-col shrink-0 relative z-10
   h-full border-t md:border-t-0 md:border-l border-white/8 shadow-2xl
  "
        style={{
          background:
            "linear-gradient(180deg, rgba(12, 17, 24, 0.94) 0%, rgba(8, 12, 18, 0.96) 100%)",
          backdropFilter: "blur(28px) saturate(1.3)",
          WebkitBackdropFilter: "blur(28px) saturate(1.3)",
        }}
      >
        {/* Ambient Top Glow Aura */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none"
        />
        {/* Ambient Bottom Accent Aura */}
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#2E5BFF]/10 rounded-full blur-[80px] pointer-events-none"
        />

        {/* Precision Left Edge Specular Highlight Line */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-blue-500/30 to-        
  transparent pointer-events-none"
        />

        {/* Faded Matrix / Grid Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E2E8F0 1.2px, transparent 1.2px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />

        {/* Top Status Bar / Security Indicator — sticky so it's always visible */}
        <div
          className="sticky top-0 z-30 w-full px-6 sm:px-8 pt-5 pb-2 flex items-center justify-between text-[11px] font-mono
  tracking-wider text-slate-400/70 border-b border-white/4"
          style={{
            background:
              "linear-gradient(180deg, rgba(12, 17, 24, 0.97) 0%, rgba(8, 12, 18, 0.94) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="uppercase text-[10px] tracking-widest text-slate-300/80">
              Kinetic Auth 2.0
            </span>
          </div>
          <span className="text-[10px] tracking-widest uppercase text-slate-500/80 flex items-center gap-1">
            <svg
              className="w-3 h-3 text-slate-400/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            256-Bit SSL
          </span>
        </div>

        {/* Main Form Area */}
        <main className="relative z-20 flex-1 flex flex-col justify-start  px-5 sm:px-8  md:px-10 w-full">
          <div className="w-full max-w-90 mx-auto  pt-24 md:pt-5 md:space-y-2 space-y-12">
            {/* Visual Header */}
            <AuthHeader mode={mode} />

            {/* Quick Segmented Mode Switcher */}
            <div className="p-1 my-6 rounded-xl bg-black/40 border border-white/6 backdrop-blur-md tracking-widest flex items-center relative">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 py-2.5 text-[10px] uppercase font-bold rounded-lg transition-all duration-300 cursor-pointer text-center relative z-10 tracking-widest ${
                  mode === "login"
                    ? "text-white shadow-md bg-white/10 border border-white/12"
                    : "text-slate-200/50 hover:text-slate-200"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-2.5 text-[10px] uppercase font-bold rounded-lg transition-all duration-300 cursor-pointer text-center relative z-10 tracking-widest ${
                  mode === "signup"
                    ? "text-white shadow-md bg-white/10 border border-white/12"
                    : "text-slate-200/50 hover:text-slate-200"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Animated Form Container */}
            <div className="w-full relative pt-6 md:p-0">
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <LoginForm
                    key="login"
                    email={email}
                    setEmail={setEmail}
                    accessKey={accessKey}
                    setAccessKey={setAccessKey}
                  />
                ) : (
                  <SignUpForm key="signup" onSuccess={() => setMode("login")} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </aside>
    </div>
  );
};

export default Login;
