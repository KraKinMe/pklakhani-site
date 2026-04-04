// config/content.ts

export const HERO = {
  highlights: [
    { label: "30+ Years of Experience" },
    { label: "Pan India Services" },
    { label: "Corporate & SME Focus" },
  ],
};

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

// ✅ UPGRADED BUT COMPATIBLE
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

    // ✅ NEW (for future use)
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

// ✅ NEW (HIGH IMPACT)
export const STATS = [
  { value: "30+", label: "Years Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "100%", label: "Compliance Focus" },
  { value: "Pan India", label: "Service Coverage" },
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