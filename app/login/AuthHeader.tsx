"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AuthHeaderProps {
	mode: "login" | "signup";
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => {
	return (
		<header className="mb-14 overflow-hidden">
			<div className="flex items-center gap-3 mb-8">
				<span className="text-[9px] uppercase tracking-[0.35em] text-[#00ff87]/70 font-bold">
					{mode === "login" ? "Member Access" : "Membership Enrollment"}
				</span>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={mode}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
					<h1
						className="text-[3.25rem] font-bold leading-none tracking-tight mb-4"
						style={{
							fontFamily: "'Newsreader', serif",
							fontStyle: "italic",
						}}>
						{mode === "login" ? (
							<>
								Welcome
								<br />
								<span className="text-[#dae6d8]/35">Back.</span>
							</>
						) : (
							<>
								Join the
								<br />
								<span className="text-[#dae6d8]/35">Elite.</span>
							</>
						)}
					</h1>
					<p className="text-xs text-[#dae6d8]/80 leading-relaxed">
						{mode === "login"
							? "Access your private concierge dashboard and curated inventory."
							: "Begin your journey with AutoDeal. Apply for access to our exclusive fleet."}
					</p>
				</motion.div>
			</AnimatePresence>
		</header>
	);
};
