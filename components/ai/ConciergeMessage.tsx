"use client";

import type { ReactNode } from "react";
import type { ConciergeMessage } from "@/types/Concierge";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface ConciergeMessageProps {
  message: ConciergeMessage;
  children?: ReactNode;
}

const ConciergeMessage = ({ message, children }: ConciergeMessageProps) => {
  const isAssistant = message.role === "assistant";
  const hasAttachments = Boolean(children);

  return (
    <div
      className={cn(
        "message-wrap",
        isAssistant ? "assistant" : "user",
        hasAttachments && "has-attachments",
      )}
      data-concierge-message
    >
      <div className="message-avatar" aria-hidden="true">
        {isAssistant ? <span className="avatar-monogram">AD</span> : <User size={14} />}
      </div>
      <div className="message-content">
        <div className="message-meta">
          <span>{isAssistant ? "AutoDeal Concierge" : "You"}</span>
        </div>
        <p className="message-text">{message.content}</p>
        {children}
      </div>
    </div>
  );
};

export default ConciergeMessage;
