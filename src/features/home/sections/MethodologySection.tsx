"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { methodologyContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import {
  ProductBuildArtwork,
  type ArtworkStage,
} from "@/features/home/components/ProductBuildArtwork";

interface Sheet {
  bg: string;
  light: boolean;
}

/** A ideia amadurece: o fundo clareia a cada etapa até o produto publicado. */
const SHEETS: readonly Sheet[] = [
  { bg: "#131315", light: false },
  { bg: "#18191c", light: false },
  { bg: "#1e1f23", light: false },
  { bg: "#26272c", light: false },
  { bg: "#33343a", light: false },
  { bg: "#F2F0EB", light: true },
];

const STACK_MEDIA = "(prefers-reduced-motion: no-preference)";
const STICKY_MEDIA = "(min-width: 768px)";

/**
 * Metodologia em pilha de folhas (Scroll Stack): cada etapa é uma folha que
 * cobre a anterior com `position: sticky` (CSS — sem pin do GSAP). A mesma
 * ilustração evolui de uma etapa à outra; o que nasce na etapa é animado ao
 * entrar. Sem JS / reduced-motion: folhas empilhadas estáticas, estado final visível.
 */
export function MethodologySection() {
  const rootRef = useRef<HTMLElement>(null);
  const steps = methodologyContent.steps;

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(STACK_MEDIA, () => {
        const sheets = gsap.utils.toArray<HTMLElement>("[data-sheet]", root);

        sheets.forEach((sheet, i) => {
          // 1 · O que nasce nesta etapa entra animado.
          const fresh = sheet.querySelectorAll("[data-new]");
          const lines = sheet.querySelectorAll("[data-rise]");
          const ticks = sheet.querySelectorAll("[data-tick]");
          const edges = sheet.querySelectorAll("[data-edge]");
          const code = sheet.querySelectorAll("[data-code]");
          const modules = sheet.querySelectorAll("[data-module]");

          const intro = gsap.timeline({
            paused: true,
            scrollTrigger: { trigger: sheet, start: "top 72%", once: true },
          });
          intro.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0);
          if (fresh.length) {
            intro.fromTo(fresh, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" }, 0.15);
          }
          if (edges.length) {
            intro.fromTo(edges, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.06, ease: "power2.inOut" }, 0.2);
          }
          if (code.length) {
            intro.fromTo(code, { scaleX: 0 }, { scaleX: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }, 0.2);
          }
          if (ticks.length) {
            intro.fromTo(ticks, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" }, 0.55);
          }
          if (modules.length) {
            intro.fromTo(modules, { scaleY: 0.2 }, { scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 0.4);
          }

          // 2 · Profundidade: a folha anterior recua enquanto a próxima a cobre.
          const next = sheets[i + 1];
          if (next && window.matchMedia(STICKY_MEDIA).matches) {
            gsap.to(sheet.querySelector("[data-inner]"), {
              scale: 0.95,
              yPercent: -2,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top 95%", end: "top 18%", scrub: true },
            });
            gsap.to(sheet.querySelector("[data-dim]"), {
              opacity: 0.5,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top 95%", end: "top 18%", scrub: true },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="metodologia"
      ref={rootRef}
      aria-labelledby="methodology-heading"
      className="relative scroll-mt-20 bg-[#131315] text-[#FAFAF8]"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 pt-24 pb-12 sm:px-8 sm:pt-32 lg:px-12">
        <h2
          id="methodology-heading"
          className="font-display max-w-4xl text-[clamp(2rem,4.2vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.035em]"
        >
          {methodologyContent.heading}{" "}
          <span className="text-[#A0A4AC]">{methodologyContent.headingMuted}</span>
        </h2>
      </div>

      <ol aria-label="Etapas do processo" className="relative pb-0">
        {steps.map((step, index) => {
          const sheet = SHEETS[index] ?? SHEETS[SHEETS.length - 1]!;
          const stage = (index + 1) as ArtworkStage;
          const flip = index % 2 === 1;
          const muted = sheet.light ? "text-[#4A4E55]" : "text-[#C3C6CC]";
          return (
            <li
              key={step.id}
              data-sheet
              className="relative md:motion-safe:sticky"
              style={{ top: `calc(4.5rem + ${index * 0.85}rem)`, zIndex: index + 1 }}
            >
              <div
                className="relative overflow-hidden rounded-t-[1.75rem] border-t border-white/10 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.6)] md:min-h-[78svh] md:rounded-t-[2.25rem]"
                style={{ background: sheet.bg, color: sheet.light ? "#131315" : "#FAFAF8" }}
              >
                <div data-inner className="mx-auto grid w-full max-w-[90rem] items-center gap-10 px-5 py-14 sm:px-8 md:min-h-[78svh] md:grid-cols-12 md:gap-14 md:py-16 lg:px-12">
                  <div className={cn("md:col-span-5", flip && "md:order-2 md:col-start-8")}>
                    <h3 className="font-display overflow-hidden pb-2 text-[clamp(2rem,4.4vw,4.4rem)] leading-[1] font-medium tracking-[-0.04em]">
                      <span data-rise className="block">
                        {step.title}
                      </span>
                    </h3>
                    <p className={cn("mt-6 max-w-md overflow-hidden text-base leading-relaxed sm:text-lg", muted)}>
                      <span data-rise className="block">
                        {step.summary}
                      </span>
                    </p>
                    <p className="mt-7 overflow-hidden border-t pt-4 text-sm font-medium" style={{ borderColor: sheet.light ? "rgba(19,19,21,0.2)" : "rgba(255,255,255,0.14)" }}>
                      <span data-rise className="block">
                        <span className={sheet.light ? "text-[#4A4E55]" : "text-[#A0A4AC]"}>Resultado: </span>
                        {step.outcome}
                      </span>
                    </p>
                  </div>

                  <div className={cn("md:col-span-7", flip && "md:order-1 md:col-start-1")}>
                    <ProductBuildArtwork stage={stage} tone={sheet.light ? "dark" : "light"} />
                  </div>
                </div>
                <div
                  data-dim
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black opacity-0"
                />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
