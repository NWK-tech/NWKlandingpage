export interface NavItem {
  label: string;
  href: string;
}

export interface StickyContentLink {
  href?: string;
  text?: string;
  label?: string;
  className?: string;
  target?: string;
  rel?: string;
}

/** Clipe curto (≤ 4 s) que substitui a imagem estática quando disponível. */
export interface StickyContentVideo {
  /** MP4 (H.264) — obrigatório. */
  src: string;
  /** WebM (VP9/AV1) opcional, servido primeiro. */
  webm?: string;
  /** Poster; por padrão usa a imagem da solução. */
  poster?: string;
}

export interface StickyContentItem {
  heading?: string;
  paragraphs?: string[];
  paragraph?: string | string[];
  list?: string[];
  listItems?: string[];
  link?: StickyContentLink;
  href?: string;
  linkText?: string;
  cta?: string;
  image?: string;
  video?: StickyContentVideo;
  alt?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
}

export interface SolutionItem {
  id: string;
  title: string;
  whatWeBuild: string;
  problemSolved: string;
  deliverables: string[];
  featured?: boolean;
  visualVariant: "software" | "mobile" | "web" | "ai" | "automation" | "design";
}

export type ProjectOrigin = "Proprietário" | "Em desenvolvimento" | "Conceito experimental";

export type ProjectDeviceType = "desktop" | "mobile" | "hybrid";

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  origin: ProjectOrigin;
  deviceType: ProjectDeviceType;
  headline: string;
  description: string;
  scope: string[];
  conceptLabel: string;
  conceptModules: string[];
}

export interface MethodologyStep {
  id: string;
  title: string;
  summary: string;
  outcome: string;
}

export type SolutionTypeOption =
  | "Software personalizado"
  | "Aplicativo"
  | "Website"
  | "Landing page"
  | "Inteligência artificial"
  | "Automação"
  | "Outros";
