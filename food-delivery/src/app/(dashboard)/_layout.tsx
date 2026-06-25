import { Drawer } from "expo-router/drawer";

import { DrawerContent } from "@/components/dashboard/drawer-content";
import { useTheme } from "@/hooks/use-theme";

export default function DashboardLayout() {
  const { colors } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="orders" options={{ title: "My Orders" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
      <Drawer.Screen name="help" options={{ title: "Help" }} />
    </Drawer>
  );
}
