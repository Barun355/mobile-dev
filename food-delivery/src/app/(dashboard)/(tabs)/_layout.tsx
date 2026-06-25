import { Ionicons } from "@expo/vector-icons";
import { Tabs, useNavigation } from "expo-router";
import type { DrawerNavigationProp } from "expo-router/drawer";

import { useTheme } from "@/hooks/use-theme";

type DrawerNav = DrawerNavigationProp<Record<string, object | undefined>>;

export default function TabsLayout() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            // Inside the (tabs) layout, `navigation` is the drawer-level
            // navigation; fall back to the parent only if it isn't.
            const nav = navigation as unknown as DrawerNav;
            if (typeof nav.openDrawer === "function") {
              nav.openDrawer();
            } else {
              (navigation.getParent() as DrawerNav | undefined)?.openDrawer?.();
            }
          },
        }}
      />
      <Tabs.Screen name="cart" options={{ href: null }} />
      <Tabs.Screen
        name="restaurant/[id]"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
}
