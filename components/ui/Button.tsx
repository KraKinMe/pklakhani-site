"use client";

import { sendGAEvent } from "@next/third-parties/google";

export default function Button({
  children,
  href,
  variant = "primary",
  target,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "secondary-dark";
  target?: string;
}) {
  const styles = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    "secondary-dark": "btn btn-secondary-dark",
  };

  let method = "unknown";
  if (href.startsWith("tel:")) method = "phone";
  else if (href.startsWith("mailto:")) method = "email";
  
  const isTrackingNeeded = method !== "unknown";
  const displayHref = isTrackingNeeded
    ? `/api/track?method=${method}&dest=${encodeURIComponent(href)}`
    : href;

  return (
    <a href={displayHref} target={target} className={styles[variant]}>
      {children}
    </a>
  );
}