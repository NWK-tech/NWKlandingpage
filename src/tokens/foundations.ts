export const brandColors = {
  carbonBlack: "#131315",
  graphite: "#232429",
  pureWhite: "#FFFFFF",
  softWhite: "#FAFAF8",
  neutralCream: "#F2F0EB",
  silverGray: "#D9DBDE",
  steelGray: "#6B7078",
} as const;

export const semanticColors = {
  bgPrimary: brandColors.softWhite,
  bgElevated: brandColors.pureWhite,
  bgAlternative: brandColors.neutralCream,
  bgDark: brandColors.carbonBlack,
  bgDarkElevated: brandColors.graphite,

  textPrimary: brandColors.carbonBlack,
  textSecondary: "#4A4E55",
  textMuted: brandColors.steelGray,
  textInverse: brandColors.softWhite,
  textInverseMuted: "#A0A4AC",

  borderSubtle: brandColors.silverGray,
  borderStrong: "#B8BCC2",
  borderDarkSubtle: "rgba(255, 255, 255, 0.12)",
  borderDarkStrong: "rgba(255, 255, 255, 0.24)",

  feedbackSuccess: "#15803D",
  feedbackSuccessBg: "#F0FDF4",
  feedbackError: "#B91C1C",
  feedbackErrorBg: "#FEF2F2",
  feedbackWarning: "#B45309",
  feedbackWarningBg: "#FFFBEB",
  feedbackInfo: "#1D4ED8",
  feedbackInfoBg: "#EFF6FF",
} as const;

export const typographyTokens = {
  fontDisplay: "var(--font-display), 'Space Grotesk', system-ui, sans-serif",
  fontSans: "var(--font-sans), 'Inter', system-ui, sans-serif",
  scale: {
    display: "clamp(2.75rem, 6vw, 5.5rem)",
    h1: "clamp(2.25rem, 4.5vw, 4rem)",
    h2: "clamp(1.875rem, 3.2vw, 3rem)",
    h3: "clamp(1.375rem, 2vw, 1.875rem)",
    h4: "clamp(1.125rem, 1.4vw, 1.375rem)",
    bodyLarge: "clamp(1.0625rem, 1.2vw, 1.25rem)",
    body: "1rem",
    bodySmall: "0.875rem",
    label: "0.8125rem",
    caption: "0.75rem",
  },
} as const;

export const motionTokens = {
  durations: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.45,
    slow: 0.75,
    cinematic: 1.1,
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.12,
  },
  easings: {
    precision: [0.22, 1, 0.36, 1] as const,
    expoOut: [0.16, 1, 0.3, 1] as const,
    subtle: [0.4, 0, 0.2, 1] as const,
    gsapPrecision: "power3.out",
    gsapCinematic: "expo.out",
  },
} as const;

export const zIndexTokens = {
  base: 0,
  elevated: 10,
  sticky: 30,
  header: 40,
  overlay: 50,
  modal: 60,
  skipLink: 100,
} as const;
