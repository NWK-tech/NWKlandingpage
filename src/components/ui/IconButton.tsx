import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "default" | "outline" | "inverse";
  size?: "sm" | "md";
  children: ReactNode;
}

const variantClasses: Record<NonNullable<IconButtonProps["variant"]>, string> = {
  default:
    "bg-[var(--nwk-neutral-cream)] text-[var(--nwk-text-primary)] hover:bg-[var(--nwk-silver-gray)]",
  outline:
    "border border-[var(--nwk-border-strong)] bg-transparent text-[var(--nwk-text-primary)] hover:border-[var(--nwk-carbon-black)]",
  inverse:
    "border border-[var(--nwk-border-dark-strong)] bg-transparent text-[var(--nwk-text-inverse)] hover:bg-white/10",
};

const sizeClasses: Record<NonNullable<IconButtonProps["size"]>, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
};

export function IconButton({
  label,
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
