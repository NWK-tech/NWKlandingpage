# CREATIVE_CONCEPTS.md — 3 Propostas de Direção Artística para a NWK

> Todas as propostas preservam a identidade tecnológica da NWK (não moda, não agência, não freelancer), o logotipo aprovado, preto (`#131315`) e creme (`#F2F0EB`) com equilíbrio sem amarelar, e rompem completamente com o esqueleto da WeTechHub.

---

## Proposta 01 — *Architectural Monolith* (Precisão Espacial & Palco de Produto)

### 1. Conceito Central
Inspirada na precisão espacial e apresentação de hardware da **Apple**, combinada ao contraste monocromático da **NWK Culture**. A página funciona como uma sequência de câmaras arquitetônicas em largura total, onde cada produto e disciplina ganha palco próprio sem ruído de cards repetitivos.

### 2. Personalidade Visual
Autoridade silenciosa, precisão de engenharia, monumentalidade contida e foco absoluto no objeto digital.

### 3. Estrutura da Página
1. **Hero Centralizado Monumental** (fundo claro `#FAFAF8` com objeto 3D/escultura espacial abaixo do título).
2. **Manifesto Cinético em Faixa Contínua** (`#131315`, texto em escala gigante que transiciona de largura conforme o scroll).
3. **Soluções em Matriz Espacial Assimétrica** (`#FFFFFF`, 6 blocos de proporções variadas sem accordion nem lista `01..06`).
4. **Projetos em Palco Único Interativo (Product Stage)** (`#131315`, apresentação inspirada em lançamento de produto Apple: seletor de projeto em pill flutuante + mockup realista em alta definição ocupando 80% do palco).
5. **Metodologia como Fluxo Linear Contínuo** (`#F2F0EB`, faixa horizontal/progressiva sem grid 3x2 de cards).
6. **Sobre em Declaração Editorial-Tecnológica Full-Width** (`#FAFAF8`, sem lista `01..03`).
7. **Contato Integrado ao Encerramento + Footer Monumental** (`#131315`).

### 4. Composição do Hero
Tipografia centralizada em escala Display no terço superior (`Engenharia digital. Impacto real.`), CTAs em linha logo abaixo e uma **escultura arquitetônica 3D em perspectiva aberta** ancorada na base da primeira dobra, reagindo sutilmente ao scroll.

### 5. Tipografia
`Space Grotesk` (Display monumental com tracking `-0.04em`) + `Inter` (corpo e microcopy técnico). Eliminação de overlines repetitivos em caixa alta.

### 6. Distribuição Cromática
Predomínio de `#FAFAF8` e `#FFFFFF` (55%), `#131315` e `#232429` nos palcos de Manifesto/Projetos/Footer (35%), e `#F2F0EB` restrito à faixa de Metodologia (10%).

### 7. Direção de Imagens
Mockups com interfaces visuais ricas (mesmo em estado conceitual, desenhadas com dados estruturais plausíveis e selo discreto de conceito, sem caixas pontilhadas vazias) + iluminação zenital suave.

### 8. Apresentação dos Serviços
Matriz modular assimétrica (2 módulos principais maiores + 4 secundários integrados em linha) com micro-diagramas vetoriais integrados ao fundo de cada célula.

### 9. Apresentação dos Projetos
Um único **Palco de Produto** cinematográfico com tabs/seletor em pill (`FJU Artes Marciais`, `Doce Certo`, `NWKBossAI`, `ZURI`, `NWKstudio`) e transição fluida de hardware (desktop, smartphone ou conjunto híbrido) — eliminando totalmente o zigue-zague.

### 10. Motion Design
GSAP ScrollTrigger para expansão do palco do Hero e transição de capítulos; Motion for React (`AnimatePresence` + `layoutId`) para troca de projetos no Product Stage.

### 11. Diferenciais
Zero zigue-zague, zero lista `01..06`, experiência próxima de um lançamento de produto Apple aplicada a software.

### 12. Riscos
Exige maior cuidado na responsividade do Product Stage em telas de `320px–390px` para manter a troca de projetos imediata sem esconder conteúdo.

