> **REGISTRO HISTÓRICO (2026-11-18)** — descreve uma versão anterior da aplicação e decisões já superadas (ex.: *Architectural Monolith*, NWK Culture como referência). Não é fonte de verdade sobre o código atual; ver `docs/CURRENT_STATE.md` e `docs/CREATIVE_DIRECTION.md`.

# NWK — Relatório de Qualidade e Homologação

## Ambiente de Validação

- **Sistema Operacional**: Windows
- **Node.js**: v24.20.0
- **Gerenciador de Pacotes**: pnpm 10.15.1
- **Navegador E2E**: Chromium (Playwright)

## Resultados das Verificações Executadas

| Verificação | Comando | Resultado | Observações |
|---|---|---|---|
| TypeScript (strict) | `pnpm typecheck` | Aprovado | 0 erros |
| ESLint | `pnpm lint` | Aprovado | 0 erros |
| Testes Unitários / Componentes | `pnpm test` | Aprovado | 2 arquivos, 6 testes aprovados |
| Build de Produção | `pnpm build` | Aprovado | Rotas `/`, `/robots.txt`, `/sitemap.xml` pré-renderizadas |
| Build do Storybook | `pnpm build-storybook` | Aprovado | Bundle estático gerado em `storybook-static/` |
| Testes E2E + axe-core WCAG 2.2 AA | `pnpm test:e2e` | Aprovado | 8 testes aprovados (desktop 1440x900 e mobile 390x844), 0 violações WCAG AA, 0 erros de console, 0 overflow entre 320px e 1920px; valida Matriz de Soluções, Product Stage (`role="tablist"` + teclado), Fluxo de Metodologia e Formulário |

## Pendências e Limitações Registradas

1. **Logotipo oficial**: A imagem de referência anexada não estava disponível na sessão; os arquivos em `public/brand/` são uma proposta vetorial inicial aguardando validação visual do proprietário.
2. **Integração de formulário**: `siteConfig.contactIntegrationConfigured` permanece `false`; o formulário valida via Zod no cliente e informa explicitamente que o envio externo está pendente.
3. **Mockups de projetos**: Os 5 projetos exibem representações conceituais identificadas enquanto interfaces finais não estão publicadas.
4. **Domínio definitivo e Lighthouse em produção**: `NEXT_PUBLIC_SITE_URL` usa `http://localhost:3000` por padrão; medições de Lighthouse em produção devem ser executadas após o deploy com domínio definitivo.
