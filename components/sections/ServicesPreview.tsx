export default function ServicesPreview() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Our Core Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-lg">
            <h3 className="font-semibold">Audit & Assurance</h3>
            <p className="text-sm text-gray-600 mt-2">
              Reliable audits ensuring compliance and transparency.
            </p>
          </div>

          <div className="border p-6 rounded-lg">
            <h3 className="font-semibold">Taxation</h3>
            <p className="text-sm text-gray-600 mt-2">
              Direct tax and GST solutions for businesses.
            </p>
          </div>

          <div className="border p-6 rounded-lg">
            <h3 className="font-semibold">Advisory</h3>
            <p className="text-sm text-gray-600 mt-2">
              Strategic guidance for business growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}