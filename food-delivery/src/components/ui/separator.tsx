/**
 * Separator — themed hairline divider, horizontal or vertical.
 */
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";

import { useTheme } from "@/hooks/use-theme";

export type SeparatorProps = ViewProps & {
  orientation?: "horizontal" | "vertical";
  style?: StyleProp<ViewStyle>;
};

export function Separator({ orientation = "horizontal", style, ...rest }: SeparatorProps) {
  const { colors } = useTheme();
  const base: ViewStyle =
    orientation === "horizontal"
      ? { height: StyleSheet.hairlineWidth, alignSelf: "stretch", backgroundColor: colors.border }
      : { width: StyleSheet.hairlineWidth, alignSelf: "stretch", backgroundColor: colors.border };

  return <View style={StyleSheet.compose(base, style)} {...rest} />;
}
