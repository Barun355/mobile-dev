import { Button, PageIndicator, Text } from "@/components/ui";
import { FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { colors, preference } = useTheme();
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={preference === "dark" ? "light-content" : "dark-content"} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: Spacing.xl,
          paddingTop: Spacing.sm,
          paddingBottom: Spacing.xl,
        }}
      >
        <View style={{ alignItems: "center", marginTop: Spacing.md }}>
          <View
            style={{
              width: width * 0.88,
              height: height * 0.5,
              borderRadius: 28,
              borderCurve: "continuous",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Image
              source={require("../../assets/images/onboarding/1.png")}
              contentFit="cover"
              style={{ width: "100%", height: "100%", borderRadius: 28 }}
            />
          </View>
        </View>

        <View style={{ gap: Spacing.md, marginTop: Spacing.xl }}>
          <Text variant="heading" style={{ textAlign: "center" }}>
            Discover Delicious Food
          </Text>
          <Text
            variant="caption"
            color="secondary"
            style={{
              fontWeight: FontWeight.medium,
              textAlign: "center",
              maxWidth: "82%",
              alignSelf: "center",
            }}
          >
            Browse hundreds of mouth-watering dishes from your favorite
            restaurants, all in one place.
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ gap: Spacing.xl }}>
          <PageIndicator count={3} activeIndex={0} style={{ alignSelf: "center" }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: Spacing.md,
            }}
          >
            <Button
              variant="ghost"
              size="md"
              textStyle={{ color: colors.textMuted }}
              onPress={() => router.replace("/(auth)/sign-up")}
            >
              Skip
            </Button>
            <Button
              variant="primary"
              size="md"
              style={{
                borderRadius: 18,
                paddingHorizontal: 32,
                boxShadow: `0 8px 16px ${colors.primary}40`,
              }}
              onPress={() => router.push("/(onboarding)/onboarding-2")}
            >
              Next
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
