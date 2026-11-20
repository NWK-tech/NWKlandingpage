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

const SIDEBAR_NAV = [
  { label: "Visão geral", active: true },
  { label: "Arquitetura", active: false },
  { label: "Domínio", active: false },
  { label: "Integrações", active: false },
  { label: "Telemetria", active: false },
] as const;

const CODE_LINES: ReadonlyArray<{
  ln: string;
  indent: number;
  kw: string;
  barW: number;
  accent?: boolean;
}> = [
  { ln: "01", indent: 0, kw: "export", barW: 118, accent: true },
  { ln: "02", indent: 12, kw: "schema:", barW: 136 },
  { ln: "03", indent: 12, kw: "async", barW: 104, accent: true },
  { ln: "04", indent: 24, kw: "await", barW: 128 },
  { ln: "05", indent: 24, kw: "verify", barW: 92 },
  { ln: "06", indent: 12, kw: "return", barW: 110, accent: true },
];

const CHECKS = ["Funcional", "Responsivo", "Acessível"] as const;
const GREEN = "#6ee7b7";
const GREEN_DARK = "#0f7a55";
const FONT = "var(--font-sans), Inter, sans-serif";
const MONO = "var(--font-mono), ui-monospace, SFMono-Regular, monospace";

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
  const accent = tone === "light" ? GREEN : GREEN_DARK;
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
          {/* Moldura da janela */}
          <rect x={110} y={80} width={420} height={320} rx={16} fill={surface} stroke="none" />
          <rect x={110} y={80} width={420} height={320} rx={16} fill="currentColor" fillOpacity={stage >= 4 ? 0.08 : 0.05} />
          <path d="M110 116H530" strokeOpacity={0.5} />
          <circle cx={130} cy={98} r={3} fill="currentColor" />
          <circle cx={144} cy={98} r={3} fill="currentColor" />
          <circle cx={158} cy={98} r={3} fill="currentColor" />

          {/* Barra de endereço / status no topo da janela */}
          <rect x={230} y={89} width={180} height={18} rx={9} fill="currentColor" fillOpacity={0.08} stroke="none" />
          <text
            x={320}
            y={101.5}
            textAnchor="middle"
            fontSize={9}
            fontFamily={MONO}
            fill="currentColor"
            stroke="none"
            opacity={0.65}
          >
            {stage === 3 ? "nwk.blueprint // design-system" : "nwk.core // production-ready"}
          </text>

          {/* 1. SIDEBAR COMPLETA (x=126 y=132 w=76 h=252) */}
          <rect x={126} y={132} width={76} height={252} rx={8} strokeOpacity={0.6} />
          <g stroke="none" fill="currentColor">
            {/* Cabeçalho da sidebar */}
            <circle cx={138} cy={148} r={4} fill={accent} />
            <text x={147} y={151} fontSize={8.5} fontWeight={600} fontFamily={FONT} opacity={0.9}>
              NWK Core
            </text>
            <rect x={132} y={160} width={64} height={1} opacity={0.18} />

            {/* Lista de navegação da sidebar */}
            {SIDEBAR_NAV.map((item, idx) => {
              const y = 176 + idx * 24;
              return (
                <g key={item.label}>
                  {item.active ? (
                    <rect x={131} y={y - 10} width={66} height={17} rx={4} fill="currentColor" fillOpacity={0.14} />
                  ) : null}
                  <circle
                    cx={137}
                    cy={y - 1.5}
                    r={2}
                    fill={item.active ? accent : "currentColor"}
                    opacity={item.active ? 1 : 0.45}
                  />
                  <text
                    x={143}
                    y={y + 1.5}
                    fontSize={7.8}
                    fontWeight={item.active ? 600 : 400}
                    fontFamily={FONT}
                    opacity={item.active ? 0.95 : 0.6}
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}

            {/* Card inferior de status na base da sidebar (preenche a metade inferior) */}
            <rect
              x={132}
              y={322}
              width={64}
              height={54}
              rx={6}
              fill="currentColor"
              fillOpacity={0.07}
              stroke="currentColor"
              strokeOpacity={0.25}
              strokeWidth={1}
            />
            <text x={138} y={336} fontSize={7.5} fontFamily={MONO} opacity={0.6}>
              RUNTIME
            </text>
            <text x={138} y={349} fontSize={8.5} fontWeight={600} fontFamily={FONT} opacity={0.9}>
              {stage === 3 ? "Layout v1" : "99.9% OK"}
            </text>
            <rect x={138} y={358} width={52} height={4} rx={2} fill="currentColor" fillOpacity={0.16} />
            <rect
              x={138}
              y={358}
              width={stage === 3 ? 30 : 46}
              height={4}
              rx={2}
              fill={stage >= 5 ? accent : "currentColor"}
              fillOpacity={0.85}
            />
          </g>

          {/* 2. CARD SUPERIOR 1 (x=212 y=132 w=98 h=70) — Arquitetura / API */}
          <rect x={212} y={132} width={98} height={70} rx={8} strokeOpacity={0.6} />
          <g stroke="none" fill="currentColor">
            <text x={222} y={148} fontSize={7.5} fontFamily={MONO} opacity={0.55}>
              {stage === 3 ? "ARQUITETURA" : "CORE API"}
            </text>
            <text x={222} y={163} fontSize={12} fontWeight={600} fontFamily={FONT} opacity={0.95}>
              {stage === 3 ? "Fluxos" : "18 ms"}
            </text>
            <circle cx={296} cy={146} r={3.5} fill={stage >= 4 ? accent : "currentColor"} opacity={0.85} />
            {/* Mini gráfico sparkline dentro do card 1 */}
            <path
              d="M222 188 L236 182 L250 185 L266 175 L282 178 L298 169"
              fill="none"
              stroke={stage >= 4 ? accent : "currentColor"}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
            <line
              x1={222}
              y1={192}
              x2={298}
              y2={192}
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth={1}
            />
          </g>

          {/* 3. CARD SUPERIOR 2 (x=320 y=132 w=98 h=70) — Design System / Módulos */}
          <rect x={320} y={132} width={98} height={70} rx={8} strokeOpacity={0.6} />
          <g stroke="none" fill="currentColor">
            <text x={330} y={148} fontSize={7.5} fontFamily={MONO} opacity={0.55}>
              {stage === 3 ? "DESIGN SYSTEM" : "UI MODULAR"}
            </text>
            <text x={330} y={163} fontSize={12} fontWeight={600} fontFamily={FONT} opacity={0.95}>
              {stage === 3 ? "Tokens" : "60 FPS"}
            </text>
            {/* Mini gráfico de barras verticais dentro do card 2 */}
            {[
              [332, 10],
              [344, 15],
              [356, 12],
              [368, 18],
              [380, 16],
              [392, 21],
            ].map(([bx, bh], idx) => (
              <rect
                key={bx}
                x={bx}
                y={192 - bh!}
                width={7}
                height={bh}
                rx={2}
                fill={idx >= 4 && stage >= 4 ? accent : "currentColor"}
                opacity={idx >= 4 ? 0.9 : 0.45}
              />
            ))}
          </g>

          {/* 4. CARD SUPERIOR 3 (x=428 y=132 w=86 h=70) — Contratos / Tipagem */}
          <rect x={428} y={132} width={86} height={70} rx={8} strokeOpacity={0.6} />
          <g stroke="none" fill="currentColor">
            <text x={438} y={148} fontSize={7.5} fontFamily={MONO} opacity={0.55}>
              {stage === 3 ? "CONTRATOS" : "TIPAGEM"}
            </text>
            <text x={438} y={163} fontSize={11.5} fontWeight={600} fontFamily={FONT} opacity={0.95}>
              {stage === 3 ? "Schema" : "100%"}
            </text>
            <text x={438} y={188} fontSize={8} fontFamily={FONT} opacity={0.65}>
              {stage === 3 ? "Validado" : "Strict TS"}
            </text>
            {/* Medidor circular (ring gauge) à direita do card 3 */}
            <circle
              cx={492}
              cy={174}
              r={13}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth={2.5}
            />
            <circle
              cx={492}
              cy={174}
              r={13}
              fill="none"
              stroke={stage >= 4 ? accent : "currentColor"}
              strokeWidth={2.5}
              strokeDasharray="66 82"
              strokeLinecap="round"
            />
          </g>

          {/* 5. PAINEL PRINCIPAL (x=212 y=216 w=302 h=168) */}
          <rect x={212} y={216} width={302} height={168} rx={8} strokeOpacity={0.6} />

          {/* Conteúdo rico do Painel Principal na Etapa 3 (Design e arquitetura) */}
          {stage === 3 ? (
            <g stroke="currentColor">
              {/* Barra superior de abas do wireframe */}
              <line x1={212} y1={240} x2={514} y2={240} strokeOpacity={0.35} />
              <g stroke="none" fill="currentColor">
                <rect x={222} y={223} width={64} height={12} rx={4} fillOpacity={0.16} />
                <text x={254} y={232} textAnchor="middle" fontSize={7.5} fontFamily={FONT} fontWeight={600}>
                  Componentes
                </text>
                <text x={318} y={232} textAnchor="middle" fontSize={7.5} fontFamily={FONT} opacity={0.55}>
                  Fluxo de Dados
                </text>
                <text x={498} y={232} textAnchor="end" fontSize={7.5} fontFamily={MONO} opacity={0.55}>
                  GRID 12 COL
                </text>
              </g>

              {/* Card Esquerdo do Blueprint: Especificação de Interface */}
              <rect x={224} y={250} width={136} height={122} rx={6} strokeOpacity={0.4} fill="currentColor" fillOpacity={0.04} />
              <g stroke="none" fill="currentColor">
                <circle cx={240} cy={268} r={7} fill={accent} fillOpacity={0.25} />
                <circle cx={240} cy={268} r={3} fill={accent} />
                <text x={253} y={266} fontSize={8.5} fontWeight={600} fontFamily={FONT}>
                  Painel Operacional
                </text>
                <text x={253} y={276} fontSize={7.5} fontFamily={FONT} opacity={0.55}>
                  Estados & Acessibilidade
                </text>
                {/* Mini controles de UI */}
                <rect x={234} y={288} width={116} height={18} rx={4} fillOpacity={0.1} />
                <text x={242} y={300} fontSize={7.5} fontFamily={MONO} opacity={0.75}>
                  input.validated === true
                </text>
                <rect x={234} y={314} width={54} height={16} rx={4} fill={accent} fillOpacity={0.22} />
                <text x={261} y={325} textAnchor="middle" fontSize={7.5} fontWeight={600} fontFamily={FONT}>
                  Confirmar
                </text>
                <rect x={294} y={314} width={56} height={16} rx={4} fillOpacity={0.1} />
                <text x={322} y={325} textAnchor="middle" fontSize={7.5} fontFamily={FONT} opacity={0.7}>
                  Cancelar
                </text>
                {/* Régua de tokens */}
                <text x={234} y={356} fontSize={7} fontFamily={MONO} opacity={0.55}>
                  SPACING: 8px / 16px / 24px
                </text>
              </g>

              {/* Card Direito do Blueprint: Topologia de Serviço */}
              <rect x={368} y={250} width={134} height={122} rx={6} strokeOpacity={0.4} fill="currentColor" fillOpacity={0.04} />
              <g stroke="none" fill="currentColor">
                <text x={378} y={266} fontSize={8} fontWeight={600} fontFamily={FONT}>
                  Topologia & Contratos
                </text>
                {/* 3 nós conectados dentro do card direito */}
                <rect x={378} y={278} width={114} height={20} rx={4} fillOpacity={0.12} />
                <circle cx={388} cy={288} r={2.5} fill={accent} />
                <text x={396} y={291} fontSize={7.8} fontFamily={FONT}>
                  1. Interface Cliente (SSR)
                </text>

                <rect x={378} y={306} width={114} height={20} rx={4} fillOpacity={0.12} />
                <circle cx={388} cy={316} r={2.5} fill="currentColor" opacity={0.8} />
                <text x={396} y={319} fontSize={7.8} fontFamily={FONT}>
                  2. Domínio & Validação
                </text>

                <rect x={378} y={334} width={114} height={20} rx={4} fillOpacity={0.12} />
                <circle cx={388} cy={344} r={2.5} fill="currentColor" opacity={0.8} />
                <text x={396} y={347} fontSize={7.8} fontFamily={FONT}>
                  3. Persistência & Eventos
                </text>
              </g>
            </g>
          ) : null}
        </g>
      ) : null}

      {/* Conteúdo do Painel Principal nas Etapas 4, 5 e 6 (Código tipado + Módulos ativos) */}
      {stage >= 4 ? (
        <g fill="currentColor">
          {/* Cabeçalho de abas do editor */}
          <line x1={212} y1={238} x2={514} y2={238} stroke="currentColor" strokeOpacity={0.3} />
          <rect x={220} y={221} width={86} height={13} rx={3.5} fill="currentColor" fillOpacity={0.14} />
          <circle cx={228} cy={227.5} r={2.2} fill={accent} />
          <text x={235} y={230.5} fontSize={7.8} fontWeight={600} fontFamily={MONO}>
            service.ts
          </text>
          <text x={320} y={230.5} fontSize={7.5} fontFamily={MONO} opacity={0.5}>
            schema.ts
          </text>
          <text x={502} y={230.5} textAnchor="end" fontSize={7.5} fontFamily={MONO} fill={accent}>
            ● strict
          </text>

          {/* Linhas de código estruturadas com números, keywords e barras animadas */}
          {CODE_LINES.map((row, idx) => {
            const y = 252 + idx * 19;
            return (
              <g key={row.ln}>
                <text x={222} y={y + 6} fontSize={8} fontFamily={MONO} opacity={0.38}>
                  {row.ln}
                </text>
                <text
                  x={240 + row.indent}
                  y={y + 6}
                  fontSize={8.2}
                  fontWeight={600}
                  fontFamily={MONO}
                  fill={row.accent ? accent : "currentColor"}
                  opacity={row.accent ? 0.95 : 0.7}
                >
                  {row.kw}
                </text>
                <rect
                  data-new={isNew(4)}
                  data-code
                  x={282 + row.indent}
                  y={y}
                  width={row.barW}
                  height={6}
                  rx={3}
                  fill={row.accent ? accent : "currentColor"}
                  opacity={row.accent ? 0.85 : 0.55}
                  style={{ transformBox: "fill-box", transformOrigin: "left center" }}
                />
              </g>
            );
          })}
        </g>
      ) : null}

      {/* Etapa 5+: Card flutuante de Homologação Técnica */}
      {stage >= 5 ? (
        <g data-new={isNew(5)} data-checks>
          <rect x={352} y={326} width={206} height={118} rx={14} fill={surface} stroke="currentColor" strokeOpacity={0.45} />
          {CHECKS.map((label, i) => (
            <g key={label} transform={`translate(374 ${356 + i * 28})`}>
              <circle r={8} fill="none" stroke={accent} strokeWidth={1.4} />
              <path
                data-tick
                d="M-3.5 0.5L-1 3L3.8-2.6"
                pathLength={1}
                fill="none"
                stroke={accent}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={20} y={4} fontSize={13} fill="currentColor" fontFamily={FONT}>
                {label}
              </text>
            </g>
          ))}
        </g>
      ) : null}

      {/* Etapa 6: Badge Publicado + 3 Cards de Evolução e Monitoramento preenchidos */}
      {stage >= 6 ? (
        <>
          <g data-new data-live>
            <rect x={400} y={44} width={130} height={26} rx={13} fill="none" stroke={accent} strokeOpacity={0.75} />
            <circle cx={418} cy={57} r={4} fill={accent} />
            <text x={430} y={61.5} fontSize={12} fill={accent} fontFamily={FONT} fontWeight={500}>
              Publicado
            </text>
          </g>
          <g>
            {[
              { y: 132, tag: "DEPLOY", title: "CI/CD", sub: "Ativo" },
              { y: 190, tag: "UPTIME", title: "99.9%", sub: "Estável" },
              { y: 248, tag: "RELEASE", title: "v2.4", sub: "Evolutivo" },
            ].map((mod) => (
              <g
                key={mod.y}
                data-new
                data-module
                style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
              >
                <rect
                  x={544}
                  y={mod.y}
                  width={78}
                  height={48}
                  rx={10}
                  fill="currentColor"
                  fillOpacity={0.08}
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeDasharray="4 4"
                />
                <circle cx={555} cy={mod.y + 14} r={2.5} fill={accent} />
                <text x={562} y={mod.y + 17} fontSize={7.2} fontFamily={MONO} fill="currentColor" opacity={0.65}>
                  {mod.tag}
                </text>
                <text x={553} y={mod.y + 31} fontSize={10.5} fontWeight={600} fontFamily={FONT} fill="currentColor">
                  {mod.title}
                </text>
                <text x={553} y={mod.y + 42} fontSize={7.8} fontFamily={FONT} fill={accent}>
                  {mod.sub}
                </text>
              </g>
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
});
