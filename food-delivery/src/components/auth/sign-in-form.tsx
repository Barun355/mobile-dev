/**
 * SignInForm — email + password + Google sign-in.
 *
 * UI only: the submit and Google handlers are stubs marked with TODO. Replace
 * the bodies with real calls once an auth backend is added.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Button, Text } from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { useAuthStore } from "@/store/auth-store";
import { AuthDivider } from "./auth-divider";
import { AuthField } from "./auth-field";
import { GoogleAuthButton } from "./google-auth-button";

export function SignInForm() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const socialAuth = useAuthStore((s) => s.socialAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = () => {
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const result = signIn(email, password);
    if (!result.ok) {
      setError(result.error ?? "Sign in failed.");
      return;
    }
    setError(null);
    router.replace("/home");
  };

  const handleGoogle = () => {
    // TODO: trigger Google OAuth via your chosen provider.
    socialAuth({ name: "Google User", email: "user@gmail.com" });
    router.replace("/home");
  };

  return (
    <View style={{ gap: Spacing.lg }}>
      <AuthField
        label="Email"
        placeholder="you@example.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <AuthField
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        autoComplete="password"
        value={password}
        onChangeText={setPassword}
      />
      {error ? (
        <Text variant="caption" color="error">
          {error}
        </Text>
      ) : null}
      <Button size="lg" onPress={handleSignIn}>
        Sign In
      </Button>
      <AuthDivider />
      <GoogleAuthButton onPress={handleGoogle} />
    </View>
  );
}
