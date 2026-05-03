"use client";

import WhatsAppCTA from "./WhatsAppCTA";
import { sendGAEvent } from "@next/third-parties/google";

type Props = {
  type: "whatsapp" | "call" | "email";
  label?: string;
  phone?: string;
  email?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function CTAButton({
  type,
  label,
  message,
  phone,
  email,
  className = "",
  children,
}: Props) {
  const content = children || label;

  // WhatsApp
  if (type === "whatsapp" && message) {
    return (
      <WhatsAppCTA
        message={message}
        label={typeof content === "string" ? content : undefined}
        className={className}
      >
        {children}
      </WhatsAppCTA>
    );
  }

  // Call
  if (type === "call" && phone) {
    return (
      <a 
        href={`tel:${phone}`} 
        className={`text-sm transition ${className}`}
        onClick={() => sendGAEvent("event", "contact_click", { method: "phone", label })}
      >
        {content}
      </a>
    );
  }

  if (type === "email" && email) {
    return (
      <a 
        href="#"
        className={`text-sm transition ${className}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `mailto:${email}`;
          sendGAEvent("event", "contact_click", { method: "email", label });
        }}
      >
        {content}
      </a>
    );
  }

  return null;
}