### 13. Wireframe Estrutural
```text
+-------------------------------------------------------+
| [NWK]           Solucoes  Projetos  Sobre   [Iniciar] |
+-------------------------------------------------------+
|              Engenharia digital.                      |
|                 Impacto real.                         |
|           [ Iniciar ]   [ Solucoes ]                  |
|         [   Escultura 3D Arquitetonica   ]            |
+-------------------------------------------------------+
|  MANIFESTO FULL-BLEED (#131315) — Scroll Progress     |
+-------------------------------------------------------+
|  SOLUCOES: Matriz Assimetrica (sem accordion 01..06)  |
|  [ Engenharia ] [ Mobile ] | [ Web ] [ IA ] [ Auto ]  |
+-------------------------------------------------------+
|  PROJETOS — PRODUCT STAGE (#131315)                   |
|  ( FJU | Doce Certo | NWKBossAI | ZURI | NWKstudio )  |
|  [      Mockup Cinematografico em Palco Unico      ]  |
+-------------------------------------------------------+
|  METODOLOGIA (#F2F0EB) — Faixa Continua Horizontal    |
+-------------------------------------------------------+
|  SOBRE — Declaracao Full-Width + 3 Blocos Horizontais |
+-------------------------------------------------------+
|  CONTATO & FOOTER MONUMENTAL (#131315)                |
+-------------------------------------------------------+
```

---

## Proposta 02 — *Kinetic Studio* (Assimetria Autoral & Tipografia Expressiva)

### 1. Conceito Central
Inspirada na fluidez e personalidade da **Origin Brand Studio**, traduzida para uma empresa de engenharia de software. Em vez de blocos retangulares fechados, a página usa **camadas sobrepostas** (superfície clara com cantos arquitetônicos sobre base escura) e tipografia expressiva como elemento estrutural.

### 2. Personalidade Visual
Contemporânea, criativa, segura e autoral — combina rigor técnico com sensibilidade de estúdio de produto digital.

### 3. Estrutura da Página
1. **Hero em Camada Elevada**: Container claro (`#FAFAF8`) com bordas superiores arredondadas repousando sobre fundo `#131315`, título assimétrico gigante quebrado em duas margens e elemento geométrico cinético lateral.
2. **Sobre Antecipado (Manifesto + Essência Integrados)**: Declaração de largura total com contraste tonal tipográfico (sem lista `01..03`).
3. **Projetos em Grid Editorial-Tech de 2 Colunas (Edge-to-Edge)**: Cards de grande formato em 2 colunas com proporções `16:11`, eliminando o zigue-zague vertical.
4. **Soluções em Índice Tipográfico Interativo**: Linhas amplas em largura total; ao passar o cursor ou focar, uma prévia visual flutuante/inline se expande suavemente.
5. **Metodologia em Faixa Interativa de 6 Capítulos Compactos**: Barra horizontal com indicador de fase e descrição concisa.
6. **Contato em Split Assimétrico + Footer em 2 Blocos + Wordmark**.

### 4. Composição do Hero
Headline em tamanho extremo alinhada à esquerda no topo, com o parágrafo explicativo e CTAs deslocados para a coluna direita inferior — criando tensão diagonal em vez de coluna esquerda vs imagem direita.

### 5. Tipografia
`Space Grotesk` em contraste tonal forte (preto `#131315` vs Steel Gray `#6B7078` dentro da mesma sentença) + `Inter` para leitura densa.

### 6. Distribuição Cromática
Abertura em `#131315` envolvendo cartão `#FAFAF8`, corpo alternando `#131315` (Projetos) e `#FAFAF8` (Índice de Soluções), com `#F2F0EB` aplicado nos cartões de destaque e superfície de contato.

### 7. Direção de Imagens
Superfícies monocromáticas com profundidade, enquadramentos fechados de interfaces conceituais (crop macro estilo estúdio) em vez de janelas inteiras de navegador.

### 8. Apresentação dos Serviços
Índice tipográfico de largura total sem números `01..06` gigantes — foco no nome da disciplina, resumo em uma linha e revelação da capacidade técnica sob demanda.

### 9. Apresentação dos Projetos
Grid 2 colunas (com o primeiro projeto `FJU Artes Marciais` em destaque *full-span* 2 colunas e os 4 demais em pares 1+1) — visualmente impossível de confundir com o zigue-zague da WeTechHub.

### 10. Motion Design
GSAP para transição de camada do Hero e parallax de profundidade nos cards do grid; Motion para hover/focus preview no índice de Soluções.

### 11. Diferenciais
Quebra imediata do layout padrão já nos primeiros 100 pixels (camada sobreposta + tensão diagonal + grid 2 colunas nos projetos).

### 12. Riscos
A proximidade estética com a Origin Brand Studio exige disciplina para manter o tom de **empresa de engenharia de software** (evitando parecer estúdio de branding/moda).

