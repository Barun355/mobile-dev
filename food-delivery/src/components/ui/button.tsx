/**
 * Button — themed pressable with shadcn-style `variant` + `size` props.
 *
 * String children are wrapped in a themed label automatically; pass custom
 * children for full control. Override the container via `style` and the label
 * via `textStyle` — overrides win (merged with StyleSheet.compose).
 */
import { type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import { FontSize, FontWeight, Radius, Spacing, type ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Text } from "./text";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<PressableProps, "style" | "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: ReactNode;
};

type VariantColors = { container: ViewStyle; label: string };

function getVariantColors(
  variant: ButtonVariant,
  colors: ThemeColors,
): VariantColors {
  switch (variant) {
    case "secondary":
      return { container: { backgroundColor: colors.secondary }, label: "#0B0B0B" };
    case "outline":
      return {
        container: { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.border },
        label: colors.text,
      };
    case "ghost":
      return { container: { backgroundColor: "transparent" }, label: colors.text };
    case "destructive":
      return { container: { backgroundColor: colors.error }, label: "#FFFFFF" };
    case "primary":
    default:
      return { container: { backgroundColor: colors.primary }, label: "#FFFFFF" };
  }
}

const sizeStyles: Record<ButtonSize, { container: ViewStyle; fontSize: number }> = {
  sm: {
    container: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, minHeight: 36 },
    fontSize: FontSize.sm,
  },
  md: {
    container: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, minHeight: 44 },
    fontSize: FontSize.base,
  },
  lg: {
    container: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl, minHeight: 52 },
    fontSize: FontSize.lg,
  },
};

export function Button({
  variant = "primary",
  size = "sm",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  children,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const { container: variantContainer, label } = getVariantColors(variant, colors);
  const sizing = sizeStyles[size];
  const isDisabled = disabled || loading;

  const containerStyle = (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const base: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.sm,
      borderRadius: Radius.md,
      borderCurve: "continuous",
      opacity: state.pressed ? 0.85 : isDisabled ? 0.5 : 1,
      ...sizing.container,
      ...variantContainer,
    };
    return StyleSheet.compose(base, style);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={containerStyle}
      {...rest}
    >
      {loading ? <ActivityIndicator size="small" color={label} /> : leftIcon}
      {typeof children === "string" ? (
        <Text
          style={StyleSheet.compose(
            { color: label, fontSize: sizing.fontSize, fontWeight: FontWeight.semibold },
            textStyle,
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {!loading && rightIcon}
    </Pressable>
  );
}
