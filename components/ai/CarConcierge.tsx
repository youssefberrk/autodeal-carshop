"use client";

import { useState, useEffect, useRef } from "react";
import { ConciergeMessage, ConciergeResponse, CarRecommendation } from "@/types/Concierge";
import ConciergeMessageComponent from "./ConciergeMessage";
import ConciergeInput from "./ConciergeInput";
import CarRecommendationCard from "./CarRecommendationCard";
import { carsData } from "@/public/cars/CarsData";
import { X, Sparkles } from "lucide-react";

interface CarConciergeProps {
  carId?: number;
  onClose?: () => void;
}

const STARTER_PROMPTS = [
  "Find me a luxury car under $100k",
  "I want a high-performance car",
  "Find me an electric vehicle",
  "What's the best car for long road trips?",
  "Compare two vehicles",
];

const CarConcierge = ({ carId, onClose }: CarConciergeProps) => {
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (carId) {
      const car = carsData.find((c) => c.id === carId);
      if (car) {
        setMessages([
          {
            role: "assistant",
            content: `Hello! I see you're interested in the ${car.brand} ${car.model}. How can I help you explore this vehicle or find alternatives?`,
          },
        ]);
      }
    }
  }, [carId]);

  const handleSend = async (content: string) => {
    const userMessage: ConciergeMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the AI Concierge.");
      }

      const data: ConciergeResponse = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);

      if (data.recommendations) {
        // We handle recommendations by adding them as a special message or
        // by maintaining a separate state. Let's use a separate state for the "current" recommendations.
        // Actually, to keep it simple and within the message flow, we can inject a special "recommendation"
        // object into the messages array or just store them.
        // Let's use a separate state for the most recent recommendations.
        setRecentRecommendations(data.recommendations);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterPrompt = (prompt: string) => {
    handleSend(prompt);
  };

  const clearConversation = () => {
    setMessages([]);
    setRecentRecommendations([]);
    setError(null);
  };

  // Separate state for recommendations to render them cleanly
  const [recentRecommendations, setRecentRecommendations] = useState<CarRecommendation[]>([]);

  return (
    <div className="car-concierge-container">
      <div className="concierge-header">
        <div className="header-left">
          <Sparkles className="sparkle-icon" size={20} />
          <h3 className="header-title">AI Concierge</h3>
        </div>
        <div className="header-actions">
          <button onClick={clearConversation} className="btn-clear">Clear</button>
          {onClose && (
            <button onClick={onClose} className="btn-close">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="concierge-body" ref={scrollRef}>
        {messages.length === 0 && !error && (
          <div className="concierge-empty">
            <p className="empty-text">How can I assist you in finding your dream car today?</p>
            <div className="starter-prompts">
              {STARTER_PROMPTS.map((prompt) => (
                <button
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
          <div className="concierge-error">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="btn-retry">Retry</button>
          </div>
        )}

        {messages.map((msg, idx) => (
          <ConciergeMessageComponent key={idx} message={msg} />
        ))}

        {isLoading && (
          <div className="message-wrap assistant">
            <div className="message-avatar"><Bot size={20} /></div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        {recentRecommendations && recentRecommendations.length > 0 && (
          <div className="recommendations-grid">
            {recentRecommendations.map((rec) => {
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
        )}
      </div>

      <div className="concierge-footer">
        <ConciergeInput
          onSend={handleSend}
          isLoading={isLoading}
          disabled={!!error}
        />
      </div>
    </div>
  );
};

// Adding a Bot import since it's used in the JSX but not imported
import { Bot } from "lucide-react";

export default CarConcierge;
