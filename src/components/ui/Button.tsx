import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "outline-dark";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)] hover:bg-[var(--nwk-graphite)] active:scale-[0.985]",
  secondary:
    "border border-[var(--nwk-border-strong)] bg-transparent text-[var(--nwk-text-primary)] hover:border-[var(--nwk-carbon-black)] hover:bg-[var(--nwk-neutral-cream)]",
  ghost:
    "bg-transparent text-[var(--nwk-text-primary)] hover:bg-[var(--nwk-neutral-cream)]",
  inverse:
    "bg-[var(--nwk-neutral-cream)] text-[var(--nwk-carbon-black)] hover:bg-white active:scale-[0.985]",
  "outline-dark":
    "border border-white/25 bg-white/[0.06] text-[var(--nwk-soft-white)] backdrop-blur-sm hover:border-white/45 hover:bg-white/[0.14]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs tracking-wide",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm sm:h-13 sm:px-7 sm:text-base",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    iconRight,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out cursor-pointer select-none whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkProps } = rest as Omit<ButtonAsLink, keyof BaseButtonProps>;
    return (
      <a href={href} className={classes} {...linkProps}>
        <span>{children}</span>
        {iconRight ? <span className="inline-flex shrink-0">{iconRight}</span> : null}
      </a>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof BaseButtonProps>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonProps}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      <span>{children}</span>
      {!loading && iconRight ? <span className="inline-flex shrink-0">{iconRight}</span> : null}
    </button>
  );
}
