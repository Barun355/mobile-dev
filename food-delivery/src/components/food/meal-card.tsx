/**
 * MealCard — horizontal meal row used on Home, Categories and Restaurant
 * screens. Heart toggles favorites; "+add" adds to the cart (zustand).
 */
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import type { Meal } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCartStore } from "@/store/cart-store";
import { useFavoritesStore } from "@/store/favorites-store";

export function MealCard({ meal, onPress }: { meal: Meal; onPress?: () => void }) {
  const { colors } = useTheme();
  const addItem = useCartStore((s) => s.addItem);
  const isFavorite = useFavoritesStore((s) => s.ids.includes(meal.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: Spacing.md,
        padding: Spacing.md,
        backgroundColor: colors.card,
        borderRadius: Radius.lg,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: colors.border,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Image
        source={{ uri: meal.image }}
        contentFit="cover"
        style={{ width: 92, height: 92, borderRadius: Radius.md }}
      />

      <View style={{ flex: 1, gap: Spacing.xs }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: Spacing.sm }}>
          <Text variant="subheading" numberOfLines={1} style={{ flex: 1 }}>
            {meal.name}
          </Text>
          <Pressable onPress={() => toggleFavorite(meal.id)} hitSlop={8}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? colors.error : colors.textMuted}
            />
          </Pressable>
        </View>

        <Text variant="caption" color="muted" numberOfLines={2}>
          {meal.description}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
              <Ionicons name="star" size={13} color={colors.secondary} />
              <Text variant="caption" style={{ fontVariant: ["tabular-nums"] }}>
                {meal.rating}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
              <Ionicons name="flame-outline" size={13} color={colors.primary} />
              <Text variant="caption" color="muted" style={{ fontVariant: ["tabular-nums"] }}>
                {meal.calories} C
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => addItem(meal)}
            hitSlop={6}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: Radius.full,
              borderCurve: "continuous",
              backgroundColor: colors.primary,
            }}
          >
            <Ionicons name="add" size={14} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>add</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
