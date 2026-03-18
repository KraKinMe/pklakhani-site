import { getWhatsAppLink } from "@/utils/whatsapp";

export default function WhatsAppButton({
  message,
}: {
  message?: string;
}) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-green-700 hover:scale-105 transition"
    >
      Chat with CA
    </a>
  );
}