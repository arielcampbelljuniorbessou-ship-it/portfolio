"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingTechObject } from "@/components/animations/FloatingTechObject";
import { floatingObjects } from "@/data/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLanguage();
  const copy = messages[locale].hero;

  const goToStory = () => {
    document
      .getElementById("histoire")
      ?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[94svh] items-center overflow-hidden pb-16 pt-28"
    >
      <div className="absolute inset-0 noise-mask" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="section-shell relative z-20 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-5 inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 text-sm font-semibold text-mint"
          >
            <Sparkles className="h-4 w-4 text-neon" />
            {copy.tagline}
          </motion.p>
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="story-title max-w-[900px] text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
          >
            {copy.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
            className="mt-7 max-w-2xl text-xl leading-9 text-muted sm:text-2xl"
          >
            {copy.subtitle}
          </motion.p>

          <motion.button
            type="button"
            onClick={goToStory}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -8, rotateX: 10, rotateY: -10, scale: 1.03 }
            }
            whileTap={{ scale: 0.96, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="group mt-10 inline-flex min-h-14 items-center gap-3 rounded-full border border-neon/40 bg-neon px-7 font-display text-sm font-black text-void shadow-[0_18px_0_rgba(20,74,45,0.45),0_26px_48px_rgba(103,255,154,0.22)] transition hover:shadow-[0_12px_0_rgba(20,74,45,0.5),0_30px_58px_rgba(103,255,154,0.32)]"
          >
            {copy.action}
            <ArrowDown className="h-5 w-5 transition group-hover:translate-y-1" />
          </motion.button>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <div className="absolute inset-10 rounded-[32px] border border-line bg-white/[0.025] shadow-depth backdrop-blur-sm" />
          <div className="absolute inset-0 rounded-[40px] border border-neon/10" />
          {floatingObjects.map((item, index) => (
            <FloatingTechObject
              key={item.label}
              label={copy.floating[index] ?? item.label}
              icon={item.icon}
              className={item.className}
              compact={index > 4}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-aqua/20 bg-aqua/5 shadow-depth">
            <div className="grid h-full place-items-center p-6 text-center">
              <p className="font-display text-lg font-black text-ink">
                Cyber
                <span className="block text-neon">builder</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
