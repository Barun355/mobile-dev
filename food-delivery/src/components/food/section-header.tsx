/**
 * SectionHeader — a section title with an optional "See more" action.
 */
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";

export function SectionHeader({
  title,
  actionLabel = "See more",
  onPressAction,
}: {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Text variant="subheading">{title}</Text>
      {onPressAction ? (
        <Pressable onPress={onPressAction} hitSlop={8}>
          <Text variant="caption" color="primary" style={{ fontWeight: "600" }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
