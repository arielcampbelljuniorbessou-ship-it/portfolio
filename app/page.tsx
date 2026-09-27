"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ConclusionSection } from "@/components/sections/ConclusionSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RatingSection } from "@/components/sections/RatingSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StorySection } from "@/components/sections/StorySection";
import { SiteNav } from "@/components/navigation/SiteNav";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { messages } from "@/data/localization";
import { projects, skills, timeline } from "@/data/portfolio";

const confettiPieces = Array.from({ length: 220 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  drift: ((index * 53) % 181) - 90,
  rotation: index % 2 === 0 ? 540 : -540,
  delay: (index % 13) * 0.045,
  duration: 6.8 + (index % 5) * 0.18,
  color: ["#67ff9a", "#63e6ff", "#d9c27c", "#f3fff7"][index % 4]
}));

export default function Home() {
  const { locale } = useLanguage();
  const copy = messages[locale];
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [phoneResetKey, setPhoneResetKey] = useState(0);
  const restartTimer = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (restartTimer.current !== null) {
        window.clearTimeout(restartTimer.current);
      }
    },
    []
  );

  const celebrateAndRestart = () => {
    if (restartTimer.current !== null) {
      window.clearTimeout(restartTimer.current);
    }

    setCelebrationKey((current) => current + 1);
    setCelebrationVisible(true);
    restartTimer.current = window.setTimeout(() => {
      setCelebrationVisible(false);
      setPhoneResetKey((current) => current + 1);
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth"
      });
      restartTimer.current = null;
    }, 8000);
  };

  return (
    <>
      <CustomCursor />
      <SiteNav />
      <main>
        <HeroSection />
        <StorySection events={timeline} />
        <ProjectsSection key={phoneResetKey} projects={projects} />
        <RatingSection projects={projects} />
        <SkillsSection categories={skills} />
        <MissionSection />
        <ConclusionSection onGoodbye={celebrateAndRestart} />
      </main>
      <Footer />
      <AnimatePresence>
        {celebrationVisible ? (
          <motion.div
            key={celebrationKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          >
            <div aria-hidden="true">
              {confettiPieces.map((piece, index) => (
                <motion.span
                  key={`${celebrationKey}-${index}`}
                  initial={{ opacity: 0, y: -24, x: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: shouldReduceMotion ? 48 : "130vh",
                    x: piece.drift,
                    rotate: shouldReduceMotion ? 90 : piece.rotation
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.8 : piece.duration,
                    delay: shouldReduceMotion ? 0 : piece.delay,
                    ease: "easeIn"
                  }}
                  style={{
                    position: "absolute",
                    left: piece.left,
                    top: -24 - ((index * 47) % 900),
                    width: index % 3 === 0 ? 6 : 9,
                    height: index % 3 === 0 ? 6 : 12,
                    borderRadius: index % 2 === 0 ? "50%" : "2px",
                    backgroundColor: piece.color
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 grid place-items-center px-4">
              <motion.p
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.96, 1, 1, 0.98]
                }}
                transition={{ duration: 8, times: [0, 0.06, 0.88, 1] }}
                className="w-[92vw] max-w-[900px] text-center font-display text-4xl font-black leading-tight text-ink drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] sm:text-6xl lg:text-7xl"
              >
                {copy.conclusion.thanks}
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
