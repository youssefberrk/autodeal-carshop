"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import CarConcierge from "@/components/ai/CarConcierge";
import ConciergeFloatingBubble from "@/components/ai/ConciergeFloatingBubble";
import { carsData } from "@/public/cars/CarsData";

const CONCIERGE_BUBBLE_STORAGE_KEY = "autodeal_concierge_bubble_visible_v1";
const CONCIERGE_CAR_STORAGE_KEY = "autodeal_concierge_active_car_v1";
const CONCIERGE_MESSAGES_STORAGE_KEY = "autodeal_concierge_chat_v1";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [activeCarId, setActiveCarId] = useState<number | undefined>(undefined);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);
  const [hasStoredMessages, setHasStoredMessages] = useState(false);

  // Restore persistence on mount
  useEffect(() => {
    try {
      const bubbleSaved = localStorage.getItem(CONCIERGE_BUBBLE_STORAGE_KEY);
      const carSaved = localStorage.getItem(CONCIERGE_CAR_STORAGE_KEY);
      const messagesSaved = localStorage.getItem(CONCIERGE_MESSAGES_STORAGE_KEY);

      if (messagesSaved) {
        const parsed = JSON.parse(messagesSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHasStoredMessages(true);
          // If user had an active conversation and didn't explicitly dismiss bubble, show bubble
          if (bubbleSaved !== "false") {
            setIsBubbleVisible(true);
          }
        }
      } else if (bubbleSaved === "true") {
        setIsBubbleVisible(true);
      }

      if (carSaved) {
        const parsedId = parseInt(carSaved, 10);
        if (!isNaN(parsedId)) {
          setActiveCarId(parsedId);
        }
      }
    } catch (e) {
      console.error("Failed to restore concierge session from localStorage:", e);
    }
  }, []);

  const openConcierge = useCallback((carId?: number, prompt?: string) => {
    if (typeof carId === "number") {
      setActiveCarId(carId);
      try {
        localStorage.setItem(CONCIERGE_CAR_STORAGE_KEY, String(carId));
      } catch (e) {
        console.error(e);
      }
    }
    setInitialPrompt(prompt);
    setIsOpen(true);
    setIsBubbleVisible(true);
    try {
      localStorage.setItem(CONCIERGE_BUBBLE_STORAGE_KEY, "true");
    } catch (e) {
      console.error(e);
    }
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
    setIsBubbleVisible(true);
    try {
      localStorage.setItem(CONCIERGE_BUBBLE_STORAGE_KEY, "true");
    } catch (e) {
      console.error(e);
    }
  }, []);

  const dismissBubble = useCallback(() => {
    setIsBubbleVisible(false);
    setIsOpen(false);
    setInitialPrompt(undefined);
    try {
      localStorage.setItem(CONCIERGE_BUBBLE_STORAGE_KEY, "false");
    } catch (e) {
      console.error(e);
    }
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
          hasMessages={hasStoredMessages || isOpen}
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
