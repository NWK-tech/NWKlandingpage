import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps {
  id?: string;
  surface?: "primary" | "elevated" | "alternative" | "dark" | "dark-elevated";
  spacing?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

const surfaceClasses: Record<NonNullable<SectionProps["surface"]>, string> = {
  primary: "bg-[var(--nwk-bg-primary)] text-[var(--nwk-text-primary)]",
  elevated: "bg-[var(--nwk-bg-elevated)] text-[var(--nwk-text-primary)]",
  alternative: "bg-[var(--nwk-bg-alternative)] text-[var(--nwk-text-primary)]",
  dark: "bg-[var(--nwk-bg-dark)] text-[var(--nwk-text-inverse)]",
  "dark-elevated": "bg-[var(--nwk-bg-dark-elevated)] text-[var(--nwk-text-inverse)]",
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28 lg:py-32",
  lg: "py-24 sm:py-32 lg:py-40",
};

export function Section({
  id,
  surface = "primary",
  spacing = "md",
  className,
  children,
  ariaLabel,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative w-full scroll-mt-20",
        surfaceClasses[surface],
        spacingClasses[spacing],
        className,
      )}
    >
      {children}
    </section>
  );
}
