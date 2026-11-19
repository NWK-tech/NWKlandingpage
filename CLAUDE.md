# CLAUDE.md — Guia de Carregamento de Skills (Projeto NWK)

Este arquivo orienta o Claude Code a carregar seletivamente as Agent Skills
disponíveis. Requisitos funcionais e de projeto vêm de `AGENTS.md` (fonte
primária) — este arquivo não os duplica.

## Princípios Permanentes

- Identidade visual própria por projeto; originalidade acima de templates.
- Engenharia de software de qualidade (Clean Code, SOLID pragmático).
- Uso inteligente de bibliotecas existentes antes de reinventar.
- Validação visual e funcional em browser quando disponível.
- Performance e acessibilidade (WCAG 2.2 AA) como requisitos, não extras.
- Nenhuma implementação é homologada sem testes reais executados.

## Hierarquia de Precedência

1. Instruções explícitas do usuário.
2. `AGENTS.md` (requisitos e restrições do projeto).
3. `docs/BRAND_BOOK.md`, `docs/CREATIVE_DIRECTION.md`, `docs/DESIGN_SYSTEM.md`.
4. Skills do projeto (`.claude/skills/`) > Skills globais (`~/.claude/skills/`) > built-in.
5. Recomendações genéricas / preferências padrão do agente.

Skills são apoio operacional, nunca autoridade que substitui decisão explícita
do usuário.

## Carregamento Seletivo por Tarefa

Não carregue todas as skills de uma vez. Carregue apenas as pertinentes:

- **Direção artística/branding**: `impeccable`, `creative-direction`,
  `anti-ai-slop`, `nwk-brand-identity`, `nwk-creative-direction`.
- **Animação/motion**: `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`,
  `gsap-react`, `gsap-plugins`, `gsap-performance`, `motion-engineering`,
  `emil-design-eng`, `apple-design`, `review-animations`,
  `animation-vocabulary`, `nwk-motion-design`.
- **Engenharia frontend**: `software-engineering-quality`,
  `vercel-react-best-practices`, `vercel-composition-patterns`,
  `design-system-engineering`, `nwk-design-system`.
- **Homologação/QA**: `frontend-quality-assurance`, `web-design-guidelines`,
  `visual-originality-audit`, `ui-ux-pro-max`, `nwk-visual-audit`.
- **Copy institucional**: `web-copywriting`, `nwk-copywriting`.

As skills `nwk-*` são exclusivas deste projeto e têm precedência sobre as
equivalentes globais quando houver conflito. Consulte
`CLAUDE_SKILLS_MANIFEST.md` para origem, versões e status de homologação de
cada skill.
