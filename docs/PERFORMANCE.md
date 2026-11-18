# NWK — Performance

- **Renderização**: Páginas pré-renderizadas estaticamente pelo Next.js (`/` como rota estática), minimizando JavaScript no cliente.
- **Fontes**: `Space Grotesk` e `Inter` carregadas via `next/font/google` com `display: "swap"`.
- **Animações**: Restritas a `transform` e `opacity`, sem loops contínuos de WebGL em segundo plano e sem loading screens bloqueantes.
- **Metas**: Lighthouse Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95, LCP <= 2.5s, CLS <= 0.1, INP <= 200ms (a serem aferidos em ambiente de produção final).
