import { Text } from "@/components/ui";
import { ScreenHeader } from "@/components/dashboard/screen-header";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FAQ = [
  {
    q: "How do I track my order?",
    a: "Once you place an order you'll get live updates on the Orders screen until it reaches your door.",
  },
  {
    q: "What payment methods are supported?",
    a: "You can pay with card or cash on delivery. More options are coming soon.",
  },
  {
    q: "How do I get a refund?",
    a: "Contact support within 24 hours of delivery and we'll make it right.",
  },
];

export default function Help() {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Help" />
      <ScrollView contentContainerStyle={{ padding: Spacing.lg, gap: Spacing.md }}>
        <Text variant="subheading">Frequently asked questions</Text>
        {FAQ.map((item) => (
          <View
            key={item.q}
            style={{
              gap: Spacing.xs,
              padding: Spacing.md,
              backgroundColor: colors.card,
              borderRadius: Radius.lg,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text variant="label">{item.q}</Text>
            <Text variant="caption" color="muted">
              {item.a}
            </Text>
          </View>
        ))}

        <Text variant="caption" color="muted" style={{ textAlign: "center", marginTop: Spacing.md }}>
          Still need help? Email support@tastio.app
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
