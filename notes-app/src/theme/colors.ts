export const colors = {
  dark: {
    purple: {
      500: "#C084FC",
      600: "#A855F7",
    },
    cyan: {
      50: "#164E63",
      400: "#0E7490",
    },
    ink: {
      500: "#94A3B8",
      700: "#E2E8F0",
      900: "#F8FAFC",
    },
    surface: {
      0: "#1E293B",
      50: "#0F172A",
      100: "#334155",
    },
    toolbar: {
      900: "#0F0F0F",
    },
    swatch: {
      white: "#FFFFFF",
      cyan: "#22D3EE",
      magenta: "#D946EF",
      green: "#10B981",
    },
  },
  light: {
    purple: {
      500: "#A855F7",
      600: "#9333EA",
    },
    cyan: {
      50: "#ECFEFF",
      400: "#22D3EE",
    },
    ink: {
      500: "#64748B",
      700: "#334155",
      900: "#0F172A",
    },
    surface: {
      0: "#FFFFFF",
      50: "#F8FAFC",
      100: "#F1F5F9",
    },
    toolbar: {
      900: "#1E1E1E",
    },
    swatch: {
      white: "#FFFFFF",
      cyan: "#22D3EE",
      magenta: "#D946EF",
      green: "#10B981",
    },
  },
} as const;

export type Colors = typeof colors;
