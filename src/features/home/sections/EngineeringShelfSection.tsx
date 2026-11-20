"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { engineeringShelfContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";
import type { EngineeringBlueprintItem } from "@/types/content";
import { RollActionLink } from "@/components/ui/RollActionLink";
import { BlueprintCoverArt } from "@/features/home/components/BlueprintCoverArt";

type CategoryFilter = (typeof engineeringShelfContent.categories)[number];

const INITIAL_WORD_COLOR = "#7E838C"; // 4.83:1 contrast on #131315 (WCAG AA at scrollY=0)
const REVEALED_WORD_COLOR = "#F2F0EB";

const SURFACE_STYLES: Record<
  EngineeringBlueprintItem["surface"],
  { card: string; muted: string; divider: string }
> = {
  carbon: {
    card: "bg-[#191A1E] text-[#F2F0EB] border-white/20",
    muted: "text-[#B8BCC4]",
    divider: "border-white/15",
  },
  graphite: {
    card: "bg-[#232429] text-[#FAFAF8] border-white/25",
    muted: "text-[#C3C6CC]",
    divider: "border-white/15",
  },
  cream: {
    card: "bg-[#F2F0EB] text-[#131315] border-[#131315]/20",
    muted: "text-[#4A4E55]",
    divider: "border-[#131315]/15",
  },
  "soft-white": {
    card: "bg-[#FAFAF8] text-[#131315] border-[#131315]/20",
    muted: "text-[#4A4E55]",
    divider: "border-[#131315]/15",
  },
};

function interpolateWordColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(126 + (242 - 126) * clamped);
  const g = Math.round(131 + (240 - 131) * clamped);
  const b = Math.round(140 + (235 - 140) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Cadernos de Engenharia (adaptado de MotionSites: Orvante Agency + Shelf Hero + Modern Agency):
 * 1) Tese editorial com revelação palavra por palavra sincronizada ao scroll (sem pinning).
 * 2) Estante física em perspectiva 3D de lombadas/monografias técnicas da NWK.
 * 3) Gaveta/diálogo acessível de inspeção técnica de cada frente de engenharia.
 */
