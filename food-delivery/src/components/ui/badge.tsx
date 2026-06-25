/**
 * Badge — small themed status pill with shadcn-style `variant` prop.
 */
import {
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import { FontSize, FontWeight, Radius, Spacing, type ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Text } from "./text";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "accent"
  | "outline";

export type BadgeProps = Omit<ViewProps, "children"> & {
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: string;
};

function getVariantColors(
  variant: BadgeVariant,
  colors: ThemeColors,
): { container: ViewStyle; label: string } {
  switch (variant) {
    case "primary":
      return { container: { backgroundColor: colors.primary }, label: "#FFFFFF" };
    case "success":
      return { container: { backgroundColor: colors.success }, label: "#FFFFFF" };
    case "warning":
      return { container: { backgroundColor: colors.warning }, label: "#0B0B0B" };
    case "error":
      return { container: { backgroundColor: colors.error }, label: "#FFFFFF" };
    case "accent":
      return { container: { backgroundColor: colors.accent }, label: "#0B0B0B" };
    case "outline":
      return {
        container: { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border },
        label: colors.text,
      };
    case "default":
    default:
      return { container: { backgroundColor: colors.surface }, label: colors.textSecondary };
  }
}

export function Badge({ variant = "default", style, textStyle, children, ...rest }: BadgeProps) {
  const { colors } = useTheme();
  const { container, label } = getVariantColors(variant, colors);

  const base: ViewStyle = {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
    borderCurve: "continuous",
    ...container,
  };

  return (
    <View style={StyleSheet.compose(base, style)} {...rest}>
      <Text
        style={StyleSheet.compose(
          { color: label, fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
          textStyle,
        )}
      >
        {children}
      </Text>
    </View>
  );
}
