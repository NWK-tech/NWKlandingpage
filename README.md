# NWK — Website Institucional

Presença digital oficial da **NWK**, empresa de tecnologia, engenharia de software e desenvolvimento de soluções digitais.

## Stack Tecnológica

- **Core**: Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, CSS Custom Properties, `pnpm`
- **Motion & Creative Development**: GSAP (`ScrollTrigger`, `SplitText`), `@gsap/react`, Motion for React (`motion`), Lenis
- **Validação & Qualidade**: Zod, ESLint, Prettier, Vitest, Testing Library, Playwright, `@axe-core/playwright`, Storybook 10 (`@storybook/nextjs-vite`, `@storybook/addon-a11y`)

## Pré-requisitos

- Node.js 22+ (testado em v24.20.0)
- `pnpm` 10+

## Instalação

```bash
pnpm install
```

## Execução Local

```bash
pnpm dev
```

Acesse `http://localhost:3000`.

## Storybook

```bash
pnpm storybook
```

Build estático do Storybook:

```bash
pnpm build-storybook
```

## Qualidade, Testes e Build

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm test:e2e
```

## Variáveis de Ambiente

Consulte `.env.example`.

- `NEXT_PUBLIC_SITE_URL`: URL canônica da aplicação (padrão `http://localhost:3000` enquanto o domínio definitivo não está configurado).
