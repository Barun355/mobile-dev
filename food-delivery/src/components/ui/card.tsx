/**
 * Card — themed surface container with composable parts (shadcn-style).
 *
 * Compose with Card.Header / Card.Title / Card.Description / Card.Content /
 * Card.Footer, or just drop children into <Card>. Override via `style`.
 */
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Text, type TextProps } from "./text";

export type CardProps = ViewProps & { style?: StyleProp<ViewStyle> };

export function Card({ style, ...rest }: CardProps) {
  const { colors } = useTheme();
  const base: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: Radius.lg,
    borderCurve: "continuous",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: Spacing.lg,
    gap: Spacing.sm,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
  };
  return <View style={StyleSheet.compose(base, style)} {...rest} />;
}

function CardHeader({ style, ...rest }: CardProps) {
  return <View style={StyleSheet.compose({ gap: Spacing.xs }, style)} {...rest} />;
}

function CardTitle({ style, ...rest }: TextProps) {
  return <Text variant="subheading" style={style} {...rest} />;
}

function CardDescription({ style, ...rest }: TextProps) {
  return <Text variant="caption" color="muted" style={style} {...rest} />;
}

function CardContent({ style, ...rest }: CardProps) {
  return <View style={StyleSheet.compose({ gap: Spacing.sm }, style)} {...rest} />;
}

function CardFooter({ style, ...rest }: CardProps) {
  return (
    <View
      style={StyleSheet.compose(
        { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
        style,
      )}
      {...rest}
    />
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
