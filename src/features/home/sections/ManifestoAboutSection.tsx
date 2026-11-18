"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { manifestoAboutContent } from "@/content/home";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function ManifestoAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion() || !sectionRef.current) return;

      const words = sectionRef.current.querySelectorAll<HTMLElement>(".manifesto-word");
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.5, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              end: "center 52%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  const leadWords = manifestoAboutContent.lead.split(" ");
  const accentWords = manifestoAboutContent.accent.split(" ");

  return (
    <Section
      id="sobre"
      surface="dark"
      spacing="lg"
      className="border-t border-white/[0.08] bg-[#131315]"
      ariaLabelledBy="manifesto-heading"
    >
      <Container>
        <div ref={sectionRef}>
          <h2
            id="manifesto-heading"
            aria-label={`${manifestoAboutContent.lead} ${manifestoAboutContent.accent}`}
            className="text-h1 max-w-5xl font-medium text-[var(--nwk-text-inverse)]"
          >
            {leadWords.map((word, index) => (
              <span
                key={`lead-${index}`}
                aria-hidden="true"
                className="manifesto-word inline-block"
              >
                {word}
                {"\u00A0"}
              </span>
            ))}
            {accentWords.map((word, index) => (
              <span
                key={`accent-${index}`}
                aria-hidden="true"
                className="manifesto-word inline-block text-[var(--nwk-neutral-cream)]"
              >
                {word}
                {index < accentWords.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-12 border-t border-[var(--nwk-border-dark-subtle)] pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-base leading-relaxed text-[var(--nwk-neutral-cream)] sm:text-lg">
                  {manifestoAboutContent.purpose}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7">
              {manifestoAboutContent.principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.06}>
                  <div className="space-y-3">
                    <h3 className="font-display text-base font-medium text-[var(--nwk-text-inverse)] sm:text-lg">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--nwk-text-inverse-muted)]">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
