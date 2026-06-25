/**
 * SignInForm — email + password + Google sign-in.
 *
 * UI only: the submit and Google handlers are stubs marked with TODO. Replace
 * the bodies with real calls once an auth backend is added.
 */
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui";
import { Spacing } from "@/constants/theme";
import { AuthDivider } from "./auth-divider";
import { AuthField } from "./auth-field";
import { GoogleAuthButton } from "./google-auth-button";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // TODO: authenticate with your backend using { email, password }, then route.
    router.replace("/home");
  };

  const handleGoogle = () => {
    // TODO: trigger Google OAuth via your chosen provider, then route.
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
      <Button size="lg" onPress={handleSignIn}>
        Sign In
      </Button>
      <AuthDivider />
      <GoogleAuthButton onPress={handleGoogle} />
    </View>
  );
}
