import { Text } from "@/components/ui";
import { CategoryCard, MealCard, SearchBar } from "@/components/food";
import {
  categories,
  popularMeals,
  searchMeals,
  searchRestaurants,
  type Restaurant,
} from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H = Spacing.lg;

export default function Search() {
  const { colors } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const hasQuery = query.trim().length > 0;
  const mealResults = searchMeals(query);
  const restaurantResults = searchRestaurants(query);
  const noResults = hasQuery && mealResults.length === 0 && restaurantResults.length === 0;

  const openRestaurant = (id: string) =>
    router.push({ pathname: "/restaurant/[id]", params: { id } });

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: H, paddingVertical: Spacing.md, gap: Spacing.md }}>
        <Text variant="title">Search</Text>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: Spacing.xl, gap: Spacing.xl }}
      >
        {!hasQuery ? (
          <>
            <View style={{ gap: Spacing.md }}>
              <Text variant="subheading" style={{ paddingHorizontal: H }}>
                Browse categories
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: H, gap: Spacing.md }}
              >
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onPress={() => setQuery(category.name)}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={{ paddingHorizontal: H, gap: Spacing.md }}>
              <Text variant="subheading">Popular right now</Text>
              {popularMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} onPress={() => openRestaurant(meal.restaurantId)} />
              ))}
            </View>
          </>
        ) : noResults ? (
          <View style={{ alignItems: "center", gap: Spacing.sm, paddingTop: Spacing["2xl"], paddingHorizontal: H }}>
            <Ionicons name="search" size={56} color={colors.textMuted} />
            <Text variant="subheading">No results for “{query.trim()}”</Text>
            <Text color="muted" style={{ textAlign: "center" }}>
              Try a different meal, category or restaurant.
            </Text>
          </View>
        ) : (
          <>
            {restaurantResults.length > 0 ? (
              <View style={{ paddingHorizontal: H, gap: Spacing.md }}>
                <Text variant="subheading">Restaurants ({restaurantResults.length})</Text>
                {restaurantResults.map((restaurant) => (
                  <RestaurantRow
                    key={restaurant.id}
                    restaurant={restaurant}
                    onPress={() => openRestaurant(restaurant.id)}
                  />
                ))}
              </View>
            ) : null}

            {mealResults.length > 0 ? (
              <View style={{ paddingHorizontal: H, gap: Spacing.md }}>
                <Text variant="subheading">Meals ({mealResults.length})</Text>
                {mealResults.map((meal) => (
                  <MealCard key={meal.id} meal={meal} onPress={() => openRestaurant(meal.restaurantId)} />
                ))}
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RestaurantRow({
  restaurant,
  onPress,
}: {
  restaurant: Restaurant;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
        padding: Spacing.sm,
        backgroundColor: colors.card,
        borderRadius: Radius.lg,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Image
        source={{ uri: restaurant.image }}
        contentFit="cover"
        style={{ width: 56, height: 56, borderRadius: Radius.md }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="label" numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons name="star" size={13} color={colors.secondary} />
          <Text variant="caption" color="muted" style={{ fontVariant: ["tabular-nums"] }}>
            {restaurant.rating} · {restaurant.deliveryTime}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
