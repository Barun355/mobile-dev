import { Button, Text } from "@/components/ui";
import { ScreenHeader } from "@/components/dashboard/screen-header";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="My Orders" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: Spacing.md, padding: Spacing.lg }}>
        <Ionicons name="receipt-outline" size={64} color={colors.textMuted} />
        <Text variant="subheading">No orders yet</Text>
        <Text color="muted" style={{ textAlign: "center" }}>
          When you place an order, it will show up here.
        </Text>
        <Button onPress={() => router.push("/home")} style={{ marginTop: Spacing.sm }}>
          Browse meals
        </Button>
      </View>
    </SafeAreaView>
  );
}
