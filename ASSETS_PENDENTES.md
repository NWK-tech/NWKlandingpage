# NWK — Assets definitivos pendentes

> Consolidado em 2026-11-18. Tudo o que o proprietário precisa produzir/entregar para substituir os fallbacks atuais.
> **Nenhum arquivo abaixo existe ainda.** Enquanto não existirem, o site usa as imagens estáticas atuais (Soluções) e a representação conceitual rotulada (Projetos). Nada quebra por faltarem.
> A hero e seus assets (`hands-sheet.webp`) **não** fazem parte desta lista.

## Como ativar (resumo)
| Grupo | Passo de ativação |
|---|---|
| Vídeos de Soluções | Colocar os 12 arquivos em `public/videos/solutions/` e mudar `SOLUTION_VIDEOS_READY` para `true` em `src/content/home.ts`. |
| Mídia dos projetos | Colocar os arquivos em `public/projects/<id>/` e declarar cada um em `src/features/home/projectMedia.ts` (exemplo no final). Ao existir mídia real numa tela, o rótulo "Representação conceitual" some automaticamente. |

---

## 1. Soluções — vídeos cinematográficos (4 clipes × 3 arquivos)

**Finalidade:** substituir a imagem estática de cada capítulo do storytelling sticky de Soluções por um clipe curto em loop. Cada clipe representa concretamente a disciplina (nada de formas abstratas).
**Diretório de destino:** `public/videos/solutions/`
**Comportamento já implementado:** `preload="none"`; só o capítulo ativo toca; pausa ao sair da seção; não é montado com `prefers-reduced-motion` nem `saveData`; a imagem atual fica por baixo e some com fade quando o vídeo começa a tocar.

### Especificação comum
| Item | Valor |
|---|---|
| Proporção de entrega | **1:1** |
| Resolução de entrega | **1600 × 1600 px** |
| Por que 1:1 | O painel é exibido em ~0,8 (desktop, metade da tela × 100vh) e ~1,17 (mobile). Com `object-fit: cover`, o quadrado perde pouco nos dois. 16:9 perderia ~35% das laterais no desktop. |
| Se a ferramenta só gerar 16:9 | Gere em 16:9 na maior resolução (ex.: 3840×2160), mantendo **todo o assunto no quadrado central** (56% da largura), e recorte para 1:1 na edição. |
| Duração | **4,0 s máx.** (3,0–4,0 s) |
| Taxa de quadros | 24 fps |
| Loop | Sem corte perceptível: faça crossfade de ~0,4 s entre fim e início na edição. |
| Áudio | Nenhum (remover a faixa). |
| Conteúdo proibido | Texto legível, logotipos, marcas de terceiros, pessoas/rostos/mãos, objetos aleatórios. |
| Paleta base | Carvão `#131315` e creme `#F2F0EB`, com **um** acento por disciplina (abaixo). |
| MP4 | H.264 High, yuv420p, `-movflags +faststart`; **≤ 2,5 MB** |
| WebM | VP9 (ou AV1); **≤ 1,8 MB** |
| Poster | JPG q80 1600×1600; **≤ 200 KB** (primeiro quadro do clipe) |

Exemplo de conversão (a partir de um master sem perdas `master.mov`):
```powershell
ffmpeg -i master.mov -an -vf "scale=1600:1600,fps=24" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart sistemas.mp4
ffmpeg -i master.mov -an -vf "scale=1600:1600,fps=24" -c:v libvpx-vp9 -crf 36 -b:v 0 sistemas.webm
ffmpeg -i master.mov -vf "scale=1600:1600" -frames:v 1 -q:v 3 sistemas.jpg
```

### 1.1 Sistemas personalizados e plataformas SaaS
| Campo | Valor |
|---|---|
| Serviço | Engenharia de software / Sistemas e SaaS (capítulo "Sistemas personalizados e plataformas SaaS") |
| Finalidade | Mostrar a construção de um painel de gestão sofisticado |
| Arquivos | `sistemas.mp4` · `sistemas.webm` · `sistemas.jpg` |
| Destino | `public/videos/solutions/` |
| Acento | Âmbar quente muito discreto sobre creme |

