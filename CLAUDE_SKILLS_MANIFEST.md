# CLAUDE_SKILLS_MANIFEST.md — Migracao e Homologacao de Agent Skills (Antigravity -> Claude Code)

Gerado em: 2026-11-18
Ambiente: Windows, PowerShell 5.1, Claude Code 2.1.326
Workspace: C:\Users\Home\Desktop\WORKS\NWKlandingpage

## 1. Resumo Executivo

As 29 skills (23 globais + 6 locais da NWK) foram migradas do Antigravity
para os diretorios reais que o Claude Code descobre nativamente, e a
descoberta foi confirmada empiricamente dentro de uma sessao real do
Claude Code 2.1.326 (nao apenas por inspecao de arquivos).

**Veredito: APTO COM RESTRICOES**

Restricao unica: os testes funcionais de homologacao por cenario
(Secao 12 da missao original — direcao criativa, design, motion,
engenharia, originalidade) nao foram executados nesta sessao. Descoberta,
integridade e precedencia hierarquica estao 100% confirmadas; eficacia
criativa/funcional de cada skill em uso real permanece nao testada e nao
deve ser presumida.

## 2. Achado Critico Corrigido

O arquivo `SKILLS_RUNTIME_VALIDATION.md` (preexistente neste repositorio,
de uma sessao anterior) afirmava veredito "APROVADO" com as 29 skills
"descobertas e injetadas automaticamente" em `.gemini\config\skills` e
`.agents\skills`. **Essa afirmacao e factualmente incorreta.**

A documentacao oficial do Claude Code (code.claude.com/docs/en/skills)
confirma que a descoberta nativa de skills ocorre apenas em:
- Global: `~/.claude/skills/<nome>/SKILL.md`
- Projeto: `<repo>/.claude/skills/<nome>/SKILL.md` (incluindo subpastas aninhadas)

`.agents/skills/` nao e lido pelo Claude Code (ha inclusive um feature
request aberto e nao implementado pedindo esse suporte). O veredito
anterior foi, com alta probabilidade, produzido por outra ferramenta
(Antigravity/Gemini CLI, que le esses caminhos) e nao reflete o
comportamento real do Claude Code. Este manifesto corrige isso com
evidencia de uma sessao real do Claude Code.

`SKILLS_MANIFEST.md` e `SKILLS_RUNTIME_VALIDATION.md` foram preservados
sem alteracao (nao sobrescritos), conforme a politica de nao apagar
trabalho anterior silenciosamente.

## 3. Migracao Executada

| Escopo | Origem | Destino real (Claude Code) | Qtde |
|---|---|---|---|
| Global | `C:\Users\Home\.gemini\config\skills\` | `C:\Users\Home\.claude\skills\` | 23 |
| Projeto (NWK) | `NWKlandingpage\.agents\skills\` | `NWKlandingpage\.claude\skills\` | 6 |

Metodo: copia (nunca move/apaga), idempotente — skills ja presentes no
destino nao foram sobrescritas, apenas conferidas por hash.
Ferramentas usadas: copia direta via bridge (6 locais) + script
PowerShell 5.1 `audit-migrate-skills.ps1` executado pelo usuario (23
globais + reconfirmacao das 6 locais).

### 3.1 Skills Globais (23)

Design e direcao de arte: `impeccable`, `ui-ux-pro-max`,
`creative-direction`, `anti-ai-slop`, `visual-originality-audit`,
`web-design-guidelines`, `apple-design`, `emil-design-eng`,
`web-copywriting`

Motion/GSAP: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`,
`gsap-react`, `gsap-plugins`, `gsap-performance`, `motion-engineering`,
`animation-vocabulary`, `review-animations`

Engenharia/QA: `software-engineering-quality`,
`vercel-react-best-practices`, `vercel-composition-patterns`,
`design-system-engineering`, `frontend-quality-assurance`

### 3.2 Skills Locais da NWK (6)

