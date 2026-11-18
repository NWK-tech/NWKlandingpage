# REDESIGN_PLAN.md — Decisão Técnica e Recomendação

## 1. Recomendação Fundamentada

Recomenda-se adotar a **Proposta 01 — *Architectural Monolith*** combinada a elementos da **Proposta 02** (o contraste tonal tipográfico e a integração Sobre + Manifesto sem lista `01..03`).

### Por quê?
1. **Máxima distância da WeTechHub**: Elimina o Hero 2-colunas com card à direita, elimina os projetos em zigue-zague com janelas escuras, elimina a seção Sobre `01..03` e elimina a repetição de overlines/numerações `01..06`.
2. **Alinhamento máximo às referências autorizadas**: Traz a clareza espacial e apresentação de produto da **Apple** (*Product Stage* único interativo), a sofisticação tipográfica da **Origin Brand Studio** e o contraste preto/creme equilibrado da **NWK Culture**.
3. **Viabilidade técnica e acessibilidade**: Não depende de trilhos horizontais arriscados para leitores de tela e funciona com fluidez equivalente em `320px` e `1920px`.

---

## 2. Matriz de Decisão Técnica (Preservar / Refatorar / Redesenhar / Substituir / Remover)

### Preservar (Infraestrutura Sólida)
- `package.json`, Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, pnpm.
- `src/tokens/foundations.ts` e `src/styles/tokens.css` (paleta oficial e variáveis CSS).
- `src/lib/gsap.ts`, `src/lib/cn.ts`, `MotionAndScrollProvider.tsx` (Lenis + GSAP + `MotionConfig`).
- `src/features/contact/schema.ts` (validação Zod) e `src/config/site.ts` (dados institucionais verdadeiros).
- `src/app/robots.ts`, `src/app/sitemap.ts`, `next.config.ts` (headers de segurança).
- Storybook 10 (`@storybook/nextjs-vite` + `@storybook/addon-a11y`), Vitest, Testing Library, Playwright + `@axe-core/playwright`.
- `public/brand/*` e `public/icons/*` (mantendo o aviso de validação visual pendente do logotipo).

### Refatorar
- `src/content/home.ts`: remover numerações rígidas `01..06` acopladas ao copy visual e enriquecer metadados para o *Product Stage* e matriz de soluções.
- `src/components/ui/Heading.tsx` e `Section.tsx`: suportar composições centralizadas, full-bleed e camadas sem depender de overlines repetitivos.

### Redesenhar
- `HeroSection.tsx` + `HeroSculpture.tsx`: migrar de 2 colunas genéricas para **Hero Monumental Centralizado** com escultura geométrica arquitetônica aberta (sem caixa arredondada fechada).
- `SolutionsSection.tsx`: substituir o layout `sticky diagram + accordion 01..06` por **Matriz Assimétrica de Capacidades** com interatividade direta.
- `ProjectsSection.tsx` + `DeviceMockup.tsx`: substituir o **zigue-zague vertical + wireframes pontilhados** por um **Product Stage Interativo** (seletor em pill + mockups refinados de desktop/mobile com estrutura visual real de produto, mantendo identificação transparente de conceito).
- `MethodologySection.tsx`: substituir o grid `3x2` de cards brancos por **Faixa Linear Contínua** com progressão espacial em `#F2F0EB`.
- `AboutSection.tsx`: substituir a lista numerada `01..03` (muito próxima da WeTechHub) por **Declaração Editorial-Tecnológica Full-Width** integrada ao ritmo da página.

### Substituir / Remover
- **Remover**: O padrão visual de "wireframe pontilhado vazio" dentro de `DeviceMockup.tsx` e a repetição sistemática de badges `01..06` em todas as seções.
- **Substituir**: Os storybooks afetados (`DeviceMockup.stories.tsx`, `Accordion.stories.tsx` se necessário) serão atualizados apenas na fase de reconstrução definitiva.

---

## 3. Próximo Passo

Aguardar aprovação do usuário sobre a direção escolhida (**Proposta 01 — *Architectural Monolith***, **Proposta 02 — *Kinetic Studio*** ou **Proposta 03 — *Precision System Grid***) para iniciar a reconstrução definitiva da interface.
