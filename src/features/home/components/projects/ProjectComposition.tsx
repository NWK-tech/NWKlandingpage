"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import type { ProjectItem } from "@/types/content";
import { cn } from "@/lib/cn";
import { PROJECT_MEDIA, type ProjectMedia } from "@/features/home/projectMedia";
import {
  PROJECT_PALETTE,
  DEFAULT_PALETTE,
  type ProjectPalette,
} from "@/features/home/projectPalette";
import { ParallaxLayer } from "./parallax";

/* ───────────────────────── molduras de dispositivo ───────────────────────── */

function BrowserFrame({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/12 bg-[#0c0d0f] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/12" />
        <span className="ml-3 truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 text-[10px] text-[#A0A4AC]">
          {label}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full">{children}</div>
    </div>
  );
}

function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[433/882] overflow-hidden rounded-[2rem] border-[5px] border-[#202126] bg-[#0c0d0f] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#202126]"
      />
      {children}
    </div>
  );
}

/** Tela com mídia real quando existir; senão, a representação conceitual. */
function MediaSlot({ media, fallback }: { media?: ProjectMedia; fallback: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [media]);

  if (!media) return <>{fallback}</>;
  if (media.kind === "video") {
    return (
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster}
        aria-label={media.alt}
      >
        {media.webm ? <source src={media.webm} type="video/webm" /> : null}
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.src} alt={media.alt} className="absolute inset-0 h-full w-full object-cover" />
  );
}

/* ───────────────────── representações conceituais (por produto) ───────────────────── */

type Variant = "sidebar" | "ledger" | "agent" | "chat" | "pipeline";

function Bar({ w, accent, strong }: { w: string; accent?: string; strong?: boolean }) {
  return (
    <span
      className="block h-1.5 rounded-full"
      style={{
        width: w,
        background: strong && accent ? accent : "rgba(255,255,255,0.14)",
        opacity: strong ? 0.85 : 1,
      }}
    />
  );
}

const SPARK = [30, 52, 38, 70, 46, 84, 60, 92, 66, 78] as const;

/** Faixa gráfica abstrata (sem dados reais) que preenche a tela conceitual. */
function Spark({ accent, className }: { accent: string; className: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute flex items-end gap-1", className)}>
      {SPARK.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-sm"
          style={{ height: `${h}%`, background: accent, opacity: i === 7 ? 0.8 : 0.16 }}
        />
      ))}
    </div>
  );
}

