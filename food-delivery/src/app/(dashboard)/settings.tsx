import { Separator, Text } from "@/components/ui";
import { ScreenHeader } from "@/components/dashboard/screen-header";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { colors, scheme, toggle } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Settings" />
      <ScrollView contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.lg }}>
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
          <Row icon={scheme === "dark" ? "moon" : "sunny"} label="Dark mode">
            <Switch
              value={scheme === "dark"}
              onValueChange={toggle}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </Row>
          <Separator />
          <Row icon="notifications-outline" label="Push notifications">
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </Row>
          <Separator />
          <Row icon="globe-outline" label="Language">
            <Text color="muted">English</Text>
          </Row>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View
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
      {children}
    </View>
  );
}
