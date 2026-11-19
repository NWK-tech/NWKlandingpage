# NWK — Homologação técnica (2026-11-18)

Build de produção (`next build` + `next start`, porta 3100), Chromium via Playwright e Chrome estável via Lighthouse 12.8.2 (`pnpm dlx`, nada instalado no projeto). Evidências e scripts em `Claude outputs/evidence/homologacao/`.
**Limite importante:** os testes rodam em Chromium headless com rasterização por software; confirmam ausência de regressões e comparam antes/depois, mas **não** substituem teste em aparelhos reais.

## 1. Resultado resumido
| Verificação | Resultado |
|---|---|
| Typecheck · Lint · Vitest (7) · Build | ✔ · ✔ (0 erros, 0 avisos) · ✔ · ✔ |
| Playwright (14 testes, desktop + mobile) | ✔ 14/14 (axe WCAG 2.2 AA, overflow 320–1920, detalhes de projeto, reduced-motion) |
| Storybook | ✔ build ok; 15/15 stories renderizam, 0 erros de console, 0 violações axe |
| Lighthouse desktop (build de produção) | Performance 99–100 · Acessibilidade 100 · Boas práticas 100 · SEO 100 · CLS 0 · LCP 0,8 s · TBT 50–70 ms |
| Lighthouse mobile (3 execuções) | Performance **77 / 77 / 80** · Acessibilidade 100 · Boas práticas 100 · SEO 100 · CLS 0 · FCP 0,9–1,0 s · **LCP 4,1–4,3 s** · TBT 260–390 ms |
| Fluidez no scroll (página inteira, 2 passadas) | Desktop: 17,8 ms médio, 1 quadro > 50 ms, 0 > 100 ms · Mobile: 16,7 ms médio, 1 > 50 ms |
| CLS durante o scroll (desktop) | **0** (antes da correção: ≈ 2,0 por passada) |
| Memória (2 passadas completas + retorno ao topo) | Estável: heap 7,9 → 9,2 → 8,8 MB; nós DOM 1687 → 1669; listeners 418 → 392 (sem vazamento) |
| Hero | ✔ intacta (hash do canvas e posição do título idênticos à baseline; arquivos sem alteração no git) |

## 2. Problemas concretos encontrados e corrigidos
| # | Problema | Evidência | Correção (sem mudar a direção visual) | Resultado |
|---|---|---|---|---|
| 1 | **CLS ≈ 1,0 em cada fronteira do pin do palco de Projetos** (início e fim), ≈ 2,0 por passada | `PerformanceObserver(layout-shift)` com atribuição de nó; Lighthouse não detecta porque não rola | Palco de Projetos deixou de usar `pin` do GSAP e passou a `position: sticky` com "runway" de scroll (mesma coreografia e mesmo `scrub`); a navegação por botões usa o mesmo mapeamento | CLS 0 |
| 2 | **Quadros lentos na seção Projetos** (média 28 ms, p95 66 ms, 46 quadros > 50 ms) | Bisecção por injeção de CSS: `backdrop-filter` dos chips (−8 ms) e repintura do gradiente radial sob `clip-path` (−7 ms) | Revelação por máscara passou a usar só `transform` (painel sobe, conteúdo contra-anima — visualmente igual ao wipe anterior); `contain: paint` nos painéis; chips com fundo sólido `bg-black/70` em vez de blur | Média 19,9 ms, p95 33 ms, 0 quadros > 50 ms |
| 3 | Foco do teclado perdido ao fechar/abrir detalhes (o `ScrollTrigger.refresh()` reparentava o pin) | Teste de foco: ao final de ~1 s o foco voltava ao `body` | Refresh só quando o painel não está dentro de pin; hoje o palco usa sticky, então não há reparent | Foco estável: abrir → "Fechar detalhes"; Esc → "Ver detalhes" |
| 4 | Pilha de folhas da Metodologia seguia `sticky` com reduced-motion | Inspeção do estilo computado em `prefers-reduced-motion: reduce` | `md:sticky` → `md:motion-safe:sticky` | Com reduced-motion: folhas estáticas |
| 5 | Aviso de lint (`no-img-element`) na composição de projetos | `pnpm lint` | Diretiva reposicionada | 0 avisos |
| 6 | Imagens fora da dobra de Soluções competiam por banda no carregamento | Lighthouse: 4 JPGs (~2,1 MB) buscadas no load | `fetchPriority="low"` e `decoding="async"` nas imagens que não são a primeira | Mobile 77 → 80 em uma execução (dentro da variação; benefício modesto) |

