"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/config/site";
import { solutionsContent } from "@/content/home";
import { ensureGsapRegistered, gsap, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Divider } from "@/components/ui/Divider";
import { RollActionLink } from "@/components/ui/RollActionLink";
import { Magnetic } from "@/components/motion/Magnetic";

const brtFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
});

let cachedBrtTime = "";

function subscribeClock(onStoreChange: () => void) {
  cachedBrtTime = brtFormatter.format(new Date());
  const id = window.setInterval(() => {
    const next = brtFormatter.format(new Date());
    if (next !== cachedBrtTime) {
      cachedBrtTime = next;
      onStoreChange();
    }
  }, 15_000);
  return () => window.clearInterval(id);
}

function getClientClockSnapshot(): string {
  if (!cachedBrtTime) {
    cachedBrtTime = brtFormatter.format(new Date());
  }
  return cachedBrtTime;
}

function getServerClockSnapshot(): string {
  return "--:--";
}

function StudioClock() {
  const time = useSyncExternalStore(
    subscribeClock,
    getClientClockSnapshot,
    getServerClockSnapshot,
  );

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[var(--nwk-text-inverse-muted)] tabular-nums">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--nwk-neutral-cream)]" />
      <span>{time} BRT · Brasil</span>
    </span>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const monumentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsapRegistered();
      if (prefersReducedMotion() || !footerRef.current || !monumentRef.current) return;

      gsap.fromTo(
        monumentRef.current,
        { y: 36, opacity: 0.4 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: monumentRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[var(--nwk-bg-dark)] pt-20 pb-10 text-[var(--nwk-text-inverse)] sm:pt-28"
    >
      {/* Subtle architectural top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-[var(--nwk-neutral-cream)]/[0.05] blur-3xl"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="horizontal" tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--nwk-text-inverse-muted)]">
              Empresa de tecnologia e engenharia de software dedicada a construir sistemas,
              aplicativos e experiências digitais com precisão técnica e identidade própria.
            </p>
            <div className="mt-8">
              <Magnetic>
                <RollActionLink label="Iniciar uma conversa" href="#contato" tone="light" />
              </Magnetic>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--nwk-text-inverse-muted)]">
                Navegação
              </h3>
              <ul className="mt-4 space-y-3">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-[var(--nwk-text-inverse)] transition-colors hover:text-[var(--nwk-neutral-cream)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-xs font-medium tracking-[0.12em] uppercase text-[var(--nwk-text-inverse-muted)]">
                Soluções
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {solutionsContent.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href="#solucoes"
                      className="text-sm text-[var(--nwk-text-inverse-muted)] transition-colors hover:text-[var(--nwk-text-inverse)]"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Divider tone="dark" className="my-12 sm:my-16" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-[var(--nwk-text-inverse-muted)] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} NWK. Tecnologia e Engenharia Digital.</p>
          <div className="flex flex-wrap items-center gap-4">
            <StudioClock />
            <p>Canais institucionais e documentos legais serão publicados na fase de lançamento.</p>
          </div>
        </div>

        {/* Monumental parallax brand closure */}
        <div
          ref={monumentRef}
          aria-hidden="true"
          className="mt-12 select-none border-t border-[var(--nwk-border-dark-subtle)] pt-8"
        >
          <div className="flex items-end justify-between gap-6">
            <svg
              viewBox="340 60 416 120"
              fill="none"
              className="h-auto w-full max-w-[520px] opacity-[0.14]"
              aria-hidden="true"
            >
              <path
                d="M348.3 67.5H373.8L433.9 129.5V67.5H461.5V172.5H436L376.6 110.5V172.5H348.3V67.5Z"
                fill="#F2F0EB"
              />
              <path
                d="M467.5 67.5H497.7L518.8 128L541.5 67.5H562.5L585.2 128L606.3 67.5H635.2L598.5 172.5H573.5L552 112.5L530.5 172.5H505.5L467.5 67.5Z"
                fill="#F2F0EB"
              />
              <path
                d="M641 67.5H669.3V105.5L712.5 67.5H747.5L695.5 117.5L748.5 172.5H715.5L675.5 132.5L669.3 138.8V172.5H641V67.5Z"
                fill="#F2F0EB"
              />
            </svg>
            <Logo
              variant="symbol"
              tone="light"
              decorative
              className="mb-2 h-14 w-14 opacity-30 sm:h-24 sm:w-24"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
