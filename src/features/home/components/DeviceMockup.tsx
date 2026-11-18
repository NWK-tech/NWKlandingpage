"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ProjectItem } from "@/types/content";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/gsap";
import { motionTokens } from "@/tokens/foundations";

interface ProjectTheme {
  glow: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  stageGradient: string;
}

const PROJECT_THEMES: Record<string, ProjectTheme> = {
  "fju-artes-marciais": {
    glow: "bg-emerald-500/20",
    accentBg: "bg-emerald-400/15",
    accentText: "text-emerald-300",
    accentBorder: "border-emerald-400/30",
    stageGradient: "from-[#14201C] via-[#14171A] to-[#111214]",
  },
  "doce-certo": {
    glow: "bg-amber-400/20",
    accentBg: "bg-amber-300/15",
    accentText: "text-amber-200",
    accentBorder: "border-amber-300/30",
    stageGradient: "from-[#211B14] via-[#181615] to-[#111214]",
  },
  "nwk-boss-ai": {
    glow: "bg-sky-400/20",
    accentBg: "bg-sky-400/15",
    accentText: "text-sky-300",
    accentBorder: "border-sky-400/30",
    stageGradient: "from-[#131D27] via-[#15181E] to-[#111214]",
  },
  zuri: {
    glow: "bg-indigo-400/22",
    accentBg: "bg-indigo-400/15",
    accentText: "text-indigo-300",
    accentBorder: "border-indigo-400/30",
    stageGradient: "from-[#181726] via-[#16161C] to-[#111214]",
  },
  "nwk-studio": {
    glow: "bg-[#F2F0EB]/18",
    accentBg: "bg-[#F2F0EB]/15",
    accentText: "text-[#F2F0EB]",
    accentBorder: "border-[#F2F0EB]/30",
    stageGradient: "from-[#1E1F24] via-[#17181B] to-[#111214]",
  },
};

const DEFAULT_THEME: ProjectTheme = PROJECT_THEMES["nwk-studio"]!;

