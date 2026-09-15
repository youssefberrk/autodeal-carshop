"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConciergeInputProps {
  onSend: (content: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const ConciergeInput = ({ onSend, isLoading, disabled }: ConciergeInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;

    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="concierge-input-wrap">
      <label htmlFor="concierge-message" className="sr-only">
        Ask the AutoDeal AI Concierge
      </label>
      <input
        id="concierge-message"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about performance, provenance, alternatives…"
        disabled={isLoading || disabled}
        className={cn("concierge-input", isLoading && "opacity-50")}
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Send concierge message"
        className={cn("concierge-send-btn", (isLoading || !input.trim()) && "opacity-50 cursor-not-allowed")}
        disabled={isLoading || !input.trim()}
      >
        {isLoading ? (
          <div className="spinner-small" />
        ) : (
          <Send size={17} />
        )}
      </button>
    </form>
  );
};

export default ConciergeInput;
