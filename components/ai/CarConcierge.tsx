"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ConciergeMessage, ConciergeResponse, CarRecommendation } from "@/types/Concierge";
import ConciergeMessageComponent from "./ConciergeMessage";
import ConciergeInput from "./ConciergeInput";
import CarRecommendationCard from "./CarRecommendationCard";
import { carsData } from "@/public/cars/CarsData";
import { X, Sparkles } from "lucide-react";

interface CarConciergeProps {
  carId?: number;
  initialPrompt?: string;
  onClose?: () => void;
}

type ConciergeChatMessage = ConciergeMessage & {
  recommendations?: CarRecommendation[];
};

const STARTER_PROMPTS = [
  "Curate a grand tourer under $100k",
  "I want something electric with presence",
  "Show me track-focused performance",
  "Compare two vehicles for me",
  "What suits long-distance luxury?",
];

const getDynamicPrompts = (carId?: number) => {
  if (!carId) return STARTER_PROMPTS;

  const car = carsData.find((c) => c.id === carId);
  if (!car) return STARTER_PROMPTS;

  return [
    `Walk me through the ${car.model} specifications.`,
    `How does the ${car.model} compare with its closest rivals?`,
    `What makes the ${car.model} worth considering?`,
    `Is the ${car.model} available for immediate acquisition?`,
    `Show me comparable alternatives below this price point.`,
  ];
};

const getScrollBehavior = (): ScrollBehavior =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

