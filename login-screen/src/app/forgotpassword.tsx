import { COLORS } from "@/colors";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Method = "email" | "2fa" | "authenticator";

const METHODS: {
  id: Method;
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}[] = [
  { id: "email", title: "Email Address", subtitle: "Send via email address securely.", icon: "envelope" },
  { id: "2fa", title: "2 Factor Authentication", subtitle: "Send via 2FA securely.", icon: "mobile" },
  { id: "authenticator", title: "Google Authenticator", subtitle: "Send via authenticator securely.", icon: "lock" },
];

export default function ForgotPassword() {
  const router = useRouter();
  const [selected, setSelected] = useState<Method>("2fa");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.watermarkWrap} pointerEvents="none">
        <FontAwesome name="lock" size={260} color="#000" style={styles.watermark} />
      </View>

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
          <Feather name="chevron-left" size={22} color={COLORS.text} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>Select which methods you'd like to reset.</Text>
        </View>

        <View style={styles.options}>
          {METHODS.map((m) => {
            const isSelected = selected === m.id;
            return (
              <Pressable
                key={m.id}
                onPress={() => setSelected(m.id)}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                  <FontAwesome
                    name={m.icon}
                    size={20}
                    color={isSelected ? COLORS.primary : COLORS.muted}
                  />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{m.title}</Text>
                  <Text style={styles.cardSubtitle}>{m.subtitle}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.resetButton}>
          <Text style={styles.resetText}>Reset Password</Text>
          <Feather name="arrow-right" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  watermarkWrap: {
    position: "absolute",
    left: -60,
    bottom: 40,
    opacity: 0.05,
  },
  watermark: {
    transform: [{ rotate: "-8deg" }],
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },
  options: {
    gap: 14,
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: COLORS.primary,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EEF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxSelected: {
    backgroundColor: "#FFEDD5",
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.muted,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 28,
    marginTop: 16,
  },
  resetText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
