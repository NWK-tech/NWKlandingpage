"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projectsContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { DeviceMockup } from "@/features/home/components/DeviceMockup";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = projectsContent.items;
  const activeProject = items[activeIndex] ?? items[0]!;

  function handleTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveIndex((index + 1) % items.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveIndex((index - 1 + items.length) % items.length);
    }
  }

  return (
    <section
      id="projetos"
      aria-labelledby="projects-heading"
      className="relative z-20 bg-[#F2F0EB] py-24 text-[#131315] sm:py-32"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-[#131315]/15 pb-10 lg:flex-row lg:items-end">
          <h2
            id="projects-heading"
            className="font-display max-w-2xl text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-[#131315]"
          >
            {projectsContent.heading}{" "}
            <span className="text-[#4A4E55]">{projectsContent.headingMuted}</span>
          </h2>
          <p className="max-w-md text-xs leading-relaxed text-[#4A4E55] sm:text-sm">
            {projectsContent.disclaimer}
          </p>
        </div>

        {/* Proposta A Large Typographic Selector Cards */}
        <div
          role="tablist"
          aria-label="Projetos da NWK"
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {items.map((project, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                id={`tab-${project.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${project.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={cn(
                  "cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200 active:scale-[0.98]",
                  isSelected
                    ? "border-[#131315] bg-[#131315] text-[#FAFAF8] shadow-[0_20px_50px_rgba(19,19,21,0.22)]"
                    : "border-[#131315]/15 bg-[#FAFAF8] text-[#131315] hover:border-[#131315]",
                )}
              >
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className={isSelected ? "text-[#F2F0EB]" : "text-[#4A4E55]"}>
                    {project.origin}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </div>
                <p className="font-display mt-2.5 text-lg font-medium">{project.name}</p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    isSelected ? "text-[#D9DBDE]" : "text-[#4A4E55]",
                  )}
                >
                  {project.category}
                </p>
              </button>
            );
          })}
        </div>

        {/* Full-Scale Dark Showcase Stage */}
        <div
          role="tabpanel"
          id={`panel-${activeProject.id}`}
          aria-labelledby={`tab-${activeProject.id}`}
          className="mt-8 overflow-hidden rounded-3xl bg-[#131315] p-6 text-[#FAFAF8] shadow-[0_32px_90px_rgba(19,19,21,0.3)] sm:p-10"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-7">
                <DeviceMockup project={activeProject} />
              </div>

              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-[#F2F0EB]">
                    {activeProject.origin}
                  </span>
                  <span className="text-xs text-[#D9DBDE]">{activeProject.category}</span>
                </div>

                <h3 className="text-h2 mt-5 font-medium text-[#FAFAF8]">{activeProject.name}</h3>

                <p className="mt-3 text-base font-medium text-[#F2F0EB]">
                  {activeProject.headline}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#D9DBDE] sm:text-base">
                  {activeProject.description}
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-xs font-medium text-[#D9DBDE]">Frentes envolvidas</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {activeProject.scope.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-[#232429] px-3.5 py-1.5 text-xs text-[#F2F0EB]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
