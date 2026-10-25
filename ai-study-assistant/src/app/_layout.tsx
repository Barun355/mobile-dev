import { initAuth, useAuthStore } from "@/features/auth/auth";
import { BACKGROUND_COLOR } from "@/lib/constant";
import { QueryProvider } from "@/providers/query-provider";
import { Stack } from "expo-router";
import { ThemeProvider } from "expo-router/react-navigation";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Uniwind } from "uniwind";
import "../global.css";
import { navigationTheme } from "../lib/theme";

SplashScreen.preventAutoHideAsync();

Uniwind.setTheme("dark")

export default function RootLayout() {

  const initialized = useAuthStore((state) => state.initialized);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(BACKGROUND_COLOR);

    return initAuth()
  }, [])

  useEffect(() => {
    if (!initialized) SplashScreen.hideAsync();

  }, [initialized])

  if (!initialized) {
    return (
      <View className="flex-1 justify-center items-center bg-[#101010]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  }
  return (
    <ThemeProvider value={navigationTheme}>
      <QueryProvider>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: BACKGROUND_COLOR
          }
        }} >
          <Stack.Screen name="(app)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </QueryProvider>

    </ThemeProvider>
  );
}
