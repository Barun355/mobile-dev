/**
 * SignUpForm — name + email + password + confirm + Google sign-up.
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

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function SignUpForm() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const socialAuth = useAuthStore((s) => s.socialAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = confirm.length === 0 || confirm === password;

  const handleSignUp = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    signUp({ name: trimmedName, email: trimmedEmail, password });
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
      {error ? (
        <Text variant="caption" color="error">
          {error}
        </Text>
      ) : null}
      <Button size="lg" onPress={handleSignUp}>
        Create Account
      </Button>
      <AuthDivider />
      <GoogleAuthButton onPress={handleGoogle} label="Sign up with Google" />
    </View>
  );
}
