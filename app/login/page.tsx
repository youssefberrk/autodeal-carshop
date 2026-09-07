"use client";

import { useState } from "react";
import Link from "next/link";
import bgImage from "@/public/cars/login-bg/bg.webp";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { AuthHeader } from "./AuthHeader";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");

  return (
    <div className="relative w-full min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-68px)] md:h-[calc(100dvh-43px)] flex text-[#E2E8F0] font-['Manrope'] overflow-hidden select-none">
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#050e0a]/50 to-[#050e0a]/85 z-0 pointer-events-none" />

      {/* ─── Visual Side (Left) ─── */}
      <div className="hidden md:flex flex-1 flex-col justify-between p-8 lg:p-10 xl:p-14 relative overflow-hidden z-10 pointer-events-none">
        {/* Bottom gradient for stat legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10" />

        {/* Top-left subtle tag */}
        <div className="z-20 flex items-center gap-3">
          <div className="w-px h-6 bg-[#2E5BFF]" />
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#E2E8F0]/60 font-bold">
            Prestige Concierge
          </span>
        </div>

        {/* Vertical side label */}
        <div className="absolute left-8 lg:left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
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
        <div className="z-20 relative pl-4 pb-2">
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

      {/* ─── Auth Side (Right) ─── */}
      <div
        className="w-full md:w-[400px] xl:w-[440px] md:ml-auto flex flex-col shrink-1 relative z-10 h-full overflow-hidden"
        style={{
          background: "rgba(10, 15, 20, 0.85)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          borderLeft: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Form Container */}
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-center py-4 sm:py-6 px-5 sm:px-8 md:px-6 relative z-10">
          <div className="max-w-sm w-full mx-auto flex gap-4">
            {/* Precision Rail - The visual anchor */}
            <div className="hidden sm:block w-px bg-gradient-to-b from-transparent via-[#2E5BFF] to-transparent" />

            <div className="flex-1 space-y-3.5 sm:space-y-4">
              <AuthHeader mode={mode} />

              <div>
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
                    <SignUpForm
                      key="signup"
                      onSuccess={() => setMode("login")}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Footer */}
        <footer className="flex-shrink-0 w-full px-5 sm:px-8 md:px-6 py-2.5 sm:py-3 border-t border-[#E2E8F0]/10 bg-black/30 space-y-1 z-10 fixed bottom-2  md:sticky inset-x-6 md:bottom-20">
          <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-widest text-[#E2E8F0]/40 font-mono">
            <span className="select-none">
              {mode === "login" ? "No account?" : "Already a member?"}
            </span>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[#2E5BFF] hover:text-[#2E5BFF]/80 hover:underline font-bold transition-colors cursor-pointer py-0.5"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </div>

          {/* Copyright notice */}
          <div className="text-[8px] uppercase tracking-[0.3em] text-[#E2E8F0]/20 text-center select-none font-mono">
            © 2026 AutoDeal Kinetic Prestige
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
