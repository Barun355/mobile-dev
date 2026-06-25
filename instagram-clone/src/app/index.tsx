import { useRouter } from "expo-router";
import { Text, View, StyleSheet, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={"dark-content"} />
      <Text>Edit src/app/index.tsx to edit this screen.</Text>

      <Button title="Go to Details" onPress={() => router.navigate("/details")} />
      <Button title="Sign In" onPress={() => router.navigate("/(auth)/sign-in")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
