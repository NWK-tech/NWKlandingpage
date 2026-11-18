"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { heroContent } from "@/content/home";
import { prefersReducedMotion } from "@/lib/gsap";

const SHEET_LOCAL_URL = "/images/propostas/hands-sheet.webp";
const SHEET_REMOTE_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261030_025250_100df7b8-31fd-4614-aa4a-c1b7d5b6b273.png&w=1600&q=85";

const SRC_RECTS = {
  LA: [0, 0.06, 0.47, 0.4] as const,
  RA: [0.53, 0.06, 0.47, 0.4] as const,
  LB: [0, 0.55, 0.47, 0.4] as const,
  RB: [0.53, 0.55, 0.47, 0.4] as const,
};

const LEVELS = [0, 0.26, 0.52, 0.78, 1] as const;
const LOOP = 20;

const DISCIPLINE_MARKS = [
  {
    name: "Sistemas",
    path: "M3 15c0-7 5-12 14-12-1 9-6 14-13 13l-1 2-2-1z",
  },
  {
    name: "IA Aplicada",
    path: "M10 1l8 4.5v9L10 19l-8-4.5v-9zM10 6l-4 2.3v4.4L10 15l4-2.3V8.3z",
  },
  {
    name: "Apps Mobile",
    path: "M1 5q4.5-3 9 0t9 0v3q-4.5 3-9 0t-9 0zm0 7q4.5-3 9 0t9 0v3q-4.5 3-9 0t-9 0z",
  },
  {
    name: "Plataformas Web",
    path: "M10 1a9 9 0 110 18 9 9 0 010-18zm0 3a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 110 6 3 3 0 010-6z",
  },
  {
    name: "Automações",
    path: "M1 17L7 6l3 5 3-7 6 13z",
  },
  {
    name: "Design Systems",
    path: "M10 1l9 4-9 4-9-4zm-9 8l9 4 9-4v3l-9 4-9-4zm0 5l9 4 9-4v2l-9 4-9-4z",
  },
] as const;