export function EngineeringShelfSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const shelfStageRef = useRef<HTMLDivElement>(null);
  const closeDialogBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [activeId, setActiveId] = useState<string>(engineeringShelfContent.items[0]!.id);
  const [inspectedItem, setInspectedItem] = useState<EngineeringBlueprintItem | null>(null);
  const [cursorMode, setCursorMode] = useState<"hidden" | "spine" | "open">("hidden");

  const statementWords = useMemo(() => engineeringShelfContent.statement.split(" "), []);

  const visibleItems = useMemo(() => {
    if (activeCategory === "Todos") return engineeringShelfContent.items;
    return engineeringShelfContent.items.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeIndex = Math.max(
    0,
    visibleItems.findIndex((item) => item.id === activeId),
  );
  const activeItem = visibleItems[activeIndex] ?? visibleItems[0]!;

  // Cursor anel interativo no palco desktop (apenas Motion Values — zero conflito com GSAP)
  const rawCursorX = useMotionValue(-120);
  const rawCursorY = useMotionValue(-120);
  const cursorX = useSpring(rawCursorX, { stiffness: 320, damping: 28 });
  const cursorY = useSpring(rawCursorY, { stiffness: 320, damping: 28 });

  // Revelação palavra por palavra (Orvante Agency) usando GSAP ScrollTrigger sem pinning
  useGSAP(
    () => {
      const heading = statementRef.current;
      if (!heading) return;

      const wordEls = Array.from(heading.querySelectorAll<HTMLElement>("[data-word]"));
      if (wordEls.length === 0) return;

      if (prefersReducedMotion()) {
        wordEls.forEach((el) => {
          el.style.color = REVEALED_WORD_COLOR;
        });
        return;
      }

      ensureGsapRegistered();
      wordEls.forEach((el) => {
        el.style.color = INITIAL_WORD_COLOR;
      });

      const total = wordEls.length;
      const st = gsap.to(
        { progress: 0 },
        {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
            end: "bottom 42%",
            scrub: 0.4,
            onUpdate: (self) => {
              const p = self.progress;
              const edge = 3 / Math.max(1, total);
              wordEls.forEach((el, idx) => {
                const start = (idx / total) * (1 - edge);
                const local = (p - start) / edge;
                el.style.color = interpolateWordColor(local);
              });
            },
          },
        },
      );

      return () => {
        st.scrollTrigger?.kill();
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  // Gestão de foco e tecla Escape para o diálogo do caderno
  useEffect(() => {
    if (!inspectedItem) return;
    closeDialogBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInspectedItem(null);
        lastTriggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inspectedItem]);

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    const nextList =
      category === "Todos"
        ? engineeringShelfContent.items
        : engineeringShelfContent.items.filter((item) => item.category === category);
    if (nextList[0]) {
      setActiveId(nextList[0].id);
    }
  };

  const handleStep = (delta: -1 | 1) => {
    if (visibleItems.length <= 1) return;
    const nextIdx = (activeIndex + delta + visibleItems.length) % visibleItems.length;
    setActiveId(visibleItems[nextIdx]!.id);
  };

  const openInspector = (item: EngineeringBlueprintItem, trigger?: HTMLElement | null) => {
    lastTriggerRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setInspectedItem(item);
  };

  const closeInspector = () => {
    setInspectedItem(null);
    lastTriggerRef.current?.focus();
  };

  const activeSurface = SURFACE_STYLES[activeItem.surface];

  return (
    <section
      id="engenharia"
      ref={sectionRef}
      aria-labelledby="engineering-shelf-heading"
      className="relative scroll-mt-20 overflow-x-clip bg-[var(--nwk-carbon-black)] py-24 text-[var(--nwk-soft-white)] sm:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* 1. Tese palavra por palavra (Orvante Agency) */}
        <div className="max-w-5xl">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[var(--nwk-text-inverse-muted)]">
            {engineeringShelfContent.eyebrow}
          </p>
          <h2
            id="engineering-shelf-heading"
            ref={statementRef}
            aria-label={engineeringShelfContent.statement}
            className="font-display mt-5 text-[clamp(1.75rem,3.6vw,3.45rem)] leading-[1.12] font-medium tracking-[-0.035em]"
          >
            {statementWords.map((word, idx) => (
              <span key={`${word}-${idx}`}>
                <span
                  data-word
                  aria-hidden="true"
                  className="inline-block transition-colors duration-150"
                  style={{ color: INITIAL_WORD_COLOR }}
                >
                  {word}
                </span>
                {idx < statementWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
        </div>

        {/* 2. Barra de filtros e controles da estante */}
        <div className="mt-14 flex flex-col gap-5 border-t border-[var(--nwk-border-dark-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filtrar cadernos por disciplina"
            className="flex flex-wrap items-center gap-2"
          >
            {engineeringShelfContent.categories.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium tracking-[-0.01em] transition-colors duration-200 active:scale-[0.97]",
                    selected
                      ? "border-[var(--nwk-neutral-cream)] bg-[var(--nwk-neutral-cream)] text-[var(--nwk-carbon-black)]"
                      : "border-[var(--nwk-border-dark-subtle)] bg-transparent text-[var(--nwk-text-inverse-muted)] hover:border-[var(--nwk-border-dark-strong)] hover:text-[var(--nwk-soft-white)]",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="font-mono text-xs tracking-wider text-[var(--nwk-text-inverse-muted)] tabular-nums">
              0{activeIndex + 1} / 0{visibleItems.length}
            </span>
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Caderno anterior"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--nwk-border-dark-strong)] text-[var(--nwk-soft-white)] transition-colors duration-200 hover:bg-[var(--nwk-neutral-cream)] hover:text-[var(--nwk-carbon-black)] active:scale-[0.97]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Próximo caderno"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--nwk-border-dark-strong)] text-[var(--nwk-soft-white)] transition-colors duration-200 hover:bg-[var(--nwk-neutral-cream)] hover:text-[var(--nwk-carbon-black)] active:scale-[0.97]"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 3. Palco 3D Desktop (Shelf Hero — perspectiva + rotação de lombadas, sem fade de opacidade) */}
        <div
          ref={shelfStageRef}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              handleStep(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              handleStep(1);
            }
          }}
          onPointerMove={(e) => {
            if (shouldReduceMotion || !shelfStageRef.current) return;
            const rect = shelfStageRef.current.getBoundingClientRect();
            rawCursorX.set(e.clientX - rect.left);
            rawCursorY.set(e.clientY - rect.top);
          }}
          onPointerLeave={() => setCursorMode("hidden")}
          className="relative mt-10"
        >
          {/* Cursor Anel Interativo Desktop */}
          {!shouldReduceMotion && cursorMode !== "hidden" ? (
            <motion.div
              aria-hidden="true"
              style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className={cn(
                "pointer-events-none absolute top-0 left-0 z-30 hidden items-center justify-center rounded-full border transition-[width,height,background-color,color,border-color] duration-200 md:flex",
                cursorMode === "open"
                  ? "h-16 w-16 border-[var(--nwk-neutral-cream)] bg-[var(--nwk-neutral-cream)] text-[10px] font-semibold tracking-[0.12em] text-[var(--nwk-carbon-black)] shadow-lg"
                  : "h-7 w-7 border-white/60 bg-transparent",
              )}
            >
              {cursorMode === "open" ? "ABRIR" : null}
            </motion.div>
          ) : null}

          {/* Estante 3D para Desktop (md+) */}
          <div
            role="list"
            aria-label="Estante de cadernos de engenharia"
            className="hidden items-center justify-center gap-3 py-4 [perspective:1400px] md:flex lg:gap-4"
          >
            {visibleItems.map((item, idx) => {
              const isActive = item.id === activeItem.id;
              const style = SURFACE_STYLES[item.surface];
              const offsetFromActive = idx - activeIndex;
              const rotateY = isActive ? 0 : offsetFromActive < 0 ? 18 : -18;

              return (
                <div
                  key={item.id}
                  role="listitem"
                  className="shrink-0 [transform-style:preserve-3d]"
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onPointerEnter={() => setCursorMode(isActive ? "open" : "spine")}
                    onClick={(e) => {
                      if (isActive) {
                        openInspector(item, e.currentTarget);
                      } else {
                        setActiveId(item.id);
                      }
                    }}
                    style={{
                      transform: shouldReduceMotion
                        ? undefined
                        : `rotateY(${rotateY}deg) translateZ(${isActive ? 28 : 0}px)`,
                    }}
                    className={cn(
                      "group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border text-left transition-[width,transform,border-color,box-shadow] duration-500 ease-[var(--nwk-ease-precision)] active:scale-[0.985]",
                      style.card,
                      isActive
                        ? "h-[380px] w-[270px] p-6 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.65)] lg:h-[420px] lg:w-[310px] lg:p-7"
                        : "h-[370px] w-[62px] items-center px-2 py-5 hover:-translate-y-1.5 lg:h-[410px] lg:w-[74px]",
                    )}
                  >
                    {isActive ? (
                      <>
                        <div className="flex w-full items-center justify-between text-xs font-medium">
                          <span className="font-mono tracking-wider tabular-nums">{item.code}</span>
                          <span className={cn("text-[11px] uppercase tracking-[0.08em]", style.muted)}>
                            {item.category}
                          </span>
                        </div>

                        <div className="my-auto py-4">
                          <BlueprintCoverArt pattern={item.pattern} className="h-auto w-full" />
                        </div>

                        <div className={cn("w-full border-t pt-4", style.divider)}>
                          <p className="font-display text-xl leading-tight font-medium tracking-[-0.025em] lg:text-2xl">
                            {item.title}
                          </p>
                          <p className={cn("mt-1.5 text-xs", style.muted)}>
                            Clique para inspecionar especificações
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-xs font-medium tracking-wider tabular-nums">
                          {item.code}
                        </span>
                        <span className="font-display text-sm font-medium tracking-[-0.01em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                          {item.shortTitle}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn("h-1.5 w-1.5 rounded-full bg-current opacity-60")}
                        />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Palco Responsivo para Mobile (< 768px — sem overflow horizontal a partir de 320px) */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={(e) => openInspector(activeItem, e.currentTarget)}
              className={cn(
                "mx-auto flex h-[340px] w-full max-w-[300px] cursor-pointer flex-col justify-between rounded-2xl border p-6 text-left shadow-[0_20px_50px_-18px_rgba(0,0,0,0.6)] active:scale-[0.985]",
                activeSurface.card,
              )}
            >
              <div className="flex w-full items-center justify-between text-xs font-medium">
                <span className="font-mono tracking-wider tabular-nums">{activeItem.code}</span>
                <span className={cn("text-[11px] uppercase tracking-[0.08em]", activeSurface.muted)}>
                  {activeItem.category}
                </span>
              </div>

              <div className="my-auto py-3">
                <BlueprintCoverArt pattern={activeItem.pattern} className="h-auto w-full" />
              </div>

              <div className={cn("w-full border-t pt-3", activeSurface.divider)}>
                <p className="font-display text-xl leading-tight font-medium tracking-[-0.025em]">
                  {activeItem.title}
                </p>
                <p className={cn("mt-1 text-xs", activeSurface.muted)}>
                  Toque para abrir especificações
                </p>
              </div>
            </button>

            <div
              role="group"
              aria-label="Selecionar caderno no mobile"
              className="mt-5 flex flex-wrap justify-center gap-2"
            >
              {visibleItems.map((item) => {
                const selected = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors active:scale-[0.97]",
                      selected
                        ? "border-[var(--nwk-neutral-cream)] bg-[var(--nwk-neutral-cream)] text-[var(--nwk-carbon-black)]"
                        : "border-[var(--nwk-border-dark-subtle)] text-[var(--nwk-text-inverse-muted)] hover:text-[var(--nwk-soft-white)]",
                    )}
                  >
                    <span className="mr-1.5 font-mono">{item.code}</span>
                    {item.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Legenda Inferior com Máscara Vertical Pura (Zero Opacity Fade) */}
        <div
          key={activeItem.id}
          className="mt-12 grid items-end gap-8 border-t border-[var(--nwk-border-dark-subtle)] pt-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            <div className="overflow-hidden">
              <p className="nwk-mask-rise font-mono text-xs tracking-[0.1em] uppercase text-[var(--nwk-text-inverse-muted)]">
                {activeItem.code} · {activeItem.badge}
              </p>
            </div>
            <div className="mt-2 overflow-hidden">
              <h3 className="nwk-mask-rise font-display text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.06] font-medium tracking-[-0.03em] text-[var(--nwk-soft-white)]">
                {activeItem.title}
              </h3>
            </div>
            <div className="mt-4 overflow-hidden">
              <p className="nwk-mask-rise max-w-2xl text-base leading-relaxed text-[#C3C6CC]">
                {activeItem.thesis}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden">
              <ul
                aria-label={`Padrões de ${activeItem.title}`}
                className="nwk-mask-rise space-y-2 text-sm text-[var(--nwk-neutral-cream)]"
              >
                {activeItem.standards.map((std) => (
                  <li key={std} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--nwk-neutral-cream)]"
                    />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <RollActionLink
                label="Inspecionar caderno"
                tone="light"
                onClick={() => openInspector(activeItem)}
              />
              <a
                href="#contato"
                className="border-b border-white/35 pb-0.5 text-sm font-medium text-[var(--nwk-soft-white)] transition-colors hover:border-[var(--nwk-neutral-cream)] hover:text-[var(--nwk-neutral-cream)]"
              >
                Discutir arquitetura
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Diálogo de Inspeção do Caderno (Neutral Cream Paper Expansion) */}
      {inspectedItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blueprint-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeInspector();
          }}
        >
          <div className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-[1.5rem] border border-[#131315]/15 bg-[var(--nwk-neutral-cream)] p-6 text-[var(--nwk-carbon-black)] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.7)] sm:p-10">
            <div className="flex items-start justify-between gap-4 border-b border-[#131315]/15 pb-5">
              <div>
                <p className="font-mono text-xs tracking-[0.12em] uppercase text-[#4A4E55]">
                  {inspectedItem.code} · {inspectedItem.category} · {inspectedItem.badge}
                </p>
                <h3
                  id="blueprint-dialog-title"
                  className="font-display mt-2 text-[clamp(1.65rem,3vw,2.5rem)] leading-[1.06] font-medium tracking-[-0.03em]"
                >
                  {inspectedItem.title}
                </h3>
              </div>

              <button
                ref={closeDialogBtnRef}
                type="button"
                onClick={closeInspector}
                aria-label="Fechar caderno"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#131315]/20 bg-[var(--nwk-pure-white)] text-[var(--nwk-carbon-black)] transition-colors hover:bg-[var(--nwk-carbon-black)] hover:text-[var(--nwk-soft-white)] active:scale-[0.97]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-12 sm:items-center">
              <div className="rounded-xl border border-[#131315]/12 bg-[var(--nwk-soft-white)] p-4 sm:col-span-5">
                <BlueprintCoverArt
                  pattern={inspectedItem.pattern}
                  className="h-auto w-full text-[var(--nwk-carbon-black)]"
                />
              </div>
              <div className="sm:col-span-7">
                <p className="text-base leading-relaxed font-medium text-[#131315]">
                  {inspectedItem.thesis}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4A4E55]">
                  {inspectedItem.summary}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-[#131315]/15 pt-6 sm:grid-cols-2">
              <div>
                <h4 className="font-mono text-xs font-semibold tracking-[0.1em] uppercase text-[#4A4E55]">
                  Decisões de Engenharia
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm text-[#131315]">
                  {inspectedItem.standards.map((std) => (
                    <li key={std} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#131315]"
                      />
                      <span>{std}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs font-semibold tracking-[0.1em] uppercase text-[#4A4E55]">
                  Artefatos Entregues
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm text-[#131315]">
                  {inspectedItem.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#131315]"
                      />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#131315]/15 pt-6">
              <button
                type="button"
                onClick={closeInspector}
                className="cursor-pointer text-sm font-medium text-[#4A4E55] underline underline-offset-4 hover:text-[#131315]"
              >
                Voltar à estante
              </button>
              <RollActionLink
                label="Iniciar projeto nesta frente"
                href="#contato"
                tone="dark"
                onClick={closeInspector}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