`nwk-brand-identity`, `nwk-creative-direction`, `nwk-design-system`,
`nwk-motion-design`, `nwk-copywriting`, `nwk-visual-audit`

### 3.3 Skills Preservadas Sem Alteracao

`maestri`, `maestri-chat`, `maestri-computer`, `maestri-manager`,
`maestri-portal`, `maestri-portal-devices`, `maestri-routines`,
`maestri-workspace`, `ai-memory-durable-pages`, `ai-memory-handoff`,
`ai-memory-learning-maintenance`, `ai-memory-messaging`,
`ai-memory-retrieval`, `ai-memory-routing-install`, `find-skills`
(symlink para `~/.agents/skills`), `reverse-engineer-anything`.
Nenhum arquivo dentro dessas pastas foi lido, copiado ou alterado.

## 4. Auditoria de Integridade e Seguranca

Executada via `audit-migrate-skills.ps1` (hash SHA-256 por arquivo,
agregado em manifesto determinístico por skill):

- **23/23 skills globais**: hash origem = destino (OK), frontmatter YAML
  valido (`name` + `description` presentes) em todas.
- **6/6 skills locais NWK**: hash origem = destino (OK), frontmatter
  valido em todas, sem referencias a Antigravity/.agents/.gemini,
  sem caminhos absolutos.
- **Zero colisoes de nome** entre escopo global e escopo projeto.
- **Scripts internos identificados mas NUNCA executados**:
  - `impeccable/scripts/`: 5 arquivos .js (live-browser*.js,
    modern-screenshot.umd.js)
  - `ui-ux-pro-max/scripts/`: ~20 arquivos .py (core, design_system,
    preview, search, validate_data + suite de testes)
- **Referencia textual desatualizada identificada (nao bloqueante)**:
  `impeccable` (22 ocorrencias em SKILL.md e arquivos de referencia)
  menciona `.agents/skills/impeccable/scripts/` como *fallback* de
  documentacao para quando o runtime nao informa `<skill-base-dir>`.
  Isso e uma mencao textual nos proprios docs da skill (upstream,
  commit `d41d9860`, v4.9.2), nao um caminho hardcoded que impeca
  funcionamento — a skill resolve corretamente a partir de
  `~/.claude/skills/impeccable/scripts/` no ambiente atual. Nenhuma
  acao corretiva foi necessaria; registrado para rastreabilidade.

## 5. Confirmacao de Descoberta Nativa (Evidencia Real)

Diferente do relatorio anterior (Secao 2), a descoberta abaixo foi
confirmada perguntando diretamente a uma sessao real do Claude Code
2.1.326, aberta dentro de `NWKlandingpage`, apos autenticacao normal
com a conta Anthropic do usuario (ver Secao 6).

- **Skills de projeto (6/6)**: `nwk-brand-identity`, `nwk-copywriting`,
  `nwk-creative-direction`, `nwk-design-system`, `nwk-motion-design`,
  `nwk-visual-audit` — confirmadas com precedencia sobre equivalentes
  globais, conforme `CLAUDE.md`.
- **Skills globais (23/23)**: todas as 23 confirmadas presentes na
  listagem retornada pela sessao real (incluindo `review-animations`,
  que ficou fora de uma listagem anterior apenas porque o teste inicial
  foi rodado em `C:\Users\Home`, onde `~/.claude/skills` e
  `./.claude/skills` colapsam na mesma pasta — artefato do diretorio de
  trabalho errado, nao falha de descoberta).
- **Preservadas**: todas as 16 (maestri*, ai-memory-*, find-skills,
  reverse-engineer-anything) continuam presentes e carregadas.
- **Item nao-skill identificado**: pasta `synced/` existe em
  `~/.claude/skills/` mas nao contem `SKILL.md` valido e nao e carregada
  — nao faz parte desta migracao, nao foi tocada, origem desconhecida
  (possivelmente de outra ferramenta de sincronizacao do usuario).

