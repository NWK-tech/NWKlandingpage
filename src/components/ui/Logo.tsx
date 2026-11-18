import { cn } from "@/lib/cn";

export interface LogoProps {
  variant?: "horizontal" | "symbol";
  tone?: "dark" | "light";
  className?: string;
  decorative?: boolean;
}

const SYMBOL_LEFT_RIBBON =
  "M4 11.67L31.56 31.79V39.68L10.07 23.62V34.16L4 38.59V11.67Z";
const SYMBOL_RIGHT_RIBBON =
  "M16.85 8.66L37.76 24.47V12.88L44 8.32V37.13L16.85 16.8V8.66Z";

const HORIZONTAL_LEFT_RIBBON =
  "M11.4 30.8L210.7 176.3V233.4L55.2 117.2V193.5L11.4 225.5V30.8Z";
const HORIZONTAL_RIGHT_RIBBON =
  "M104.3 9L255.5 123.4V39.5L300.7 6.5V214.9L104.3 67.9V9Z";
const HORIZONTAL_LETTER_N =
  "M348.3 67.5H373.8L433.9 129.5V67.5H461.5V172.5H436L376.6 110.5V172.5H348.3V67.5Z";
const HORIZONTAL_LETTER_W =
  "M467.5 67.5H497.7L518.8 128L541.5 67.5H562.5L585.2 128L606.3 67.5H635.2L598.5 172.5H573.5L552 112.5L530.5 172.5H505.5L467.5 67.5Z";
const HORIZONTAL_LETTER_K =
  "M641 67.5H669.3V105.5L712.5 67.5H747.5L695.5 117.5L748.5 172.5H715.5L675.5 132.5L669.3 138.8V172.5H641V67.5Z";

export function Logo({
  variant = "horizontal",
  tone = "dark",
  className,
  decorative = false,
}: LogoProps) {
  const fill = tone === "dark" ? "#131315" : "#FAFAF8";

  if (variant === "symbol") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className={cn("h-8 w-8 shrink-0", className)}
        aria-hidden={decorative || undefined}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : "NWK"}
      >
        <path d={SYMBOL_LEFT_RIBBON} fill={fill} />
        <path d={SYMBOL_RIGHT_RIBBON} fill={fill} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 760 240"
      fill="none"
      className={cn("h-9 w-auto shrink-0 select-none", className)}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "NWK"}
    >
      <path d={HORIZONTAL_LEFT_RIBBON} fill={fill} />
      <path d={HORIZONTAL_RIGHT_RIBBON} fill={fill} />
      <path d={HORIZONTAL_LETTER_N} fill={fill} />
      <path d={HORIZONTAL_LETTER_W} fill={fill} />
      <path d={HORIZONTAL_LETTER_K} fill={fill} />
    </svg>
  );
}
