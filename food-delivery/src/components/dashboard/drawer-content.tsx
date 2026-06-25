/**
 * DrawerContent — custom drawer with the user header (avatar + name) and the
 * navigation items (My Orders, Settings, Help) plus Logout.
 */
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, type DrawerContentComponentProps } from "expo-router/drawer";
import { Image } from "expo-image";
import { useRouter, type Href } from "expo-router";
import { Pressable, View } from "react-native";

import { Text } from "@/components/ui";
import { currentUser } from "@/constants/data";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";

const ITEMS: { label: string; icon: keyof typeof Ionicons.glyphMap; route: Href }[] = [
  { label: "My Orders", icon: "receipt-outline", route: "/orders" },
  { label: "Settings", icon: "settings-outline", route: "/settings" },
  { label: "Help", icon: "help-circle-outline", route: "/help" },
];

export function DrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const account = useAuthStore((s) => s.account);
  const logout = useAuthStore((s) => s.logout);

  const profile = account ?? currentUser;

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/sign-in");
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: Spacing.lg }}>
      <View style={{ alignItems: "center", gap: Spacing.sm, paddingBottom: Spacing.lg }}>
        <Image
          source={{ uri: profile.avatar }}
          contentFit="cover"
          style={{ width: 72, height: 72, borderRadius: Radius.full }}
        />
        <View style={{ alignItems: "center" }}>
          <Text variant="subheading">{profile.name}</Text>
          <Text variant="caption" color="muted">
            {profile.email}
          </Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: colors.border, marginHorizontal: Spacing.md }} />

      <View style={{ paddingHorizontal: Spacing.sm, paddingTop: Spacing.md, gap: 2 }}>
        {ITEMS.map((item) => (
          <DrawerRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            onPress={() => router.push(item.route)}
          />
        ))}
      </View>

      <View style={{ paddingHorizontal: Spacing.sm, marginTop: Spacing.lg }}>
        <DrawerRow icon="log-out-outline" label="Logout" danger onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerRow({
  icon,
  label,
  danger = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: Spacing.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,
        borderRadius: Radius.md,
        borderCurve: "continuous",
      }}
    >
      <Ionicons name={icon} size={20} color={danger ? colors.error : colors.primary} />
      <Text style={{ color: danger ? colors.error : colors.text, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}
