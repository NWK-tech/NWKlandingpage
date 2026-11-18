# NWK — Brand Book Digital (Versão Inicial)

> **Nota de Governança**: Este documento diferencia explicitamente as **diretrizes aprovadas pelo proprietário** (extraídas da missão oficial) das **propostas criativas adotadas pelo agente** durante a concepção inicial.

## 1. Estratégia

- **Posicionamento (Aprovado)**: Empresa de tecnologia, engenharia de software e desenvolvimento de soluções digitais capaz de atuar em múltiplos níveis de complexidade e construir produtos próprios.
- **Propósito (Aprovado)**: Construir tecnologia que resolve problemas reais, unindo engenharia de software, design e inovação.
- **Personalidade (Aprovada)**: Tecnológica, contemporânea, sofisticada, inovadora, independente, confiante, precisa, criativa e profissional.
- **Tom de voz (Aprovado)**: Autoridade sem arrogância, inovação sem exageros, sofisticação sem artificialidade. Texto direto, técnico quando necessário e livre de clichês comerciais.

## 2. Identidade Visual e Logotipo

### Conceito do Logotipo (Oficial — Validado pelo Proprietário)

- **Origem**: Vetorização geométrica fiel a partir do arquivo oficial da marca NWK fornecido pelo proprietário (`public/brand/nwk-symbol.svg` e `public/brand/nwk-logo-horizontal.svg`).
- **Construção**: Símbolo composto por duas fitas/chevrons angulares entrelaçados em simetria rotacional de `180°` com cortes diagonais paralelos, acompanhado do wordmark geométrico proprietário `NWK` em preenchimento monocromático (`#131315` em fundos claros / `#FAFAF8` ou `#FFFFFF` em fundos escuros).
- **Variações produzidas**:
  - Horizontal escuro (`nwk-logo-horizontal.svg`) e claro (`nwk-logo-horizontal-light.svg`)
  - Monocromático preto (`nwk-logo-black.svg`) e branco (`nwk-logo-light.svg`)
  - Símbolo isolado (`nwk-symbol.svg`, `nwk-symbol-light.svg`)
  - Favicon SVG (`favicon.svg`) e PNGs rasterizados em `public/icons/`
- **Área de proteção recomendada (Proposta)**: Mínimo de `0.5x` a altura do símbolo ao redor de toda a marca.
- **Tamanho mínimo recomendado (Proposta)**: `24px` de altura para o símbolo isolado; `110px` de largura para a versão horizontal em telas digitais.
- **Usos incorretos**: Distorcer proporções, aplicar gradientes coloridos/roxo/dourado, rotacionar o símbolo fora da escultura institucional ou aplicar versão escura sobre fundo `#131315`.

## 3. Paleta Cromática Oficial

| Token | Hex | Aplicação | Origem |
|---|---|---|---|
| Carbon Black | `#131315` | Identidade, contraste, seções dark e footer | Base aprovada |
| Graphite | `#232429` | Superfícies escuras elevadas e mockups | Base aprovada |
| Pure White | `#FFFFFF` | Cards elevados e superfícies de destaque | Base aprovada |
| Soft White | `#FAFAF8` | Fundo principal | Base aprovada |
| Neutral Cream | `#F2F0EB` | Fundos alternativos estratégicos (ex.: Metodologia) | Base aprovada |
| Silver Gray | `#D9DBDE` | Bordas e divisores sutis | Base aprovada |
| Steel Gray | `#6B7078` | Textos secundários e contraste tonal tipográfico | Base aprovada |

## 4. Tipografia (Proposta Criativa)

- **Família Display & Headings**: `Space Grotesk` (pesos 400, 500, 600, 700) — personalidade geométrica contemporânea.
- **Família Body & UI**: `Inter` (pesos 400, 500, 600) — legibilidade elevada em interfaces e textos longos.
- **Escala fluida**: `clamp()` aplicado em Display, H1, H2, H3 e Body Large.

## 5. Direção Artística

- **Escultura Arquitetônica (Hero)**: Composição aberta em três planos interconectados (*Núcleo & Sistemas* → *Engenharia & Integração* → *Produto & Experiência*), ancorada abaixo do título monumental centralizado.
- **Apresentação de Projetos (Product Stage)**: Palco único interativo monocromático com iluminação zenital sutil e alternância acessível por abas entre mockups de desktop, smartphone e composição híbrida.

## 6. Motion Identity (Proposta Criativa)

- **Personalidade**: Precisa, contida e arquitetural — movimento que organiza e revela informação sem atrasar a leitura.
- **Curva principal**: `cubic-bezier(0.22, 1, 0.36, 1)` (`precision`) e `power3.out` no GSAP.
- **Durações**: Rápida (`220ms`), Normal (`450ms`), Lenta (`750ms`).
- **Restrições**: Sem scroll hijacking, sem telas de carregamento bloqueantes, e respeito integral a `prefers-reduced-motion`.
