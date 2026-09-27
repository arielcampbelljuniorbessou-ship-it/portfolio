"use client";

import { ArrowDownToLine } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";

type ConclusionSectionProps = {
  onGoodbye: () => void;
};

export function ConclusionSection({ onGoodbye }: ConclusionSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy = messages[locale].conclusion;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-shell text-center">
        <Reveal>
          <p className="mx-auto max-w-3xl text-xl leading-9 text-muted sm:text-2xl">
            {copy.text}
          </p>

          <motion.button
            type="button"
            onClick={onGoodbye}
            whileHover={
              shouldReduceMotion ? undefined : { y: -5, rotateX: 7, scale: 1.03 }
            }
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-line bg-white/[0.03] px-8 font-display text-sm font-black text-ink shadow-depth transition hover:border-neon hover:text-neon"
          >
            {copy.goodbye}
            <ArrowDownToLine className="h-5 w-5" />
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
