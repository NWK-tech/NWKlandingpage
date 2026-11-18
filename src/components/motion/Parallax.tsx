"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";

export interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 28, className }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion() || !containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        { y: -speed },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [speed] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
