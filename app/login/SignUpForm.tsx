"use client";

import { AtSign, Key, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface SignUpFormProps {
	onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nameFocused, setNameFocused] = useState(false);
	const [emailFocused, setEmailFocused] = useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
			className="space-y-9">
			{/* Full Name */}
			<div>
				<label
					className="block text-[9px] uppercase tracking-[0.3em] text-[#dae6d8]/75 mb-3 font-bold"
					style={{
						color: nameFocused ? "#00ff87" : undefined,
						transition: "color 0.2s",
					}}>
					Full Name
				</label>
				<div className="relative">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onFocus={() => setNameFocused(true)}
						onBlur={() => setNameFocused(false)}
						placeholder="Julian Rossi"
						className="w-full bg-transparent border-0 border-b px-0 py-3 pr-8 text-sm focus:outline-none placeholder:text-[#dae6d8]/20 text-[#dae6d8]"
						style={{
							borderBottomColor: nameFocused
								? "rgba(0,255,135,0.8)"
								: "rgba(218,230,216,0.12)",
							borderBottomWidth: "1px",
							borderBottomStyle: "solid",
							transition: "border-color 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
						}}
					/>
					<User
						className="absolute right-0 top-1/2 -translate-y-1/2"
						size={15}
						style={{
							color: nameFocused ? "#00ff87" : "rgba(218,230,216,0.25)",
							transition: "color 0.2s",
						}}
					/>
				</div>
			</div>

			{/* Email */}
			<div>
				<label
					className="block text-[9px] uppercase tracking-[0.3em] text-[#dae6d8]/75 mb-3 font-bold"
					style={{
						color: emailFocused ? "#00ff87" : undefined,
						transition: "color 0.2s",
					}}>
					Email Address
				</label>
				<div className="relative">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={() => setEmailFocused(true)}
						onBlur={() => setEmailFocused(false)}
						placeholder="concierge@autodeal.com"
						className="w-full bg-transparent border-0 border-b px-0 py-3 pr-8 text-sm focus:outline-none placeholder:text-[#dae6d8]/20 text-[#dae6d8]"
						style={{
							borderBottomColor: emailFocused
								? "rgba(0,255,135,0.8)"
								: "rgba(218,230,216,0.12)",
							borderBottomWidth: "1px",
							borderBottomStyle: "solid",
							transition: "border-color 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
						}}
					/>
					<AtSign
						className="absolute right-0 top-1/2 -translate-y-1/2"
						size={15}
						style={{
							color: emailFocused ? "#00ff87" : "rgba(218,230,216,0.25)",
							transition: "color 0.2s",
						}}
					/>
				</div>
			</div>

			{/* Password */}
			<div>
				<label
					className="block text-[9px] uppercase tracking-[0.3em] text-[#dae6d8]/75 mb-3 font-bold"
					style={{
						color: passwordFocused ? "#00ff87" : undefined,
						transition: "color 0.2s",
					}}>
					Create Access Key
				</label>
				<div className="relative">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onFocus={() => setPasswordFocused(true)}
						onBlur={() => setPasswordFocused(false)}
						placeholder="••••••••••••"
						className="w-full bg-transparent border-0 border-b px-0 py-3 pr-8 text-sm focus:outline-none placeholder:text-[#dae6d8]/20 text-[#dae6d8]"
						style={{
							borderBottomColor: passwordFocused
								? "rgba(0,255,135,0.8)"
								: "rgba(218,230,216,0.12)",
							borderBottomWidth: "1px",
							borderBottomStyle: "solid",
							transition: "border-color 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
						}}
					/>
					<Key
						className="absolute right-0 top-1/2 -translate-y-1/2"
						size={15}
						style={{
							color: passwordFocused ? "#00ff87" : "rgba(218,230,216,0.25)",
							transition: "color 0.2s",
						}}
					/>
				</div>
			</div>

			{/* CTA */}
			<div className="pt-4 space-y-4">
				<button
					className="w-full relative overflow-hidden group py-[14px] text-[10px] uppercase tracking-[0.25em] font-bold transition-all active:scale-[0.98] duration-200"
					style={{ background: "#00ff87", color: "#080e0a" }}>
					<span className="relative z-10 flex items-center justify-center gap-3">
						Create Account
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path
								d="M2 7h10M8 3l4 4-4 4"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
				</button>
				<button
					className="w-full flex items-center justify-center gap-3 py-[13px] text-[10px] uppercase tracking-[0.2em] font-bold transition-all hover:bg-[#dae6d8]/5 active:scale-[0.98] duration-200"
					style={{
						border: "1px solid rgba(218,230,216,0.1)",
						color: "rgba(218,230,216,0.6)",
					}}
					onClick={() => signIn("google", { callbackUrl: "/profile" })}>
					<svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="currentColor"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="currentColor"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
						/>
						<path
							fill="currentColor"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Continue with Google
				</button>
			</div>
		</motion.div>
	);
};
