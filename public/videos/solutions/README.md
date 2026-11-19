# Vídeos de Soluções (infraestrutura pronta)

Enquanto estes arquivos não existirem, o site usa as imagens estáticas atuais.
Para ativar: adicione os arquivos abaixo e mude `SOLUTION_VIDEOS_READY` para `true` em `src/content/home.ts`.

| Capítulo (slug) | Arquivos | Conceito |
|---|---|---|
| `sistemas` | `sistemas.mp4`, `sistemas.webm`, `sistemas.jpg` | Painel de gestão em monitor ultrawide, dolly-in lento |
| `ia` | `ia.mp4`, `ia.webm`, `ia.jpg` | Fluxo de agente com nós conectados sobre um tablet |
| `mobile` | `mobile.mp4`, `mobile.webm`, `mobile.jpg` | Smartphone com camadas de interface separando-se num gesto |
| `web-automacao` | `web-automacao.mp4`, `web-automacao.webm`, `web-automacao.jpg` | Condutos ópticos com pulsos de dados entre módulos |

Especificação definitiva (1:1, 1600×1600, ≤ 4 s, 24 fps, loop, sem áudio, MP4 ≤ 2,5 MB, WebM ≤ 1,8 MB, poster JPG ≤ 200 KB) e prompts completos:
`ASSETS_PENDENTES.md` (raiz do projeto).

Comportamento implementado: `preload="none"`, carrega quando o capítulo se aproxima, toca só o capítulo ativo,
pausa fora da viewport, não monta em `prefers-reduced-motion` nem com `saveData`; o poster/imagem permanece por baixo
até o vídeo começar a tocar (fade).
