"use client";

import React, { createContext, useContext, useState } from "react";
import CarConcierge from "@/components/ai/CarConcierge";

interface ConciergeContextType {
  isOpen: boolean;
  openConcierge: (carId?: number) => void;
  closeConcierge: () => void;
}

const ConciergeContext = createContext<ConciergeContextType | undefined>(undefined);

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCarId, setActiveCarId] = useState<number | undefined>(undefined);

  const openConcierge = (carId?: number) => {
    setActiveCarId(carId);
    setIsOpen(true);
  };

  const closeConcierge = () => {
    setIsOpen(false);
  };

  return (
    <ConciergeContext.Provider value={{ isOpen, openConcierge, closeConcierge }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 pointer-events-none">
          <div className="pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CarConcierge
              carId={activeCarId}
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
