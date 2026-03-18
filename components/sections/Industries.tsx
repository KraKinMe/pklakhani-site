const industries = [
  "Automobiles",
  "Oil & Gas",
  "Information Technology",
  "Media & Entertainment",
  "Real Estate",
  "Financial Sector",
  "Telecom",
  "Hospitality",
  "Agri Sector",
  "Electricals",
  "Power",
];

export default function Industries() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Industries We Serve
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {industries.map((item) => (
            <div key={item} className="border p-4 rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}