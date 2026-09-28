"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import CarConcierge from "@/components/ai/CarConcierge";
import ConciergeFloatingBubble from "@/components/ai/ConciergeFloatingBubble";
import { carsData } from "@/public/cars/CarsData";
import {
  persistConciergeActiveCar,
  persistConciergeBubbleVisible,
  usePersistedConciergeState,
} from "@/store/conciergeStorage";

interface ConciergeContextType {
  isOpen: boolean;
  isBubbleVisible: boolean;
  initialPrompt: string | undefined;
  activeCarId: number | undefined;
  openConcierge: (carId?: number, initialPrompt?: string) => void;
  closeConcierge: () => void;
  toggleConcierge: () => void;
  dismissBubble: () => void;
}

const ConciergeContext = createContext<ConciergeContextType | undefined>(undefined);

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const { isBubbleVisible, activeCarId, hasMessages } = usePersistedConciergeState();
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  const openConcierge = useCallback((carId?: number, prompt?: string) => {
    if (typeof carId === "number") {
      persistConciergeActiveCar(carId);
    }
    setInitialPrompt(prompt);
    setIsOpen(true);
    persistConciergeBubbleVisible(true);
  }, []);

  const closeConcierge = useCallback(() => {
    setIsOpen(false);
    setInitialPrompt(undefined);
  }, []);

  const toggleConcierge = useCallback(() => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (!nextState) {
        setInitialPrompt(undefined);
      }
      return nextState;
    });
    persistConciergeBubbleVisible(true);
  }, []);

  const dismissBubble = useCallback(() => {
    setIsOpen(false);
    setInitialPrompt(undefined);
    persistConciergeBubbleVisible(false);
  }, []);

  // Handle ESC key to close modal
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

  const activeCar = activeCarId ? carsData.find((c) => c.id === activeCarId) : undefined;
  const activeCarName = activeCar ? `${activeCar.brand} ${activeCar.model || ""}`.trim() : undefined;

  return (
    <ConciergeContext.Provider
      value={{
        isOpen,
        isBubbleVisible,
        initialPrompt,
        activeCarId,
        openConcierge,
        closeConcierge,
        toggleConcierge,
        dismissBubble,
      }}
    >
      {children}

      {/* Persistent Floating Concierge Bubble with Close/Dismiss control */}
      {isBubbleVisible && (
        <ConciergeFloatingBubble
          isOpen={isOpen}
          onToggle={toggleConcierge}
          onDismiss={dismissBubble}
          activeCarName={activeCarName}
          hasMessages={hasMessages || isOpen}
        />
      )}

      {/* Concierge Modal / Panel */}
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
