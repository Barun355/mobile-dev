/**
 * SignUpForm — name + email + password + confirm + Google sign-up.
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

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const passwordsMatch = confirm.length === 0 || confirm === password;

  const handleSignUp = () => {
    // TODO: create the account with your backend using { name, email, password }.
    router.replace("/home");
  };

  const handleGoogle = () => {
    // TODO: trigger Google OAuth via your chosen provider, then route.
    router.replace("/home");
  };

  return (
    <View style={{ gap: Spacing.lg }}>
      <AuthField
        label="Full name"
        placeholder="Jane Doe"
        autoCapitalize="words"
        autoComplete="name"
        value={name}
        onChangeText={setName}
      />
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
      <AuthField
        label="Confirm password"
        placeholder="••••••••"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
        error={passwordsMatch ? undefined : "Passwords do not match"}
      />
      <Button size="lg" onPress={handleSignUp}>
        Create Account
      </Button>
      <AuthDivider />
      <GoogleAuthButton onPress={handleGoogle} label="Sign up with Google" />
    </View>
  );
}
