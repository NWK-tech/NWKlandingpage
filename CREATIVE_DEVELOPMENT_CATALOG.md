# NWK — Catálogo de Creative Development

> Pesquisa de 2026-11-18. **Nenhuma alteração foi feita no site, nas dependências ou nos assets.** A hero continua intocável: itens de meio-tom/halftone (ex.: React Bits *Halftone Reveal*) foram deliberadamente **não** recomendados para não competir com ela.
> Skills aplicadas como filtro: `creative-direction` (referência estética ≠ cópia estrutural), `visual-originality-audit` (convenção vs. clonagem), `motion-engineering` (GSAP × Motion sem conflito, transform/opacity, reduced-motion, sem scroll hijacking) e as restrições do projeto (`docs/CREATIVE_DIRECTION.md`: sem métricas inventadas, rotular interfaces conceituais).

## Como ler as evidências
- **[Lido]** li o texto técnico completo/parcial do artigo. **[Observado]** abri a página no navegador e medi/vi o comportamento. **[Docs]** li a página oficial da API/componente. **[Nome]** só confirmei existência, categoria e instalação — a técnica é inferência, marcada como tal.
- O WebFetch devolve texto, não vídeo: efeitos **visuais** de catálogos (React Bits, Aceternity, Magic UI) foram avaliados pela descrição oficial, **não** vistos rodando. Antes de adotar qualquer um, abrir a demo.
- Complexidade: **B** (horas) · **M** (1–2 dias) · **A** (vários dias/risco técnico).

## Licenças e custos — resumo verificado
| Fonte | Situação |
|---|---|
| **GSAP** (inclui ScrollTrigger, SplitText, Flip, Inertia etc.) | Uso comercial gratuito na licença padrão (Webflow). Restrições: não usar em ferramentas no-code concorrentes do Webflow, não remover avisos. Fonte: gsap.com/community/standard-license |
| **Motion (core)** | Descrito como open source; a página não cita a licença (verificar no repositório). **Motion+** (Gallery, Carousel, Ticker, Cursor, AnimateText, ScrambleText, Curtains, splitText…): US$ 399 pagamento único por desenvolvedor; exemplos/APIs Motion+ sob MIT segundo o FAQ. |
| **React Bits** | **MIT + Commons Clause**: uso em sites comerciais OK; proibido vender/sublicenciar/redistribuir os componentes (ex.: em template pack). Instala como código-fonte via shadcn CLI. Existe plano **Pro** (conteúdo não detalhado). |
| **Magic UI** | **MIT** (repositório). Templates "Pro" são pagos; componentes avulsos são livres. |
| **Aceternity UI** | Componentes "free" (Tailwind + Motion) e **All-Access** (pagamento único) para blocos/templates. Licença dos componentes gratuitos **não verificada** (a página lida cobre só a licença Pro, que permite projetos comerciais ilimitados mas proíbe revenda/marketplace). |
| **MetalForge** | Efeitos visíveis/compartilháveis grátis; **código exportado** exige Pro (€ 9,99/mês ou € 80/ano); "tudo que você exporta é seu, em qualquer projeto". Código próprio não é open source. |
| **MotionSites** | Prompts/vídeos pagos (oferta "Lifetime" US$ 299 em vez de US$ 499 no dia da consulta). Operador: pessoa física. Não é biblioteca. |
| **Codrops** | Demos com código no GitHub; artigos como o de typography avisam que **fontes comerciais dos demos não são redistribuídas** (fallback para fontes de sistema). Verificar licença por demo. |
| **CodePen** | Busca global exige conta; "trending" é genérico. Usar apenas como fonte de técnica, conferindo a licença de cada pen. Não contei CodePen como referência. |

---

## Catálogo (31 referências)

### A. Scroll cinematográfico e storytelling

