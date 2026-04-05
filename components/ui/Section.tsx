export default function Section({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`${dark ? "section-dark" : "bg-page-bg"} section`}
    >
      {children}
    </section>
  );
}