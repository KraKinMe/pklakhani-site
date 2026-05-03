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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("tel:")) {
      sendGAEvent("event", "contact_click", { method: "phone" });
    } else if (href.startsWith("mailto:")) {
      e.preventDefault();
      window.location.href = href;
      sendGAEvent("event", "contact_click", { method: "email" });
    }
  };

  const displayHref = href.startsWith("mailto:") ? "#" : href;

  return (
    <a href={displayHref} target={target} className={styles[variant]} onClick={handleClick}>
      {children}
    </a>
  );
}