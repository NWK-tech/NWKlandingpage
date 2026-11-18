import type { NavItem } from "@/types/content";

export const siteConfig = {
  name: "NWK",
  legalName: "NWK",
  tagline: "Engenharia digital. Impacto real.",
  description:
    "Empresa de tecnologia, engenharia de software e desenvolvimento de soluções digitais: sistemas personalizados, aplicativos mobile, plataformas web, inteligência artificial e design de produtos.",
  locale: "pt_BR",
  language: "pt-BR",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  navigation: [
    { label: "Soluções", href: "#solucoes" },
    { label: "Projetos", href: "#projetos" },
    { label: "Empresa", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ] satisfies NavItem[],
  ctaPrimary: {
    label: "Iniciar um projeto",
    href: "#contato",
  },
  contactIntegrationConfigured: false,
} as const;
