import { useRouter } from "expo-router";
import { Button, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle={"dark-content"} />
            <Text>Sign In Screen</Text>

            <Button title="Go to Sign Up" onPress={() => router.navigate("/(auth)/sign-up")} />
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