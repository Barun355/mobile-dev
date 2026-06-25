import { SignUpForm } from "@/components/auth";
import { Text } from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";

export default function SignUp() {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{
        flexGrow: 1,
        padding: Spacing.xl,
        gap: Spacing["2xl"],
      }}
    >
      <View style={{ gap: Spacing.xs, marginTop: Spacing.xl }}>
        <Text variant="title">Create account</Text>
        <Text variant="body" color="secondary">
          Join Tastio and get your favorite food delivered.
        </Text>
      </View>

      <SignUpForm />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: Spacing.xs,
          marginTop: "auto",
        }}
      >
        <Text color="secondary">Already have an account?</Text>
        <Link href="/(auth)/sign-in">
          <Text color="primary">Sign in</Text>
        </Link>
      </View>
    </ScrollView>
  );
}
