import { cn } from "@/lib/cn";

export interface DividerProps {
  tone?: "light" | "dark";
  className?: string;
}

export function Divider({ tone = "light", className }: DividerProps) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0",
        tone === "dark" ? "bg-[var(--nwk-border-dark-subtle)]" : "bg-[var(--nwk-border-subtle)]",
        className,
      )}
    />
  );
}
