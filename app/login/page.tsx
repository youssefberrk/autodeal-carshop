"use client";

import { useState } from "react";
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
    <div className="h-screen w-full text-[#dae6d8] font-['Manrope'] flex overflow-hidden relative">
      {/* ─── Full-bleed background image behind everything ─── */}
      <Image
        src={bgImage}
        alt="Vantage G3 Kinetic"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="h-full object-cover object-center"
      />

      {/* Dark base tint over entire page */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#050e0a]/50 to-[#050e0a]/85 z-0 pointer-events-none" />

      {/* ─── Visual Side (Left 60%) ─── */}
      <div className="hidden lg:flex lg:w-[60%] flex-col justify-between p-10 xl:p-14 relative overflow-hidden z-10 pointer-events-none">
        {/* Bottom gradient for stat legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10" />

        {/* Top-left corner brand mark */}
        <div className="z-20 flex items-center gap-3">
          <div className="w-px h-8 bg-[#00ff87]" />
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#dae6d8]/60 font-bold">
            AutoDeal Kinetic
          </span>
        </div>

        {/* Vertical side label */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-[#dae6d8]/15" />
          <span
            className="text-[8px] uppercase tracking-[0.3em] text-[#dae6d8]/30 font-bold"
            style={{ writingMode: "vertical-rl" }}
          >
            Prestige Fleet
          </span>
          <div className="w-px h-12 bg-[#dae6d8]/15" />
        </div>

        {/* Car stats bottom-left */}
        <div className="z-20 relative pl-4 pb-8">
          {/* Scan line accent */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-[#00ff87]" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#00ff87]/90 font-bold">
              Featured Model
            </span>
          </div>

          <h2
            className="text-4xl xl:text-5xl font-bold tracking-tight mb-1 leading-none"
            style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
          >
            Vantage G3
          </h2>
          <h2
            className="text-4xl xl:text-5xl font-bold tracking-tight mb-6 leading-none text-[#dae6d8]/50"
            style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
          >
            Kinetic
          </h2>

          <div className="flex gap-8">
            <div>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#dae6d8]/40 mb-0.5">
                Output
              </span>
              <span className="text-xl font-bold text-[#dae6d8]">
                745{" "}
                <span className="text-xs font-normal text-[#dae6d8]/50">
                  HP
                </span>
              </span>
            </div>
            <div className="w-px bg-[#dae6d8]/10" />
            <div>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#dae6d8]/40 mb-0.5">
                0 – 60
              </span>
              <span className="text-xl font-bold text-[#dae6d8]">
                2.9{" "}
                <span className="text-xs font-normal text-[#dae6d8]/50">
                  sec
                </span>
              </span>
            </div>
            <div className="w-px bg-[#dae6d8]/10" />
            <div>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#dae6d8]/40 mb-0.5">
                Range
              </span>
              <span className="text-xl font-bold text-[#dae6d8]">
                430{" "}
                <span className="text-xs font-normal text-[#dae6d8]/50">
                  mi
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Auth Side (Right) ─── */}
      <div
        className="w-full lg:w-[400px] xl:w-[440px] flex flex-col  justify-center px-6 sm:px-10 pb-7 absolute right-0 top-0 bottom-0 z-10 h-full overflow-hidden"
        style={{
          background: "rgba(8,14,10,0.65)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#dae6d8 1px, transparent 1px), linear-gradient(90deg, #dae6d8 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-sm w-full space-y-8  mx-auto relative z-10 ">
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
                <SignUpForm key="signup" onSuccess={() => setMode("login")} />
              )}
            </AnimatePresence>
          </div>

          {/* Footer toggle - locked in position so cursor doesn't move */}
          <footer className="pt-2.5 border-t border-[#dae6d8]/10 space-y-1">
            <div className="flex items-center justify-center text-[9px] uppercase tracking-widest text-[#dae6d8]/40">
              <span className="w-36 text-right pr-2 select-none">
                {mode === "login" ? "No account?" : "Already a member?"}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="w-20 text-left text-[#00ff87] hover:underline font-bold transition-colors cursor-pointer py-1"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </div>

            {/* Copyright notice */}
            <div className="text-[8px] uppercase tracking-[0.3em] text-[#dae6d8]/20 text-center select-none">
              © 2024 AutoDeal Kinetic Prestige
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
