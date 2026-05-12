import { colors } from "@/theme/colors";
import { useColorScheme } from "react-native";

export function useColors() {
  const currentTheme = useColorScheme();

  return currentTheme === "dark" ? colors.dark : colors.light;
}
