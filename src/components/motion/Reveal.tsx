"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { motionTokens } from "@/tokens/foundations";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: motionTokens.durations.normal,
        delay,
        ease: motionTokens.easings.precision,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