export function DeviceMockup({ project }: { project: ProjectItem }) {
  const theme = PROJECT_THEMES[project.id] ?? DEFAULT_THEME;
  const [selection, setSelection] = useState({ projectId: project.id, index: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const activeModuleIndex = selection.projectId === project.id ? selection.index : 0;
  const handleSelectModule = (index: number) => {
    setSelection({ projectId: project.id, index });
  };

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion()) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 5, ry: nx * 6 });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br p-5 sm:min-h-[460px] sm:p-10",
        theme.stageGradient,
      )}
    >
      {/* Project-specific ambient radial spotlight */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-24 left-1/2 h-72 w-3/4 -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500",
          theme.glow,
        )}
      />

      {/* Subtle architectural perspective floor reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent"
      />

      <div
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="relative z-10 w-full"
      >
        {project.deviceType === "mobile" ? (
          <div className="flex w-full justify-center">
            <PhoneFrame
              project={project}
              theme={theme}
              activeModuleIndex={activeModuleIndex}
              onSelectModule={handleSelectModule}
            />
          </div>
        ) : project.deviceType === "hybrid" ? (
          <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-center sm:gap-0">
            <div className="relative z-10 w-full sm:w-[74%]">
              <DesktopFrame
                project={project}
                theme={theme}
                activeModuleIndex={activeModuleIndex}
                onSelectModule={handleSelectModule}
                hasOverlap
              />
            </div>
            <div className="relative z-20 w-[220px] sm:-ml-12 sm:mb-1 sm:w-[34%]">
              <PhoneFrame
                project={project}
                theme={theme}
                activeModuleIndex={activeModuleIndex}
                onSelectModule={handleSelectModule}
                compact
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[600px]">
            <DesktopFrame
              project={project}
              theme={theme}
              activeModuleIndex={activeModuleIndex}
              onSelectModule={handleSelectModule}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function DesktopFrame({
  project,
  theme,
  activeModuleIndex,
  onSelectModule,
  hasOverlap = false,
}: {
  project: ProjectItem;
  theme: ProjectTheme;
  activeModuleIndex: number;
  onSelectModule: (idx: number) => void;
  hasOverlap?: boolean;
}) {
  const activeMod = project.conceptModules[activeModuleIndex] ?? project.conceptModules[0] ?? "";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#101114]/95 shadow-[var(--nwk-shadow-dark)] backdrop-blur-md">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#17181D] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="font-display ml-1 text-xs font-medium tracking-tight text-[#FAFAF8]">
            {project.name}
          </span>
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
            theme.accentBg,
            theme.accentBorder,
            theme.accentText,
          )}
        >
          {project.origin}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-4 p-5 sm:p-6">
        {/* Interactive conceptual sidebar */}
        <div className="col-span-12 space-y-1.5 sm:col-span-4 sm:border-r sm:border-white/10 sm:pr-4">
          <p className="mb-2 text-[10px] font-medium tracking-[0.12em] uppercase text-[#A0A4AC]">
            Módulos conceituais
          </p>
          <div className="flex flex-wrap gap-1.5 sm:flex-col">
            {project.conceptModules.map((mod, idx) => {
              const isActive = idx === activeModuleIndex;
              return (
                <button
                  key={mod}
                  type="button"
                  onClick={() => onSelectModule(idx)}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2 text-left text-xs transition-colors",
                    isActive
                      ? cn("font-medium text-[#FAFAF8] border", theme.accentBg, theme.accentBorder)
                      : "border border-transparent text-[#A0A4AC] hover:bg-white/[0.05] hover:text-[#FAFAF8]",
                  )}
                >
                  {mod}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conceptual workspace surface */}
        <div
          className={cn(
            "col-span-12 space-y-4 sm:col-span-8",
            hasOverlap ? "sm:pr-10" : "",
          )}
        >
          <div>
            <p className={cn("text-[11px] font-medium", theme.accentText)}>{project.category}</p>
            <p className="font-display mt-1 text-sm font-medium text-[#FAFAF8] sm:text-base">
              {project.headline}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.id}-${activeMod}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: motionTokens.durations.fast,
                ease: motionTokens.easings.precision,
              }}
              className="rounded-xl border border-white/10 bg-[#191B20] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.1em] uppercase text-[#A0A4AC]">
                  Módulo em foco
                </span>
                <span className={cn("h-1.5 w-1.5 rounded-full", theme.accentBg)} />
              </div>
              <p className="font-display mt-1.5 text-sm font-medium text-[#FAFAF8]">{activeMod}</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-2 rounded-full bg-white/15" />
                <div className="h-2 rounded-full bg-white/10" />
                <div className="h-2 rounded-full bg-white/10" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 text-[11px] text-[#A0A4AC]">
            {project.conceptLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({
  project,
  theme,
  activeModuleIndex,
  onSelectModule,
  compact = false,
}: {
  project: ProjectItem;
  theme: ProjectTheme;
  activeModuleIndex: number;
  onSelectModule: (idx: number) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.85rem] border border-white/20 bg-[#101114] shadow-[var(--nwk-shadow-dark)]",
        compact ? "w-full p-2.5" : "w-full max-w-[265px] p-3.5",
      )}
    >
      <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
      <div className="space-y-2.5 rounded-2xl bg-[#18191E] p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display truncate text-xs font-medium text-[#FAFAF8]">
            {project.name}
          </p>
          {!compact ? (
            <span
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium",
                theme.accentBg,
                theme.accentBorder,
                theme.accentText,
              )}
            >
              {project.origin}
            </span>
          ) : null}
        </div>

        <div className="space-y-1.5">
          {project.conceptModules.slice(0, compact ? 2 : 3).map((mod, idx) => {
            const isActive = idx === activeModuleIndex;
            return (
              <button
                key={mod}
                type="button"
                onClick={() => onSelectModule(idx)}
                className={cn(
                  "block w-full cursor-pointer truncate rounded-lg px-2.5 py-2 text-left text-[11px] transition-colors",
                  isActive
                    ? cn("font-medium text-[#FAFAF8] border", theme.accentBg, theme.accentBorder)
                    : "border border-transparent bg-white/[0.04] text-[#D9DBDE] hover:bg-white/[0.08]",
                )}
              >
                {mod}
              </button>
            );
          })}
        </div>

        {!compact ? (
          <p className="pt-1 text-[10px] leading-snug text-[#A0A4AC]">{project.conceptLabel}</p>
        ) : null}
      </div>
    </div>
  );
}
