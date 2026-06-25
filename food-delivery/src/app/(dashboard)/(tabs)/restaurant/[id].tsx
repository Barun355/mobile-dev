import { Text } from "@/components/ui";
import { MealCard } from "@/components/food";
import { getMealsByRestaurant, getRestaurantById } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const H = Spacing.lg;

export default function RestaurantDetail() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const restaurant = getRestaurantById(id);
  const meals = getMealsByRestaurant(id);

  if (!restaurant) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text color="muted">Restaurant not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing["2xl"] }}
      >
        <View>
          <Image
            source={{ uri: restaurant.image }}
            contentFit="cover"
            style={{ width: "100%", height: 240 }}
          />
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={{
              position: "absolute",
              top: insets.top + Spacing.sm,
              left: H,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: Radius.full,
              backgroundColor: colors.background,
            }}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
        </View>

        <View style={{ padding: H, gap: Spacing.md }}>
          <Text variant="title">{restaurant.name}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.lg }}>
            <Meta icon="star" color={colors.secondary} label={`${restaurant.rating}`} />
            <Meta icon="time-outline" color={colors.primary} label={restaurant.deliveryTime} />
            <Meta icon="bicycle-outline" color={colors.accent} label={`${restaurant.deliveryFee} ₺`} />
          </View>

          <Text color="secondary">{restaurant.description}</Text>

          <Text variant="subheading" style={{ marginTop: Spacing.sm }}>
            Menu
          </Text>
          <View style={{ gap: Spacing.md }}>
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Meta({
  icon,
  color,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Ionicons name={icon} size={15} color={color} />
      <Text variant="caption" style={{ fontVariant: ["tabular-nums"] }}>
        {label}
      </Text>
    </View>
  );
}
