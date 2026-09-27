"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type FloatingTechObjectProps = {
  label: string;
  icon: LucideIcon;
  className?: string;
  compact?: boolean;
};

export function FloatingTechObject({
  label,
  icon: Icon,
  className = "",
  compact = false
}: FloatingTechObjectProps) {
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 12, y: -14 });

  return (
    <motion.div
      aria-label={label}
      role="img"
      drag={!compact}
      dragConstraints={{ left: -38, right: 38, top: -38, bottom: 38 }}
      dragElastic={0.16}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: -y * 32, y: x * 42 });
      }}
      onPointerLeave={() => setTilt({ x: 12, y: -14 })}
      animate={
        shouldReduceMotion
          ? { rotateX: tilt.x, rotateY: tilt.y }
          : {
              y: [0, compact ? -6 : -16, 0],
              rotateX: tilt.x,
              rotateY: tilt.y,
              rotateZ: [-2, 2, -2]
            }
      }
      whileTap={{ rotateY: 360, scale: 0.96 }}
      transition={{
        y: { duration: compact ? 4 : 5.8, repeat: Infinity, ease: "easeInOut" },
        rotateX: { type: "spring", stiffness: 180, damping: 22 },
        rotateY: { type: "spring", stiffness: 180, damping: 22 },
        rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.2 }
      }}
      className={`absolute z-10 grid select-none place-items-center [perspective:800px] ${className}`}
    >
      <div
        className={`relative grid place-items-center rounded-[18px] border border-neon/20 bg-panel/88 shadow-depth backdrop-blur-md [transform-style:preserve-3d] ${
          compact ? "h-16 w-16" : "h-24 w-24 sm:h-28 sm:w-28"
        }`}
      >
        <span className="absolute inset-x-4 top-3 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent" />
        <Icon
          aria-hidden="true"
          className={`${compact ? "h-7 w-7" : "h-10 w-10"} text-neon drop-shadow-[0_0_18px_rgba(103,255,154,0.46)]`}
        />
        <span className="absolute -bottom-3 rounded-full border border-line bg-void/90 px-2 py-1 text-[10px] font-semibold uppercase text-mint/80 shadow-depth">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
