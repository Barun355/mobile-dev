import { ThemeProvider } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    SplashScreen.hideAsync();

    const root = segments[0] as string | undefined;
    const inDashboard = root === "(dashboard)";
    const inPublic =
      root === undefined || root === "(auth)" || root === "(onboarding)";

    if (!isAuthenticated && inDashboard) {
      router.replace("/(auth)/sign-in");
    } else if (isAuthenticated && inPublic) {
      router.replace("/home");
    }
  }, [hasHydrated, isAuthenticated, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
