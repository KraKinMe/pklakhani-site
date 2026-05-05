"use client";

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

  const textLabel = typeof children === "string" ? children : "";
  const isTrackingNeeded = method !== "unknown";
  const displayHref = isTrackingNeeded
    ? `/api/track?method=${method}&label=${encodeURIComponent(textLabel)}&dest=${encodeURIComponent(href)}`
    : href;

  return (
    <a href={displayHref} target={target} className={styles[variant]}>
      {children}
    </a>
  );
}