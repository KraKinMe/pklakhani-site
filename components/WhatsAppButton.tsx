export default function WhatsAppButton({
  message = "Hi, I am interested in your services",
}) {
  const encodedMessage = encodeURIComponent(message);
  const link = `https://wa.me/918802805667?text=${encodedMessage}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg"
    >
      WhatsApp
    </a>
  );
}