/** Site chrome (root layout, floating actions). */
export const LAYOUT = {
  floatingWhatsAppLabel: "Chat with Us",
} as const;

/** Reusable UI labels for buttons and links. */
export const LABELS = {
  call: "Call",
  callNow: "Call Now",
  email: "Email",
  chatOnWhatsApp: "Chat on WhatsApp",
} as const;

export const HOME_HERO = {
  imageSrc: "/images/hero_ca.webp",
  imageAlt: "Chartered Accountant Meeting",
  title: "Chartered Accountants for SMEs & Corporates",
  accent: "Audit, Tax & Strategic Advisory",
  description:
    "Enabling corporates and SMEs with expert statutory audit, taxation, and regulatory compliance services.",
} as const;

export const HERO = {
  highlights: [
    { label: "30+ Years of Experience" },
    { label: "Pan India Services" },
    { label: "Corporate & SME Focus" },
  ],
};

export const INDUSTRIES_SECTION = {
  title: "Industries We Serve",
  description:
    "We work with businesses across diverse sectors, providing tailored audit, taxation, and advisory solutions aligned with industry-specific requirements.",
} as const;

export const INDUSTRIES = [
  "Automobiles",
  "Information Technology",
  "Real Estate",
  "Financial Services",
  "Hospitality",
  "Manufacturing",
  "Telecom",
  "Education",
  "Healthcare",
];

export const SERVICES_SECTION = {
  title: "Our Core Services",
  description:
    "Comprehensive audit, taxation, and advisory solutions designed to ensure compliance, optimize financial performance, and support business growth.",
};

export const HOME_CTA_SECTION = {
  title: "Need Assistance?",
  description:
    "Connect with our team to discuss your requirements and get expert guidance.",
  whatsappLabel: "Talk to a Chartered Accountant",
} as const;

export const SERVICES_PAGE_CTA = {
  title: "Talk to a Chartered Accountant Today",
  description:
    "Get expert advice on audit, taxation, and compliance tailored to your business.",
} as const;

export const ABOUT = {
  firm: {
    title: "Our Firm",
    paragraphs: [
      "With over three decades of experience, we provide audit, taxation, and advisory services to corporates and SMEs.",
      "Our approach focuses on compliance, accuracy, and timely execution of financial and regulatory requirements while supporting long-term business growth.",
    ],
  },
  approach: {
    title: "Our Approach",
    points: [
      {
        lead: "Client-Centric Understanding",
        body: "We begin by understanding your business, industry, and specific requirements to deliver relevant solutions.",
      },
      {
        lead: "Tailored Solutions",
        body: "Customized strategies for audit, taxation, and compliance aligned with your operational needs.",
      },
      {
        lead: "Accuracy & Compliance",
        body: "Ensuring adherence to all statutory and regulatory requirements with precision.",
      },
      {
        lead: "Timely Execution",
        body: "Delivering services within defined timelines with consistency and reliability.",
      },
      {
        lead: "Proactive Advisory",
        body: "Identifying risks and opportunities to support better financial and strategic decisions.",
      },
      {
        lead: "Technology-Driven Processes",
        body: "Leveraging modern tools to enhance efficiency, reporting, and transparency.",
      },
      {
        lead: "Confidentiality & Integrity",
        body: "Maintaining the highest standards of professionalism, trust, and data security.",
      },
    ],
  },
} as const;

export const CONTACT_PAGE = {
  headings: {
    address: "Office Address",
    phone: "Phone",
    email: "Email",
  },
  whatsappLabel: "WhatsApp",
} as const;

export const CAREERS = {
  intro:
    "We are always looking for motivated individuals who are eager to learn, take responsibility, and grow in a professional environment.",
  applicationFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdKeW8w7G_LzEqNntfKIYgxs7_PdU8k-REx4NRFGHanFfjO2Q/viewform?usp=publish-editor",
  formButtonLabel: "Apply via Form",
  whatsappButtonLabel: "Apply via WhatsApp",
} as const;

/** Homepage FAQ — mirrored in FAQPage JSON-LD for rich results eligibility. Keep answers factual. */
export const FAQ_SECTION = {
  title: "Frequently Asked Questions",
  subtitle:
    "Straight answers businesses often ask before working with our chartered accountants.",
} as const;