**1. Kinetic Typography on Scroll with GSAP — Codrops** [Lido]
- Link: https://tympanus.net/codrops/2026/11/10/kinetic-typography-gsap/ (autor: Antoine Wodniack, 10/11/2026)
- Experiência: poucas palavras viram o evento principal; cada palavra aparece no ritmo de leitura em voz alta, deixando um rastro colorido (motion trail) sobre grade escura.
- Técnica: HTML real (leitores de tela leem), `.step` de 200lvh como "distância de scroll", conteúdo interno `position: fixed`, **uma timeline GSAP** conduzida por ScrollTrigger, easing/ritmo variados para tirar a linearidade.
- Tech: GSAP Core + ScrollTrigger (+ plugins). Fonte comercial (Pangram Pangram) apenas por permissão no demo.
- NWK: manifesto/headline de Sobre ou uma "frase-chave" entre Projetos e Sobre ("Engenharia digital → Impacto real" não: é a hero). Substituiria a tinta por palavra atual por coreografia com rastro em preto/creme.
- Complexidade: **M**. Licença: GSAP grátis; fonte própria a escolher. Mobile: bom se usar `lvh/svh` como no artigo; reduzir rastro (custo de repaint) e respeitar reduced-motion (mostrar texto estático).

**2. Apple iPhone 18 Pro (página de produto)** [Observado]
- Link: https://www.apple.com/br/iphone-18-pro/
- Medido ao vivo: página de ~54.500 px (≈ 60 telas), **14 elementos `position: sticky`, 14 `<video>`, 0 `<canvas>`**, sem CSS `animation-timeline`. Ou seja: a "mágica" é **sticky + vídeo/imagem em sequência + texto**, não WebGL.
- Técnica: seções sticky em que mídia (vídeo curto/imagem) fica fixa enquanto legendas entram/saem; cada seção resolve uma única ideia.
- Tech: HTML/CSS/JS próprios + vídeos. (A coreografia fina por JS é inferida; só medi estrutura.)
- NWK: confirma a direção de Soluções: **vídeos curtos (≤ 4 s) por disciplina dentro do wipe sticky existente** (assets já especificados na entrega anterior). Não copiar layout; copiar o princípio "uma ideia por tela".
- Complexidade: **M** (principalmente produção de vídeo). Licença: não aplicável (referência de princípio). Mobile: vídeo `playsInline`, poster e pausa fora da viewport; peso é o risco.

