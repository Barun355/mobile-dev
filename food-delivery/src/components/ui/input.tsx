/**
 * Input — themed text field with focus + invalid states (shadcn-style).
 *
 * Override via `style`; user `onFocus`/`onBlur` are preserved.
 */
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
} from "react-native";

import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type InputProps = TextInputProps & {
  invalid?: boolean;
  style?: StyleProp<TextStyle>;
};

type FocusEvt = Parameters<NonNullable<TextInputProps["onFocus"]>>[0];
type BlurEvt = Parameters<NonNullable<TextInputProps["onBlur"]>>[0];

export function Input({ invalid = false, style, onFocus, onBlur, ...rest }: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = invalid
    ? colors.error
    : focused
      ? colors.primary
      : colors.border;

  const base: TextStyle = {
    minHeight: 44,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor,
    borderRadius: Radius.md,
    borderCurve: "continuous",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.base,
    color: colors.text,
  };

  const handleFocus = (e: FocusEvt) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: BlurEvt) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <TextInput
      placeholderTextColor={colors.textMuted}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={StyleSheet.compose(base, style)}
      {...rest}
    />
  );
}
