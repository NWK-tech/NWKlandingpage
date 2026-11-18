# NWK — Guia de Deploy e Pendências

## Pré-requisitos para Produção

1. Configurar `NEXT_PUBLIC_SITE_URL` com o domínio oficial.
2. Configurar integração real de recebimento para o formulário de contato e ativar `contactIntegrationConfigured` em `src/config/site.ts` (adicionando proteção anti-spam e rate limiting no endpoint).
3. Validar visualmente o logotipo SVG (`public/brand/*`) frente ao arquivo oficial do proprietário.
4. Substituir placeholders conceituais de projetos (`src/features/home/components/DeviceMockup.tsx`) por interfaces reais quando disponíveis.
5. Publicar Política de Privacidade (LGPD) e Termos de Uso antes da coleta de dados em produção.
