"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";

export function HeroSculpture() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const frontLayerRef = useRef<HTMLDivElement>(null);
  const backRingRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion() || !wrapperRef.current) return;

      if (sculptureRef.current) {
        gsap.fromTo(
          sculptureRef.current,
          { scale: 0.96, y: 14 },
          {
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
        );

        gsap.to(sculptureRef.current, {
          y: -48,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (frontLayerRef.current) {
        gsap.to(frontLayerRef.current, {
          y: -84,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (backRingRef.current) {
        gsap.to(backRingRef.current, {
          y: -22,
          rotate: 12,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 75%",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: wrapperRef },
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion()) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 7, ry: nx * 9 });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      className="relative mx-auto w-full select-none"
    >
      {/* Back depth layer: subtle architectural halo & orbital hairline */}
      <div
        ref={backRingRef}
        className="pointer-events-none absolute -inset-4 flex items-center justify-center"
      >
        <div className="h-[88%] w-[88%] rounded-full border border-white/[0.08] bg-[radial-gradient(circle_at_50%_50%,rgba(242,240,235,0.1),transparent_68%)]" />
      </div>

      {/* Mid depth layer: sculptural 3D render with 3D pointer tilt */}
      <div
        ref={sculptureRef}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#131315] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.85)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src="/images/hero-sculpture.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          {/* Vignette mask to blend sculpture edges into obsidian */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131315]/75 via-transparent to-[#131315]/25" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#131315]/40 via-transparent to-[#131315]/30" />
        </div>
      </div>

      {/* Front depth layer: floating translucent architectural markers (faster parallax) */}
      <div
        ref={frontLayerRef}
        className="pointer-events-none absolute inset-x-4 -bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 sm:inset-x-6"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#1A1B1F]/80 px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[var(--nwk-neutral-cream)]" />
          <span className="text-xs font-medium tracking-wide text-[var(--nwk-soft-white)]">
            Sistemas · IA · Apps
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-[#1A1B1F]/80 px-4 py-2 backdrop-blur-md sm:inline-flex">
          <span className="font-display text-xs font-medium text-[var(--nwk-neutral-cream)]">
            NWK Core Architecture
          </span>
        </div>
      </div>
    </div>
  );
}
