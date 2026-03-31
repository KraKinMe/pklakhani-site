// config/content.ts

import { MESSAGES } from "./messages";

export type MessageKey = keyof typeof MESSAGES;

export const INDUSTRIES = [
  "Automobiles",
  "Information Technology",
  "Real Estate",
  "Financial Services",
  "Hospitality",
  "Manufacturing",
  "Telecom",
];

export const SERVICES: {
  title: string;
  subtitle: string;
  description: string;
  messageKey: MessageKey;
  ctaLabel: string;
  highlight: boolean;
}[] = [
  {
    title: "Audit & Assurance",
    subtitle: "Statutory • Internal • Financial Reviews",
    description:
      "Ensuring compliance, accuracy, and transparency in financial reporting.",
    messageKey: "audit",
    ctaLabel: "Discuss Audit Requirements",
    highlight: false,
  },
  {
    title: "Income Tax & GST",
    subtitle: "Planning • Filing • Compliance",
    description:
      "End-to-end tax planning and compliance services.",
    messageKey: "tax",
    ctaLabel: "Discuss Tax & GST",
    highlight: true,
  },
  {
    title: "Business Advisory & Structuring",
    subtitle: "Structuring • Compliance • Strategy",
    description:
      "Helping businesses scale with strategic financial decisions.",
    messageKey: "advisory",
    ctaLabel: "Get Advisory Support",
    highlight: false,
  },
  {
    title: "Outsourced Accounting",
    subtitle: "Accounting • Reporting • Bookkeeping",
    description:
      "Accurate bookkeeping and financial reporting.",
    messageKey: "accounting",
    ctaLabel: "Discuss Accounting Needs",
    highlight: true,
  },
];