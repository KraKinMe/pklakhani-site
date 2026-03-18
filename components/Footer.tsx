export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        
        {/* Firm Info */}
        <div>
          <h3 className="font-semibold text-lg">P.K. Lakhani & Co.</h3>
          <p className="text-sm text-gray-600 mt-2">
            Chartered Accountants providing audit, taxation, GST and advisory services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-600">
            Gurugram, India<br />
            +91 8802805667<br />
            pklakhani@gmail.com
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} P.K. Lakhani & Co.
      </div>
    </footer>
  );
}