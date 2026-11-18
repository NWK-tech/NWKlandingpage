---
name: nwk-design-system
description: >-
  Governança dos tokens, tipografia, componentes reutilizáveis e Storybook do
  projeto NWK (src/tokens/foundations.ts, src/styles/tokens.css e src/components/ui/).
  Use ao criar, alterar ou documentar componentes de UI da NWK.
---

# NWK Design System

## Fonte de Verdade

Consulte `docs/DESIGN_SYSTEM.md`, `src/tokens/foundations.ts` e `src/styles/tokens.css`.

## Regras de Implementação

- Utilizar CSS Custom Properties (`--nwk-*`) e tokens Tailwind integrados via `@theme inline`; evitar hex hardcoded em componentes.
- Tipografia oficial atual: `Space Grotesk` (Display/Headings com `clamp()`) e `Inter` (Body/UI) via `next/font/google`.
- Cobrir estados interativos completos (`default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error`, `success`).
- Documentar componentes em `stories/` e validar com `pnpm build-storybook` após alterações no Design System.
