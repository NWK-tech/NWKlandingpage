# NWK — Estado Atual da Aplicação (2026-11-18)

Fonte de verdade sobre a estrutura real. Documentos históricos (`CREATIVE_CONCEPTS.md`, `REDESIGN_PLAN.md`, `VISUAL_AUDIT.md`, `ORIGINALITY_AUDIT.md`, `docs/QUALITY_REPORT.md`) são registros de versões anteriores.

## Ordem das seções (`src/app/page.tsx`)
Hero (`#inicio`, **protegida**) → Soluções (`#solucoes`, `StickyContentWrapper` + índice) → Projetos (`#projetos`) → Sobre/Manifesto (`#sobre`) → Metodologia (`#metodologia`) → Contato (`#contato`) → Footer.

## Seções pós-hero (rodada 3)
Soluções (sticky + vídeo opcional) → transição *scroll expand* → Projetos (`ProjectsSection`, `components/projects/*`: composição por projeto, Flip, parallax Motion) → Manifesto cinético → Metodologia (Scroll Stack) → Contato. Mídia real: `src/features/home/projectMedia.ts`; vídeos de Soluções: `public/videos/solutions/README.md`.

## Hero
Canvas 2D de meio-tom autocontido em `HeroSection.tsx` (spritesheet `public/images/propostas/hands-sheet.webp`, expõe `window.__render`). Não usa `HeroSculpture` nem `ShaderBackdrop`.

## Rotas experimentais
`/propostas`, `/propostas/a`, `/propostas/b` (`src/features/proposals/*`): protótipos; `DotMatrixHandsHero` é a origem da hero. Mantidas.

## Candidatos a remoção (nenhuma referência encontrada em `src/`, `stories/`, `tests/`)
- `src/features/home/components/HeroSculpture.tsx`, `src/components/motion/ShaderBackdrop.tsx`
- `public/images/hero-sculpture.jpg`, `manifesto-monolith.jpg`, `methodology-forge.jpg`, `solution-core.jpg`
Remover apenas com aprovação do proprietário (verificar antes se `/propostas/*` ou docs os citam por outro caminho).

## Identidade e referências
Ver `docs/CREATIVE_DIRECTION.md` e `docs/BRAND_BOOK.md`.
