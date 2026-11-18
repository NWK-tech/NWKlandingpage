# NWK — Acessibilidade (WCAG 2.2 AA)

- **Estrutura semântica**: `header`, `nav`, `main`, `section` com `aria-labelledby`, `article`, `footer` e hierarquia única de `h1` -> `h2` -> `h3`.
- **Navegação por teclado**: Skip link (`Pular para o conteúdo principal`), `:focus-visible` global de alto contraste e fechamento do menu mobile via `Escape` com retorno de foco.
- **Formulários**: `<label>` associado por `htmlFor`, `aria-invalid`, `aria-describedby` e mensagens com `role="alert"`.
- **Movimento reduzido**: Suporte a `prefers-reduced-motion: reduce` em CSS (`globals.css`), Motion (`MotionConfig reducedMotion="user"`) e GSAP/Lenis (`prefersReducedMotion()`).
- **Validação automatizada**: Executada via `@axe-core/playwright` em `tests/e2e/landing.spec.ts` e `@storybook/addon-a11y`.
