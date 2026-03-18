const PHONE = "918802805667";

const DEFAULT_MESSAGE =
  "Hi, I came across your website and would like to discuss my requirement.";

export function getWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${PHONE}?text=${text}`;
}