**Prompt completo:**
> Cinematic macro shot, 4 seconds, seamless loop. A dark matte ultrawide studio monitor in a dim room displays a clean business-management dashboard made of layered translucent frosted-glass panels: a data table, a line chart, a kanban board and a small settings card, all abstract with no readable text. Soft warm cream key light from the left, subtle amber glints in the glass, deep carbon-black background (#131315). Very slow dolly-in toward the screen with a barely perceptible parallax between glass layers, shallow depth of field, premium product-commercial look, photorealistic, 24 fps. Keep the monitor centered inside a square safe area. No text, no logos, no people, no hands.

**Negative prompt:** readable text, logos, watermarks, people, faces, hands, neon purple, rainbow gradients, clutter, camera shake, fast motion, cuts.

### 1.2 Inteligência artificial e agentes operacionais
| Campo | Valor |
|---|---|
| Serviço | Inteligência artificial |
| Finalidade | Representar um agente/fluxo de IA conectado a dados reais |
| Arquivos | `ia.mp4` · `ia.webm` · `ia.jpg` |
| Destino | `public/videos/solutions/` |
| Acento | Azul frio (`#7dd3fc`) discreto |

**Prompt completo:**
> Cinematic product shot, 4 seconds, seamless loop. A matte-black tablet lies on a dark desk next to a closed laptop in a dim studio. Above the tablet screen a small constellation of connected glass nodes floats a few centimeters in the air; the nodes light up one after another in cool pale blue (#7dd3fc) along thin luminous lines, as if an agent were triaging tasks, then settle. Soft cream rim light, carbon-black environment (#131315), very slow orbit of the camera (about 8 degrees), shallow depth of field, premium and restrained, photorealistic, 24 fps. Subject centered in a square safe area. No text, no logos, no people, no hands.

**Negative prompt:** readable text, logos, watermarks, people, faces, hands, robots, glowing brains, purple/neon excess, particle storms, fast motion, cuts.

### 1.3 Aplicativos mobile e experiências em campo
| Campo | Valor |
|---|---|
| Serviço | Aplicativos mobile |
| Finalidade | Mostrar interface móvel em camadas, gestos naturais e resposta tátil |
| Arquivos | `mobile.mp4` · `mobile.webm` · `mobile.jpg` |
| Destino | `public/videos/solutions/` |
| Acento | Índigo suave (`#a5b4fc`) |

**Prompt completo:**
> Cinematic product shot, 4 seconds, seamless loop. A matte carbon-black smartphone stands upright, floating slightly, in a dark studio. Three translucent interface layers (cards, a list and a bottom sheet, all abstract with no readable text) gently separate in depth above the screen as if responding to a swipe gesture, then glide back into alignment. Faint soft indigo (#a5b4fc) accent glow on the glass edges, cream key light, carbon background (#131315). Slow push-in, shallow depth of field, premium commercial look, photorealistic, 24 fps. Phone centered in a square safe area. No text, no logos, no people, no hands.

**Negative prompt:** readable text, logos, watermarks, people, faces, hands touching the screen, app-store icons, neon purple, shaky camera, fast motion, cuts.

### 1.4 Plataformas web, automações e integrações
| Campo | Valor |
|---|---|
| Serviço | Desenvolvimento web / Automações e integrações |
| Finalidade | Representar sistemas conectados e dados fluindo entre módulos |
| Arquivos | `web-automacao.mp4` · `web-automacao.webm` · `web-automacao.jpg` |
| Destino | `public/videos/solutions/` |
| Acento | Âmbar (`#fde68a`) em pulsos discretos |

**Prompt completo:**
> Cinematic macro shot, 4 seconds, seamless loop. Dark glass optical conduits connect modular matte-black blocks on a dark surface; small amber (#fde68a) pulses of light travel along the conduits from block to block in sequence, like data moving between systems, then the sequence restarts. Cream rim light, deep carbon-black background (#131315), slow lateral dolly of the camera along the conduits, shallow depth of field, precise and calm, premium engineering aesthetic, photorealistic, 24 fps. Composition centered in a square safe area. No text, no logos, no people, no hands.

**Negative prompt:** readable text, logos, watermarks, people, faces, hands, sparks, explosions, rainbow lights, clutter, fast motion, cuts.

---

## 2. Projetos — capturas reais e vídeos de demonstração

**Finalidade:** substituir a representação conceitual das cenas de Projetos por telas reais dos produtos. **Devem ser capturas/gravações reais** da interface existente; **não** gere interfaces por IA para apresentá-las como reais (regra do projeto). Prompt de geração: **não se aplica** (ver instruções de captura abaixo).
**Diretório de destino:** `public/projects/<id>/` — `<id>` = `fju-artes-marciais`, `doce-certo`, `nwk-boss-ai`, `zuri`, `nwk-studio`.

### Especificação comum
| Tipo | Arquivo | Resolução | Proporção | Formato | Tamanho recomendado |
|---|---|---|---|---|---|
| Captura de desktop | `desktop.webp` | 1920 × 1200 | 16:10 | WebP q82 | ≤ 250 KB |
| Captura de celular | `mobile.webp` | 866 × 1764 | 433:882 | WebP q82 | ≤ 150 KB |
| Vídeo de desktop (opcional) | `desktop.mp4` + `desktop.webm` + `desktop-poster.jpg` | 1920 × 1200 | 16:10 | H.264 / VP9 / JPG | MP4 ≤ 3 MB · WebM ≤ 2,2 MB · poster ≤ 200 KB |
| Vídeo de celular (opcional) | `mobile.mp4` + `mobile.webm` + `mobile-poster.jpg` | 866 × 1764 | 433:882 | H.264 / VP9 / JPG | MP4 ≤ 2 MB · WebM ≤ 1,5 MB · poster ≤ 120 KB |
| Duração dos vídeos | — | — | — | — | 4–8 s, loop, sem áudio, 30 fps |

**Regras de captura:** pt-BR; dados **sintéticos** (nunca dados pessoais ou de clientes reais); sem informações sensíveis visíveis; sem barras do navegador/sistema (capturar só a área do app); sem moldura de dispositivo (o site aplica a moldura); texto nítido (capturar em 2× e reduzir). Se o vídeo e a imagem existirem para a mesma tela, o vídeo prevalece quando declarado.

### Quais telas cada projeto usa na cena atual
| Projeto | Cena | Telas necessárias | Arquivos exatos (mínimo) | Estado sugerido a capturar |
|---|---|---|---|---|
| **FJU Artes Marciais** — plataforma de gestão esportiva | Desktop + celular sobrepostos | desktop **e** mobile | `public/projects/fju-artes-marciais/desktop.webp` · `public/projects/fju-artes-marciais/mobile.webp` | Desktop: módulo "Modalidades e turmas". Celular: acompanhamento/lista de atletas. |
| **Doce Certo** — gestão e precificação | Janela de desktop + chips | desktop | `public/projects/doce-certo/desktop.webp` | Ficha técnica de uma receita com formação de preço. |
| **NWKBossAI** — IA e produtividade | Janela de desktop + painel de contexto | desktop | `public/projects/nwk-boss-ai/desktop.webp` | Agente de triagem / fila de automações. |
| **ZURI** — IA local no dispositivo | Dois celulares (traseiro e frontal) | mobile (a **mesma** imagem aparece nos dois aparelhos) | `public/projects/zuri/mobile.webp` | Conversa em andamento mostrando a resposta gerada no próprio dispositivo (somente se o produto expuser isso na interface). |
| **NWKstudio** — prospecção e experiências web | Janela principal + janela secundária | desktop (a janela secundária "Briefing técnico" continua conceitual) | `public/projects/nwk-studio/desktop.webp` | Fluxo de prospecção/briefing técnico. |

> Observação técnica: ZURI usa a mesma tela nos dois celulares; se quiser telas diferentes, será preciso um pequeno ajuste de código (fora do escopo desta etapa).

### Como declarar (exemplo em `src/features/home/projectMedia.ts`)
```ts
"doce-certo": {
  desktop: {
    kind: "image",
    src: "/projects/doce-certo/desktop.webp",
    alt: "Tela de ficha técnica e formação de preço do Doce Certo",
  },
},
// vídeo:
"fju-artes-marciais": {
  desktop: {
    kind: "video",
    src: "/projects/fju-artes-marciais/desktop.mp4",
    webm: "/projects/fju-artes-marciais/desktop.webm",
    poster: "/projects/fju-artes-marciais/desktop-poster.jpg",
    alt: "Demonstração do módulo de modalidades e turmas da plataforma FJU",
  },
},
```

---

## 3. Itens que **não** exigem novos assets
- Hero (`public/images/propostas/hands-sheet.webp`): intocável.
- Logotipos, símbolo, favicon, ícones e Open Graph: já existem (ver `docs/ASSET_REGISTER.md`). Pendência não visual: o proprietário ainda deve validar o logotipo vetorizado contra o arquivo oficial.
- Imagens atuais de Soluções (`public/images/propostas/service-*.jpg`, 1376×768, ~0,5 MB cada): permanecem como fallback e poster visual até os vídeos existirem. **Não removidas.**

## 4. Opcional (precisa de aprovação do proprietário)
Quando os vídeos estiverem ativos, as 4 imagens `service-*.jpg` (≈ 2,1 MB no total) deixam de ser o primeiro recurso e podem ser convertidas para WebP (~150 KB cada) para reduzir o peso inicial no mobile. Não foi feito nesta etapa para não alterar assets.
