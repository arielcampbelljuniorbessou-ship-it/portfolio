"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import type { TimelineEvent } from "@/data/portfolio";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeTimelineEvent, messages } from "@/data/localization";

type StorySectionProps = {
  events: TimelineEvent[];
};

export function StorySection({ events }: StorySectionProps) {
  const [showText, setShowText] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy = messages[locale].story;

  return (
    <section id="histoire" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="relative grid gap-7 lg:grid-cols-5 lg:gap-4">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-neon/0 via-neon/70 to-neon/0 lg:left-0 lg:top-1/2 lg:h-px lg:w-full lg:translate-x-0 lg:-translate-y-1/2"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: showText ? 1 : 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : events.length * 1.15,
              ease: "linear"
            }}
            className="absolute left-1/2 top-0 z-0 h-full w-1 -translate-x-1/2 origin-top rounded-full bg-[#a5ffc2] shadow-[0_0_8px_#67ff9a,0_0_24px_rgba(103,255,154,0.85)] lg:hidden"
          />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showText ? 1 : 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : events.length * 1.15,
              ease: "linear"
            }}
            className="absolute left-0 top-1/2 z-0 hidden h-1 w-full -translate-y-1/2 origin-left rounded-full bg-[#a5ffc2] shadow-[0_0_8px_#67ff9a,0_0_24px_rgba(103,255,154,0.85)] lg:block"
          />
          {events.map((event, index) => {
            const localizedEvent = localizeTimelineEvent(event, locale);
            const Icon = localizedEvent.icon;
            return (
              <Reveal key={event.year} delay={index * 0.08} className="relative">
                <article className="glass-line group h-full min-h-[300px] rounded-[8px] transition duration-300 hover:-translate-y-1 hover:border-neon/35 hover:shadow-glow [perspective:1000px]">
                  <motion.div
                    animate={{ rotateY: showText ? 0 : -180 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 1.15,
                      delay: shouldReduceMotion
                        ? 0
                        : showText
                          ? index * 1.15
                          : (events.length - index - 1) * 1.15,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative h-full min-h-[300px] [transform-style:preserve-3d]"
                  >
                    <div
                      aria-hidden={!showText}
                      className="absolute inset-0 flex flex-col p-6 lg:pt-8 [backface-visibility:hidden]"
                    >
                      <div className="mb-6 flex items-center gap-4 lg:block">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-neon/35 bg-neon/10 text-neon shadow-glow lg:mb-5">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-display text-3xl font-black text-ink">
                            {localizedEvent.year}
                          </p>
                          <p className="text-sm font-bold text-neon">{localizedEvent.tone}</p>
                        </div>
                      </div>
                      <h3 className="break-words text-lg font-bold leading-7 text-ink [text-wrap:balance]">
                        {localizedEvent.title}
                      </h3>
                    </div>

                    <div
                      aria-hidden={showText}
                      className="absolute inset-0 grid place-items-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    >
                      <Icon aria-hidden="true" className="h-12 w-12 text-neon drop-shadow-[0_0_18px_rgba(103,255,154,0.55)]" />
                    </div>
                  </motion.div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowText((visible) => !visible)}
            aria-label={showText ? copy.restartAria : copy.revealAria}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-neon/35 bg-neon/10 px-5 text-sm font-bold text-neon transition hover:border-neon hover:bg-neon/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon"
          >
            {showText ? (
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Play aria-hidden="true" className="h-4 w-4 fill-current" />
            )}
            {showText ? copy.restart : copy.reveal}
          </button>
        </div>
      </div>
    </section>
  );
}
