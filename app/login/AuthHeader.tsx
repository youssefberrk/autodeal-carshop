"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AuthHeaderProps {
  mode: "login" | "signup";
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
    <header className="overflow-hidden">
      <div className="flex items-center gap-4 md:pb-4 md:pt-4  pb-10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
        <span className="text-[16px] sm:text-[18px] uppercase tracking-[0.18em] font-semibold text-[#00ff87]">
          {mode === "login" ? "Member Access" : "Membership Enrollment"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6 newsreader">
            {mode === "login" ? (
              <>
                Welcome <span className="text-[#dae6d8]/35">Back.</span>
              </>
            ) : (
              <>
                Join the <span className="text-[#dae6d8]/35">Elite.</span>
              </>
            )}
          </h1>
          <p className="text-[13px] text-[#dae6d8]/60 leading-relaxed newsreader italic tracking-[0.08em] ">
            {mode === "login"
              ? "Access your private concierge dashboard and curated inventory."
              : "Begin your journey with AutoDeal. Apply for access to our exclusive fleet."}
          </p>
        </motion.div>
      </AnimatePresence>
    </header>
  );
};
