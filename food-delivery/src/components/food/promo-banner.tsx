/**
 * PromoBanner — the orange "Best Seller" hero card used in the home carousel.
 */
import { Image } from "expo-image";
import { View, type ViewStyle } from "react-native";

import { Button, Text } from "@/components/ui";
import type { Banner } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export function PromoBanner({
  banner,
  width,
  onPressCta,
}: {
  banner: Banner;
  width: number;
  onPressCta?: () => void;
}) {
  const { colors } = useTheme();

  const container: ViewStyle = {
    width,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderCurve: "continuous",
    backgroundColor: colors.primary,
    overflow: "hidden",
  };

  return (
    <View style={container}>
      <Image
        source={{ uri: banner.image }}
        contentFit="cover"
        style={{ width: 110, height: 110, borderRadius: Radius.lg }}
      />
      <View style={{ flex: 1, gap: Spacing.sm }}>
        <Text variant="subheading" style={{ color: "#FFFFFF" }}>
          {banner.title}
        </Text>
        <Text variant="caption" style={{ color: "rgba(255,255,255,0.9)" }}>
          {banner.subtitle}
        </Text>
        <Button
          variant="secondary"
          size="sm"
          onPress={onPressCta}
          style={{ alignSelf: "flex-start", backgroundColor: "#FFFFFF" }}
          textStyle={{ color: colors.primary }}
        >
          {banner.cta}
        </Button>
      </View>
    </View>
  );
}
