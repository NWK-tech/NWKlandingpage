# NWK — Padrões de Engenharia

Complemento a `docs/ARCHITECTURE.md` e `AGENTS.md`:

- **Modularização**: Conteúdo (`src/content/`), configuração (`src/config/`), tokens (`src/tokens/`, `src/styles/`), UI (`src/components/ui/`), motion (`src/components/motion/`) e features (`src/features/`).
- **TypeScript**: `strict: true`, `noUncheckedIndexedAccess: true`, zero `any` injustificado.
- **React / Next.js**: Server Components por padrão; `"use client"` isolado em fronteiras interativas.
- **Segurança**: Validação com Zod, headers de segurança em `next.config.ts`, sem segredos no código.
