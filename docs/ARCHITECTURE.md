# NWK — Arquitetura de Software

## Visão Geral

Aplicação construída sobre **Next.js App Router** com **TypeScript em modo estrito**, **Tailwind CSS v4** e **CSS Custom Properties**.

## Separação de Responsabilidades

- `src/tokens/` e `src/styles/`: Tokens fundamentais e semânticos desacoplados dos componentes.
- `src/config/site.ts`: Metadados institucionais, navegação e flags de integração (ex.: `contactIntegrationConfigured`).
- `src/content/home.ts`: Conteúdo institucional centralizado e tipado por `src/types/content.ts`.
- `src/components/ui/`: Primitivas visuais reutilizáveis do Design System.
- `src/components/motion/`: Camada de movimento (GSAP, Motion for React, Lenis) com respeito a `prefers-reduced-motion`.
- `src/components/layout/`: `Header` e `Footer` globais.
- `src/features/home/`: Seções da landing page e composições específicas (`DeviceMockup`; `HeroSculpture` está obsoleto, ver `docs/CURRENT_STATE.md`).
- `src/features/contact/`: Schema de validação `Zod` desacoplado da UI.

## Decisões Arquiteturais (ADRs)

### ADR-001 — Server Components por padrão + Client Boundaries pontuais
- `src/app/page.tsx`, `AboutSection`, `ProjectsSection` e `Footer` operam sem estado de cliente desnecessário, reduzindo JavaScript enviado ao navegador.
- Componentes interativos (`Header`, `HeroSection`, `ManifestoSection`, `SolutionsSection`, `MethodologySection`, `ContactSection`) isolam `"use client"` apenas onde há estado, observadores ou animação.

### ADR-002 (SUPERADO) — Escultura SVG/CSS 2.5D no Hero
> Superado: a hero aprovada é um canvas 2D de meio-tom (`HeroSection.tsx`). Texto abaixo é histórico.
- Para proteger o LCP e evitar consumo contínuo de GPU fora de foco, a escultura do Hero utiliza SVG vetorial multicamadas com iluminação monocromática e perspectiva controlada por ponteiro.
- Garante renderização imediata sem JavaScript e fallback estático automático para `prefers-reduced-motion`.

### ADR-003 — Validação local explícita no formulário de contato
- Enquanto um endpoint/serviço de recebimento não estiver configurado (`contactIntegrationConfigured = false`), o formulário valida via `Zod` e comunica explicitamente que o envio externo está pendente, evitando simular sucesso falso.