**3. SANTAL — Awwwards Site of the Day (15/11/2026)** [Observado na página do Awwwards]
- Link: https://www.awwwards.com/sites/santal (site: https://santalarch.com/)
- Descrição: arquitetura/luxo; destaques listados pelo jurado: *Interstellar* (animação), *Infinity scroll* (transição), *Philosophy*, *Santal Loading*, *Services*. Paleta de apenas 2 cores (#F0F0F0 / #0F0F0F). Tags: WebGL, GSAP, Blender, 3D, Infinite Scroll, Storytelling. Notas: Design 7,42; Animations/Transitions 8,6; Accessibility 7,2; WPO 7,6.
- NWK: prova de que **duas cores (preto/creme) + um único recurso WebGL/3D bem dirigido** pode ganhar SOTD — coerente com a identidade da NWK. Também lembra que acessibilidade/performance pontuam menos que animação mesmo em sites premiados (a NWK pode exigir mais).
- Complexidade (do tipo de efeito): **A**. Licença: n/a. Mobile: WebGL contínuo é o maior risco de bateria/FPS.

**4. Origin Brand Studio (referência autorizada)** [Observado]
- Link: https://originbrandstudio.framer.website/
- Observado: (a) entrada com "Origin®" desfocado sobre fundo escuro (blur-in/preloader curto); (b) hero clara em painel arredondado "recortado" sobre moldura escura; (c) **tiras de imagem torcidas nas laterais do hero** (9 `<canvas>`/filtros — efeito de distorção/ribbon nas bordas, medido no DOM); (d) estatísticas com **contador tipo odômetro**; (e) grade de trabalhos em imagens grandes com título/ano sobreposto; (f) rótulo flutuante fixo ("Get Origin®"). Tipografia: Inter Variable; contraste tonal no headline (cinza/preto).
- Tech: Framer (660 elementos com transform inline).
- NWK: odômetro **só com números reais** (a NWK não tem métricas públicas — não usar enquanto não existirem); painel arredondado sobre moldura escura como transição Soluções→Projetos; imagens grandes com legenda sobreposta para Projetos quando houver capturas reais.
- Complexidade: **B–M**. Licença: referência (não copiar). Mobile: ok; distorção em canvas é o ponto caro.

**5. GSAP ScrollTrigger — pin, scrub, snap, containerAnimation** [Docs]
- Link: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Capacidades relevantes: `pin`, `scrub` com suavização numérica, `snap` (inclui labels), **`containerAnimation`** (seção horizontal guiada por scroll vertical, exige ease linear), `batch`, `matchMedia`, sem scroll-jacking.
- NWK: base das seções já implementadas; novas: **seção horizontal de "capacidades"** (containerAnimation) e `snap` suave na Metodologia.
- Complexidade: **M**. Licença: grátis (padrão Webflow). Mobile: usar `matchMedia` para desligar pin/horizontal em telas pequenas (já é o padrão do projeto).

**6. GSAP Flip — transições de elemento compartilhado** [Docs]
- Link: https://gsap.com/docs/v3/Plugins/Flip/
- Demo oficial "advanced": galeria em que clicar numa imagem a expande em painel de detalhe (`Flip.fit()`); outra: miniatura arrastável vira imagem cheia (`fade: true`).
- NWK: **Projetos** — clicar num mockup/projeto expande para uma visão ampliada (módulos, escopo) sem "pular" de layout; também reordenar/filtrar projetos.
- Complexidade: **M**. Licença: grátis. Mobile: excelente (é só transform); cuidar de foco/ARIA no estado expandido.

**7. Webflow / Osmo — Stacking Cards 3D (CSS)** [Observado]
- Link: https://webflow.com/made-in-webflow/website/osmo-stacking-cards-3d-css
- Descrição: cartas que empilham em 3D ao rolar, **só CSS** (tags: sticky, scroll animation, layers). Clonável no Webflow. Osmo também publica *Glowing Interactive Dots Grid (GSAP Inertia)*, *Apple Dock Navigation Bar*, *Crisp Loading Animation* e *Layered Image Slider* (https://webflow.com/made-in-webflow/website/osmo-v2 e perfil).
- NWK: pilha sticky para as **frentes/entregas dentro de uma disciplina** sem JS pesado. Pode servir como alternativa leve ao pin do GSAP em mobile.
- Complexidade: **B**. Licença: cloneáveis do Webflow têm termos próprios do autor — não copiar código sem conferir; usar como princípio. Mobile: ótimo (CSS).

### B. Apresentação interativa de produtos

**8. Aceternity — Container Scroll Animation** [Docs]
- Link: https://ui.aceternity.com/components/container-scroll-animation
- Efeito: cartão/tela que **rotaciona em 3D conforme o scroll** ("ótimo para hero ou marketing"). Props `titleComponent`, `children`; usa `MotionValue` (Motion).
- NWK: entrada do palco de **Projetos**: o mockup do dispositivo "levanta" de inclinado para frontal ao entrar. Funciona com o DeviceMockup atual.
- Complexidade: **B**. Licença: componente free via shadcn; licença não verificada. Mobile: reduzir rotação; manter só scale/translate.

**9. Aceternity — Sticky Scroll Reveal** [Docs]
- Link: https://ui.aceternity.com/components/sticky-scroll-reveal
- Efeito: coluna de texto rola enquanto o contêiner de mídia fica fixo e troca o conteúdo. `content: {title, description, content}[]`.
- NWK: já existe implementação própria (StickyContentWrapper). Útil só como comparação de API; **não adotar** (duplicaria).
- Complexidade: **B**. Licença: ver tabela. Mobile: ok.

**10. Aceternity — MacBook Scroll** [Docs]
- Link: https://ui.aceternity.com/components/macbook-scroll
- Efeito: ao rolar, a imagem "sai" da tela do notebook (inspirado em fey.com). Props `src`, `showGradient`, `title`, `badge`.
- NWK: **atenção** — mostra interface; só aplicável com captura real ou rotulada como conceitual. Para NWKstudio/NWKBossAI seria uma entrada forte **quando houver tela real**.
- Complexidade: **B**. Licença: ver tabela. Mobile: fica pequeno; trocar por celular.

**11. Magic UI — Device Mocks (iPhone / Safari / Android)** [Docs]
- Links: https://magicui.design/docs/components/iphone · .../safari · .../android
- Efeito: moldura de dispositivo vetorial; `src` (imagem) ou `videoSrc` (vídeo na tela — vídeo é overlay DOM para compatibilidade iOS), proporção fixa 433/882.
- NWK: substituir/complementar o `DeviceMockup` por molduras mais fiéis quando existirem **capturas ou vídeos reais** dos produtos (ZURI no celular, Doce Certo no Safari).
- Complexidade: **B**. Licença: MIT. Mobile: leve (SVG + vídeo opcional).

**12. React Bits — Card Swap** [Docs]
- Link: https://reactbits.dev/components/card-swap
- Efeito: pilha 3D de cartas; a da frente vai para o fundo por timer ou "fling".
- NWK: alternar **módulos conceituais** de um projeto (ex.: "Ficha técnica → Custo → Preço" em Doce Certo) dentro do dispositivo.
- Complexidade: **B**. Licença: MIT + Commons Clause. Mobile: ok; desativar auto-advance com reduced-motion.

**13. Motion — Three.js TSL "particle morph"** [Lido]
- Link: https://motion.dev/examples/js-three-tsl
- Efeito: foto vira grade de partículas coloridas; **segurar** o canvas forma um globo rotativo; soltar volta à foto. Instanciado (~200 colunas), `WebGPURenderer`, TSL; molas do Motion controlam um `uniform`; canvas com `role="button"`, foco e `aria-label`.
- Limitação: **sem fallback WebGL** (requer WebGPU).
- NWK: manifesto/Soluções de IA — metáfora "dados → modelo"; **cuidado**: pontos/partículas ficam próximos da linguagem da hero de meio-tom.
- Complexidade: **A**. Licença: exemplo no site do Motion (não rotulado como pago). Mobile: WebGPU ainda irregular; exigiria fallback estático.

### C. Imagens, vídeo e transições

**14. React Bits — Scroll Expand** [Docs]
- Link: https://reactbits.dev/animations/scroll-expand
- Efeito: **moldura de mídia arredondada cresce até sangrar a tela** durante o scroll.
- NWK: transição Soluções→Projetos ou revelação de um **vídeo de disciplina** (≤ 4 s) em tela cheia; reforça o "painel arredondado" que a Origin usa.
- Complexidade: **B**. Licença: MIT + Commons Clause. Mobile: bom (scale/clip-path).

**15. React Bits — Pixel Transition** [Docs]
- Link: https://reactbits.dev/animations/pixel-transition
- Efeito: cartão coberto por blocos de pixels sólidos, conteúdo trocado por baixo, pixels somem.
- NWK: troca entre **estado "problema" e "solução"** em Soluções/Metodologia. Estética retrô: avaliar (pode conflitar com o tom premium).
- Complexidade: **B**. Licença: MIT + Commons Clause. Mobile: ok.

**16. Aceternity — Chromatic Image** [Docs]
- Link: https://ui.aceternity.com/components/chromatic-image
- Efeito: imagem interativa com separação cromática, deslocamento e tilt.
- NWK: microinteração em imagens de Soluções (hover). **Cuidado** com excesso de "efeito por efeito".
- Complexidade: **B**. Licença: ver tabela. Mobile: sem hover; degradar para estático.

**17. Motion+ — Curtains / Cursor / Ticker / splitText** [Docs — só nomes]
- Link: https://motion.dev/plus
- Itens listados: Gallery, Carousel, Ticker, Cursor, AnimateNumber, AnimateText, Typewriter, ScrambleText, AnimateView, **Curtains**, splitText. Demonstrações em https://motion.dev/examples (ex.: *Gallery: Helix* — galeria em hélice — é Motion+).
- NWK: *Curtains* (transição tipo cortina entre seções) e *AnimateView* (transições de view) como alternativa nativa ao que hoje se faz com clip-path/GSAP. Não instalar sem decisão de pagar US$ 399.
- Complexidade: **B–M**. Licença: pago (US$ 399 único). Mobile: depende do item.

### D. Tipografia cinética

**18. React Bits — Scroll Float / Scroll Velocity / Variable Proximity** [Nome + Docs parciais]
- Links: https://reactbits.dev/text-animations/scroll-float · .../scroll-velocity · .../variable-proximity
- Scroll Float: texto flutua com parallax no scroll [Docs]. Scroll Velocity e Variable Proximity: efeitos por velocidade de scroll e proximidade do cursor (nomes; efeito inferido).
- NWK: marquee de disciplinas reagindo à velocidade do scroll (faixa entre seções). Variable Proximity exige fonte variável — **Space Grotesk é variável** (verificar eixos no arquivo carregado).
- Complexidade: **B**. Licença: MIT + Commons Clause. Mobile: proximidade não existe em touch; manter velocidade.

**19. Magic UI — Text Reveal / Scroll Based Velocity / Kinetic Text** [Docs parcial]
- Links: https://magicui.design/docs/components/text-reveal · .../scroll-based-velocity · .../kinetic-text
- Text Reveal: texto surge progressivamente com o scroll [Docs] (equivale ao que já temos). Os outros dois: [Nome].
- NWK: baixa prioridade — já temos reveal por palavra; usar só como comparação.
- Complexidade: **B**. Licença: MIT. Mobile: bom.

### E. Parallax, profundidade e carrosséis

**20. React Bits — Depth Carousel** [Docs]
- Link: https://reactbits.dev/components/depth-carousel
- Efeito: cartas ao longo de um trilho 3D que recuam; navegação por arrasto, teclado ou automática.
- NWK: seletor de **projetos** (5 itens) com profundidade e teclado nativo — alternativa ao palco pinado em telas onde pin não é desejado (mobile!).
- Complexidade: **M**. Licença: MIT + Commons Clause. Mobile: arrasto é natural em touch — **ponto forte**.

**21. React Bits — Scroll Stack** [Docs]
- Link: https://reactbits.dev/components/scroll-stack
- Efeito: cartões fixam e empilham ao rolar, formando um baralho escurecido, "sem tremor".
- NWK: empilhar os **6 passos da Metodologia** ou as 3 premissas do Manifesto. Atenção: não repetir o mesmo recurso nas duas seções.
- Complexidade: **B–M**. Licença: MIT + Commons Clause. Mobile: bom.

**22. Motion — scroll-linked APIs (useScroll/useTransform/ScrollTimeline)** [Docs]
- Link: https://motion.dev/docs/react-scroll-animations
- Capacidades: `useScroll` com `target/offset`, `useTransform` multi-camada (parallax), `useSpring`, `whileInView`; usa o `ScrollTimeline` nativo quando existe (animação fora da main thread). Padrão horizontal: contêiner de 300vh + filho sticky.
- NWK: **parallax multicamadas** nos mockups de projeto sem GSAP; atenção à regra do projeto: não misturar Motion e GSAP na mesma propriedade/elemento.
- Complexidade: **B**. Licença: open source. Mobile: ScrollTimeline nativo é o caminho mais barato.

**23. Motion — Lenis smooth scroll (exemplo React)** [Nome]
- Link: https://motion.dev/examples/react-lenis-smooth-scroll
- A NWK já usa Lenis sincronizado ao ticker do GSAP; o exemplo serve de checagem cruzada de integração.
- Complexidade: **B**. Mobile: manter `smoothTouch` desligado (padrão).

### F. Shaders e materiais

**24. React Bits — Metallic Paint** [Docs]
- Link: https://reactbits.dev/animations/metallic-paint
- Efeito: logotipo/texto com acabamento **metálico líquido** (adaptado do shader "Liquid Metal" da Paper).
- NWK: potencial para o **logotipo NWK** em um fechamento (Footer). **Restrição**: o logotipo oficial deve ser preservado — usar só como tratamento em um monograma decorativo aprovado, nunca substituir o logotipo.
- Complexidade: **M**. Licença: MIT + Commons Clause. Mobile: shader contínuo → pausar fora da viewport.

**25. MetalForge — Prism / Liquid Metal / Glass / Chrome** [Nome + Docs]
- Link: https://metalforge.xyz/effects (68 efeitos, p.ex. /effects/prism, /effects/orb-liquid-metal, /effects/chrome, /effects/liquid-chrome, /effects/cloth)
- Descrição: shaders para SwiftUI, React Native e web ("a maioria exporta para web"). Pricing: ver tabela. Há MCP beta.
- NWK: **atenção ao alerta do brief** (nada de esculturas/objetos industriais aleatórios). Uso possível: material de vidro/cromo **dentro** de uma interface de produto, não como decoração.
- Complexidade: **M**. Licença/custo: código exige Pro. Mobile: shaders custam GPU; testar em aparelho real.

**26. React Bits — Backgrounds (Aurora, Silk, Dither, Liquid Chrome…)** [Nome]
- Link: https://reactbits.dev/get-started/index (seção Backgrounds, ~70 itens)
- Muitos usam WebGL (inferido por descrições de outros itens). **Risco alto de "estética de template"** — não recomendado como fundo genérico. Útil só em contexto muito específico.
- Complexidade: **M**. Licença: MIT + Commons Clause. Mobile: custo contínuo de GPU.

### G. Microinterações

**27. React Bits — Flowing Menu** [Docs]
- Link: https://reactbits.dev/components/flowing-menu
- Efeito: menu em tela cheia; uma faixa líquida desliza entre as linhas e, ao pousar, mostra um marquee do item.
- NWK: **índice de disciplinas** (hoje acordeão tipográfico) ou menu de navegação mobile em tela cheia.
- Complexidade: **B–M**. Licença: MIT + Commons Clause. Mobile: hover não existe — adaptar para toque.

**28. Aceternity — Magnetic Button** [Docs]
- Link: https://ui.aceternity.com/components/magnetic-button (botão que deriva até o cursor e volta com mola; Motion)
- A NWK já tem `Magnetic.tsx`. Aqui vale só como conferência de física (spring).
- Complexidade: **B**. Mobile: sem efeito em touch (ok).

**29. Osmo — Glowing Interactive Dots Grid (GSAP Inertia)** [Nome]
- Link: perfil Osmo em https://webflow.com/made-in-webflow/website/osmo-stacking-cards-3d-css ("More sites by Osmo")
- Grade de pontos que reage ao cursor com inércia (GSAP InertiaPlugin). **Colide com a hero (matriz de pontos)** → listado só para registro; não recomendado.

### H. Composições experimentais e sensoriais

**30. Codrops — Cloth Posters com WebGPU** [Lido]
- Link: https://tympanus.net/codrops/2026/11/17/cloth-posters-webgpu/ (Jesper Landberg, 17/11/2026)
- Efeito: carrossel infinito onde cada pôster é um **tecido simulado** (grade 25×33, XPBD) que "drapeia" ao rolar; clique levanta o pôster e abre uma folha de detalhe cujo texto também dobra. Sem scroll nativo (scroll virtual), um único canvas WebGPU. Nuxt 4, Tailwind 4, GSAP, libs próprias (@alpacka/scroll, DomGL).
- Limitação declarada: **requer WebGPU, sem fallback**.
- NWK: conceito de "colunas de scroll aninhadas" e **DOM espelhado em GPU** (os elementos continuam acessíveis no DOM). Excessivo para NWK hoje; serve de teto técnico.
- Complexidade: **A**. Licença: ver repositório do demo. Mobile: alto risco.

**31. Codrops — DKTON, site "ouça antes de ler"** [Lido]
- Link: https://tympanus.net/codrops/2026/11/12/dkton/ (Barry Baris Dogan, 12/11/2026)
- Experiência: o site é construído em torno do **som** (Web Audio, Howler.js), com medidores ao vivo, faders jogáveis e instrumento no rodapé; porta de entrada "Enter the experience" resolve a restrição de autoplay; um `AnalyserNode` alimenta todos os medidores; `data-sound` no Webflow; GSAP.
- Lição geral (não o som): **a marca vira a interação** — cada seção é um "equipamento" do ofício do cliente.
- NWK: equivalente sem áudio: cada seção como um **instrumento de engenharia** (painel de build, pipeline, checklist de testes) — já é o espírito da Metodologia. Áudio **não recomendado** (acessibilidade/contexto B2B).
- Complexidade: **M** (sem áudio). Mobile: bom se sem áudio.

---

## Mapa por tema pedido
- **Scroll cinematográfico:** 1, 2, 5, 14, 22
- **Produtos interativos:** 8, 10, 11, 12, 6
- **Imagens/vídeos:** 2, 14, 15, 16
- **Tipografia cinética:** 1, 18, 19
- **Transições entre seções:** 4, 14, 17, 7
- **Parallax avançado:** 22, 8, 21
- **Microinterações:** 27, 28 (+ 12)
- **Shaders/materiais:** 24, 25, 13, 30
- **Composições interativas:** 6, 20, 31
- **Profundidade:** 8, 20, 7, 12
- **Storytelling visual:** 2, 3, 31

## Top 10 para a NWK (e por quê)

| # | Descoberta | Onde na NWK | Por que entra |
|---|---|---|---|
| 1 | **#2 Apple — sticky + vídeo curto** (princípio) | Soluções | Confirmado por medição: é sticky + vídeo, não WebGL. Resolve a maior lacuna atual (imagens estáticas de IA) com vídeos ≤ 4 s ligados a cada disciplina. Custo é produção de assets, não código. |
| 2 | **#6 GSAP Flip** | Projetos | Expande projeto → detalhe sem salto de layout; aprofunda "apresentação premium" sem novas dependências (GSAP já instalado, grátis). |
| 3 | **#1 Kinetic Typography (Codrops)** | Manifesto | Estrutura clara (`step` + fixed + 1 timeline), acessível (texto real), em preto/creme. Eleva o manifesto de "tinta por palavra" para coreografia com ritmo. |
| 4 | **#14 Scroll Expand** | Soluções ↔ Projetos | Transição de seção cinematográfica barata (scale/clip-path), ótima com vídeo cheio; mobile-friendly. |
| 5 | **#20 Depth Carousel** | Projetos (mobile) | Entrega profundidade e navegação por toque/teclado onde o pin é ruim; pode ser o fallback mobile do palco. |
| 6 | **#11 Magic UI Device Mocks** | Projetos | MIT; aceita imagem **ou vídeo** na tela — pronto para quando houver capturas reais, mantendo a regra "interface conceitual rotulada". |
| 7 | **#5 ScrollTrigger containerAnimation** | Soluções/Sobre | Seção horizontal guiada por scroll vertical para "capacidades"; já dominamos a ferramenta. |
| 8 | **#22 Motion scroll APIs / ScrollTimeline** | Parallax nos mockups | Parallax multicamadas fora da main thread; menor custo mobile; sem dependência nova. |
| 9 | **#4 Origin — painel arredondado sobre moldura escura + legendas sobre imagem grande** | Transições/Projetos | Referência autorizada; padrão de composição (não de código) que dá ritmo entre seções claras e escuras. Odômetro só com dados reais. |
| 10 | **#21 Scroll Stack** | Metodologia **ou** Manifesto (escolher uma) | Baralho sticky com leve escurecimento: formato diferente dos cartões e linhas atuais. Escolher apenas uma seção para não repetir recurso. |

**Quase entraram:** #8 Container Scroll (rotação 3D do mockup — bom, mas depende de licença Aceternity), #31 DKTON (lição de marca-como-interação; áudio descartado), #3 SANTAL (prova de que duas cores + um recurso WebGL funcionam).

## Não recomendados (e por quê)
- **Halftone Reveal, Dot Grid, Dots/Interactive Dots Grid, ASCII/Dither:** competem com a linguagem da hero aprovada.
- **Backgrounds WebGL genéricos (React Bits/MotionSites) e shaders decorativos (MetalForge):** risco de "estética de template/objeto aleatório" proibida no brief.
- **WebGPU sem fallback (#13, #30):** inviável hoje para site institucional (mobile/compatibilidade).
- **MotionSites como biblioteca:** são prompts/vídeos pagos para gerar sites com IA; útil como **galeria de composição** (observei *Shadow 3D*, *Moss Valley*, *Sky Cookie* em 3D interativo) e de backgrounds em vídeo, não como dependência. Fonte: https://motionsites.ai/3d-websites · /backgrounds.

## Limitações desta pesquisa
- Não vi rodando as demos de React Bits, Aceternity, Magic UI e MetalForge (só descrições oficiais); itens [Nome] são inferência.
- Apple: medi estrutura (sticky/vídeo/canvas), não a coreografia JS.
- Origin e Awwwards: observações visuais curtas num pane pequeno; não gravei vídeo.
- CodePen exige conta para busca; não selecionei pens específicos.
- Licenças: GSAP, React Bits, Magic UI, MetalForge e Motion+ verificadas em páginas oficiais; **Aceternity (componentes free) e core do Motion não confirmadas**.
- Preços e ofertas (US$ 299 MotionSites, € 9,99 MetalForge, US$ 399 Motion+) são do dia 2026-11-18 e podem mudar.
