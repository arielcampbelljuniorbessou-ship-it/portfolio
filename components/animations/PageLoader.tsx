"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type LoaderPhase = "loading" | "opening" | "closed";

const minimumDisplayTime = 700;
const openingDuration = 0.95;

export function PageLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");
  const shouldReduceMotion = useReducedMotion();
  const startTimeRef = useRef(0);
  const completedDoorsRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const timers: number[] = [];
    let openingStarted = false;

    const beginOpening = () => {
      if (openingStarted) return;
      openingStarted = true;

      const remainingTime = Math.max(
        0,
        minimumDisplayTime - (Date.now() - startTimeRef.current)
      );
      timers.push(
        window.setTimeout(() => {
          if (shouldReduceMotion) {
            setPhase("closed");
            return;
          }

          completedDoorsRef.current = 0;
          setPhase("opening");
        }, remainingTime)
      );
    };

    window.addEventListener("load", beginOpening, { once: true });
    if (document.readyState === "complete") beginOpening();

    return () => {
      window.removeEventListener("load", beginOpening);
      timers.forEach(window.clearTimeout);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (phase !== "closed") document.body.style.overflow = "hidden";
    else document.body.style.overflow = previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  if (phase === "closed") return null;

  const panelTransition = {
    duration: shouldReduceMotion ? 0.01 : openingDuration,
    ease: [0.76, 0, 0.24, 1] as const
  };

  const finishDoorOpening = () => {
    if (phase !== "opening") return;
    completedDoorsRef.current += 1;
    if (completedDoorsRef.current === 2) setPhase("closed");
  };

  return (
    <div
      role="status"
      aria-label="Chargement du site"
      aria-live="polite"
      className="fixed inset-0 z-[200] overflow-hidden bg-white"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: phase === "opening" ? "-105%" : "0%" }}
        transition={panelTransition}
        onAnimationComplete={finishDoorOpening}
        className="absolute inset-y-0 left-0 w-1/2 border-r border-[#e7eee9] bg-white shadow-[14px_0_32px_rgba(22,48,34,0.12)]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: phase === "opening" ? "105%" : "0%" }}
        transition={panelTransition}
        onAnimationComplete={finishDoorOpening}
        className="absolute inset-y-0 right-0 w-1/2 border-l border-[#e7eee9] bg-white shadow-[-14px_0_32px_rgba(22,48,34,0.12)]"
      />

      <motion.div
        aria-hidden="true"
        animate={{ opacity: phase === "opening" ? 0 : 1, scale: phase === "opening" ? 0.9 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
        className="absolute inset-0 z-10 grid place-items-center"
      >
        <Image
          src="/favicon.svg"
          alt=""
          width={96}
          height={96}
          priority
          className="h-20 w-20 sm:h-24 sm:w-24"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{ opacity: phase === "opening" ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
        className="absolute inset-x-0 bottom-16 z-10 flex items-center justify-center gap-2"
      >
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={
              shouldReduceMotion
                ? { opacity: 0.55 }
                : { y: [0, -7, 0], opacity: [0.35, 1, 0.35] }
            }
            transition={{
              duration: 0.72,
              delay: dot * 0.14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-2.5 w-2.5 rounded-full bg-[#173c2a]"
          />
        ))}
      </motion.div>
    </div>
  );
}
