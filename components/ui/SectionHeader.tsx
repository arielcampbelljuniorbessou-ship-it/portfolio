"use client";

import { Reveal } from "@/components/animations/Reveal";
import { TypingHeading } from "@/components/ui/TypingHeading";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <p className="mb-3 text-xs font-bold uppercase text-neon">
        {eyebrow}
      </p>
      <TypingHeading
        text={title}
        className="story-title text-4xl leading-tight sm:text-5xl lg:text-6xl"
      />
      {description ? (
        <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
