export const metadata = {
  title: "Careers | P.K. Lakhani & Co.",
  description: "Apply for CA articleship and jobs"
}

export default function CareersPage() {
  const message = encodeURIComponent(
    "Hi, I want to apply at P.K. Lakhani & Co."
  )

  const whatsappLink = `https://wa.me/918802805667?text=${message}`

  const formLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSf0LUCcXhEC1SKWkEWlsmMKnOmUlhNoBzA1CRrPCCIzMDSeZw/viewform"

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-semibold">
        Careers at P.K. Lakhani & Co.
      </h1>

      <p className="mt-4 text-gray-600">
        We are always looking for motivated individuals to join our firm.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href={whatsappLink}
          target="_blank"
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Apply via WhatsApp
        </a>

        <a
          href={formLink}
          target="_blank"
          className="border border-gray-300 px-6 py-3 rounded"
        >
          Apply via Form
        </a>
      </div>
    </main>
  )
}