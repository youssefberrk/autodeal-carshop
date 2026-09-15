"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import CarConcierge from "@/components/ai/CarConcierge";

interface ConciergeContextType {
  isOpen: boolean;
  initialPrompt: string | undefined;
  openConcierge: (carId?: number, initialPrompt?: string) => void;
  closeConcierge: () => void;
}

const ConciergeContext = createContext<ConciergeContextType | undefined>(undefined);

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCarId, setActiveCarId] = useState<number | undefined>(undefined);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  const openConcierge = (carId?: number, prompt?: string) => {
    setActiveCarId(carId);
    setInitialPrompt(prompt);
    setIsOpen(true);
  };

  const closeConcierge = () => {
    setIsOpen(false);
    setInitialPrompt(undefined);
  };

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <ConciergeContext.Provider value={{ isOpen, initialPrompt, openConcierge, closeConcierge }}>
      {children}
      {isOpen && (
        <div
          className="concierge-shell fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="AutoDeal AI Concierge"
        >
          <button
            type="button"
            className="concierge-backdrop"
            aria-label="Close AI Concierge"
            onClick={closeConcierge}
          />
          <div className="concierge-panel-wrap">
            <CarConcierge
              carId={activeCarId}
              initialPrompt={initialPrompt}
              onClose={closeConcierge}
            />
          </div>
        </div>
      )}
    </ConciergeContext.Provider>
  );
}

export function useConcierge() {
  const context = useContext(ConciergeContext);
  if (!context) {
    throw new Error("useConcierge must be used within a ConciergeProvider");
  }
  return context;
}