export const FAQ_HOME = [
  {
    question:
      "What chartered accountancy services does P.K. Lakhani & Co. offer?",
    answer:
      "We provide statutory and internal audit, income tax planning and filings, GST registration and compliance, business advisory and structuring, outsourced bookkeeping, and payroll processing. Engagements are scoped to each client’s needs and applicable regulations.",
  },
  {
    question:
      "Do you work with small and mid-sized businesses, or only large companies?",
    answer:
      "We work with SMEs, growing companies, and larger corporates. We support organizations that need dependable compliance, audits, tax support, or ongoing accounting—whether you operate locally or across India.",
  },
  {
    question: "Where is your CA firm located, and do you serve clients outside Gurugram?",
    answer:
      "Our office is in Gurugram, Haryana. We serve clients on a pan‑India basis for many engagements—including audit advisory, tax, and outsourced accounting—with communication over email, calls, and secure document sharing.",
  },
  {
    question: "How can our business contact you for an initial consultation?",
    answer:
      "Reach us via phone, WhatsApp, or email from the contact section of this website, or click the WhatsApp button to share your requirement. Brief us on entity type (company, LLP, partnership, proprietor) and priorities (audit, GST, tax, bookkeeping), and our team will guide next steps.",
  },
  {
    question:
      "Can you help with GST registration, reconciliations, and return filing?",
    answer:
      "Yes. We support GST registration, periodic return filing, reconciliation with books and portal data, and related compliance hygiene. Complexity varies by industry and turnover, so timelines and deliverables are agreed at engagement.",
  },
  {
    question:
      "When might a company require a statutory auditor, and how do we know?",
    answer:
      "Applicable law (for example requirements under company law thresholds, entity type, and borrowings) determines whether a statutory audit is mandatory. Obligations depend on turnover, borrowing, shareholder structure, and other factors—we recommend confirming your classification with qualified advice rather than guessing from generic rules.",
  },
] as const;

export const SERVICES = [
  {
    title: "Audit & Assurance",
    subtitle: "Statutory • Internal • Financial Reviews",
    description:
      "Ensuring compliance, accuracy, and transparency in financial reporting.",

    bullets: [
      "Statutory Audit & Internal Audit",
      "Financial Statement Review",
      "Risk Assessment & Compliance",
    ],

    icon: "audit",

    highlightPoints: [
      "Ensure regulatory compliance",
      "Improve financial transparency",
      "Identify business risks early",
    ],

    cta: {
      label: "Talk to an Audit Expert",
      message:
        "Hi, I would like to discuss Audit & Assurance services.",
    },
  },

  {
    title: "Income Tax & GST",
    subtitle: "Planning • Filing • Compliance",
    description:
      "End-to-end tax planning and compliance services for individuals and businesses.",

    bullets: [
      "Income Tax Filing & Planning",
      "GST Registration & Returns",
      "Tax Optimization Strategies",
    ],

    icon: "tax",

    highlightPoints: [
      "Reduce tax liability legally",
      "Avoid penalties & notices",
      "Ensure timely compliance",
    ],

    cta: {
      label: "Get Tax Help Now",
      message:
        "Hi, I would like to discuss Income Tax and GST services.",
    },
  },

  {
    title: "Business Advisory & Structuring",
    subtitle: "Structuring • Compliance • Strategy",
    description:
      "Helping businesses scale with strategic financial and regulatory decisions.",

    bullets: [
      "Business Structuring & Setup",
      "Financial Strategy Consulting",
      "Regulatory Advisory",
    ],

    icon: "advisory",

    highlightPoints: [
      "Improve business efficiency",
      "Make data-driven decisions",
      "Scale with confidence",
    ],

    cta: {
      label: "Get Advisory Support",
      message:
        "Hi, I would like to discuss Business Advisory services.",
    },
  },

  {
    title: "Accounting & Payroll",
    subtitle:
      "Bookkeeping • Payroll Processing • BPO Services",
    description:
      "Accurate bookkeeping and payroll management for smooth business operations.",

    bullets: [
      "Bookkeeping & Financial Records",
      "Payroll Processing",
      "Outsourced Accounting (BPO)",
    ],

    icon: "payroll",

    highlightPoints: [
      "Save operational time",
      "Ensure payroll accuracy",
      "Focus on core business",
    ],

    cta: {
      label: "Simplify Your Accounting",
      message:
        "Hi, I would like to discuss Accounting and Payroll services.",
    },
  },
];

export const STATS = [
  {
    value: "30+",
    label: "Years Experience",
    icon: "clock",
  },
  {
    value: "100%",
    label: "Compliance Focus",
    icon: "check",
  },
  {
    value: "Pan India",
    label: "Service Coverage",
    icon: "india",
  },
];

export const PAGE_HERO = {
  about: {
    title: "About Us",
    description:
      "Established in 1994, P.K. Lakhani & Co. is a Chartered Accountants firm based in Gurugram, serving corporates and SMEs across India.",
    image: "/images/aboutBG.webp",
  },

  services: {
    title: "Our Services",
    description:
      "Comprehensive audit, taxation, and advisory services designed to ensure compliance, reduce risk, and support business growth.",
    image: "/images/servicesBG.webp",
  },

  careers: {
    title: "Careers",
    description:
      "Join us to kick start your professional career.",
    image: "/images/careersBG.webp",
  },

  contact: {
    title: "Contact Us",
    description:
      "Reach out for audit, taxation and advisory services.",
    image: "/images/contactUsBG.webp",
  },
};