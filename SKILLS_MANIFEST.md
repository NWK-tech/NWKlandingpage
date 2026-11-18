# SKILLS_MANIFEST.md — Catálogo e Governança de Agent Skills

## 1. Hierarquia de Precedência (Fase 05)

1. Instruções explícitas do usuário.
2. Requisitos e restrições do projeto (`AGENTS.md`).
3. Identidade e direção artística do projeto (`docs/BRAND_BOOK.md`, `docs/CREATIVE_DIRECTION.md`).
4. Design System do projeto (`docs/DESIGN_SYSTEM.md`).
5. Habilidades especializadas (Workspace `.agents/skills/` > Global `~/.gemini/config/skills/` > Built-in).
6. Recomendações genéricas.
7. Preferências padrão do agente.

> Skills são ferramentas auxiliares, nunca autoridades capazes de substituir decisões explícitas do usuário.

---

## 2. Escopos de Instalação

- **Global compartilhado oficial**: `C:\Users\Home\.gemini\config\skills\`
- **Workspace local (NWK)**: `c:\Users\Home\Desktop\WORKS\NWKlandingpage\.agents\skills\`
- **Preservados sem alteração**: `maestri`, `maestri-chat`, `maestri-computer`, `maestri-manager`, `maestri-portal`, `maestri-portal-devices`, `maestri-routines`, `maestri-workspace` (e plugins `science`, `android-cli-plugin`).

---

## 3. Skills Externas Instaladas (Global)

| Skill | Repositório de Origem | Commit Analisado | Licença | Scripts / Dependências | Critério de Ativação |
|---|---|---|---|---|---|
| `impeccable` | `pbakaus/impeccable` | `d41d9860` (`v4.9.2`) | Apache-2.0 | `live-browser*.js`, `modern-screenshot.umd.js` (opcionais) | Direção visual, crítica de UI, anti-template, polimento |
| `ui-ux-pro-max` | `nextlevelbuilder/ui-ux-pro-max-skill` | `e59ff376` | MIT | Python 3 stdlib (`scripts/*.py`) sobre CSVs locais | Pesquisa local de UX, tipografia, acessibilidade |
| `gsap-core` | `greensock/gsap-skills` | `aed9cfd3` | MIT | Nenhum (Markdown) | Tweens, easings, arquitetura GSAP |
| `gsap-timeline` | `greensock/gsap-skills` | `aed9cfd3` | MIT | Nenhum (Markdown) | Coreografia de timelines coordenadas |
| `gsap-scrolltrigger` | `greensock/gsap-skills` | `aed9cfd3` | MIT | Nenhum (Markdown) | Scroll storytelling, scrub, pinning |
| `gsap-react` | `greensock/gsap-skills` | `aed9cfd3` | MIT | Nenhum (Markdown) | `useGSAP`, cleanup e contexto React |
| `gsap-plugins` | `greensock/gsap-skills` | `aed9cfd3` | MIT | Nenhum (Markdown) | SplitText, Flip e plugins oficiais |
| `gsap-performance` | `greensock/gsap-skills` | `aed9cfd3` | MIT | Nenhum (Markdown) | 60 FPS, `prefers-reduced-motion` |
| `emil-design-eng` | `emilkowalski/skills` | `64eb3deb` | MIT | Nenhum (Markdown) | Microinterações, estados, timing |
| `apple-design` | `emilkowalski/skills` | `64eb3deb` | MIT | Nenhum (Markdown) | Fluidez física, materiais e precisão estilo Apple |
| `review-animations` | `emilkowalski/skills` | `64eb3deb` | MIT | Nenhum (Markdown) | Auditoria rigorosa de código de animação |
| `animation-vocabulary` | `emilkowalski/skills` | `64eb3deb` | MIT | Nenhum (Markdown) | Glossário preciso de efeitos de movimento |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | `1a2c79d4` | MIT | Nenhum (Markdown) | Performance React 19 / Next.js |
| `vercel-composition-patterns` | `vercel-labs/agent-skills` | `1a2c79d4` | MIT | Nenhum (Markdown) | Composição escalável de componentes |
| `web-design-guidelines` | `vercel-labs/agent-skills` | `1a2c79d4` | MIT | Nenhum (Markdown) | Auditoria de interface e acessibilidade |

### Skills Descartadas por Redundância ou Escopo

- `anthropics/skills/frontend-design`: descartada por redundância significativa com `impeccable` (`v4.9.2`), que já cobre direção estética, tipografia, layouts autorais e combate a padrões repetitivos de IA.
- `vercel-labs/agent-skills` (`deploy-to-vercel`, `vercel-cli-with-tokens`, `vercel-optimize`, `react-native-skills`): descartadas por estarem fora do escopo web/qualidade desta missão.
- `ui-ux-pro-max-skill` (`banner-design`, `slides`, `brand`, `design-system`): descartadas para evitar redundância com `design-system-engineering` e `nwk-brand-identity`.

---

## 4. Skills Globais Personalizadas (`~/.gemini/config/skills/`)

- `creative-direction` — Direção artística e narrativa visual autoral.
- `anti-ai-slop` — Detecção e eliminação de estética genérica de IA.
- `motion-engineering` — Seleção e orquestração segura entre CSS, Motion e GSAP.
- `software-engineering-quality` — Clean Code, SOLID pragmático e segurança.
- `design-system-engineering` — Arquitetura de tokens, estados e Storybook.
- `frontend-quality-assurance` — Homologação com Playwright, axe-core, Vitest e SEO.
- `visual-originality-audit` — Comparação crítica contra templates e referências proibidas.
- `web-copywriting` — Comunicação institucional verídica em `pt-BR`.

---

## 5. Skills Locais da NWK (`.agents/skills/`)

- `nwk-brand-identity`
- `nwk-creative-direction`
- `nwk-design-system`
- `nwk-motion-design`
- `nwk-copywriting`
- `nwk-visual-audit`

---

## 6. Atualização, Desinstalação e Rollback

- **Atualização**: Clonar o repositório de origem em área temporária, auditar diff de `SKILL.md` e scripts, verificar licença/commit e substituir a pasta correspondente em `~/.gemini/config/skills/<skill>`.
- **Desinstalação**: Remover apenas o diretório da skill desejada em `~/.gemini/config/skills/<skill>` ou `.agents/skills/<skill>`.
- **Rollback completo**: Remover as 15 pastas externas + 8 pastas globais personalizadas de `C:\Users\Home\.gemini\config\skills\` (preservando `maestri*`) e remover `.agents/skills/` do workspace.
