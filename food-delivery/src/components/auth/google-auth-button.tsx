/**
 * GoogleAuthButton — outline button with a Google "G" mark.
 *
 * UI only: wire `onPress` to your OAuth provider when one is added.
 */
import { View } from "react-native";

import { Button, Text } from "@/components/ui";

export type GoogleAuthButtonProps = {
  onPress?: () => void;
  loading?: boolean;
  label?: string;
};

export function GoogleAuthButton({
  onPress,
  loading,
  label = "Continue with Google",
}: GoogleAuthButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      loading={loading}
      onPress={onPress}
      leftIcon={
        <View style={{ width: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#4285F4" }}>G</Text>
        </View>
      }
    >
      {label}
    </Button>
  );
}
