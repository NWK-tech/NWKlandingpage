"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { projectsContent } from "@/content/home";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { PROJECT_PALETTE, DEFAULT_PALETTE } from "@/features/home/projectPalette";

const EXPAND_MEDIA = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * Transição Soluções → Projetos ("scroll expand" autoral): a janela clara dos
 * projetos nasce pequena sobre o fundo escuro das Soluções e cresce até sangrar
 * a tela; o título entra em máscara e os cinco projetos aparecem como trilho.
 * Usa `position: sticky` (sem pin do GSAP). Abaixo de 768px ou com reduced-motion
 * é apenas a faixa clara estática.
 */
export function ProjectsExpandIntro() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(EXPAND_MEDIA, () => {
        const win = root.querySelector("[data-window]");
        const lines = root.querySelectorAll("[data-line]");
        const rail = root.querySelectorAll("[data-rail]");
        const note = root.querySelector("[data-note]");

        gsap.set(win, { clipPath: "inset(16% 20% 16% 20% round 44px)" });
        gsap.set(lines, { yPercent: 110 });
        gsap.set(rail, { autoAlpha: 0, y: 18 });
        gsap.set(note, { autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top 55%",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(win, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "power2.inOut" }, 0)
          .to(lines, { yPercent: 0, duration: 0.35, stagger: 0.08, ease: "power3.out" }, 0.45)
          .to(rail, { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.06, ease: "power2.out" }, 0.7)
          .to(note, { autoAlpha: 1, duration: 0.2 }, 0.9);
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const { heading, headingMuted, disclaimer, items } = projectsContent;

  return (
    <div ref={rootRef} className="relative bg-[#131315] md:motion-safe:h-[210svh]">
      <div className="md:motion-safe:sticky md:motion-safe:top-0 md:motion-safe:h-svh md:motion-safe:overflow-hidden">
        <div
          data-window
          className="flex flex-col justify-center bg-[#F2F0EB] px-5 py-24 text-[#131315] sm:px-8 md:motion-safe:absolute md:motion-safe:inset-0 md:motion-safe:py-0 lg:px-12"
        >
          <div className="mx-auto w-full max-w-[90rem]">
            <h2
              id="projects-heading"
              className="font-display max-w-5xl text-[clamp(2.25rem,5.2vw,5.25rem)] leading-[1.02] font-medium tracking-[-0.035em]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-line className="block">
                  {heading}
                </span>
              </span>
              <span className="block overflow-hidden pb-1 text-[#4A4E55]">
                <span data-line className="block">
                  {headingMuted}
                </span>
              </span>
            </h2>

            <ul
              aria-label="Projetos apresentados"
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#131315]/20 pt-6 sm:mt-14"
            >
              {items.map((project) => {
                const palette = PROJECT_PALETTE[project.id] ?? DEFAULT_PALETTE;
                return (
                  <li key={project.id} data-rail className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: palette.accent, boxShadow: `0 0 0 3px ${palette.glow}` }}
                    />
                    <span className="font-display text-base font-medium sm:text-xl">
                      {project.name}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p data-note className="mt-8 max-w-md text-xs leading-relaxed text-[#4A4E55] sm:text-sm">
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
