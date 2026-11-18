"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { methodologyContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";
import { motionTokens } from "@/tokens/foundations";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/motion/Reveal";

export function MethodologySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion() || !containerRef.current || !progressBarRef.current) return;

      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0.16 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  const activeStep = methodologyContent.steps[activeIndex] ?? methodologyContent.steps[0]!;

  return (
    <Section id="metodologia" surface="primary" spacing="lg" ariaLabelledBy="methodology-heading">
      <Container>
        <div ref={containerRef}>
          <Reveal className="max-w-3xl">
            <Heading
              id="methodology-heading"
              as="h2"
              size="h2"
              mutedText={methodologyContent.headingMuted}
            >
              {methodologyContent.heading}
            </Heading>
          </Reveal>

          {/* Single clean scroll-linked continuous architecture track */}
          <div className="mt-12 h-[2px] w-full overflow-hidden rounded-full bg-[var(--nwk-border-strong)]/40">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-[var(--nwk-carbon-black)]"
            />
          </div>

          {/* Connected horizontal flow */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {methodologyContent.steps.map((step, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative flex cursor-pointer flex-col items-start rounded-xl px-3.5 py-4 text-left transition-colors duration-200",
                    isSelected
                      ? "bg-[var(--nwk-neutral-cream)] text-[var(--nwk-text-primary)]"
                      : "bg-transparent text-[var(--nwk-text-secondary)] hover:bg-[var(--nwk-bg-elevated)] hover:text-[var(--nwk-text-primary)]",
                  )}
                >
                  <div className="mb-2.5 flex w-full items-center justify-between">
                    <span
                      className={cn(
                        "font-display text-[11px] font-medium tracking-[0.12em]",
                        isSelected
                          ? "text-[var(--nwk-carbon-black)]"
                          : "text-[var(--nwk-text-secondary)]",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={cn(
                        "inline-block h-2 w-2 rounded-full transition-colors duration-200",
                        isSelected
                          ? "bg-[var(--nwk-carbon-black)]"
                          : "bg-[var(--nwk-border-strong)] group-hover:bg-[var(--nwk-steel-gray)]",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="font-display text-sm font-medium leading-snug sm:text-base">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active stage specification */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-[var(--nwk-border-subtle)] bg-[var(--nwk-bg-elevated)] p-7 shadow-[var(--nwk-shadow-md)] sm:p-10">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: motionTokens.durations.fast,
                  ease: motionTokens.easings.precision,
                }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-4">
                  <span className="font-display text-xs font-medium tracking-[0.12em] uppercase text-[var(--nwk-text-secondary)]">
                    Etapa 0{activeIndex + 1}
                  </span>
                  <h3 className="text-h3 mt-1 font-medium text-[var(--nwk-text-primary)]">
                    {activeStep.title}
                  </h3>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm leading-relaxed text-[var(--nwk-text-secondary)] sm:text-base">
                    {activeStep.summary}
                  </p>
                </div>

                <div className="border-t border-[var(--nwk-border-subtle)] pt-4 lg:col-span-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                  <p className="text-xs font-medium text-[var(--nwk-text-secondary)]">
                    Resultado da fase
                  </p>
                  <p className="font-display mt-1 text-sm font-medium text-[var(--nwk-text-primary)]">
                    {activeStep.outcome}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
