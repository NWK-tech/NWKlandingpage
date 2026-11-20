"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { motionTokens } from "@/tokens/foundations";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/types/content";

const DARK_SECTION_IDS = new Set(["solucoes", "metodologia", "engenharia"]);

const LEFT_NAV_ITEMS: readonly NavItem[] = siteConfig.navigation.slice(0, 2);
const RIGHT_NAV_ITEMS: readonly NavItem[] = siteConfig.navigation.slice(2, 4);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      // Determine whether the header sits over a dark or light section
      const probeY = y + 40;
      const sections = document.querySelectorAll<HTMLElement>("main section[id]");
      let currentIsDark = false;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (probeY >= top && probeY < bottom) {
          currentIsDark = DARK_SECTION_IDS.has(sec.id);
        }
      });
      setOverDark(currentIsDark);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = siteConfig.navigation.map((item) => item.href.replace("#", ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isLightHeaderText = overDark;

  const renderNavLink = (item: NavItem) => {
    const isActive = activeSection === item.href;
    const isHovered = hoveredHref === item.href;
    return (
      <a
        key={item.href}
        href={item.href}
        onMouseEnter={() => setHoveredHref(item.href)}
        onFocus={() => setHoveredHref(item.href)}
        onBlur={() => setHoveredHref(null)}
        className={cn(
          "relative rounded-full px-3.5 py-1.5 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200",
          isLightHeaderText
            ? isActive
              ? "text-[var(--nwk-soft-white)]"
              : "text-[var(--nwk-text-inverse-muted)] hover:text-[var(--nwk-soft-white)]"
            : isActive
              ? "text-[var(--nwk-text-primary)]"
              : "text-[var(--nwk-text-secondary)] hover:text-[var(--nwk-text-primary)]",
        )}
      >
        {isHovered ? (
          <motion.span
            layoutId="nav-hover-pill"
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 rounded-full",
              isLightHeaderText ? "bg-white/10" : "bg-[#131315]/[0.06]",
            )}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 32 }
            }
          />
        ) : null}
        {item.label}
        {isActive ? (
          <motion.span
            layoutId="nav-active-indicator"
            className={cn(
              "absolute inset-x-3.5 -bottom-0.5 h-[1.5px]",
              isLightHeaderText
                ? "bg-[var(--nwk-neutral-cream)]"
                : "bg-[var(--nwk-carbon-black)]",
            )}
            transition={{
              duration: motionTokens.durations.fast,
              ease: motionTokens.easings.precision,
            }}
          />
        ) : null}
      </a>
    );
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? isLightHeaderText
            ? "border-b border-white/10 bg-[rgba(19,19,21,0.78)] backdrop-blur-xl"
            : "border-b border-[var(--nwk-border-subtle)] bg-[rgba(250,250,248,0.88)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        {/* Desktop Symmetric Split Navigation with Centered Logo */}
        <nav
          aria-label="Navegação principal"
          onMouseLeave={() => setHoveredHref(null)}
          className="mx-auto hidden h-20 max-w-5xl grid-cols-[1fr_auto_1fr] items-center md:grid lg:h-22"
        >
          <div className="flex items-center justify-end gap-8 pr-8 lg:gap-14 lg:pr-14">
            {LEFT_NAV_ITEMS.map(renderNavLink)}
          </div>

          <a
            href="#inicio"
            aria-label="NWK — Ir para o início"
            className="inline-flex items-center justify-center rounded-md px-3 py-1.5 transition-opacity duration-200 hover:opacity-85"
          >
            <Logo
              variant="horizontal"
              tone={isLightHeaderText ? "light" : "dark"}
              className="h-10 lg:h-11"
            />
          </a>

          <div className="flex items-center justify-start gap-8 pl-8 lg:gap-14 lg:pl-14">
            {RIGHT_NAV_ITEMS.map(renderNavLink)}
          </div>
        </nav>

        {/* Mobile Header Bar */}
        <div className="flex h-18 items-center justify-between gap-4 md:hidden">
          <div className="w-11" aria-hidden="true" />
          <a
            href="#inicio"
            aria-label="NWK — Ir para o início"
            className="inline-flex items-center justify-center rounded-md py-1"
          >
            <Logo
              variant="horizontal"
              tone={isLightHeaderText ? "light" : "dark"}
              className="h-9"
            />
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors",
              isLightHeaderText
                ? "border-white/20 bg-white/10 text-[var(--nwk-soft-white)] hover:border-white/40"
                : "border-[var(--nwk-border-subtle)] bg-[var(--nwk-bg-elevated)] text-[var(--nwk-text-primary)] hover:border-[var(--nwk-carbon-black)]",
            )}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: motionTokens.durations.fast,
              ease: motionTokens.easings.precision,
            }}
            className="border-b border-[var(--nwk-border-subtle)] bg-[var(--nwk-bg-primary)] text-[var(--nwk-text-primary)] md:hidden"
          >
            <Container className="py-6">
              <nav aria-label="Navegação mobile" className="flex flex-col gap-2">
                {siteConfig.navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-[var(--nwk-text-primary)] transition-colors hover:bg-[var(--nwk-neutral-cream)]"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--nwk-text-muted)]" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
