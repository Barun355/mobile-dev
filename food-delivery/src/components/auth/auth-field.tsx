/**
 * AuthField — labeled form field (label + Input + optional error) built on the
 * core ui primitives. Pass through any TextInput prop.
 */
import { View } from "react-native";

import { Input, Text, type InputProps } from "@/components/ui";
import { Spacing } from "@/constants/theme";

export type AuthFieldProps = InputProps & {
  label: string;
  error?: string;
};

export function AuthField({ label, error, ...inputProps }: AuthFieldProps) {
  return (
    <View style={{ gap: Spacing.xs }}>
      <Text variant="label">{label}</Text>
      <Input invalid={!!error} {...inputProps} />
      {error ? (
        <Text variant="caption" color="error">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
