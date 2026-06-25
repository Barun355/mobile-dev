import { useRouter } from "expo-router";
import { Text, View, StyleSheet, StatusBar, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
  const navigation = useRouter();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={"dark-content"} />
      <Text>Details Screen</Text>

      <Button title="Go to Index" onPress={() => navigation.push("/")} />
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
