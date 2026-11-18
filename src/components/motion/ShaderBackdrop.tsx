"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/gsap";

interface ShaderBackdropProps {
  className?: string;
  intensity?: number;
}

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_intensity;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
  vec2 uv = (v_uv - 0.5) * aspect;
  vec2 mouse = (u_mouse - 0.5) * aspect;

  float t = u_time * 0.14 + u_scroll * 0.6;
  float dist = length(uv - mouse * 0.35);

  vec2 q = vec2(
    fbm(uv * 1.45 + vec2(t * 0.6, -t * 0.35)),
    fbm(uv * 1.45 + vec2(-t * 0.4, t * 0.5) + vec2(5.2, 1.3))
  );

  float f = fbm(uv * 1.65 + 1.85 * q + vec2(0.0, t * 0.25));
  float ridge = 1.0 - abs(f * 2.0 - 1.0);
  ridge = pow(clamp(ridge, 0.0, 1.0), 2.6);

  float cursorGlow = exp(-dist * 2.4) * 0.16;

  // NWK Obsidian (#131315), Graphite (#232429), and Warm Cream (#F2F0EB) specular silk
  vec3 obsidian = vec3(0.0745, 0.0745, 0.0824);
  vec3 graphite = vec3(0.145, 0.149, 0.169);
  vec3 cream = vec3(0.949, 0.941, 0.922);
  vec3 silver = vec3(0.851, 0.859, 0.871);

  vec3 col = mix(obsidian, graphite, smoothstep(0.15, 0.85, f));
  col += cream * ridge * (0.14 * u_intensity);
  col += silver * pow(ridge, 4.0) * (0.12 * u_intensity);
  col += cream * cursorGlow * u_intensity;

  // Subtle architectural vignette
  float vignette = 1.0 - smoothstep(0.45, 1.35, length(uv));
  col *= mix(0.72, 1.0, vignette);

  outColor = vec4(col, 1.0);
}
`;

export function ShaderBackdrop({ className, intensity = 1 }: ShaderBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      setFallback(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setFallback(true);
      return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uScroll = gl.getUniformLocation(program, "u_scroll");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    let width = 1;
    let height = 1;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetMouseX = (e.clientX - rect.left) / rect.width;
      targetMouseY = 1 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(canvas);

    const reduced = prefersReducedMotion();
    let rafId = 0;
    const startTime = performance.now();

    const renderFrame = (now: number) => {
      if (isVisible) {
        mouseX += (targetMouseX - mouseX) * 0.06;
        mouseY += (targetMouseY - mouseY) * 0.06;

        const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 2);

        gl.useProgram(program);
        gl.enableVertexAttribArray(posLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(uTime, reduced ? 1.2 : (now - startTime) * 0.001);
        gl.uniform2f(uRes, width, height);
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.uniform1f(uScroll, reduced ? 0 : scrollProgress);
        gl.uniform1f(uIntensity, intensity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      if (!reduced) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [intensity]);

  if (fallback) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(242,240,235,0.12),rgba(19,19,21,0.98)_65%)]",
          className,
        )}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
