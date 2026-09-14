"use client";

import type { ConciergeMessage } from "@/types/Concierge";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ConciergeMessageProps {
  message: ConciergeMessage;
}

const ConciergeMessage = ({ message }: ConciergeMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <div className={cn("message-wrap", isAssistant ? "assistant" : "user")}>
      <div className="message-avatar">
        {isAssistant ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="message-content">
        <p className="message-text">{message.content}</p>
      </div>
    </div>
  );
};

export default ConciergeMessage;
