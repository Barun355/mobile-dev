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
  const account = useAuthStore((s) => s.account);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    SplashScreen.hideAsync();

    const root = segments[0] as string | undefined;
    const inDashboard = root === "(dashboard)";
    const onboardingEntry = root === undefined || root === "(onboarding)";
    // Restaurant detail is viewable via deep link without a session.
    const isRestaurant = segments[2] === "restaurant";

    if (isAuthenticated) {
      // Authenticated users skip onboarding/auth and land on the dashboard.
      if (!inDashboard) router.replace("/home");
    } else if (inDashboard && !isRestaurant) {
      // Protected area without a session.
      router.replace("/(auth)/sign-in");
    } else if (account && onboardingEntry) {
      // Already signed up before → ask for credentials instead of onboarding.
      router.replace("/(auth)/sign-in");
    }
  }, [hasHydrated, isAuthenticated, account, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
