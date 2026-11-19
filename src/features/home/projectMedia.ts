/**
 * Mídia real dos produtos. Enquanto um projeto não tiver captura ou vídeo,
 * a composição exibe a representação conceitual rotulada como tal.
 * Arquivos em /public/projects/<id>/ — ver public/projects/README.md.
 */
export interface ProjectMedia {
  kind: "image" | "video";
  /** Caminho em /public (imagem ou MP4). */
  src: string;
  /** WebM opcional (somente vídeo). */
  webm?: string;
  /** Poster (somente vídeo). */
  poster?: string;
  alt: string;
}

export interface ProjectMediaSet {
  /** Tela de desktop (16:10). */
  desktop?: ProjectMedia;
  /** Tela de celular (433:882). */
  mobile?: ProjectMedia;
}

export const PROJECT_MEDIA: Record<string, ProjectMediaSet> = {
  "fju-artes-marciais": {},
  "doce-certo": {},
  "nwk-boss-ai": {},
  zuri: {},
  "nwk-studio": {},
};
