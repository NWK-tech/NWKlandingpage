"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { manifestoAboutContent } from "@/content/home";
import { ensureGsapRegistered, gsap, SplitText } from "@/lib/gsap";

const KINETIC_MEDIA = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
/** Único tom de rastro (âmbar): usado só como eco, com moderação, sobre preto e creme. */
const TRAIL = "#d8932b";
const STEP_VH = 85;

interface Chunk {
  text: string;
  /** Palavra-título (monumental) ou complemento da frase. */
  big: boolean;
}

/** "Tecnologia é o que construímos." → ["Tecnologia", "é o que construímos."] */
function toChunks(sentence: string): Chunk[] {
  const [first = "", ...rest] = sentence.split(" ");
  return [
    { text: first, big: true },
    { text: rest.join(" "), big: false },
  ];
}

/**
 * Manifesto cinético (inspirado em "Choreographing Kinetic Typography on Scroll"):
 * as frases entram em blocos, no ritmo de leitura, com eco colorido discreto.
 * A "corrida" de scroll usa `position: sticky` (CSS), não pin do GSAP. Abaixo de
 * 768px ou com reduced-motion o texto é estático e legível desde o início.
 */
export function ManifestoAboutSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { lead, accent, purpose, principles } = manifestoAboutContent;
  const chunks = [...toChunks(lead), ...toChunks(accent)];

  useGSAP(
    () => {
      ensureGsapRegistered();
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(KINETIC_MEDIA, () => {
        root.dataset.kinetic = "on";
        const runway = root.querySelector<HTMLElement>("[data-runway]")!;
        const els = gsap.utils.toArray<HTMLElement>("[data-chunk]", root);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        els.forEach((chunk, i) => {
          const main = chunk.querySelector<HTMLElement>("[data-main]")!;
          const ghosts = chunk.querySelectorAll("[data-ghost]");
          const split = SplitText.create(main, { type: "words", aria: "none" });
          const at = i;
          const last = i === els.length - 1;

          gsap.set(chunk, { autoAlpha: 0 });
          tl.set(chunk, { autoAlpha: 1 }, at)
            .fromTo(
              split.words,
              { yPercent: 85, autoAlpha: 0, skewY: 5 },
              { yPercent: 0, autoAlpha: 1, skewY: 0, duration: 0.38, stagger: 0.07, ease: "power3.out" },
              at,
            )
            .fromTo(
              ghosts,
              { xPercent: (n) => -9 * (n + 1), autoAlpha: 0 },
              { xPercent: (n) => 1.6 * (n + 1), autoAlpha: (n) => (n === 0 ? 0.5 : 0.24), duration: 0.45, ease: "power2.out" },
              at,
            );
          if (!last) {
            tl.to(split.words, { yPercent: -40, autoAlpha: 0, duration: 0.2, stagger: 0.03, ease: "power2.in" }, at + 0.78)
              .to(ghosts, { xPercent: 12, autoAlpha: 0, duration: 0.2, ease: "power2.in" }, at + 0.78)
              .set(chunk, { autoAlpha: 0 }, at + 1);
          }
        });
        tl.to({}, { duration: 0.35 }, els.length - 1 + 0.45);

        // Princípios: filete que se desenha e linhas que sobem.
        gsap.utils.toArray<HTMLElement>("[data-principle]", root).forEach((row) => {
          const rule = row.querySelector("[data-rule]");
          const lines = row.querySelectorAll("[data-rise]");
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" } })
            .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power3.inOut", transformOrigin: "left center" })
            .fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.15);
        });

        return () => {
          delete root.dataset.kinetic;
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="sobre"
      aria-labelledby="manifesto-heading"
      className="relative z-20 scroll-mt-20 bg-[#F2F0EB] text-[#131315]"
    >
      <div ref={rootRef} className="group">
        <div data-runway className="group-data-[kinetic=on]:h-[calc(4*var(--step)+100svh)]" style={{ ["--step" as string]: `${STEP_VH}svh` }}>
          <div className="mx-auto flex w-full max-w-[90rem] flex-col px-5 pt-28 pb-8 sm:px-8 lg:px-12 group-data-[kinetic=on]:sticky group-data-[kinetic=on]:top-0 group-data-[kinetic=on]:h-svh group-data-[kinetic=on]:justify-center group-data-[kinetic=on]:overflow-hidden group-data-[kinetic=on]:py-0">
            <h2
              id="manifesto-heading"
              aria-label={`${lead} ${accent}`}
              className="font-display relative leading-[0.98] font-medium tracking-[-0.045em] group-data-[kinetic=on]:h-[62svh]"
            >
              {chunks.map((chunk, i) => (
                <span
                  key={`${chunk.text}-${i}`}
                  data-chunk
                  aria-hidden="true"
                  className={
                    chunk.big
                      ? "block text-[clamp(2.25rem,8.8vw,9.5rem)] group-data-[kinetic=on]:absolute group-data-[kinetic=on]:inset-0 group-data-[kinetic=on]:flex group-data-[kinetic=on]:items-center"
                      : "block text-[clamp(1.75rem,5.5vw,6.5rem)] group-data-[kinetic=on]:absolute group-data-[kinetic=on]:inset-0 group-data-[kinetic=on]:flex group-data-[kinetic=on]:items-center"
                  }
                >
                  <span className="relative block">
                    {[0, 1].map((n) => (
                      <span
                        key={n}
                        data-ghost
                        className="pointer-events-none absolute inset-0 hidden select-none group-data-[kinetic=on]:block"
                        style={{ color: TRAIL, opacity: 0 }}
                      >
                        {chunk.text}
                      </span>
                    ))}
                    <span data-main className="relative block">
                      {chunk.text}
                    </span>
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[90rem] px-5 pt-16 pb-28 sm:px-8 sm:pb-40 lg:px-12">
          <p className="max-w-3xl text-[clamp(1.15rem,1.9vw,1.75rem)] leading-snug text-[#2c2f35]">
            {purpose}
          </p>

          <div className="mt-20 sm:mt-28">
            {principles.map((principle) => (
              <div key={principle.title} data-principle className="relative">
                <div
                  data-rule
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[#131315]/70"
                />
                <div className="grid gap-4 py-8 sm:py-10 lg:grid-cols-12 lg:gap-12">
                  <h3 className="font-display overflow-hidden pb-1 text-[clamp(1.5rem,2.8vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.025em] lg:col-span-7">
                    <span data-rise className="block">
                      {principle.title}
                    </span>
                  </h3>
                  <p className="overflow-hidden text-sm leading-relaxed text-[#4A4E55] sm:text-base lg:col-span-5 lg:self-end">
                    <span data-rise className="block">
                      {principle.description}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            <div aria-hidden="true" className="h-px bg-[#131315]/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
