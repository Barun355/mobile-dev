/**
 * Reusable color tokens — single source of truth for the app's palette.
 *
 * Brand and semantic colors are theme-agnostic (identical in light and dark);
 * only the neutrals (backgrounds, surfaces, borders, text) change per scheme.
 */

export type ColorScheme = "light" | "dark";

/** The semantic token shape every scheme must satisfy. */
export type ThemeColors = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
};

/** Raw brand hex values — defined once, shared across both schemes. */
const palette = {
  orange: "#F97316",
  orangeDark: "#EA580C",
  orangeLight: "#FDBA74",
  gold: "#FBBF24",
  green: "#22C55E",
  successGreen: "#16A34A",
  amber: "#F59E0B",
  red: "#EF4444",
} as const;

/** Brand + semantic colors shared by every scheme. */
const brand = {
  primary: palette.orange,
  primaryDark: palette.orangeDark,
  primaryLight: palette.orangeLight,
  secondary: palette.gold,
  accent: palette.green,
  success: palette.successGreen,
  warning: palette.amber,
  error: palette.red,
} as const;

export const Colors: Record<ColorScheme, ThemeColors> = {
  dark: {
    ...brand,
    background: "#0B0B0B",
    surface: "#1A1A1A",
    card: "#262626",
    border: "#404040",
    text: "#FAFAFA",
    textSecondary: "#A3A3A3",
    textMuted: "#737373",
  },
  light: {
    ...brand,
    background: "#FFFFFF",
    surface: "#F5F5F5",
    card: "#FFFFFF",
    border: "#E5E5E5",
    text: "#171717",
    textSecondary: "#525252",
    textMuted: "#A3A3A3",
  },
};

/**
 * Theme-agnostic design tokens shared by every component (scale-based,
 * scheme-independent). Keeping these alongside `Colors` gives the UI kit a
 * single import for spacing, radii, and typography.
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 22,
  "2xl": 28,
  "3xl": 34,
} as const;

export const FontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;