const CarConcierge = ({ carId, initialPrompt, onClose }: CarConciergeProps) => {
  const [messages, setMessages] = useState<ConciergeChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(initialPrompt));
  const [error, setError] = useState<string | null>(null);
  const [activeRequest, setActiveRequest] = useState<string | undefined>(initialPrompt);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const consumedPromptRef = useRef<string | undefined>(undefined);

  const activeCar = carId ? carsData.find((c) => c.id === carId) : undefined;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceFromBottom < 80;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const lastMessage = messages[messages.length - 1];
    const isUserMessage = lastMessage?.role === "user";

    // Keep the user's own message and the typing indicator in view.
    if (isLoading || isUserMessage) {
      isNearBottomRef.current = true;
      el.scrollTo({ top: el.scrollHeight, behavior: getScrollBehavior() });
      return;
    }

    // If the user scrolled up to read earlier messages, don't yank them back.
    if (!isNearBottomRef.current) return;

    const messageNodes = el.querySelectorAll<HTMLElement>("[data-concierge-message]");
    const lastNode = messageNodes[messageNodes.length - 1];

    if (!lastNode) {
      isNearBottomRef.current = true;
      el.scrollTo({ top: el.scrollHeight, behavior: getScrollBehavior() });
      return;
    }

    // Reveal the start of the new reply instead of jumping past long card stacks.
    const maxScrollTop = el.scrollHeight - el.clientHeight;
    const desiredTop =
      lastNode.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 12;

    el.scrollTo({
      top: Math.max(0, Math.min(desiredTop, maxScrollTop)),
      behavior: getScrollBehavior(),
    });
  }, [messages, isLoading]);

  useEffect(() => {
    const car = carId ? carsData.find((c) => c.id === carId) : undefined;

    if (!car) {
      setMessages([]);
      return;
    }

    setMessages([
      {
        role: "assistant",
        content: `I've opened the dossier for the ${car.brand} ${car.model}. I can walk you through its specifications, benchmark it against rivals, or check acquisition readiness. How would you like to proceed?`,
        recommendations: [
          {
            carId: car.id,
            reason: "Currently in view — the benchmark for this briefing.",
          },
        ],
      },
    ]);
    setError(null);
  }, [carId]);

  const handleSend = useCallback(async (content: string) => {
    const userMessage: ConciergeMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setActiveRequest(content);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("The Concierge could not complete that request. Please try again.");
      }

      const data: ConciergeResponse = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          recommendations: data.recommendations,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleStarterPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const clearConversation = () => {
    setMessages([]);
    setActiveRequest(undefined);
    setError(null);
    isNearBottomRef.current = true;
  };

  useEffect(() => {
    if (!initialPrompt) return;
    if (consumedPromptRef.current === initialPrompt) return;

    consumedPromptRef.current = initialPrompt;
    void handleSend(initialPrompt);
  }, [initialPrompt, handleSend]);

  return (
    <div className="car-concierge-container" aria-labelledby="concierge-title">
      <header className="concierge-header">
        <div className="header-left">
          <div className="concierge-mark" aria-hidden="true">
            <Sparkles size={16} />
          </div>
          <div className="header-titles">
            <span className="header-eyebrow">AutoDeal Private Client</span>
            <h3 className="header-title" id="concierge-title">
              Concierge
            </h3>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" onClick={clearConversation} className="btn-clear">
            Reset
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="btn-close" aria-label="Close AI Concierge">
              <X size={17} />
            </button>
          )}
        </div>
      </header>

      <div className="concierge-context-bar">
        <span className="context-indicator" aria-hidden="true" />
        <span className="context-label">
          {activeCar ? `${activeCar.brand} ${activeCar.model} in focus` : "Full catalog access"}
        </span>
        <span className="context-status">Live inventory</span>
      </div>

      {activeRequest && (
        <div className="concierge-request-bar" aria-label="Current briefing request">
          <span className="request-label">Briefing request</span>
          <p className="request-text">{activeRequest}</p>
        </div>
      )}

      <div className="concierge-body" ref={scrollRef} onScroll={handleScroll}>
        {messages.length === 0 && !error && !isLoading && (
          <div className="concierge-empty">
            <span className="empty-eyebrow">Private briefing</span>
            <p className="empty-text">
              Tell me how you intend to drive, and I&apos;ll curate the shortlist from the live AutoDeal inventory.
            </p>
            <div className="starter-prompts" aria-label="Suggested concierge requests">
              {getDynamicPrompts(carId).map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => handleStarterPrompt(prompt)}
                  className="starter-prompt-btn"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="concierge-error" role="alert">
            <span className="error-eyebrow">Briefing interrupted</span>
            <p>{error}</p>
            <button type="button" onClick={() => setError(null)} className="btn-retry">
              Dismiss and continue
            </button>
          </div>
        )}

        {messages.map((msg, idx) => (
          <ConciergeMessageComponent key={idx} message={msg}>
            {msg.recommendations && msg.recommendations.length > 0 && (
              <section className="recommendations-panel" aria-label="Curated vehicle recommendations">
                <div className="recommendations-header">
                  <span className="recommendations-eyebrow">Curated for this briefing</span>
                  <span className="recommendations-count">
                    {msg.recommendations.length} {msg.recommendations.length === 1 ? "vehicle" : "vehicles"}
                  </span>
                </div>
                <div className="recommendations-grid">
                  {msg.recommendations.map((rec) => {
                    const car = carsData.find((c) => c.id === rec.carId);
                    if (!car) return null;
                    return (
                      <CarRecommendationCard
                        key={car.id}
                        car={car}
                        recommendation={rec}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </ConciergeMessageComponent>
        ))}

        {isLoading && (
          <div className="message-wrap assistant">
            <div className="message-avatar" aria-hidden="true">
              <span className="avatar-monogram">AD</span>
            </div>
            <div className="message-content">
              <div className="message-meta">
                <span>AutoDeal Concierge</span>
              </div>
              <div className="typing-indicator" aria-label="Concierge is reviewing the catalog">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}


      </div>

      <footer className="concierge-footer">
        <ConciergeInput
          onSend={handleSend}
          isLoading={isLoading}
          disabled={!!error}
        />
        <p className="concierge-footnote">
          Grounded in live AutoDeal inventory. Recommendations are curated from catalog data.
        </p>
      </footer>
    </div>
  );
};

export default CarConcierge;
