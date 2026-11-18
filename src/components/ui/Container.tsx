import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps {
  children: ReactNode;
  size?: "narrow" | "default" | "wide";
  className?: string;
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-[54rem]",
  default: "max-w-[78rem]",
  wide: "max-w-[90rem]",
};

export function Container({ children, size = "default", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
