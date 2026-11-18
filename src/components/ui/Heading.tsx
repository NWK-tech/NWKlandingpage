import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display" | "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  mutedText?: string;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}

const sizeClasses: Record<NonNullable<HeadingProps["size"]>, string> = {
  display: "text-display font-medium",
  h1: "text-h1 font-medium",
  h2: "text-h2 font-medium",
  h3: "text-h3 font-medium",
  h4: "text-lg sm:text-xl font-medium tracking-tight",
};

export function Heading({
  as: Tag = "h2",
  size = "h2",
  children,
  mutedText,
  tone = "light",
  id,
  className,
}: HeadingProps) {
  return (
    <Tag id={id} className={cn(sizeClasses[size], className)}>
      <span>{children}</span>
      {mutedText ? (
        <>
          {" "}
          <span
            className={cn(
              tone === "dark"
                ? "text-[var(--nwk-text-inverse-muted)]"
                : "text-[var(--nwk-text-muted)]",
            )}
          >
            {mutedText}
          </span>
        </>
      ) : null}
    </Tag>
  );
}
