"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Parallax multicamadas com Motion.
 *
 * Regra do projeto: GSAP e Motion nunca controlam a mesma propriedade do mesmo
 * elemento. O GSAP anima painel/contêiner (clip-path, scale, Flip); as camadas
 * daqui (filhos) só recebem x/y/rotate do Motion. O GSAP apenas *escreve* o
 * progresso do palco em um MotionValue (`StageProgressContext`).
 */
export interface StageProgress {
  progress: MotionValue<number>;
  pinned: boolean;
  lastIndex: number;
}
export const StageProgressContext = createContext<StageProgress | null>(null);

interface ParallaxSource {
  /** -1 (ainda não chegou) … 0 (em foco) … 1 (já passou). */
  local: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
}
const SourceContext = createContext<ParallaxSource | null>(null);

export function ParallaxScope({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useContext(StageProgressContext);
  const stageRef = useRef(stage);
  useLayoutEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 110, damping: 22, mass: 0.5 });
  const py = useSpring(pointerY, { stiffness: 110, damping: 22, mass: 0.5 });

  const local = useTransform(() => {
    const s = stageRef.current;
    if (s?.pinned) return s.progress.get() * s.lastIndex - index;
    return (scrollYProgress.get() - 0.5) * 2;
  });

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <SourceContext.Provider value={{ local, px, py }}>
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={className}>
        {children}
      </div>
    </SourceContext.Provider>
  );
}

export function ParallaxLayer({
  depth = 1,
  rotate = 0,
  className,
  style,
  children,
}: {
  /** Maior = mais próximo da câmera (move mais). Negativo = fundo. */
  depth?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const source = useContext(SourceContext);
  const reduce = useReducedMotion();
  const y = useTransform(() =>
    !source || reduce ? 0 : source.local.get() * depth * -56 + source.py.get() * depth * 16,
  );
  const x = useTransform(() => (!source || reduce ? 0 : source.px.get() * depth * 26));
  const r = useTransform(() =>
    !source || reduce ? rotate : rotate + source.local.get() * depth * 1.2,
  );

  return (
    <motion.div className={className} style={{ ...style, x, y, rotate: r }}>
      {children}
    </motion.div>
  );
}
