# NWK — Design System

## Foundations

Todas as fundações estão centralizadas em `src/tokens/foundations.ts` e expostas como CSS Custom Properties em `src/styles/tokens.css`, integradas ao Tailwind CSS v4 via `@theme inline`.

### Categorias de Tokens

- **Cores & Semântica**: `--nwk-bg-primary`, `--nwk-bg-elevated`, `--nwk-bg-alternative`, `--nwk-bg-dark`, `--nwk-text-primary`, `--nwk-text-secondary`, `--nwk-text-muted`, `--nwk-border-subtle`, `--nwk-success`, `--nwk-error`, `--nwk-warning`, `--nwk-info`.
- **Tipografia**: `--nwk-text-display` até `--nwk-text-h4` usando `clamp()`.
- **Raios e Sombras**: `--nwk-radius-xs` a `--nwk-radius-pill`; `--nwk-shadow-sm` a `--nwk-shadow-dark`.
- **Motion**: `--nwk-duration-fast/normal/slow`, `--nwk-ease-precision/expo`.

## Componentes Fundamentais (`src/components/ui/`)

| Componente | Responsabilidade | Estados |
|---|---|---|
| `Logo` | Marca horizontal ou símbolo isolado | `dark` / `light` |
| `Button` | Ação primária/secundária/inversa ou link | `default`, `hover`, `active`, `focus`, `loading`, `disabled` |
| `IconButton` | Ação compacta baseada em ícone | `default`, `outline`, `inverse`, `disabled` |
| `TextLink` | Link textual com seta opcional | `light`, `dark`, `hover`, `focus` |
| `Input`, `Textarea`, `Select`, `Label`, `FieldError` | Campos de formulário acessíveis | `default`, `focus`, `error`, `success`, `disabled` |
| `Accordion` | Lista expansível acessível (`aria-expanded`, `aria-controls`) | `expanded`, `collapsed` |
| `Container`, `Section`, `Heading`, `Divider` | Estruturação de layout e hierarquia tonal | Superfícies `primary`, `elevated`, `alternative`, `dark` |

## Documentação Interativa (Storybook)

Execute `pnpm storybook` para visualizar tokens, variantes, estados e auditoria de acessibilidade (`@storybook/addon-a11y`) isoladamente do bundle de produção.