function ConceptScreen({
  project,
  variant,
  palette,
  compact,
}: {
  project: ProjectItem;
  variant: Variant;
  palette: ProjectPalette;
  compact?: boolean;
}) {
  const mods = project.conceptModules;
  const text = compact ? "text-[9px]" : "text-[10px] sm:text-[11px]";
  const head = (
    <div className="flex items-center justify-between gap-2">
      <span className={cn("font-medium text-white", text)}>{project.name}</span>
      <span
        className="rounded-full px-2 py-0.5 text-[8px]"
        style={{ color: palette.accent, background: `${palette.accent}1f` }}
      >
        {project.origin}
      </span>
    </div>
  );

  if (variant === "sidebar") {
    return (
      <div className="absolute inset-0 flex">
        <div className="w-[30%] space-y-1.5 border-r border-white/8 p-2.5">
          {mods.map((m, i) => (
            <div
              key={m}
              className={cn(
                "rounded-md px-2 py-1.5",
                text,
                i === 0 ? "text-white" : "text-[#A0A4AC]",
              )}
              style={i === 0 ? { background: `${palette.accent}26` } : undefined}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-3 p-3">
          {head}
          <p className={cn("font-medium text-[#F2F0EB]", text)}>{project.headline}</p>
          <div className="space-y-1.5">
            <Bar w="88%" />
            <Bar w="64%" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-10 rounded-md border border-white/8 bg-white/[0.03] p-1.5">
                <Bar w={`${60 + i * 12}%`} accent={palette.accent} strong={i === 0} />
              </div>
            ))}
          </div>
        </div>
        <Spark accent={palette.accent} className="right-3 bottom-3 left-[33%] h-[30%]" />
      </div>
    );
  }

  if (variant === "ledger") {
    return (
      <div className="absolute inset-0 space-y-3 p-3">
        {head}
        <div className="divide-y divide-white/8 rounded-lg border border-white/8">
          {mods.map((m, i) => (
            <div key={m} className="flex items-center justify-between gap-3 px-2.5 py-2">
              <span className={cn("text-[#F2F0EB]", text)}>{m}</span>
              <Bar w={`${46 - i * 8}px`} accent={palette.accent} strong={i === mods.length - 1} />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <Bar w="30%" accent={palette.accent} strong />
          <Bar w="18%" />
        </div>
        <Spark accent={palette.accent} className="inset-x-3 bottom-3 h-[30%]" />
      </div>
    );
  }

  if (variant === "agent") {
    return (
      <div className="absolute inset-0 flex">
        <div className="w-[38%] space-y-1.5 border-r border-white/8 p-2.5">
          <p className={cn("text-[#A0A4AC]", text)}>Fila</p>
          {mods.map((m, i) => (
            <div key={m} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: palette.accent, opacity: 1 - i * 0.3 }}
              />
              <span className={cn("text-[#F2F0EB]", text)}>{m}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          {head}
          <div className="ml-auto w-[70%] rounded-lg rounded-tr-sm bg-white/[0.06] p-2">
            <Bar w="90%" />
          </div>
          <div
            className="w-[78%] space-y-1.5 rounded-lg rounded-tl-sm p-2"
            style={{ background: `${palette.accent}1a` }}
          >
            <Bar w="95%" accent={palette.accent} strong />
            <Bar w="60%" />
          </div>
        </div>
        <Spark accent={palette.accent} className="right-3 bottom-3 left-[42%] h-[26%]" />
      </div>
    );
  }

  if (variant === "chat") {
    return (
      <div className="absolute inset-0 flex flex-col gap-2 px-3 pt-7 pb-3">
        {head}
        <div className="mt-1 w-[82%] rounded-2xl rounded-tl-sm bg-white/[0.07] p-2">
          <p className={cn("text-[#F2F0EB]", text)}>{project.headline}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {mods.map((m) => (
            <span
              key={m}
              className="rounded-full border px-2 py-1 text-[8px]"
              style={{ borderColor: `${palette.accent}55`, color: palette.accent }}
            >
              {m}
            </span>
          ))}
        </div>
        <div className="h-7 rounded-full border border-white/12 bg-white/[0.03]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 space-y-2.5 p-3">
      {head}
      <div className="grid grid-cols-3 gap-2">
        {mods.map((m, i) => (
          <div key={m} className="space-y-1.5">
            <p className={cn("text-[#A0A4AC]", text)}>{m}</p>
            {Array.from({ length: 3 - i }).map((_, k) => (
              <div key={k} className="rounded-md border border-white/8 bg-white/[0.03] p-1.5">
                <Bar w={`${55 + k * 14}%`} accent={palette.accent} strong={i === 2 && k === 0} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── fundo gráfico próprio por projeto ───────────────────── */

function Motif({ id, accent }: { id: string; accent: string }) {
  const common = "pointer-events-none absolute inset-0 h-full w-full";
  if (id === "fju-artes-marciais") {
    return (
      <svg
        className={common}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${-40 + i * 56} 320L${120 + i * 56} -20`}
            stroke={accent}
            strokeOpacity={0.1}
          />
        ))}
      </svg>
    );
  }
  if (id === "doce-certo") {
    return (
      <svg
        className={common}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[60, 110, 160].map((r) => (
          <circle key={r} cx={300} cy={80} r={r} fill="none" stroke={accent} strokeOpacity={0.09} />
        ))}
      </svg>
    );
  }
  if (id === "nwk-boss-ai") {
    return (
      <svg
        className={common}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[50, 90, 130, 170, 210].map((r, i) => (
          <ellipse
            key={r}
            cx={200}
            cy={150}
            rx={r * 1.5}
            ry={r * 0.6}
            fill="none"
            stroke={accent}
            strokeOpacity={0.12 - i * 0.015}
            transform="rotate(-18 200 150)"
          />
        ))}
      </svg>
    );
  }
  if (id === "zuri") {
    return (
      <svg
        className={common}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle
          cx={200}
          cy={150}
          r={118}
          fill="none"
          stroke={accent}
          strokeOpacity={0.18}
          strokeWidth={1.5}
        />
        <circle cx={200} cy={150} r={86} fill="none" stroke={accent} strokeOpacity={0.1} />
      </svg>
    );
  }
  return (
    <svg
      className={common}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M0 ${i * 40}H400`} stroke={accent} strokeOpacity={0.07} />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={`v${i}`} d={`M${i * 44} 0V300`} stroke={accent} strokeOpacity={0.05} />
      ))}
    </svg>
  );
}

/* ───────────────────────────── composições ───────────────────────────── */

export function ProjectComposition({ project }: { project: ProjectItem }) {
  const palette = PROJECT_PALETTE[project.id] ?? DEFAULT_PALETTE;
  const media = PROJECT_MEDIA[project.id] ?? {};
  const label = project.name;

  const desktop = (variant: Variant, className?: string) => (
    <BrowserFrame label={label} className={className}>
      <MediaSlot
        media={media.desktop}
        fallback={<ConceptScreen project={project} variant={variant} palette={palette} />}
      />
    </BrowserFrame>
  );
  const phone = (className?: string, compact = true) => (
    <PhoneFrame className={className}>
      <MediaSlot
        media={media.mobile}
        fallback={
          <ConceptScreen project={project} variant="chat" palette={palette} compact={compact} />
        }
      />
    </PhoneFrame>
  );
  const chip = (text: string, className: string, depth: number) => (
    <ParallaxLayer depth={depth} className={cn("absolute z-30", className)}>
      <span
        className="block rounded-full border bg-black/70 px-3 py-1.5 text-[10px] font-medium whitespace-nowrap sm:text-[11px]"
        style={{ borderColor: `${palette.accent}66`, color: palette.accent }}
      >
        {text}
      </span>
    </ParallaxLayer>
  );

  let scene: ReactNode;
  switch (project.id) {
    case "fju-artes-marciais":
      scene = (
        <>
          <ParallaxLayer depth={1} className="absolute top-[6%] left-0 w-[78%]">
            {desktop("sidebar")}
          </ParallaxLayer>
          <ParallaxLayer
            depth={2.4}
            rotate={3}
            className="absolute right-[2%] bottom-0 z-20 w-[27%]"
          >
            {phone()}
          </ParallaxLayer>
          {chip(project.conceptModules[0] ?? "", "top-0 right-[18%]", 3.2)}
        </>
      );
      break;
    case "doce-certo":
      scene = (
        <>
          <ParallaxLayer depth={0.8} className="absolute top-[10%] right-0 w-[80%]">
            {desktop("ledger")}
          </ParallaxLayer>
          {project.conceptModules.map((m, i) => (
            <Fragment key={m}>
              {chip(
                m,
                ["top-[2%] left-[4%]", "top-[44%] left-[-2%]", "bottom-[4%] left-[10%]"][i] ?? "",
                1.8 + i * 0.9,
              )}
            </Fragment>
          ))}
        </>
      );
      break;
    case "nwk-boss-ai":
      scene = (
        <>
          <ParallaxLayer depth={0.6} className="absolute top-[4%] left-[4%] w-[92%]">
            {desktop("agent")}
          </ParallaxLayer>
          <ParallaxLayer depth={2.6} className="absolute right-[6%] bottom-[2%] z-20 w-[56%]">
            <div
              className="rounded-xl border bg-black/75 p-3"
              style={{ borderColor: `${palette.accent}55` }}
            >
              <p className="mb-1.5 text-[9px] text-[#A0A4AC]">Contexto operacional</p>
              <div className="space-y-1.5">
                <Bar w="92%" accent={palette.accent} strong />
                <Bar w="70%" />
              </div>
            </div>
          </ParallaxLayer>
        </>
      );
      break;
    case "zuri":
      scene = (
        <>
          <ParallaxLayer
            depth={1}
            rotate={-9}
            className="absolute top-[4%] left-[14%] w-[33%] opacity-70"
          >
            {phone("scale-[0.96]", true)}
          </ParallaxLayer>
          <ParallaxLayer
            depth={2.4}
            rotate={4}
            className="absolute top-[12%] right-[14%] z-20 w-[36%]"
          >
            {phone(undefined, false)}
          </ParallaxLayer>
          {chip("Inferência local", "bottom-[8%] left-[18%]", 3.4)}
        </>
      );
      break;
    default:
      scene = (
        <>
          <ParallaxLayer depth={0.7} className="absolute top-[12%] right-0 w-[74%]">
            {desktop("pipeline")}
          </ParallaxLayer>
          <ParallaxLayer depth={2.2} className="absolute bottom-[2%] left-0 z-20 w-[52%]">
            <BrowserFrame label="Briefing técnico">
              <ConceptScreen project={project} variant="sidebar" palette={palette} compact />
            </BrowserFrame>
          </ParallaxLayer>
        </>
      );
  }

  const hasRealMedia = Boolean(media.desktop ?? media.mobile);
  return (
    <div className="w-full">
      <div className="relative mx-auto aspect-[16/11] w-full max-w-[760px]">
        <ParallaxLayer depth={-1.2} className="absolute -inset-[8%]">
          <Motif id={project.id} accent={palette.accent} />
        </ParallaxLayer>
        {scene}
      </div>
      {hasRealMedia ? null : (
        <p className="mt-3 text-center text-[11px] text-[#A0A4AC]">{project.conceptLabel}</p>
      )}
    </div>
  );
}
