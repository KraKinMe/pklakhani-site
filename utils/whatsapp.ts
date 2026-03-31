import { SITE } from "@/config/site";

export function getWhatsAppLink(message: string) {
  return `${SITE.links.whatsappBase}${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}