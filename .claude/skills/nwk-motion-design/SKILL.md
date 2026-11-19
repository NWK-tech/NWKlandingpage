---
name: nwk-motion-design
description: >-
  Regras de coreografia de movimento, integração GSAP/Motion/Lenis e acessibilidade
  de animação específicas do projeto NWK (docs/MOTION_SYSTEM.md, src/lib/gsap.ts).
  Use ao implementar ou ajustar animações no site da NWK.
---

# NWK Motion Design

## Fonte de Verdade

Consulte `docs/MOTION_SYSTEM.md` e `src/lib/gsap.ts`.

## Arquitetura de Movimento

- **GSAP + ScrollTrigger**: sequências vinculadas ao scroll (`ManifestoSection`, `Parallax`, barra de progresso em `MethodologySection`).
- **Motion for React**: transições de estado de UI (`Accordion`, `Header`, `SolutionVisual`, `Reveal`).
- **Lenis**: suavização de scroll sincronizada ao `gsap.ticker` em `MotionAndScrollProvider.tsx`, sem scroll hijacking.

## Restrições Obrigatórias

- Nunca animar a mesma propriedade CSS com GSAP e Motion no mesmo elemento.
- Não atrasar o acesso/contraste da primeira dobra com `opacity: 0` no `HeroSection`.
- Respeitar `prefers-reduced-motion` e garantir cleanup via `useGSAP` e retorno de `useEffect`.
