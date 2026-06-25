/**
 * SearchHeader — avatar + search field + notification bell (home top bar).
 * The search box is a styled, non-functional placeholder for now.
 */
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { currentUser } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export function SearchHeader({
  onPressBell,
  onPressSearch,
}: {
  onPressBell?: () => void;
  onPressSearch?: () => void;
}) {
  const { colors } = useTheme();

  const iconButton = {
    width: 44,
    height: 44,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: Radius.md,
    borderCurve: "continuous" as const,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
      <Image
        source={{ uri: currentUser.avatar }}
        contentFit="cover"
        style={{ width: 44, height: 44, borderRadius: Radius.md }}
      />

      <Pressable
        onPress={onPressSearch}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.sm,
          height: 44,
          paddingHorizontal: Spacing.md,
          borderRadius: Radius.md,
          borderCurve: "continuous",
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <Text variant="caption" color="muted" style={{ flex: 1 }}>
          Search
        </Text>
        <Ionicons name="options-outline" size={18} color={colors.textSecondary} />
      </Pressable>

      <Pressable onPress={onPressBell} style={iconButton}>
        <Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}
