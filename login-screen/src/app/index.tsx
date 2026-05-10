import { COLORS } from '@/colors';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);

  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  })

  function handleSubmit() {
    if (!userDetail.email || !userDetail.password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Let's experience the joy of Healthy Recipes.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputRow, styles.inputRowFocused]}>
              <FontAwesome name="envelope-o" size={18} color={COLORS.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={userDetail.email}
                onChangeText={(text) => setUserDetail((prev) => ({...prev, email: text}))}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <FontAwesome name="lock" size={20} color={COLORS.muted} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password..."
                placeholderTextColor={COLORS.muted}
                secureTextEntry={!showPassword}
                value={userDetail.password}
                onChangeText={(text) => setUserDetail((prev) => ({...prev, password: text}))}
              />
              <Pressable hitSlop={8} onPress={() => setShowPassword((prev) => !prev)}>
                {
                    showPassword ? (
                        <Feather name="eye" size={18} color={COLORS.muted} />
                    ): (
                        <Feather name="eye-off" size={18} color={COLORS.muted} />
                    )
                }
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInText}>Sign In</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.socials}>
          <Pressable style={styles.socialButton}>
            <FontAwesome name="facebook" size={20} color={COLORS.text} />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <FontAwesome name="google" size={20} color={COLORS.text} />
          </Pressable>
          <Pressable style={styles.socialButton}>
            <FontAwesome name="instagram" size={20} color={COLORS.text} />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.signUpRow}>
            <Text style={styles.mutedText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push("/signup")}>
              <Text style={styles.link}>Sign Up.</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => router.push("/forgotpassword")}>
            <Text style={styles.link}>Forgot your password?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  logo: {
    width: 56,
    height: 56,
    marginBottom: 16,
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
    textAlign: "center",
  },
  form: {
    gap: 18,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputRowFocused: {
    borderColor: COLORS.primary,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 0,
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 28,
    marginTop: 8,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  socials: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginTop: 32,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    gap: 12,
    marginTop: 24,
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mutedText: {
    fontSize: 14,
    color: COLORS.muted,
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primaryDark,
    textDecorationLine: "underline",
  },
});
