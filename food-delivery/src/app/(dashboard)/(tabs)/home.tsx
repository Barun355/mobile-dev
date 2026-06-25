import { PageIndicator, Text } from "@/components/ui";
import {
  CategoryCard,
  MealCard,
  PromoBanner,
  SearchHeader,
  SectionHeader,
} from "@/components/food";
import { categories, currentUser, banners, popularMeals } from "@/constants/data";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCartCount } from "@/store/cart-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H = Spacing.lg;

export default function Home() {
  const { colors } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cartCount = useCartCount();
  const [bannerIndex, setBannerIndex] = useState(0);

  const bannerWidth = width - H * 2;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: Spacing.md, gap: Spacing.xl }}
      >
        <View style={{ paddingHorizontal: H, gap: Spacing.lg }}>
          <SearchHeader
            onPressSearch={() => router.push("/search")}
            onPressCart={() => router.push("/cart")}
            cartCount={cartCount}
          />
          <View style={{ gap: 2 }}>
            <Text variant="caption" color="muted">
              Hello {currentUser.name}
            </Text>
            <Text variant="heading">What meal Do You Want?</Text>
          </View>
        </View>

        <View style={{ gap: Spacing.md }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) =>
              setBannerIndex(Math.round(e.nativeEvent.contentOffset.x / width))
            }
          >
            {banners.map((banner) => (
              <View key={banner.id} style={{ width, paddingHorizontal: H }}>
                <PromoBanner
                  banner={banner}
                  width={bannerWidth}
                  onPressCta={() =>
                    router.push({ pathname: "/restaurant/[id]", params: { id: "r1" } })
                  }
                />
              </View>
            ))}
          </ScrollView>
          <PageIndicator
            count={banners.length}
            activeIndex={bannerIndex}
            style={{ alignSelf: "center" }}
          />
        </View>

        <View style={{ gap: Spacing.md }}>
          <View style={{ paddingHorizontal: H }}>
            <SectionHeader title="Categories" onPressAction={() => router.push("/categories")} />
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
                onPress={() => router.push("/categories")}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: H, gap: Spacing.md }}>
          <SectionHeader title="Popular Meals" onPressAction={() => router.push("/categories")} />
          <View style={{ gap: Spacing.md }}>
            {popularMeals.map((meal) => (
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
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
