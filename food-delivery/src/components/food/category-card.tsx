/**
 * CategoryCard — small image + label tile used in the Categories row/grid.
 */
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import type { Category } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export function CategoryCard({
  category,
  active = false,
  onPress,
}: {
  category: Category;
  active?: boolean;
  onPress?: () => void;
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        alignItems: "center",
        gap: Spacing.xs,
        padding: Spacing.sm,
        width: 84,
        backgroundColor: colors.card,
        borderRadius: Radius.lg,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: active ? colors.primary : colors.border,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <View style={{ width: 48, height: 48, borderRadius: Radius.md, overflow: "hidden" }}>
        <Image source={{ uri: category.image }} contentFit="cover" style={{ width: "100%", height: "100%" }} />
      </View>
      <Text variant="caption" numberOfLines={1} color={active ? "primary" : "default"}>
        {category.name}
      </Text>
    </Pressable>
  );
}
