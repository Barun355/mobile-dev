/**
 * AuthDivider — "or" separator between the form and social auth.
 */
import { View } from "react-native";

import { Separator, Text } from "@/components/ui";
import { Spacing } from "@/constants/theme";

export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md }}>
      <Separator style={{ flex: 1 }} />
      <Text variant="caption" color="muted">
        {label}
      </Text>
      <Separator style={{ flex: 1 }} />
    </View>
  );
}
