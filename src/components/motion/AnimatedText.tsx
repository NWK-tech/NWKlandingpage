"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { motionTokens } from "@/tokens/foundations";

export interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  className?: string;
}

export function AnimatedText({
  text,
  as: Tag = "p",
  delay = 0,
  className,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <Tag aria-label={text} className={cn("inline-block", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: motionTokens.durations.normal,
              delay: delay + index * motionTokens.stagger.tight,
              ease: motionTokens.easings.precision,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
