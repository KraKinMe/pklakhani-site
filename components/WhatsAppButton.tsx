import { getWhatsAppLink } from "@/utils/whatsapp";

export default function WhatsAppButton({
  message,
  label = "Chat with CA",
  showIcon = true,
}: {
  message?: string;
  label?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-105 transition flex items-center gap-2 z-50"
    >
      {showIcon && (
        <img
          src="/icons/whatsapp.svg"
          alt=""
          className="w-5 h-5 shrink-0"
        />
      )}

      <span className="text-sm font-medium">
        {label}
      </span>
    </a>
  );
}