function hash(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function smooth(a: number, b: number, x: number): number {
  const u = clamp((x - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
}

function mixAt(t: number, on: number, off: number, dur: number): number {
  return smooth(on, on + dur, t) * (1 - smooth(off, off + dur, t));
}

declare global {
  interface Window {
    __render?: (t: number) => void;
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 1440;
    let H = 900;
    let DPR = 1;
    let step = 7;
    let rowStep = 14.35;
    let cols = 206;
    let rows = 63;
    let R = 3.22;
    let seeds = new Float32Array(cols * rows);

    const fA = document.createElement("canvas");
    const fB = document.createElement("canvas");
    const ctxA = fA.getContext("2d", { willReadFrequently: true });
    const ctxB = fB.getContext("2d", { willReadFrequently: true });

    let tiles: {
      LA: HTMLCanvasElement;
      RA: HTMLCanvasElement;
      LB: HTMLCanvasElement;
      RB: HTMLCanvasElement;
    } | null = null;

    const setupGrid = () => {
      const rect = section.getBoundingClientRect();
      W = Math.max(320, Math.floor(rect.width));
      H = Math.max(500, Math.floor(rect.height));
      DPR = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      step = Math.max(5, W / 205);
      rowStep = step * 2.05;
      cols = Math.ceil(W / step);
      rows = Math.ceil(H / rowStep);
      R = step * 0.46;

      fA.width = cols;
      fA.height = rows;
      fB.width = cols;
      fB.height = rows;

      seeds = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        const rowBias = 0.45 * hash(j * 3.1, 7.7);
        for (let i = 0; i < cols; i++) {
          seeds[j * cols + i] = 0.55 * hash(i, j) + rowBias;
        }
      }
    };

    setupGrid();

    const sliceSheetToTiles = (img: HTMLImageElement) => {
      const sw = img.naturalWidth || 1600;
      const sh = img.naturalHeight || 905;

      const makeTile = (rect: readonly [number, number, number, number]) => {
        const [rx, ry, rw, rh] = rect;
        const sx = rx * sw;
        const sy = ry * sh;
        const sWidth = rw * sw;
        const sHeight = rh * sh;

        const tileW = 420;
        const tileH = Math.max(1, Math.round(tileW * (sHeight / sWidth)));
        const c = document.createElement("canvas");
        c.width = tileW;
        c.height = tileH;
        const tCtx = c.getContext("2d");
        if (tCtx) {
          tCtx.imageSmoothingEnabled = true;
          tCtx.imageSmoothingQuality = "high";
          tCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, tileW, tileH);
        }
        return c;
      };

      tiles = {
        LA: makeTile(SRC_RECTS.LA),
        RA: makeTile(SRC_RECTS.RA),
        LB: makeTile(SRC_RECTS.LB),
        RB: makeTile(SRC_RECTS.RB),
      };
    };

    const drawHandIntoField = (
      fCtx: CanvasRenderingContext2D,
      tile: HTMLCanvasElement,
      isLeft: boolean,
      t: number,
    ) => {
      const a = (2 * Math.PI * t) / LOOP;
      const ph = isLeft ? 0 : Math.PI;
      const portrait = H > W;

      const hw = W * (portrait ? 0.66 : 0.53);
      const hh = (hw * (0.4 * 1520)) / (0.47 * 2688);
      const cy = H * (portrait ? 0.66 : 0.54);

      const reach =
        (0.035 * Math.sin(a + ph) + 0.012 * Math.sin(2 * a + 1.3 + ph)) * W;
      const scale = 1 + 0.07 * Math.sin(a + 0.9 + ph);
      const rot = (isLeft ? 1 : -1) * 0.045 * Math.sin(a + 2.1 + ph);

      const x = isLeft ? reach - W * 0.045 : W - hw + W * 0.045 - reach;
      const pivotX = isLeft ? 0 : W;

      fCtx.save();
      fCtx.setTransform(cols / W, 0, 0, rows / H, 0, 0);
      fCtx.translate(pivotX, cy);
      fCtx.rotate(rot);
      fCtx.scale(scale, scale);
      fCtx.translate(-pivotX, -cy);
      fCtx.drawImage(tile, x, cy - hh / 2, hw, hh);
      fCtx.restore();
    };

    const render = (rawTime: number) => {
      if (!tiles || !ctxA || !ctxB) return;

      const t = ((rawTime % LOOP) + LOOP) % LOOP;

      ctxA.setTransform(1, 0, 0, 1, 0, 0);
      ctxA.fillStyle = "#ffffff";
      ctxA.fillRect(0, 0, cols, rows);
      drawHandIntoField(ctxA, tiles.LA, true, t);
      drawHandIntoField(ctxA, tiles.RA, false, t);

      ctxB.setTransform(1, 0, 0, 1, 0, 0);
      ctxB.fillStyle = "#ffffff";
      ctxB.fillRect(0, 0, cols, rows);
      drawHandIntoField(ctxB, tiles.LB, true, t);
      drawHandIntoField(ctxB, tiles.RB, false, t);

      const dataA = ctxA.getImageData(0, 0, cols, rows).data;
      const dataB = ctxB.getImageData(0, 0, cols, rows).data;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0d0d0d";

      const mL = mixAt(t, 6.2, 14.6, 1.6);
      const mR = mixAt(t, 2.4, 10.4, 1.6);
      const halfCols = cols / 2;
      const tick = Math.floor(t * 7);
      const portrait = H > W;
      const quietWidth = portrait ? 0.44 : 0.2;
      const quietCenterY = portrait ? 0.33 : 0.385;

      for (let j = 0; j < rows; j++) {
        const cyDot = (j + 0.5) * rowStep;
        const ey = (cyDot / H - quietCenterY) / 0.085;

        let shift = 0;
        if (hash(j, tick) > 0.965) {
          shift = Math.round((hash(tick, j) - 0.5) * 8);
        }

        for (let i = 0; i < cols; i++) {
          const sampleI = shift === 0 ? i : clamp(i - shift, 0, cols - 1);
          const idx = j * cols + sampleI;
          const seed = seeds[idx] ?? 0;
          const m = i < halfCols ? mL : mR;

          const useB = seed < m;
          const pixelIndex = idx * 4;
          const red = (useB ? dataB[pixelIndex] : dataA[pixelIndex]) ?? 255;
          const lum = red / 255;

          let v = clamp((1 - lum - 0.16) / 0.42, 0, 1);
          if (v <= 0.001) continue;

          if (m > 0.001 && m < 0.999) {
            const distFront = Math.abs(seed - m);
            if (distFront < 0.12) {
              v *= distFront / 0.12;
              if (hash(i + tick, j) <= 0.4) {
                v *= 0.3;
              }
            }
          }

          v *= 0.86 + 0.14 * Math.sin(t * 3.2 + seed * 40);

          const cx = Math.abs((i + 0.5) / cols - 0.5);
          v *= smooth(0.035, 0.11, cx);

          const ex = cx / quietWidth;
          v *= smooth(0.85, 1.25, Math.hypot(ex, ey));

          let chosenLevel = 0;
          for (let k = LEVELS.length - 1; k >= 1; k--) {
            const lvl = LEVELS[k]!;
            if (v >= lvl - 0.13) {
              chosenLevel = lvl;
              break;
            }
          }

          if (chosenLevel === 0) continue;

          const radius = chosenLevel === 0.26 ? R * 0.38 : R * chosenLevel;
          const cxDot = (i + 0.5) * step;

          ctx.beginPath();
          ctx.arc(cxDot, cyDot, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    window.__render = render;

    let rafId = 0;
    let isVisible = true;
    const reduced = prefersReducedMotion();
    const t0 = performance.now();

    const loop = (now: number) => {
      if (isVisible) {
        render(reduced ? 0.8 : (now - t0) / 1000);
      }
      if (!reduced) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      sliceSheetToTiles(img);
      render(0.8);
      if (!reduced) {
        rafId = window.requestAnimationFrame(loop);
      }
    };
    img.onerror = () => {
      if (img.src !== SHEET_REMOTE_URL) {
        img.src = SHEET_REMOTE_URL;
      }
    };
    img.src = SHEET_LOCAL_URL;

    const onResize = () => {
      setupGrid();
      if (tiles) render(0.8);
    };

    window.addEventListener("resize", onResize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    observer.observe(section);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      delete window.__render;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative h-screen min-h-[660px] w-full overflow-hidden bg-[#f7f7f5] text-[#111111]"
    >
      {/* Live Dot-Matrix Halftone Hands Canvas */}
      <canvas
        ref={canvasRef}
        id="dots"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />

      {/* Centered Copy Block (with Quiet Zone in the dot-matrix canvas) */}
      <div className="absolute top-[20%] left-1/2 z-10 w-[min(92vw,720px)] -translate-x-1/2 text-center md:top-[24.5%]">
        <h1
          id="hero-heading"
          className="text-[clamp(38px,3.75vw,68px)] leading-[1.04] font-medium tracking-[-0.035em]"
        >
          <span className="block text-[#666666]">{heroContent.headlinePrimary}</span>
          <span className="block text-[#111111]">{heroContent.headlineSecondary}</span>
        </h1>

        <p className="mx-auto mt-[20px] max-w-[380px] text-[clamp(13px,1.02vw,15.5px)] leading-[1.4] text-[#595959]">
          {heroContent.description}
        </p>

        {/* CTA with Rainbow Underglow */}
        <div className="group relative mt-[clamp(34px,3.6vw,52px)] inline-block">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[10%] -bottom-[6px] left-[10%] h-[16px] rounded-[50%] bg-[linear-gradient(90deg,#ffcf5a,#7dffa8,#5ad7ff,#9b7bff,#ff6fd8,#ffb36b)] opacity-85 blur-[9px] transition-all duration-300 group-hover:-bottom-[9px] group-hover:opacity-100 group-hover:blur-[12px]"
          />
          <Link
            href={heroContent.primaryCta.href}
            className="relative inline-block rounded-full bg-[#111111] px-[22px] py-[11px] text-[13.5px] font-medium text-white transition-transform duration-300 group-hover:-translate-y-[1px] active:scale-[0.97]"
          >
            {heroContent.primaryCta.label}
          </Link>
        </div>
      </div>

      {/* Bottom Capabilities Row (with the exact 6 geometric 17x17 icons) */}
      <div
        aria-label="Frentes de atuação da NWK"
        className="absolute inset-x-0 bottom-[clamp(28px,6vh,64px)] z-10 flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[14px] px-4 text-[13px] font-medium tracking-[-0.01em] text-[#595959] md:gap-[clamp(26px,4.6vw,66px)] md:text-[clamp(14px,1.18vw,17px)]"
      >
        {DISCIPLINE_MARKS.map((item) => (
          <a
            key={item.name}
            href="#solucoes"
            className="inline-flex items-center gap-[7px] transition-colors hover:text-[#111111]"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-[17px] w-[17px] shrink-0 fill-current"
              aria-hidden="true"
            >
              <path d={item.path} />
            </svg>
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
