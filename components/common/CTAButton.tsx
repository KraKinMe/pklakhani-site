"use client";

import WhatsAppCTA from "./WhatsAppCTA";

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
        href={`/api/track?method=phone&label=${encodeURIComponent(label || "")}&dest=${encodeURIComponent(`tel:${phone}`)}`} 
        className={`text-sm transition ${className}`}
      >
        {content}
      </a>
    );
  }

  if (type === "email" && email) {
    return (
      <a 
        href={`/api/track?method=email&label=${encodeURIComponent(label || "")}&dest=${encodeURIComponent(`mailto:${email}`)}`}
        className={`text-sm transition ${className}`}
      >
        {content}
      </a>
    );
  }

  return null;
}