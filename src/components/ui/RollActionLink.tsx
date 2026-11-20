import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface RollActionLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
  tone?: "light" | "dark";
  className?: string;
  ariaLabel?: string;
}

/**
 * Ação em cápsula com rolagem tipográfica vertical no hover (inspirada em Modern Agency)
 * e resposta tátil de clique (`scale(0.97)`). Funciona em Server e Client Components.
 */
export function RollActionLink({
  label,
  href,
  onClick,
  tone = "dark",
  className,
  ariaLabel,
}: RollActionLinkProps) {
  const isLightOnDark = tone === "light";

  const sharedClasses = cn(
    "nwk-roll-trigger group inline-flex cursor-pointer items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-sm font-medium tracking-[-0.01em] transition-[background-color,color,transform] duration-200 ease-[var(--nwk-ease-precision)] active:scale-[0.97]",
    isLightOnDark
      ? "bg-[var(--nwk-neutral-cream)] text-[var(--nwk-carbon-black)] hover:bg-[var(--nwk-pure-white)]"
      : "bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)] hover:bg-[var(--nwk-graphite)]",
    className,
  );

  const innerContent = (
    <>
      <span className="relative inline-block h-[1.25em] overflow-hidden leading-[1.25em]">
        <span className="nwk-roll-track block">{label}</span>
        <span aria-hidden="true" className="nwk-roll-track block">
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isLightOnDark
            ? "bg-[var(--nwk-carbon-black)] text-[var(--nwk-neutral-cream)]"
            : "bg-[var(--nwk-neutral-cream)] text-[var(--nwk-carbon-black)]",
        )}
      >
        <ArrowUpRight className="nwk-roll-arrow h-4 w-4" />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={sharedClasses}>
        {innerContent}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={sharedClasses}>
      {innerContent}
    </button>
  );
}