Diferenciacao exigida pela missao (arquivo instalado vs. descoberto vs.
invocado vs. aplicado/testado):
- **Instalado**: 29/29 (Secao 3)
- **Descoberto nativamente**: 29/29 (Secao 5, evidencia real)
- **Invocado em uso real**: nao testado nesta sessao (ver Secao 7)
- **Aplicado e validado em tarefa real**: nao testado nesta sessao

## 6. Nota Lateral: Correcao de Roteamento de Autenticacao (GhostCLI)

Durante a verificacao, `claude -p` falhou com erro 403 do GhostCLI
(`ANTHROPIC_BASE_URL` apontando para `https://ghostcli.cloud` no escopo
de variavel de ambiente do usuario Windows). Isso era independente da
migracao de skills. Diagnostico e correcao, sem alterar nada relativo a
GhostCLI em si (apenas a variavel de ambiente do usuario foi limpa, a
pedido explicito do usuario, para usar a conta normal da Anthropic):

- `ANTHROPIC_BASE_URL` e `ANTHROPIC_AUTH_TOKEN` (escopo User) removidas
  via `[Environment]::SetEnvironmentVariable(..., $null, "User")`.
- Funcao `claude-ghost` no `$PROFILE` do PowerShell preservada sem
  alteracao (ela so ativa o GhostCLI sob demanda, dentro de um
  try/finally, e nao roda automaticamente).
- Apos reiniciar o terminal, `claude` passou a exigir `/login` normal
  da Anthropic, confirmando que o roteamento agora e o padrao.
- Nenhuma configuracao de autenticacao, provedor de IA ou do GhostCLI em
  si foi alterada alem da variavel de ambiente solicitada.

## 7. Pendencias (Nao Executado Nesta Sessao)

Por decisao de escopo (nao foi solicitado explicitamente apos a
confirmacao de descoberta), os 5 cenarios de teste funcional da missao
original nao foram executados:

- Cenario A — Direcao criativa (duas direcoes visuais distintas)
- Cenario B — Design (impeccable + anti-ai-slop em analise, sem editar)
- Cenario C — Motion (GSAP ScrollTrigger + reduced motion)
- Cenario D — Engenharia (analise de arquitetura React, sem modificar)
- Cenario E — Originalidade (deteccao de padroes genericos)

Esses testes provariam eficacia de uso, nao apenas descoberta. Disponivel
para execucao a pedido, dentro de uma sessao real do Claude Code no
projeto, sem editar nenhum arquivo da landing page.

## 8. Rollback

- **Skills globais**: remover as 23 pastas de `C:\Users\Home\.claude\skills\`
  listadas na Secao 3.1. `maestri*`, `ai-memory-*`, `find-skills`,
  `reverse-engineer-anything` permanecem intocados (nunca foram copiados
  para esse destino por este processo, exceto os 23 explicitamente
  listados).
- **Skills locais NWK**: remover `NWKlandingpage\.claude\skills\` (as 6
  pastas). Os originais em `.agents\skills\` permanecem intactos.
- **Fontes originais**: `.gemini\config\skills\` e `.agents\skills\` do
  Antigravity nunca foram modificados por este processo (copia
  unidirecional, somente leitura na origem).

## 9. Veredito Final

**APTO COM RESTRICOES**

Ambiente Claude Code preparado corretamente: 29/29 skills migradas para
os caminhos reais de descoberta, integridade de hash confirmada,
hierarquia de precedencia (projeto > global > built-in) respeitada e
confirmada em sessao real, zero skills preservadas tocadas, zero scripts
executados, nenhuma alteracao em autenticacao/GhostCLI alem do solicitado,
landing page intocada.

Restricao: eficacia funcional/criativa de cada skill em tarefa real
(Secao 7) nao foi testada nesta sessao — fica para validacao futura
antes de qualquer declaracao de "eficacia comprovada".
