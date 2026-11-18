# NWK — Padrões de Qualidade

Complemento a `docs/TESTING.md`, `docs/ACCESSIBILITY.md` e `docs/QUALITY_REPORT.md`:

1. **Verificação estática**: `pnpm typecheck` e `pnpm lint` sem erros.
2. **Testes automatizados**: `pnpm test` (Vitest + Testing Library) e `pnpm test:e2e` (Playwright + `@axe-core/playwright`).
3. **Builds**: `pnpm build` (Next.js) e `pnpm build-storybook` (Storybook).
4. **Acessibilidade**: Conformidade WCAG 2.2 AA e respeito a `prefers-reduced-motion`.
5. **Auditoria visual**: Inspeção obrigatória de screenshots desktop e mobile antes de encerrar alterações visuais.
