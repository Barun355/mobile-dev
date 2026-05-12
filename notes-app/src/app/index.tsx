import { useColors } from "@/theme/useColors";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={StyleSheet.compose(styles.footer, { paddingBottom: insets.bottom + 16 })}>
          <View style={StyleSheet.compose(styles.captionCard, { backgroundColor: colors.cyan[400] })}>
            <Text style={StyleSheet.compose(styles.captionText, { color: colors.ink[900] })}>
              All your ideas
            </Text>
            <View style={styles.captionRow}>
              <Text style={StyleSheet.compose(styles.captionText, { color: colors.ink[900] })}>
                in
              </Text>
              <View style={StyleSheet.compose(styles.pill, { backgroundColor: colors.surface[0] })}>
                <Text style={StyleSheet.compose(styles.captionText, { color: colors.ink[900] })}>
                  one place
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) =>
              StyleSheet.compose(styles.cta, {
                backgroundColor: colors.ink[900],
                opacity: pressed ? 0.85 : 1,
              })
            }
            onPress={() => router.push("/home")}
          >
            <Text style={StyleSheet.compose(styles.ctaLabel, { color: colors.surface[0] })}>
              Get Started
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  captionCard: {
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  captionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  captionText: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  pill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  cta: {
    height: 56,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});
