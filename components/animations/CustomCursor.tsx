"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
};

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    visible: false
  });
  const [canUseCursor, setCanUseCursor] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCanUseCursor(window.matchMedia("(pointer: fine)").matches);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!canUseCursor || shouldReduceMotion) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      setState({ x: event.clientX, y: event.clientY, visible: true });
    };

    const onLeave = () => {
      setState((current) => ({ ...current, visible: false }));
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [canUseCursor, shouldReduceMotion]);

  if (!canUseCursor || shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        x: state.x - 11,
        y: state.y - 11,
        opacity: state.visible ? 1 : 0
      }}
      transition={{ type: "spring", stiffness: 560, damping: 38, mass: 0.3 }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-[22px] w-[22px] rounded-full border border-neon/70 bg-neon/10 mix-blend-screen shadow-glow lg:block"
    />
  );
}
