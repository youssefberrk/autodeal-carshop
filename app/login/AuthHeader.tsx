"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AuthHeaderProps {
  mode: "login" | "signup";
}

export const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
    <header className=" overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#00ff87]">
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
          <h1
            className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-1.5"
            style={{
              fontFamily: "'Newsreader', serif",
              fontStyle: "italic",
            }}
          >
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
          <p className="text-xs text-[#dae6d8]/75 leading-relaxed max-w-xs">
            {mode === "login"
              ? "Access your private concierge dashboard and curated inventory."
              : "Begin your journey with AutoDeal. Apply for access to our exclusive fleet."}
          </p>
        </motion.div>
      </AnimatePresence>
    </header>
  );
};
