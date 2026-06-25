import { SignInForm } from "@/components/auth";
import { Text } from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function SignIn() {
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{ gap: Spacing.xs, marginTop: Spacing.xl }}>
          <Text variant="title">Welcome back</Text>
          <Text variant="body" color="secondary">
            Sign in to continue ordering with Tastio.
          </Text>
        </View>

        <SignInForm />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: Spacing.xs,
            marginTop: "auto",
          }}
        >
          <Text color="secondary">Don&apos;t have an account?</Text>
          <Link href="/(auth)/sign-up">
            <Text color="primary">Sign up</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
