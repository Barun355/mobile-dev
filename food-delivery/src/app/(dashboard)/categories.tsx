import { Text } from "@/components/ui";
import { CategoryCard, MealCard } from "@/components/food";
import { categories, getMealsByCategory } from "@/constants/data";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H = Spacing.lg;

export default function Categories() {
  const { colors } = useTheme();
  const router = useRouter();
  const [selected, setSelected] = useState(categories[0].id);

  const meals = getMealsByCategory(selected);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: Spacing.md, gap: Spacing.lg }}
      >
        <View style={{ paddingHorizontal: H }}>
          <Text variant="title">Categories</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: H, gap: Spacing.md }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              active={category.id === selected}
              onPress={() => setSelected(category.id)}
            />
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: H, gap: Spacing.md }}>
          {meals.length === 0 ? (
            <Text color="muted">No meals in this category yet.</Text>
          ) : (
            meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onPress={() =>
                  router.push({
                    pathname: "/restaurant/[id]",
                    params: { id: meal.restaurantId },
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
