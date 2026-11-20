import type { BlueprintArtPattern } from "@/types/content";

/**
 * Arte geométrica monocromática gerada para cada capa de Caderno de Engenharia.
 * Usa `currentColor` e opacidades graduadas para preservar rigor arquitetural
 * em superfícies escuras (Carbon/Graphite) e claras (Cream/Soft White).
 */
export function BlueprintCoverArt({
  pattern,
  className,
}: {
  pattern: BlueprintArtPattern;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 140"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {pattern === "architecture-grid" && (
        <g stroke="currentColor">
          <rect x="14" y="14" width="192" height="112" rx="8" strokeOpacity="0.22" />
          <line x1="78" y1="14" x2="78" y2="126" strokeOpacity="0.2" />
          <line x1="142" y1="14" x2="142" y2="126" strokeOpacity="0.2" />
          <line x1="14" y1="52" x2="206" y2="52" strokeOpacity="0.2" />
          <line x1="14" y1="90" x2="206" y2="90" strokeOpacity="0.2" />
          <rect x="26" y="24" width="40" height="18" rx="4" fill="currentColor" fillOpacity="0.16" strokeOpacity="0.6" />
          <rect x="90" y="62" width="40" height="18" rx="4" fill="currentColor" fillOpacity="0.26" strokeOpacity="0.85" />
          <rect x="154" y="98" width="40" height="18" rx="4" fill="currentColor" fillOpacity="0.16" strokeOpacity="0.6" />
          <path d="M66 33H110V62" strokeOpacity="0.7" strokeDasharray="3 3" />
          <path d="M130 71H174V98" strokeOpacity="0.7" strokeDasharray="3 3" />
        </g>
      )}

      {pattern === "signal-waves" && (
        <g stroke="currentColor">
          <circle cx="110" cy="70" r="14" fill="currentColor" fillOpacity="0.18" strokeOpacity="0.9" strokeWidth="1.5" />
          <circle cx="110" cy="70" r="30" strokeOpacity="0.5" strokeDasharray="4 3" />
          <circle cx="110" cy="70" r="46" strokeOpacity="0.32" />
          <circle cx="110" cy="70" r="62" strokeOpacity="0.16" />
          <line x1="18" y1="70" x2="96" y2="70" strokeOpacity="0.45" />
          <line x1="124" y1="70" x2="202" y2="70" strokeOpacity="0.45" />
          <circle cx="44" cy="70" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="176" cy="70" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="110" cy="24" r="3" fill="currentColor" stroke="none" opacity="0.75" />
          <circle cx="110" cy="116" r="3" fill="currentColor" stroke="none" opacity="0.75" />
        </g>
      )}

      {pattern === "mobile-layers" && (
        <g stroke="currentColor">
          <path d="M110 18L182 46L110 74L38 46Z" fill="currentColor" fillOpacity="0.08" strokeOpacity="0.45" />
          <path d="M110 42L182 70L110 98L38 70Z" fill="currentColor" fillOpacity="0.14" strokeOpacity="0.7" />
          <path d="M110 66L182 94L110 122L38 94Z" fill="currentColor" fillOpacity="0.22" strokeOpacity="0.92" />
          <circle cx="110" cy="94" r="5" fill="currentColor" stroke="none" />
          <line x1="110" y1="46" x2="110" y2="94" strokeOpacity="0.45" strokeDasharray="2 3" />
        </g>
      )}

      {pattern === "web-columns" && (
        <g stroke="currentColor">
          <rect x="20" y="16" width="180" height="108" rx="10" strokeOpacity="0.45" />
          <line x1="20" y1="36" x2="200" y2="36" strokeOpacity="0.35" />
          <circle cx="34" cy="26" r="2.2" fill="currentColor" stroke="none" opacity="0.7" />
          <circle cx="42" cy="26" r="2.2" fill="currentColor" stroke="none" opacity="0.5" />
          <circle cx="50" cy="26" r="2.2" fill="currentColor" stroke="none" opacity="0.35" />
          <rect x="32" y="48" width="44" height="62" rx="4" fill="currentColor" fillOpacity="0.08" strokeOpacity="0.35" />
          <rect x="86" y="48" width="48" height="28" rx="4" fill="currentColor" fillOpacity="0.2" strokeOpacity="0.75" />
          <rect x="144" y="48" width="44" height="28" rx="4" fill="currentColor" fillOpacity="0.12" strokeOpacity="0.5" />
          <rect x="86" y="84" width="102" height="26" rx="4" fill="currentColor" fillOpacity="0.08" strokeOpacity="0.4" />
        </g>
      )}

      {pattern === "pipeline-nodes" && (
        <g stroke="currentColor">
          <path d="M28 42H82L108 70H192" strokeOpacity="0.75" strokeWidth="1.5" />
          <path d="M28 98H82L108 70" strokeOpacity="0.45" strokeDasharray="4 3" />
          <circle cx="28" cy="42" r="7" fill="currentColor" fillOpacity="0.2" strokeOpacity="0.9" />
          <circle cx="28" cy="98" r="7" fill="currentColor" fillOpacity="0.1" strokeOpacity="0.6" />
          <rect x="96" y="54" width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.2" strokeOpacity="0.9" />
          <circle cx="112" cy="70" r="4" fill="currentColor" stroke="none" />
          <circle cx="156" cy="70" r="6" fill="currentColor" fillOpacity="0.15" strokeOpacity="0.8" />
          <circle cx="192" cy="70" r="8" fill="currentColor" fillOpacity="0.25" strokeOpacity="0.95" />
        </g>
      )}

      {pattern === "token-matrix" && (
        <g stroke="currentColor">
          {[0, 1, 2, 3].map((col) =>
            [0, 1, 2].map((row) => {
              const x = 32 + col * 42;
              const y = 20 + row * 36;
              const highlighted = (col + row) % 3 === 0;
              return (
                <rect
                  key={`${col}-${row}`}
                  x={x}
                  y={y}
                  width="30"
                  height="26"
                  rx="6"
                  fill="currentColor"
                  fillOpacity={highlighted ? 0.24 : 0.05}
                  strokeOpacity={highlighted ? 0.85 : 0.3}
                />
              );
            }),
          )}
        </g>
      )}
    </svg>
  );
}