## 3. Pendências que **não** foram corrigidas (e por quê)
1. **Custo do loop do canvas da hero no mobile (impacto principal no 77/100 mobile).** Perfil de CPU com throttling 4× nos primeiros 8 s do carregamento: a função de render do canvas da hero (`getImageData` + ~13 mil `arc()` por quadro) consome **1.085 ms de 1.905 ms (57 %)** do tempo de script. Em CPU sem throttling cada render custa 0,4–0,7 ms. A hero é intocável; qualquer ajuste (ex.: limitar a 30 fps em telas pequenas, reduzir o DPR do canvas, pausar o rAF quando fora de vista) **requer sua autorização**.
2. **LCP 4,1–4,3 s (mobile, simulado).** O elemento LCP é o parágrafo da hero; no trace real o atraso de renderização é de ~0,28 s — o valor alto vem da simulação de CPU 4×/rede lenta, em grande parte pelo item 1.
3. **Peso de imagens:** 4 JPGs de ~0,5 MB em Soluções (Lighthouse aponta ~1,6 MB de economia com WebP). Serão rebaixadas a fallback quando os vídeos existirem; conversão depende de aprovação (ver `ASSETS_PENDENTES.md` §4).
4. **JavaScript não usado (~37 KiB por chunk) e CSS bloqueante:** avisos de baixa prioridade do Lighthouse; sem ação.
5. **Não medido:** aparelhos reais (GPU/bateria), Safari/Firefox (só Chromium), conexões reais. Mobile verificado por emulação (Pixel 7) e frames.

## 4. Revisão de comportamento
- **Detalhes de projeto (GSAP Flip):** abre por clique, toque ou Enter; foco vai para "Fechar detalhes"; Esc fecha e devolve o foco a "Ver detalhes"; ao rolar para outro projeto o detalhe fecha (sem painel aberto "órfão"). Painéis não ativos ficam `inert` (não recebem Tab).
- **Teclado:** botões de navegação dos projetos (Enter) rolam até o projeto e atualizam `aria-current`; a ordem de Tab é: controles do painel ativo → navegação de projetos → próxima seção.
- **Reduced-motion:** sem pin/sticky de Projetos, sem manifesto cinético, sem vídeos montados, painéis empilhados e legíveis, detalhes abrem sem animação (axe: 0 violações).
- **Redimensionamento** desktop → mobile → desktop: layout restaurado corretamente (matchMedia reverte e reaplica), sem overflow horizontal e sem erros de console.
- **Conflitos GSAP × Motion:** nenhum erro de console em todas as rotas de teste; GSAP só escreve o progresso do palco num MotionValue e anima contêineres, enquanto o Motion anima apenas camadas filhas (x/y/rotate). A transformação do Flip incide só em contêineres próprios.

## 5. Como reproduzir
```powershell
pnpm build; pnpm start -p 3100
node "Claude outputs/evidence/homologacao/perf-scroll.mjs"    # fluidez, CLS, memória
node "Claude outputs/evidence/homologacao/cls-attr.mjs"       # atribuição de layout-shift
node "Claude outputs/evidence/homologacao/keyboard2.mjs"      # teclado / detalhes
node "Claude outputs/evidence/homologacao/story-smoke.mjs"    # smoke do Storybook (após build-storybook)
pnpm dlx lighthouse@12 http://localhost:3100/ --preset=desktop
node "Claude outputs/evidence/capture-hero.mjs" "Claude outputs/evidence/after"   # integridade da hero
```
