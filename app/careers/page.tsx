export default function CareersPage() {
  const formLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSf0LUCcXhEC1SKWkEWlsmMKnOmUlhNoBzA1CRrPCCIzMDSeZw/viewform";

  const whatsappLink =
    "https://wa.me/918802805667?text=Hi,%20I%20want%20to%20apply%20for%20a%20position%20at%20P.K.%20Lakhani%20%26%20Co.";

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-semibold text-gray-900">
        Careers at P.K. Lakhani & Co.
      </h1>

      <p className="mt-4 text-gray-600">
        We are always looking for motivated individuals to join our team.
        Whether you are an Article or a qualified professional, you can apply below.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {/* WhatsApp Apply */}
        <a
          href={whatsappLink}
          target="_blank"
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-center font-medium"
        >
          Apply via WhatsApp
        </a>

        {/* Form Apply */}
        <a
          href={formLink}
          target="_blank"
          className="border border-gray-300 px-6 py-3 rounded-lg text-center font-medium"
        >
          Apply via Form
        </a>
      </div>
    </main>
  );
}