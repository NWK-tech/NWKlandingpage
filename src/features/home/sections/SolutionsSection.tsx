"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { solutionsContent, solutionsStickyChapters } from "@/content/home";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import StickyContentWrapper from "@/components/ui/sticky-content-wrapper";

/**
 * Soluções: (1) narrativa sticky com wipe vertical por serviço; (2) índice
 * tipográfico das seis disciplinas, uma aberta por vez, que responde
 * "o que construímos / que problema resolve / o que entregamos".
 */
export function SolutionsSection() {
  const [openId, setOpenId] = useState<string>(solutionsContent.items[0]?.id ?? "");

  return (
    <section
      id="solucoes"
      aria-labelledby="solutions-heading"
      className="relative bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)]"
    >
      <h2 id="solutions-heading" className="sr-only">
        {solutionsContent.heading} {solutionsContent.headingMuted}
      </h2>

      <StickyContentWrapper items={solutionsStickyChapters} />

      <div className="border-t border-[var(--nwk-border-dark-subtle)] py-20 sm:py-28">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-display text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.02em]">
                Seis disciplinas,{" "}
                <span className="text-[var(--nwk-text-inverse-muted)]">
                  uma mesma exigência de precisão.
                </span>
              </p>
              <a
                href="#contato"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--nwk-neutral-cream)]"
              >
                <span className="border-b border-current pb-0.5">Descreva sua necessidade</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <ul className="lg:col-span-8">
              {solutionsContent.items.map((item) => {
                const isOpen = item.id === openId;
                return (
                  <li key={item.id} className="border-t border-[var(--nwk-border-dark-subtle)] last:border-b">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`disc-${item.id}`}
                        onClick={() => setOpenId(isOpen ? "" : item.id)}
                        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left sm:py-6"
                      >
                        <span
                          className={cn(
                            "font-display text-[clamp(1.5rem,3.2vw,3rem)] leading-[1.05] font-medium tracking-[-0.03em] transition-colors duration-300",
                            isOpen
                              ? "text-[var(--nwk-neutral-cream)]"
                              : "text-[var(--nwk-text-inverse-muted)] group-hover:text-[var(--nwk-soft-white)]",
                          )}
                        >
                          {item.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "relative h-7 w-7 shrink-0 rounded-full border border-[var(--nwk-border-dark-strong)] transition-transform duration-300 before:absolute before:top-1/2 before:left-1/2 before:h-px before:w-3 before:-translate-x-1/2 before:bg-current after:absolute after:top-1/2 after:left-1/2 after:h-3 after:w-px after:-translate-x-1/2 after:-translate-y-1/2 after:bg-current after:transition-opacity",
                            isOpen && "rotate-90 after:opacity-0",
                          )}
                        />
                      </button>
                    </h3>
                    <div
                      id={`disc-${item.id}`}
                      aria-label={item.title}
                      role="region"
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                      inert={!isOpen}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <dl className="grid gap-6 pb-8 sm:grid-cols-3 sm:gap-8">
                          <div>
                            <dt className="text-xs font-medium text-[var(--nwk-text-inverse-muted)]">
                              O que construímos
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-[var(--nwk-silver-gray)]">
                              {item.whatWeBuild}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-[var(--nwk-text-inverse-muted)]">
                              Que problema resolve
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-[var(--nwk-silver-gray)]">
                              {item.problemSolved}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-medium text-[var(--nwk-text-inverse-muted)]">
                              Entregas típicas
                            </dt>
                            <dd className="mt-2">
                              <ul className="space-y-1.5 text-sm text-[var(--nwk-soft-white)]">
                                {item.deliverables.map((d) => (
                                  <li key={d}>{d}</li>
                                ))}
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
