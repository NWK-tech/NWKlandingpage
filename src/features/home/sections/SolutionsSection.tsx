"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { solutionsContent, solutionsStickyChapters } from "@/content/home";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import StickyContentWrapper from "@/components/ui/sticky-content-wrapper";

export function SolutionsSection() {
  const [selectedId, setSelectedId] = useState<string>(solutionsContent.items[0]?.id ?? "");
  const activeItem =
    solutionsContent.items.find((item) => item.id === selectedId) ?? solutionsContent.items[0]!;

  return (
    <section
      id="solucoes"
      aria-labelledby="solutions-heading"
      className="relative bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)]"
    >
      <h2 id="solutions-heading" className="sr-only">
        {solutionsContent.heading} {solutionsContent.headingMuted}
      </h2>

      {/* 1. Sticky Content & Vertical Image Wipe Showcase */}
      <StickyContentWrapper items={solutionsStickyChapters} />

      {/* 2. Interactive Complete Discipline Index (All 6 NWK Capabilities) */}
      <div className="border-t border-[var(--nwk-border-dark-subtle)] bg-[var(--nwk-bg-dark-elevated)] py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h3 className="font-display max-w-2xl text-2xl font-medium tracking-tight text-[var(--nwk-soft-white)] sm:text-3xl">
              Explore todas as disciplinas de engenharia da NWK.
            </h3>
            <div className="flex flex-wrap gap-2">
              {solutionsContent.items.map((item) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all duration-150 active:scale-[0.97]",
                      isSelected
                        ? "bg-[var(--nwk-neutral-cream)] text-[var(--nwk-carbon-black)]"
                        : "border border-[var(--nwk-border-dark-subtle)] bg-white/[0.03] text-[var(--nwk-silver-gray)] hover:border-[var(--nwk-border-dark-strong)] hover:text-[var(--nwk-pure-white)]",
                    )}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[var(--nwk-border-dark-subtle)] bg-[var(--nwk-carbon-black)] p-6 sm:p-8">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-4">
                  <h4 className="font-display text-xl font-medium text-[var(--nwk-soft-white)]">
                    {activeItem.title}
                  </h4>
                  <p className="mt-2 text-sm text-[var(--nwk-silver-gray)]">
                    {activeItem.whatWeBuild}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-xs font-medium text-[var(--nwk-neutral-cream)]">
                    Qual problema resolvemos
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--nwk-silver-gray)]">
                    {activeItem.problemSolved}
                  </p>
                </div>

                <div className="lg:col-span-3">
                  <p className="text-xs font-medium text-[var(--nwk-neutral-cream)]">
                    Entregas típicas
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {activeItem.deliverables.map((del) => (
                      <li
                        key={del}
                        className="rounded-full border border-[var(--nwk-border-dark-subtle)] bg-white/[0.05] px-3 py-1 text-xs text-[var(--nwk-soft-white)]"
                      >
                        {del}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </section>
  );
}
