> **REGISTRO HISTÓRICO (2026-11-18)** — descreve uma versão anterior da aplicação e decisões já superadas (ex.: *Architectural Monolith*, NWK Culture como referência). Não é fonte de verdade sobre o código atual; ver `docs/CURRENT_STATE.md` e `docs/CREATIVE_DIRECTION.md`.

# VISUAL_AUDIT.md — Auditoria Integral da Implementação Atual

## Escopo e Evidências

Auditoria realizada sobre a aplicação rodando em `http://localhost:3000`, fundamentada em capturas reais de desktop (`1440x900`) e mobile (`390x844`) em `scratch/audit_screenshots/` (`nwk-desktop-*.png` e `nwk-mobile-*.png`).

---

## Avaliação por Dimensão

### 1. Direção Artística e Composição Visual
- **Diagnóstico**: A execução técnica é limpa, mas a direção artística é **conservadora e previsível**. A página opera como uma sequência linear de blocos institucionais padrão (Hero 2 colunas → Faixa escura → Accordion → Zigue-zague → Cards → Lista → Formulário → Footer), sem um ponto de vista visual memorável que diferencie a NWK de outras empresas de software.
- **Evidência**: `nwk-desktop-hero.png`, `nwk-desktop-about.png`, `nwk-desktop-contact.png`.

### 2. Hero Section
- **Pontos positivos**: Hierarquia tipográfica clara (`Space Grotesk`), contraste tonal entre *Engenharia digital.* (`#131315`) e *Impacto real.* (`#6B7078`), CTAs imediatos sem atraso de opacidade.
- **Pontos negativos**: O layout 7/5 (texto à esquerda + quadrado arredondado com monograma à direita) é um padrão excessivamente comum em landing pages B2B. A escultura atual parece um "ícone ampliado dentro de um card", perdendo força cinematográfica.

### 3. Arquitetura da Informação e Ordem das Seções
- Ordem atual: `Hero → Manifesto → Soluções → Projetos → Metodologia → Sobre → Contato → Footer`.
- O fluxo lógico funciona, mas a repetição de padrões visuais (overline em caixa alta + título + lista/cards numerados `01..0N` em 4 seções seguidas) gera monotonia de ritmo.

### 4. Tipografia e Paleta Cromática
- **Tipografia**: `Space Grotesk` + `Inter` entregam boa legibilidade e contraste tonal funcional (`nwk-desktop-manifesto.png`), mas faltam momentos de escala monumental ou quebra de ritmo tipográfico.
- **Paleta**: O equilíbrio entre Soft White (`#FAFAF8`), Carbon Black (`#131315`) e Neutral Cream (`#F2F0EB` apenas na Metodologia) cumpre bem a restrição de não amarelar o site. O contraste está validado pelo `axe-core`.

### 5. Componentes, Imagens e Mockups
- **Problema crítico**: Os mockups de projetos (`DeviceMockup.tsx` em `nwk-desktop-projects.png`) são caixas escuras vazias com retângulos pontilhados. Embora honestos quanto ao status de placeholder, visualmente parecem wireframes inacabados em vez de apresentações de produto de alto nível.
- **Soluções (`nwk-desktop-solutions.png`)**: O diagrama SVG à esquerda ajuda, mas o accordion à direita é convencional.
- **Metodologia (`nwk-desktop-methodology.png`)**: Os 6 cards brancos em grid 3x2 reforçam a estética de template SaaS.

### 6. Copywriting, Animações, Responsividade e Qualidade Técnica
- **Copywriting**: Verídico, sem dados inventados, claro em português brasileiro.
- **Animações**: Respeitam `prefers-reduced-motion`, sem conflito GSAP/Motion, mas o papel do motion ainda é tímido (apenas reveals e parallax leve).
- **Responsividade, Acessibilidade, Arquitetura, Performance**: Tecnicamente sólidos (`0` violações WCAG 2.2 AA, `0` overflow entre `320px` e `1920px`, Server Components bem delimitados, `typecheck`/`lint`/`test`/`build` aprovados). O problema não é técnico — é **criativo e composicional**.
