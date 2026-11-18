# NWK — Sistema Global de Motion

## Divisão de Responsabilidades

- **GSAP + ScrollTrigger** (`src/lib/gsap.ts`): Animações vinculadas à rolagem (`ManifestoAboutSection` progressão de opacidade por palavra, barra de progressão contínua em `MethodologySection`, entrada e parallax da escultura em `HeroSculpture`).
- **Motion for React** (`motion/react`): Transições de estado de interface (`Header` indicador ativo e menu mobile, `SolutionsSection` detalhe contextual, `ProjectsSection` Product Stage com `AnimatePresence`, `MethodologySection` painel de etapa, `Reveal`).
- **Lenis** (`MotionAndScrollProvider.tsx`): Suavização controlada de rolagem sincronizada ao `gsap.ticker`, desativada automaticamente quando `prefers-reduced-motion: reduce` está ativo.

## Regras de Prevenção de Conflitos e Performance

1. **Propriedade única**: GSAP e Motion nunca animam a mesma propriedade CSS no mesmo elemento.
2. **GPU-friendly**: Prioridade a `transform` (`translate3d`, `scale`) e `opacity`.
3. **Cleanup**: Todas as instâncias GSAP usam `useGSAP` com `scope`; Lenis e listeners são destruídos no `return` do `useEffect`.
4. **Acessibilidade**: `MotionConfig reducedMotion="user"` global + `prefersReducedMotion()` antes de registrar animações GSAP/Lenis + CSS `@media (prefers-reduced-motion: reduce)` em `globals.css`.
