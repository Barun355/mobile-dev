/**
 * Text — themed typography primitive.
 *
 * shadcn-style: pick a `variant` (scale) and `color` (token), override anything
 * via the `style` prop. The override always wins (merged with StyleSheet.compose).
 */
import {
  Text as RNText,
  StyleSheet,
  type StyleProp,
  type TextProps as RNTextProps,
  type TextStyle,
} from "react-native";

import { FontSize, FontWeight } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type TextVariant =
  | "title"
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "label";

export type TextColor =
  | "default"
  | "secondary"
  | "muted"
  | "primary"
  | "accent"
  | "error"
  | "inverse";

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: TextColor;
  style?: StyleProp<TextStyle>;
};

const variantStyles: Record<TextVariant, TextStyle> = {
  title: { fontSize: FontSize["3xl"], fontWeight: FontWeight.bold },
  heading: { fontSize: 26, fontWeight: FontWeight.bold },
  subheading: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold },
  body: { fontSize: FontSize.base, fontWeight: FontWeight.regular },
  caption: { fontSize: FontSize.xs, lineHeight: 20, fontWeight: FontWeight.regular },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.medium },
};

export function Text({
  variant = "body",
  color = "default",
  style,
  ...rest
}: TextProps) {
  const { colors } = useTheme();

  const colorMap: Record<TextColor, string> = {
    default: colors.text,
    secondary: colors.textSecondary,
    muted: colors.textMuted,
    primary: colors.primary,
    accent: colors.accent,
    error: colors.error,
    inverse: colors.background,
  };

  const base: TextStyle = {
    ...variantStyles[variant],
    color: colorMap[color],
  };

  return <RNText style={StyleSheet.compose(base, style)} {...rest} />;
}
