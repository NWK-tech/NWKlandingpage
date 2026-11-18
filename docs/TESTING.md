# NWK — Estratégia de Testes

- **Unitários & Componentes (Vitest + Testing Library)**: `tests/unit/contact-schema.test.ts` e `tests/unit/components.test.tsx`.
- **E2E & Acessibilidade (Playwright + axe-core)**: `tests/e2e/landing.spec.ts` validando carregamento sem erros de console, responsividade de `320px` a `1920px` sem overflow horizontal, interações (accordion, metodologia, formulário, menu mobile), `prefers-reduced-motion` e conformidade WCAG 2.2 AA.
- **Storybook**: Build estático (`pnpm build-storybook`) validando isolamento dos componentes.
