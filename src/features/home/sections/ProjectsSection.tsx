"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useMotionValue } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { projectsContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { ensureGsapRegistered, Flip, gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import type { ProjectItem } from "@/types/content";
import { PROJECT_PALETTE, DEFAULT_PALETTE } from "@/features/home/projectPalette";
import { ProjectComposition } from "@/features/home/components/projects/ProjectComposition";
import { ProjectsExpandIntro } from "@/features/home/components/projects/ProjectsExpandIntro";
import { ParallaxScope, StageProgressContext } from "@/features/home/components/projects/parallax";

const PIN_MEDIA = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const STEP_SCROLL_VH = 95;
const STAGE_ID = "projects-stage";

/**
 * Projetos: transição "scroll expand" a partir de Soluções, depois um palco que
 * revela cada projeto por máscara vertical (desktop) ou uma pilha de cenas com
 * parallax por scroll (mobile / reduced-motion). Cada projeto tem composição,
 * motivo gráfico e cor próprios; "Ver detalhes" usa GSAP Flip para reorganizar
 * a cena sem saltos.
 */
export function ProjectsSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const progress = useMotionValue(0);
  const items = projectsContent.items;
  const lastIndex = items.length - 1;
  const activeRef = useRef(0);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const stage = stageRef.current;
      if (!stage) return;

      const mm = gsap.matchMedia();
      mm.add(PIN_MEDIA, () => {
        setPinned(true);
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", stage);
        const inner = (el: Element) => el.querySelector("[data-inner]");

        // Revelação por máscara vertical feita só com transform (painel sobe, conteúdo
        // contra-anima): visualmente igual ao clip-path, mas sem disparar layout-shift
        // nem repintura de gradiente a cada frame.
        const counter = (el: Element) => el.querySelector("[data-counter]");
        panels.slice(1).forEach((panel) => {
          gsap.set(panel, { yPercent: 100 });
          gsap.set(counter(panel), { yPercent: -100 });
          gsap.set(inner(panel), { yPercent: 8, scale: 1.04 });
          gsap.set(panel.querySelectorAll("[data-reveal]"), { yPercent: 108 });
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: STAGE_ID,
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progress.set(self.progress); // GSAP só escreve; o Motion lê (parallax)
              const next = Math.min(lastIndex, Math.floor(self.progress * lastIndex + 0.65));
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActive(next);
                setOpenId(null);
              }
            },
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          const at = i - 1;
          const prev = panels[i - 1]!;
          tl.to(inner(prev), { scale: 0.94, opacity: 0.35, duration: 0.7, ease: "power1.in" }, at)
            .to(panel, { yPercent: 0, duration: 0.7, ease: "power2.inOut" }, at)
            .to(counter(panel), { yPercent: 0, duration: 0.7, ease: "power2.inOut" }, at)
            .to(inner(panel), { yPercent: 0, scale: 1, duration: 0.7, ease: "power2.out" }, at)
            .to(
              panel.querySelectorAll("[data-reveal]"),
              { yPercent: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
              at + 0.25,
            );
        });
        tl.to({}, { duration: 0.3 }, lastIndex - 1 + 0.7);

        return () => {
          setPinned(false);
          setActive(0);
          activeRef.current = 0;
        };
      });

      return () => mm.revert();
    },
    { scope: stageRef, dependencies: [lastIndex] },
  );

  function goTo(index: number) {
    const st = ScrollTrigger.getById(STAGE_ID);
    if (st) {
      window.scrollTo({
        top: st.start + (index / lastIndex) * (st.end - st.start),
        behavior: "smooth",
      });
      return;
    }
    stageRef.current
      ?.querySelectorAll("[data-panel]")
      [index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const stageValue = useMemo(
    () => ({ progress, pinned, lastIndex }),
    [progress, pinned, lastIndex],
  );

  return (
    <section id="projetos" aria-labelledby="projects-heading" className="relative z-20">
      <ProjectsExpandIntro />

      <StageProgressContext.Provider value={stageValue}>
        <div
          ref={stageRef}
          className="relative bg-[#111214] lg:motion-safe:h-[calc(100svh+var(--run))]"
          style={{ ["--run" as string]: `${lastIndex * STEP_SCROLL_VH}svh` }}
        >
          <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-svh lg:motion-safe:overflow-hidden">
            {items.map((project, index) => (
              <ProjectPanel
                key={project.id}
                project={project}
                index={index}
                hidden={pinned && index !== active}
                detail={openId === project.id}
                onToggle={(next) => setOpenId(next ? project.id : null)}
              />
            ))}

            <nav
              aria-label="Navegar entre projetos"
              className="pointer-events-none absolute inset-x-0 bottom-6 z-30 hidden justify-center lg:motion-safe:flex"
            >
              <ul className="pointer-events-auto flex gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
                {items.map((project, index) => {
                  const palette = PROJECT_PALETTE[project.id] ?? DEFAULT_PALETTE;
                  const isActive = index === active;
                  return (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 active:scale-[0.97]",
                          isActive ? "bg-white/12 text-white" : "text-[#A0A4AC] hover:text-white",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: palette.accent, opacity: isActive ? 1 : 0.45 }}
                        />
                        {project.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </StageProgressContext.Provider>
    </section>
  );
}

/* ─────────────────────────────── painel ─────────────────────────────── */

function ProjectPanel({
  project,
  index,
  hidden,
  detail,
  onToggle,
}: {
  project: ProjectItem;
  index: number;
  hidden: boolean;
  detail: boolean;
  onToggle: (next: boolean) => void;
}) {
  const palette = PROJECT_PALETTE[project.id] ?? DEFAULT_PALETTE;
  const rootRef = useRef<HTMLElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const flipTween = useRef<gsap.core.Animation | null>(null);

  function toggle(next: boolean) {
    const root = rootRef.current;
    if (root && !prefersReducedMotion()) {
      ensureGsapRegistered();
      flipState.current = Flip.getState(root.querySelectorAll("[data-flip]"));
    }
    onToggle(next);
  }

  // FLIP: o estado anterior foi capturado antes da mudança de layout.
  useLayoutEffect(() => {
    const state = flipState.current;
    const root = rootRef.current;
    if (!state || !root) return;
    flipState.current = null;
    flipTween.current?.kill();
    flipTween.current = Flip.from(state, {
      duration: 0.85,
      ease: "power3.inOut",
      scale: true,
      // No palco pinado a altura não muda; refresh reparenta o pin e derrubaria o foco.
      onComplete: () => {
        if (!root.closest(".pin-spacer")) ScrollTrigger.refresh();
      },
    });
    if (detail) {
      gsap.fromTo(
        root.querySelectorAll("[data-extra]"),
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.3, ease: "power3.out" },
      );
    }
  }, [detail]);

  useEffect(
    () => () => {
      flipTween.current?.kill();
    },
    [],
  );

  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const wasDetail = useRef(false);
  useEffect(() => {
    if (detail) closeRef.current?.focus({ preventScroll: true });
    else if (wasDetail.current) openRef.current?.focus({ preventScroll: true });
    wasDetail.current = detail;
  }, [detail]);

  return (
    <article
      ref={rootRef}
      data-panel
      aria-labelledby={`project-${project.id}`}
      inert={hidden}
      className="relative isolate overflow-hidden text-[#FAFAF8] [contain:paint] lg:motion-safe:absolute lg:motion-safe:inset-0"
      style={{ zIndex: index + 1 }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && detail) toggle(false);
      }}
    >
      <div
        data-counter
        className="lg:motion-safe:absolute lg:motion-safe:inset-0"
        style={{
          background: `radial-gradient(70% 60% at 78% 38%, ${palette.glow}, transparent 70%), ${palette.base}`,
        }}
      >
        <div
          data-inner
          className="mx-auto grid w-full max-w-[90rem] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:motion-safe:h-full lg:motion-safe:py-0 lg:motion-safe:pt-24 lg:motion-safe:pb-24"
        >
          <div
            data-flip="info"
            className={cn("lg:order-1", detail ? "lg:col-span-6" : "lg:col-span-5")}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span
                className="rounded-full border px-3.5 py-1 font-medium"
                style={{ borderColor: `${palette.accent}55`, color: palette.accent }}
              >
                {project.origin}
              </span>
              <span className="text-[#D9DBDE]">{project.category}</span>
            </div>

            <h3
              id={`project-${project.id}`}
              data-flip="title"
              className={cn(
                "font-display mt-6 w-fit overflow-hidden pb-2 leading-[0.95] font-medium tracking-[-0.04em]",
                detail
                  ? "text-[clamp(2.25rem,4.4vw,4.5rem)]"
                  : "text-[clamp(2.75rem,6.2vw,6.5rem)]",
              )}
            >
              <span data-reveal className="block">
                {project.name}
              </span>
            </h3>

            <p className="mt-5 overflow-hidden text-lg font-medium text-[#F2F0EB] sm:text-xl">
              <span data-reveal className="block">
                {project.headline}
              </span>
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#D9DBDE] sm:text-base">
              {project.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Frentes envolvidas">
              {project.scope.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs text-[#F2F0EB]"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {detail ? (
              <div className="mt-7 grid gap-5 border-t border-white/12 pt-6 sm:grid-cols-2">
                <div data-extra>
                  <h4 className="text-xs font-medium text-[#A0A4AC]">Módulos conceituais</h4>
                  <ul className="mt-2.5 space-y-1.5 text-sm text-[#F2F0EB]">
                    {project.conceptModules.map((m) => (
                      <li key={m} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: palette.accent }}
                        />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-extra>
                  <h4 className="text-xs font-medium text-[#A0A4AC]">Estado e mídia</h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#D9DBDE]">
                    {project.origin}. Capturas e vídeos reais serão exibidos aqui quando as
                    interfaces forem publicadas; até lá, a cena é uma representação conceitual.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-7">
              {detail ? (
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => toggle(false)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 active:scale-[0.97]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Fechar detalhes
                </button>
              ) : (
                <button
                  ref={openRef}
                  type="button"
                  aria-expanded={false}
                  onClick={() => toggle(true)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 active:scale-[0.97]"
                  style={{ borderColor: `${palette.accent}66`, color: palette.accent }}
                >
                  Ver detalhes
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div
            data-flip="mock"
            className={cn("lg:order-2", detail ? "lg:col-span-6" : "lg:col-span-7")}
          >
            <ParallaxScope index={index}>
              <ProjectComposition project={project} />
            </ParallaxScope>
          </div>
        </div>
      </div>
    </article>
  );
}
