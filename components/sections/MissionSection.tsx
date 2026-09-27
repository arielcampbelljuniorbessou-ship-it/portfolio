"use client";

import { ShieldCheck, Target } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingTechObject } from "@/components/animations/FloatingTechObject";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";

export function MissionSection() {
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy = messages[locale].mission;

  return (
    <section
      id="mission"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(103,255,154,0.06),transparent)]" />
      <div className="section-shell relative z-10">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          align="center"
        />

        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[8px] border border-neon/20 bg-panel/80 px-6 py-12 text-center shadow-depth sm:px-12 sm:py-16">
            <motion.span
              aria-hidden="true"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.35, 0.9, 0.35], scaleX: [0.75, 1, 0.75] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon to-transparent"
            />
            <Target className="mx-auto mb-8 h-12 w-12 text-neon drop-shadow-[0_0_20px_rgba(103,255,154,0.45)]" />
            <blockquote className="story-title mx-auto max-w-4xl text-3xl leading-tight sm:text-5xl">
              “{copy.quote}”
            </blockquote>
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingTechObject
          label={copy.ethics}
          icon={ShieldCheck}
          className="right-[8%] top-[18%]"
          compact
        />
      </div>
    </section>
  );
}