### 13. Wireframe Estrutural
```text
+=======================================================+
| [NWK]  (Header escuro discreto)         [Iniciar]     |
| +---------------------------------------------------+ |
| | Engenharia digital.                               | |
| | Impacto real.                  [Escultura/Geo]    | |
| |                    Texto complementar + CTAs ->   | |
| +---------------------------------------------------+ |
+=======================================================+
|  MANIFESTO + SOBRE INTEGRADOS (Contraste tonal)       |
+-------------------------------------------------------+
|  PROJETOS — GRID 2 COLUNAS (#131315)                  |
|  [          FJU Artes Marciais (Full Span)         ]  |
|  [     Doce Certo     ]   [     NWKBossAI          ]  |
|  [        ZURI        ]   [     NWKstudio          ]  |
+-------------------------------------------------------+
|  SOLUCOES — INDICE TIPOGRAFICO FULL-WIDTH             |
|  Engenharia de software               [Preview/Cap]   |
|  Aplicativos mobile                   [Preview/Cap]   |
+-------------------------------------------------------+
|  METODOLOGIA (#F2F0EB) + CONTATO + FOOTER             |
+=======================================================+
```

---

## Proposta 03 — *Precision System Grid* (Engenharia Modular & Arquitetura de Sistemas)

### 1. Conceito Central
Inspirada na engenharia de sistemas modulares, combinando clareza estrutural suíça com superfícies tecnológicas contemporâneas. A própria página demonstra precisão arquitetural por meio de proporções exatas, divisores estruturais finos e painéis interativos de produto.

### 2. Personalidade Visual
Técnica, estruturada, pragmática e contemporânea — comunica diretamente a maturidade de engenharia da NWK.

### 3. Estrutura da Página
1. **Hero Split Vertical 50/50 Full-Height**: Metade esquerda clara (`#FAFAF8`) com tipografia e CTAs; metade direita escura (`#131315`) com escultura geométrica interativa em altura total.
2. **Manifesto em Faixa Tipográfica Compacta** (`#F2F0EB`).
3. **Soluções em Abas Horizontais com Arquitetura Visual** (`#FFFFFF`, sem accordion).
4. **Projetos em Carrossel Horizontal Controlado (Scroll-Linked Horizontal Track)** (`#131315`, com controles acessíveis e fallback vertical no mobile).
5. **Metodologia em Diagrama de Fluxo Conectado** (`#FAFAF8`).
6. **Sobre + Contato Unificados em Grade Estrutural** (`#FFFFFF` / `#F2F0EB`).
7. **Footer Monumental** (`#131315`).

### 4. Composição do Hero
Divisão vertical exata 50/50 em desktop (`100vh`), eliminando a sensação de "card flutuante" à direita e criando um contraste arquitetural claro/escuro imediato na primeira dobra.

### 5. Tipografia
`Space Grotesk` + `Inter`, com alinhamento rígido em grade de 12 colunas e rótulos técnicos sutis sem repetição de `01..06`.

### 6. Distribuição Cromática
Bipartição claro/escuro logo no Hero (`#FAFAF8` | `#131315`), uso estratégico de `#F2F0EB` no Manifesto e Contato.

### 7. Direção de Imagens
Mockups técnicos de alta definição integrados a trilhos horizontais com perspectiva controlada.

### 8. Apresentação dos Serviços
Sistema de abas interativas (`aria-tablist`) com visualização dedicada em largura ampla para cada uma das 6 áreas.

### 9. Apresentação dos Projetos
Trilho horizontal interativo com botões Anterior/Próximo + scroll horizontal controlado por GSAP ScrollTrigger no desktop (e pilha vertical limpa no mobile).

### 10. Motion Design
GSAP ScrollTrigger para o trilho horizontal de projetos (com alternativa acessível por botões e teclado) e Motion para troca de abas em Soluções.

### 11. Diferenciais
Hero bipartido 50/50 claro/escuro altamente memorável e navegação horizontal de projetos.

### 12. Riscos
Trilhos horizontais vinculados ao scroll exigem implementação impecável para não prejudicar acessibilidade por teclado, leitores de tela ou usuários com `prefers-reduced-motion`.

### 13. Wireframe Estrutural
```text
+--------------------------+----------------------------+
|  #FAFAF8                 |  #131315                   |
|  Engenharia digital.     |                            |
|  Impacto real.           |    [Escultura 3D NWK]      |
|  [Iniciar] [Solucoes]    |                            |
+--------------------------+----------------------------+
|  MANIFESTO (#F2F0EB) — Faixa Tipografica              |
+-------------------------------------------------------+
|  SOLUCOES — Tabs Horizontais + Painel Amplo           |
+-------------------------------------------------------+
|  PROJETOS — Trilho Horizontal Controlado (#131315)    |
|  [FJU] -> [Doce Certo] -> [NWKBossAI] -> [ZURI]       |
+-------------------------------------------------------+
|  METODOLOGIA (Fluxo) | SOBRE + CONTATO | FOOTER       |
+-------------------------------------------------------+
```
