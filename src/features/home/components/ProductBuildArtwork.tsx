import { forwardRef } from "react";

const NODES = [
  [170, 150],
  [320, 110],
  [470, 170],
  [230, 300],
  [400, 330],
  [330, 215],
] as const;

const STRAYS = [
  [90, 80],
  [560, 90],
  [60, 250],
  [590, 260],
  [130, 400],
  [500, 420],
  [280, 40],
  [380, 450],
  [220, 200],
  [450, 260],
] as const;

const EDGES = [
  [0, 1],
  [1, 2],
  [0, 5],
  [5, 2],
  [5, 3],
  [5, 4],
  [3, 4],
  [1, 5],
] as const;

const CODE_ROWS: ReadonlyArray<readonly [number, number, number]> = [
  [226, 234, 190],
  [226, 252, 240],
  [244, 270, 150],
  [244, 288, 210],
  [226, 306, 120],
  [226, 324, 230],
  [244, 342, 170],
  [226, 360, 90],
];

const CHECKS = ["Funcional", "Responsivo", "Acessível"] as const;
const GREEN = "#6ee7b7";

export type ArtworkStage = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Ilustração SVG "da ideia ao produto", renderizada no estado de uma etapa (1–6).
 * Elementos marcados com `data-new` são os que surgem NESTA etapa (a seção os
 * anima ao entrar). `tone` troca o traço para fundos claros.
 * Etapas: 1 problema · 2 arquitetura · 3 interface · 4 código · 5 verificações · 6 publicado.
 */
export const ProductBuildArtwork = forwardRef<
  SVGSVGElement,
  { stage?: ArtworkStage; tone?: "light" | "dark" }
>(function ProductBuildArtwork({ stage = 6, tone = "light" }, ref) {
  const ink = tone === "light" ? "#F2F0EB" : "#131315";
  const surface = tone === "light" ? "#131315" : "#F2F0EB";
  const nodesDim = stage >= 3;
  const isNew = (s: number) => (stage === s ? true : undefined);

  return (
    <svg
      ref={ref}
      viewBox="0 0 640 480"
      role="img"
      aria-label="Ilustração do estágio atual: uma ideia dispersa se organiza em arquitetura, interface, código, testes e produto publicado"
      className="h-auto w-full"
      style={{ color: ink }}
    >
      {stage === 1 ? (
        <g>
          {STRAYS.map(([x, y]) => (
            <circle key={`${x}-${y}`} data-new data-stray cx={x} cy={y} r={3} fill="currentColor" opacity={0.7} />
          ))}
        </g>
      ) : null}

      <g opacity={nodesDim ? 0.18 : 1}>
        {stage >= 2
          ? EDGES.map(([a, b]) => (
              <path
                key={`${a}-${b}`}
                data-new={isNew(2)}
                data-edge
                d={`M${NODES[a]![0]} ${NODES[a]![1]}L${NODES[b]![0]} ${NODES[b]![1]}`}
                pathLength={1}
                stroke="currentColor"
                strokeOpacity={0.35}
                fill="none"
              />
            ))
          : null}
        {NODES.map(([x, y]) => (
          <circle key={`${x}-${y}`} data-new={isNew(1)} cx={x} cy={y} r={stage === 1 ? 4.5 : 5.5} fill="currentColor" />
        ))}
      </g>

      {stage >= 3 ? (
        <g data-new={isNew(3)} data-frame stroke="currentColor" fill="none" strokeWidth={1.4}>
          <rect x={110} y={80} width={420} height={320} rx={16} fill={surface} stroke="none" />
          <rect x={110} y={80} width={420} height={320} rx={16} fill="currentColor" fillOpacity={stage >= 4 ? 0.1 : 0.05} />
          <path d="M110 116H530" strokeOpacity={0.5} />
          <circle cx={130} cy={98} r={3} fill="currentColor" />
          <circle cx={144} cy={98} r={3} fill="currentColor" />
          <circle cx={158} cy={98} r={3} fill="currentColor" />
          <rect x={126} y={132} width={70} height={252} rx={8} strokeOpacity={0.6} />
          <rect x={212} y={132} width={100} height={70} rx={8} strokeOpacity={0.6} />
          <rect x={324} y={132} width={100} height={70} rx={8} strokeOpacity={0.6} />
          <rect x={436} y={132} width={78} height={70} rx={8} strokeOpacity={0.6} />
          <rect x={212} y={216} width={302} height={168} rx={8} strokeOpacity={0.6} />
        </g>
      ) : null}

      {stage >= 4 ? (
        <g fill="currentColor">
          {CODE_ROWS.map(([x, y, w]) => (
            <rect
              key={`${x}-${y}`}
              data-new={isNew(4)}
              data-code
              x={x}
              y={y}
              width={w}
              height={6}
              rx={3}
              opacity={0.75}
              style={{ transformBox: "fill-box", transformOrigin: "left center" }}
            />
          ))}
          {[142, 154, 166].map((y, i) => (
            <rect
              key={y}
              data-new={isNew(4)}
              data-code
              x={140}
              y={y}
              width={36 - i * 6}
              height={5}
              rx={2.5}
              opacity={0.5}
              style={{ transformBox: "fill-box", transformOrigin: "left center" }}
            />
          ))}
        </g>
      ) : null}

      {stage >= 5 ? (
        <g data-new={isNew(5)} data-checks>
          <rect x={352} y={326} width={206} height={118} rx={14} fill={surface} stroke="currentColor" strokeOpacity={0.4} />
          {CHECKS.map((label, i) => (
            <g key={label} transform={`translate(374 ${356 + i * 28})`}>
              <circle r={8} fill="none" stroke={GREEN} strokeWidth={1.4} />
              <path
                data-tick
                d="M-3.5 0.5L-1 3L3.8-2.6"
                pathLength={1}
                fill="none"
                stroke={GREEN}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={20} y={4} fontSize={13} fill="currentColor" fontFamily="var(--font-sans), Inter, sans-serif">
                {label}
              </text>
            </g>
          ))}
        </g>
      ) : null}

      {stage >= 6 ? (
        <>
          <g data-new data-live>
            <rect x={400} y={44} width={130} height={26} rx={13} fill="none" stroke={GREEN} strokeOpacity={0.7} />
            <circle cx={418} cy={57} r={4} fill={GREEN} />
            <text x={430} y={61.5} fontSize={12} fill={tone === "light" ? GREEN : "#0f7a55"} fontFamily="var(--font-sans), Inter, sans-serif">
              Publicado
            </text>
          </g>
          <g>
            {[132, 190, 248].map((y) => (
              <rect
                key={y}
                data-new
                data-module
                x={548}
                y={y}
                width={62}
                height={46}
                rx={10}
                fill="currentColor"
                fillOpacity={0.1}
                stroke="currentColor"
                strokeOpacity={0.5}
                strokeDasharray="4 4"
                style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
              />
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
});
