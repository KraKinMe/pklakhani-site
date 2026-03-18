import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-24 text-center bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
          Compliance. Clarity. Confidence.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Trusted Chartered Accountants serving businesses since 1994.
        </p>

        <p className="mt-2 text-gray-500">
          Audit, Taxation & Advisory for Corporates and Growing Enterprises.
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <a
            href="https://wa.me/918802805667"
            target="_blank"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            WhatsApp
          </a>

          <a
            href="tel:+918802805667"
            className="border px-6 py-3 rounded-lg"
          >
            Call
          </a>

          <a
            href="mailto:pklakhani@gmail.com"
            className="border px-6 py-3 rounded-lg"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}