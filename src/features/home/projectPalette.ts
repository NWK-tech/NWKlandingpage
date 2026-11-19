/**
 * Personalidade cromática de cada projeto (autorizada pelo proprietário).
 * Os tons espelham os temas de `DeviceMockup`; aqui em hex para gradientes inline.
 */
export interface ProjectPalette {
  /** Cor de destaque (rótulos, indicadores). */
  accent: string;
  /** Halo ambiente atrás do dispositivo. */
  glow: string;
  /** Base escura do palco. */
  base: string;
}

export const PROJECT_PALETTE: Record<string, ProjectPalette> = {
  "fju-artes-marciais": { accent: "#6ee7b7", glow: "rgba(16,185,129,0.22)", base: "#101a16" },
  "doce-certo": { accent: "#fde68a", glow: "rgba(251,191,36,0.2)", base: "#1a1612" },
  "nwk-boss-ai": { accent: "#7dd3fc", glow: "rgba(56,189,248,0.22)", base: "#10171f" },
  zuri: { accent: "#a5b4fc", glow: "rgba(129,140,248,0.24)", base: "#14131f" },
  "nwk-studio": { accent: "#f2f0eb", glow: "rgba(242,240,235,0.14)", base: "#17181b" },
};

export const DEFAULT_PALETTE: ProjectPalette = PROJECT_PALETTE["nwk-studio"]!;
