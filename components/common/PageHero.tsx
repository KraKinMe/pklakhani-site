// components/common/PageHero.tsx

import Image from "next/image";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

type Props = {
  title: string;
  description?: string;
  image: string;
  position?: "top" | "center" | "bottom" | "left" | "right";
};

export default function PageHero({
  title,
  description,
  image,
  position = "center",
}: Props) {
  const positionClass = {
    top: "object-top",
    center: "object-center",
    bottom: "object-bottom",
    left: "object-left",
    right: "object-right",
  }[position];

  return (
    <div className="relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${positionClass}`}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <Section dark>
        <div className="min-h-[30vh] md:min-h-[40vh] flex items-center">
          <Container size="sm">
            <div className="relative z-10 text-center text-white">

              <h1 className="heading heading-accent text-3xl md:text-6xl">
                {title}
              </h1>

              {description && (
                <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
                  {description}
                </p>
              )}

            </div>
          </Container>
        </div>
      </Section>

    </div>
  );
}