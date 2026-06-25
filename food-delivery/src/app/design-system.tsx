import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StatusBar, View, type ViewStyle } from "react-native";

import {
    Badge,
    Button,
    Card,
    Input,
    Separator,
    Text,
} from "@/components/ui";
import { Spacing, type ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DesignSystem() {
    const { colors, preference, scheme, toggle } = useTheme();
    const [value, setValue] = useState("");

    return (
        <SafeAreaView>
            <StatusBar barStyle={preference === "dark" ? "light-content" : "dark-content"} />
            <Stack.Screen options={{ title: "Design System" }} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundColor: colors.background }}
                contentContainerStyle={{ padding: Spacing.lg, gap: Spacing["2xl"] }}
            >
                <Section title="Theme" subtitle={`Active scheme: ${scheme}`}>
                    <Button variant="outline" onPress={toggle}>
                        Toggle theme
                    </Button>
                </Section>

                <Section title="Colors" subtitle="Semantic tokens for the active scheme">
                    <View style={{ gap: Spacing.sm }}>
                        {(Object.keys(colors) as (keyof ThemeColors)[]).map((key) => (
                            <Swatch key={key} name={key} value={colors[key]} />
                        ))}
                    </View>
                </Section>

                <Section title="Typography" subtitle="variant prop on <Text>">
                    <Text variant="title">Title</Text>
                    <Text variant="heading">Heading</Text>
                    <Text variant="subheading">Subheading</Text>
                    <Text variant="body">Body — the quick brown fox jumps over the lazy dog.</Text>
                    <Text variant="caption" color="secondary">Caption / secondary</Text>
                    <Text variant="label" color="muted">LABEL / MUTED</Text>
                </Section>

                <Section title="Buttons" subtitle="variant + size + states">
                    <View style={{ gap: Spacing.sm }}>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                    </View>
                    <Separator style={{ marginVertical: Spacing.sm }} />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm, flexWrap: "wrap" }}>
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                    </View>
                    <Separator style={{ marginVertical: Spacing.sm }} />
                    <View style={{ flexDirection: "row", gap: Spacing.sm, flexWrap: "wrap" }}>
                        <Button loading>Loading</Button>
                        <Button disabled>Disabled</Button>
                    </View>
                </Section>

                <Section title="Badges" subtitle="status pills">
                    <View style={{ flexDirection: "row", gap: Spacing.sm, flexWrap: "wrap" }}>
                        <Badge>Default</Badge>
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="error">Error</Badge>
                        <Badge variant="accent">Accent</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </View>
                </Section>

                <Section title="Input" subtitle="focus + invalid states">
                    <Input placeholder="Search restaurants..." value={value} onChangeText={setValue} />
                    <Input placeholder="Invalid field" invalid />
                </Section>

                <Section title="Card" subtitle="composable surface">
                    <Card>
                        <Card.Header>
                            <Card.Title>Margherita Pizza</Card.Title>
                            <Card.Description>Tomato, mozzarella, fresh basil</Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Text color="secondary">
                                Wood-fired classic, ready in 20 minutes.
                            </Text>
                        </Card.Content>
                        <Card.Footer>
                            <Badge variant="success">Popular</Badge>
                            <View style={{ flex: 1 }} />
                            <Button size="sm">Add</Button>
                        </Card.Footer>
                    </Card>
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
}

function Section({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <View style={{ gap: Spacing.md }}>
            <View style={{ gap: 2 }}>
                <Text variant="heading">{title}</Text>
                {subtitle ? (
                    <Text variant="caption" color="muted">
                        {subtitle}
                    </Text>
                ) : null}
            </View>
            {children}
        </View>
    );
}

function Swatch({ name, value }: { name: string; value: string }) {
    const { colors } = useTheme();
    const box: ViewStyle = {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderCurve: "continuous",
        backgroundColor: value,
        borderWidth: 1,
        borderColor: colors.border,
    };
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.md }}>
            <View style={box} />
            <View style={{ flex: 1 }}>
                <Text variant="label">{name}</Text>
            </View>
            <Text variant="caption" color="muted" selectable style={{ fontVariant: ["tabular-nums"] }}>
                {value}
            </Text>
        </View>
    );
}
