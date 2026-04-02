// components/common/WhatsAppCTA.tsx

import Image from "next/image";
import { getWhatsAppLink } from "@/utils/whatsapp";

type Props = {
  message: string;
  label?: string;
  showIcon?: boolean;
  variant?: "primary" | "secondary" | "floating";
  className?: string;
  children?: React.ReactNode;
};

export default function WhatsAppCTA({
  message,
  label = "Chat on WhatsApp",
  showIcon = true,
  variant = "primary",
  className = "",
  children,
}: Props) {
  const styles = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    floating:
      "fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-xl z-50 hover:bg-green-700",
  };

  const content = children || label;

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles[variant]} ${className} flex items-center gap-2`}
    >
      {showIcon && (
        <Image
          src="/icons/whatsapp.svg"
          alt="WhatsApp"
          width={variant === "floating" ? 20 : 16}
          height={variant === "floating" ? 20 : 16}
        />
      )}

      <span className="text-sm font-medium">
        {content}
      </span>
    </a>
  );
}