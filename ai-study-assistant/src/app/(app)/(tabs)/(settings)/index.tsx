import { signOut, useAuthStore } from "@/features/auth/auth";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingScreen() {
    const email = useAuthStore((state) => state.session?.user.email);
    const [loading, setLoading] = useState(false);

    async function handleSignOut() {
        setLoading(true);
        try {
            await signOut();
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <View>
                <Text className="text-white">Setting</Text>
            </View>
            <View className="mt-8 gap-4">
                {/* User Card */}
                <View className="rounded-2xl border border-border bg-card p-5">
                    <Text className="text-sm text-muted">
                        Signed in as
                    </Text>

                    <Text className="mt-3 text-lg font-medium text-foreground">
                        {email}
                    </Text>
                </View>

                <Pressable
                    disabled={loading}
                    onPress={handleSignOut}
                    className="items-center rounded-xl border border-border bg-card px-4 py-3"
                >
                    {loading ? (
                        <ActivityIndicator color="#ffc799" />
                    ) : (
                        <Text className="text-base font-medium text-primary">Sign out</Text>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    )
}