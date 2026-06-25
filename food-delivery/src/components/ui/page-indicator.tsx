/**
 * PageIndicator — themed pagination dots (○ ● ○).
 *
 * The active dot renders as a wider pill in the primary color; inactive dots
 * are small circles in the border token. Override the row via `style`.
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

export type PageIndicatorProps = ViewProps & {
  count: number;
  activeIndex: number;
  style?: StyleProp<ViewStyle>;
};

export function PageIndicator({
  count,
  activeIndex,
  style,
  ...rest
}: PageIndicatorProps) {
  const { colors } = useTheme();

  const base: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: count, now: activeIndex + 1 }}
      style={StyleSheet.compose(base, style)}
      {...rest}
    >
      {Array.from({ length: count }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <View
            key={i}
            style={{
              height: 8,
              width: active ? 24 : 8,
              borderRadius: Radius.full,
              backgroundColor: active ? colors.primary : colors.border,
            }}
          />
        );
      })}
    </View>
  );
}
