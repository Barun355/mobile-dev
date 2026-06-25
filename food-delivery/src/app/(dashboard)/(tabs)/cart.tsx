import { Button, Separator, Text } from "@/components/ui";
import { Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCartStore, useCartTotal } from "@/store/cart-store";
import type { CartItem } from "@/store/cart-store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const H = Spacing.lg;
const DELIVERY_FEE = 9;

export default function Cart() {
  const { colors } = useTheme();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartTotal();

  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const handleCheckout = () => {
    Alert.alert("Order placed", "Your delicious food is on the way! 🛵", [
      { text: "OK", onPress: () => clearCart() },
    ]);
  };

  if (items.length === 0) {
    return (
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: Spacing.md, padding: H }}>
          <Ionicons name="bag-outline" size={64} color={colors.textMuted} />
          <Text variant="subheading">Your cart is empty</Text>
          <Text color="muted" style={{ textAlign: "center" }}>
            Add some meals to get started.
          </Text>
          <Button onPress={() => router.push("/home")} style={{ marginTop: Spacing.sm }}>
            Browse meals
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: H }}>
        <Text variant="title">My Cart</Text>
        <Pressable onPress={clearCart} hitSlop={8}>
          <Text color="error" style={{ fontWeight: "600" }}>
            Clear
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: H, paddingBottom: Spacing.lg, gap: Spacing.md }}
      >
        {items.map((item) => (
          <CartRow key={item.meal.id} item={item} />
        ))}
      </ScrollView>

      <View style={{ padding: H, gap: Spacing.sm, borderTopWidth: 1, borderTopColor: colors.border }}>
        <SummaryRow label="Subtotal" value={subtotal} />
        <SummaryRow label="Delivery" value={DELIVERY_FEE} />
        <Separator />
        <SummaryRow label="Total" value={total} emphasize />
        <Button size="lg" onPress={handleCheckout} style={{ marginTop: Spacing.xs }}>
          Checkout
        </Button>
      </View>
    </SafeAreaView>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const { colors } = useTheme();
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const { meal, quantity } = item;

  return (
    <View
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
        source={{ uri: meal.image }}
        contentFit="cover"
        style={{ width: 64, height: 64, borderRadius: Radius.md }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="label" numberOfLines={1}>
          {meal.name}
        </Text>
        <Text color="primary" style={{ fontWeight: "700", fontVariant: ["tabular-nums"] }}>
          {meal.price * quantity} ₺
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
        <Stepper
          icon={quantity === 1 ? "trash-outline" : "remove"}
          onPress={() => (quantity === 1 ? removeItem(meal.id) : decrementItem(meal.id))}
          danger={quantity === 1}
        />
        <Text style={{ minWidth: 18, textAlign: "center", fontVariant: ["tabular-nums"] }}>
          {quantity}
        </Text>
        <Stepper icon="add" onPress={() => incrementItem(meal.id)} />
      </View>
    </View>
  );
}

function Stepper({
  icon,
  onPress,
  danger = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  danger?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={{
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Radius.full,
        backgroundColor: danger ? colors.surface : colors.primary,
      }}
    >
      <Ionicons name={icon} size={16} color={danger ? colors.error : "#FFFFFF"} />
    </Pressable>
  );
}

function SummaryRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: number;
  emphasize?: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text variant={emphasize ? "subheading" : "body"} color={emphasize ? "default" : "secondary"}>
        {label}
      </Text>
      <Text
        variant={emphasize ? "subheading" : "body"}
        color={emphasize ? "primary" : "default"}
        style={{ fontWeight: "700", fontVariant: ["tabular-nums"] }}
      >
        {value} ₺
      </Text>
    </View>
  );
}
