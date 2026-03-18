export default function WhatsAppButton() {
  const link =
    "https://wa.me/918802805667?text=Hi,%20I%20am%20interested%20in%20your%20services";

  return (
    <a
      href={link}
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg"
    >
      WhatsApp
    </a>
  );
}