# AGENTS.md — Diretrizes Permanentes do Projeto NWK

## Identidade e Posicionamento

- A **NWK** é uma empresa de tecnologia, engenharia de software e desenvolvimento de soluções digitais.
- Nunca caracterize a NWK como portfólio pessoal, freelancer, agência de marketing ou empresa exclusiva de sites/IA.
- Nunca invente clientes, contratos, depoimentos, métricas comerciais, prêmios, anos de experiência, endereço, telefone, CNPJ ou interfaces reais inexistentes.

## Identidade Visual e Design System

- **Paleta base**: Carbon Black (`#131315`), Graphite (`#232429`), Pure White (`#FFFFFF`), Soft White (`#FAFAF8`), Neutral Cream (`#F2F0EB`), Silver Gray (`#D9DBDE`), Steel Gray (`#6B7078`).
- **Proporção**: privilegie branco, off-white, preto e grafite. Use creme estrategicamente sem tornar o visual amarelado.
- **Restrições**: não use bronze, dourado, gradientes roxos, neon indiscriminado, estética vintage/editorial impressa, emojis na UI ou loading screens bloqueantes.
- **Tokens**: utilize CSS Custom Properties definidas em `src/styles/tokens.css` e `src/tokens/foundations.ts`. Evite valores hexadecimais hardcoded em componentes.

## Arquitetura e Código

- Mantenha conteúdo institucional centralizado e tipado em `src/content/` e `src/config/site.ts`.
- Priorize Server Components; use `"use client"` apenas quando houver interatividade ou hooks de navegador/motion.
- Centralize a configuração do GSAP em `src/lib/gsap.ts` e faça cleanup adequado (`useGSAP` ou `return () => ...`).
- Nunca permita que GSAP e Motion controlem simultaneamente a mesma propriedade do mesmo elemento.
- Respeite `prefers-reduced-motion` em todas as animações.

## Validações Obrigatórias Antes de Concluir Alterações

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm test`
4. `pnpm build`
5. `pnpm build-storybook` (quando componentes do Design System forem alterados)
6. `pnpm test:e2e` (para alterações em fluxos, layout ou acessibilidade)

## Política de Git

- Mantenha `main` como branch principal.
- Não execute commits, pushes ou deploys automáticos sem autorização explícita.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
