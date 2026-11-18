import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: "light" | "dark";
  showArrow?: boolean;
  children: ReactNode;
}

export function TextLink({
  tone = "light",
  showArrow = false,
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 transition-colors duration-200 hover:underline",
        tone === "dark"
          ? "text-[var(--nwk-text-inverse)] hover:text-[var(--nwk-neutral-cream)]"
          : "text-[var(--nwk-text-primary)] hover:text-[var(--nwk-text-secondary)]",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}
