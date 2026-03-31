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
      className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-105 transition flex items-center gap-2"
    >
      {showIcon && (
        <img
          src="/icons/whatsapp.svg"
          alt="WhatsApp"
          className="w-5 h-5 shrink-0"
        />
      )}
      {label}
    </a>
  );
}