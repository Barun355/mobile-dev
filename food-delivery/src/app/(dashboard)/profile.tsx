import { Button, Separator, Text } from "@/components/ui";
import { currentUser } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useFavoritesStore } from "@/store/favorites-store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H = Spacing.lg;

export default function Profile() {
  const { colors, scheme, toggle } = useTheme();
  const router = useRouter();
  const favoritesCount = useFavoritesStore((s) => s.ids.length);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: H, gap: Spacing.xl }}
      >
        <Text variant="title">Profile</Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md }}>
          <Image
            source={{ uri: currentUser.avatar }}
            contentFit="cover"
            style={{ width: 64, height: 64, borderRadius: Radius.full }}
          />
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="subheading">{currentUser.name}</Text>
            <Text variant="caption" color="muted">
              {currentUser.email}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: Radius.lg,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: colors.border,
            overflow: "hidden",
          }}
        >
          <OptionRow icon="heart-outline" label="Favorites" value={`${favoritesCount}`} />
          <Separator />
          <OptionRow icon="receipt-outline" label="My Orders" />
          <Separator />
          <OptionRow icon="card-outline" label="Payment Methods" />
          <Separator />
          <OptionRow
            icon={scheme === "dark" ? "moon" : "sunny"}
            label="Theme"
            value={scheme === "dark" ? "Dark" : "Light"}
            onPress={toggle}
          />
          <Separator />
          <OptionRow icon="settings-outline" label="Settings" />
        </View>

        <Button
          variant="outline"
          size="lg"
          onPress={() => router.replace("/(auth)/sign-in")}
          textStyle={{ color: colors.error }}
          style={{ borderColor: colors.error }}
        >
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

function OptionRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
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
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
      }}
    >
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={{ flex: 1 }}>{label}</Text>
      {value ? (
        <Text variant="caption" color="muted">
          {value}
        </Text>
      ) : null}
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
