> **REGISTRO HISTÓRICO (2026-11-18)** — descreve uma versão anterior da aplicação e decisões já superadas (ex.: *Architectural Monolith*, NWK Culture como referência). Não é fonte de verdade sobre o código atual; ver `docs/CURRENT_STATE.md` e `docs/CREATIVE_DIRECTION.md`.

# ORIGINALITY_AUDIT.md — Auditoria Comparativa (NWK vs. WeTechHub)

## Método

Comparação estrutural e visual entre a implementação atual da NWK (`http://localhost:3000`) e `https://www.wetechhub.com.br/` (analisada exclusivamente como contraponto via browser em `1440x900`), diferenciando **convenções legítimas da web** de **semelhanças estruturais indesejadas**.

---

## 1. Convenções Legítimas da Web (Não são problema)

- Header fixo com logo à esquerda, 4 links de seção e CTA principal à direita.
- Uso de skip link, labels claros, contraste acessível e âncoras internas (`#solucoes`, `#projetos`, `#sobre`, `#contato`).
- Presença de seções esperadas em empresas de tecnologia (Hero, Serviços, Projetos, Processo, Sobre, Contato).

---

## 2. Diferenças Reais já Existentes

| Dimensão | NWK Atual | WeTechHub |
|---|---|---|
| **Superfícies** | Alternância claro (`#FAFAF8`/`#FFFFFF`), creme (`#F2F0EB`) e escuro (`#131315`) | Dark mode contínuo (`#0B0D10`) do topo ao rodapé |
| **Cor de acento** | Monocromático puro (sem cor de destaque vibrante) | Laranja vibrante (`#F25C24`) em CTAs, marca e marcadores |
| **Tipografia** | `Space Grotesk` + `Inter` | `Instrument Sans` + `IBM Plex Mono` |
| **Serviços** | Accordion interativo + painel visual sticky | Lista aberta com linhas finas e tags com ponto laranja |
| **Contato** | Formulário inline validado com Zod | Sem formulário inline (CTA + e-mail direto) |

---

## 3. Semelhanças Estruturais Indesejadas (Origem da Percepção de Cópia)

1. **Arquétipo do Hero (Alta similaridade estrutural)**:
   - Ambas abrem com grid assimétrico de 2 colunas: `Eyebrow em caixa alta + H1 curto + parágrafo + 2 CTAs` à esquerda e um `bloco gráfico/arquitetural escuro/emoldurado` à direita.
2. **Projetos em Zigue-Zague com Mockups de Janela (Alta similaridade)**:
   - `#projetos` na NWK e `#cases` na WeTechHub empilham projetos verticalmente alternando `mídia/texto` e `texto/mídia` (zigue-zague), com numeração `01..0N`, título, descrição e chips/tags logo abaixo, acompanhados de janelas de navegador escuras com 3 bolinhas no topo.
3. **Seção Sobre em 2 Colunas com Lista Numerada (Alta similaridade)**:
   - `#sobre` na NWK (`Eyebrow + H2 + parágrafo` à esquerda e lista `01`, `02`, `03` separada por linhas horizontais à direita) reproduz exatamente a mesma estrutura visual de `#problemas`, `#solucoes` e `#sobre` da WeTechHub.
4. **Abuso de Numeração `01..06` + Overlines em Caixa Alta**:
   - A repetição sistemática de `OVERLINE` + `01`, `02`, `03` em todas as seções é a marca registrada de templates de software house e aproxima diretamente o ritmo de leitura das duas páginas.
5. **Metodologia / Processo como Seletor `01..0N` + Painel de Detalhe**:
   - Embora o layout seja diferente (cards 3x2 vs lista vertical + wireframe), a mecânica cognitiva e o vocabulário de etapas (`Entender/Descoberta → Estratégia → Engenharia → Evoluir/Evolução`) são muito próximos.

---

## 4. Conclusão da Auditoria de Originalidade

Não há cópia de código, texto ou identidade visual, mas há **convergência estrutural excessiva** no Hero, na seção Sobre, na apresentação em zigue-zague dos Projetos e no padrão de numeração sequencial `01..06`. Uma troca simples de cores ou fontes não resolve; é necessário **romper a estrutura das seções** no redesign.
