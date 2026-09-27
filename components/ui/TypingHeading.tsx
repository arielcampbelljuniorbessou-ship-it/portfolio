"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type TypingHeadingProps = {
  text: string;
  className?: string;
};

export function TypingHeading({ text, className }: TypingHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: false, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <h2 ref={headingRef} aria-label={text} className={className}>
      <span aria-hidden="true" className="whitespace-pre-wrap">
        {shouldReduceMotion
          ? text
          : Array.from(text).map((character, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.01, delay: index * 0.025 }}
              >
                {character}
              </motion.span>
            ))}
      </span>
    </h2>
  );
}