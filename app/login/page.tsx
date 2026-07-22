"use client";

import { useState } from "react";
import bgImage from "@/public/cars/login-bg/bg.avif";
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
		<div className="min-h-screen text-[#dae6d8] font-['Manrope'] flex overflow-hidden relative">
			{/* ─── Full-bleed background image behind everything ─── */}
			<Image
				src={bgImage}
				alt="Vantage G3 Kinetic"
				fill
				priority
				quality={100}
				sizes="100vw"
				className="object-cover object-center pr-34"
			/>

			{/* Dark base tint over entire page */}
			<div className="absolute inset-0 bg-[#050e0a]/55 z-0" />

			{/* ─── Visual Side (Left 60%) ─── */}
			<div className="hidden lg:block lg:w-[60%] relative overflow-hidden z-10">
				{/* Bottom gradient for stat legibility */}
				<div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/70 to-transparent z-10" />

				{/* Top-left corner brand mark */}
				<div className="absolute top-10 left-10 z-20 flex items-center gap-3">
					<div className="w-px h-8 bg-[#00ff87]" />
					<span className="text-[9px] uppercase tracking-[0.35em] text-[#dae6d8]/50 font-bold">
						AutoDeal Kinetic
					</span>
				</div>

				{/* Vertical side label */}
				<div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
					<div className="w-px h-16 bg-[#dae6d8]/15" />
					<span
						className="text-[8px] uppercase tracking-[0.3em] text-[#dae6d8]/30 font-bold"
						style={{ writingMode: "vertical-rl" }}>
						Prestige Fleet
					</span>
					<div className="w-px h-16 bg-[#dae6d8]/15" />
				</div>

				{/* Car stats bottom-left */}
				<div className="absolute bottom-12 left-12 z-20">
					{/* Scan line accent */}
					<div className="flex items-center gap-3 mb-6">
						<div className="w-5 h-px bg-[#00ff87]" />
						<span className="text-[9px] uppercase tracking-[0.3em] text-[#00ff87]/80 font-bold">
							Featured Model
						</span>
					</div>

					<h2
						className="text-5xl font-bold tracking-tight mb-1 leading-none"
						style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}>
						Vantage G3
					</h2>
					<h2
						className="text-5xl font-bold tracking-tight mb-8 leading-none text-[#dae6d8]/50"
						style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}>
						Kinetic
					</h2>

					<div className="flex gap-10">
						<div>
							<span className="block text-[8px] uppercase tracking-[0.25em] text-[#dae6d8]/35 mb-1">
								Output
							</span>
							<span className="text-2xl font-bold text-[#dae6d8]">
								745{" "}
								<span className="text-sm font-normal text-[#dae6d8]/50">
									HP
								</span>
							</span>
						</div>
						<div className="w-px bg-[#dae6d8]/10" />
						<div>
							<span className="block text-[8px] uppercase tracking-[0.25em] text-[#dae6d8]/35 mb-1">
								0 – 60
							</span>
							<span className="text-2xl font-bold text-[#dae6d8]">
								2.9{" "}
								<span className="text-sm font-normal text-[#dae6d8]/50">
									sec
								</span>
							</span>
						</div>
						<div className="w-px bg-[#dae6d8]/10" />
						<div>
							<span className="block text-[8px] uppercase tracking-[0.25em] text-[#dae6d8]/35 mb-1">
								Range
							</span>
							<span className="text-2xl font-bold text-[#dae6d8]">
								430{" "}
								<span className="text-sm font-normal text-[#dae6d8]/50">
									mi
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* ─── Auth Side (Right 40%) ─── */}
			<div
				className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-16 relative z-10"
				style={{
					background: "rgba(8,14,10,0.2)",
					backdropFilter: "blur(24px) saturate(1.2)",
					WebkitBackdropFilter: "blur(24px) saturate(1.2)",
					borderTop: "1px solid rgba(255,255,255,0.05)",
				}}>
				{/* Subtle grid texture */}
				<div
					className="absolute inset-0 opacity-[0.01]"
					style={{
						backgroundImage: `linear-gradient(#dae6d8 1px, transparent 1px), linear-gradient(90deg, #dae6d8 1px, transparent 1px)`,
						backgroundSize: "40px 40px",
					}}
				/>

				<div className="max-w-sm w-full mx-auto relative z-10">
					<AuthHeader mode={mode} />

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

					{/* Footer */}
					<footer className="mt-16 pt-8">
						<p className="text-[9px] uppercase tracking-widest text-[#dae6d8]/30 text-center">
							{mode === "login" ? "No account?" : "Already a member?"}{" "}
							<button
								onClick={() => setMode(mode === "login" ? "signup" : "login")}
								className="text-[#00ff87]/80 hover:text-[#00ff87] font-bold ml-1 transition-colors">
								{mode === "login" ? "Sign Up" : "Sign In"}
							</button>
						</p>
					</footer>
				</div>
			</div>

			{/* ─── Copyright ─── */}
			<div className="absolute bottom-6 right-10 text-[8px] uppercase tracking-[0.3em] text-[#dae6d8]/15 z-20">
				© 2024 AutoDeal Kinetic Prestige
			</div>
		</div>
	);
};

export default Login;
