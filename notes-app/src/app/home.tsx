import { initialTodos, noteCategories } from "@/constants";
import { useColors } from "@/theme/useColors";
import { getTodayString } from "@/util";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const [selectedCategoryId, setSelectedCategoryId] = useState(noteCategories[0].id);
    const [todos, setTodos] = useState(initialTodos);
    const todayString = getTodayString()

    const router = useRouter();

    const toggleTodo = (id: string) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

    return (
        <SafeAreaView
            style={StyleSheet.compose(styles.screen, { backgroundColor: colors.surface[50] })}
            edges={["top", "left", "right"]}
        >
            <StatusBar style="light" />

            <View style={styles.header}>
                <Text style={StyleSheet.compose(styles.wordmark, { color: colors.ink[900] })}>
                    Notesy
                </Text>
                <Pressable hitSlop={8} style={styles.searchBtn}>
                    <Feather name="search" size={22} color={colors.ink[900]} />
                </Pressable>
            </View>

            <FlatList
                data={noteCategories}
                horizontal
                style={{ maxHeight: 60 }}
                contentContainerStyle={styles.pillsRow}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: cat }) => {
                    const selected = cat.id === selectedCategoryId;
                    return (
                        <Pressable
                            key={cat.id}
                            onPress={() => setSelectedCategoryId(cat.id)}
                            style={StyleSheet.compose(styles.pill, {
                                backgroundColor: selected ? colors.ink[900] : colors.surface[100],
                            })}
                        >
                            <Text
                                style={StyleSheet.compose(styles.pillLabel, {
                                    color: selected ? colors.surface[0] : colors.ink[700],
                                })}
                            >
                                {cat.title}
                            </Text>
                            {selected ? (
                                <View
                                    style={StyleSheet.compose(styles.countBadge, {
                                        backgroundColor: colors.surface[0] + "26",
                                    })}
                                >
                                    <Text
                                        style={StyleSheet.compose(styles.countBadgeText, {
                                            color: colors.surface[0],
                                        })}
                                    >
                                        {cat.count}
                                    </Text>
                                </View>
                            ) : (
                                <Text
                                    style={StyleSheet.compose(styles.countText, { color: colors.ink[500] })}
                                >
                                    {cat.count}
                                </Text>
                            )}
                        </Pressable>
                    );
                }}
            />

            <ScrollView
                contentContainerStyle={StyleSheet.compose(styles.body, {
                    paddingBottom: insets.bottom + 96,
                })}
            >
                <View
                    style={StyleSheet.compose(styles.todoCard, { backgroundColor: colors.cyan[400] })}
                >
                    <View style={styles.todoHeaderRow}>
                        <View style={styles.todoHeaderText}>
                            <Text
                                style={StyleSheet.compose(styles.todoTitle, { color: colors.ink[900] })}
                            >
                                To-Do List
                            </Text>
                            <Text
                                style={StyleSheet.compose(styles.todoSubtitle, { color: colors.ink[700] })}
                            >
                                Today is {todayString}
                            </Text>
                        </View>
                        <Pressable
                            hitSlop={8}
                            style={StyleSheet.compose(styles.todoArrowBtn, {
                                backgroundColor: colors.ink[900],
                            })}
                        >
                            <Feather name="arrow-up-right" size={18} color={colors.surface[0]} />
                        </Pressable>
                    </View>

                    <View style={styles.checklist}>
                        {todos.map((todo) => (
                            <Pressable
                                key={todo.id}
                                onPress={() => toggleTodo(todo.id)}
                                style={StyleSheet.compose(styles.checkRow, {
                                    backgroundColor: colors.surface[0],
                                })}
                            >
                                <View
                                    style={StyleSheet.compose(
                                        styles.checkbox,
                                        todo.done
                                            ? { backgroundColor: colors.cyan[400], borderColor: colors.cyan[400] }
                                            : { backgroundColor: "transparent", borderColor: colors.ink[500] }
                                    )}
                                >
                                    {todo.done ? (
                                        <Feather name="check" size={14} color={colors.surface[0]} />
                                    ) : null}
                                </View>
                                <Text
                                    style={StyleSheet.compose(styles.checkLabel, { color: colors.ink[900] })}
                                >
                                    {todo.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View
                style={StyleSheet.compose(styles.footer, {
                    backgroundColor: colors.toolbar[900],
                    bottom: insets.bottom + 16,
                })}
            >
                <Pressable hitSlop={8} onPress={() => {}}>
                    <Feather name="mic" size={22} color={colors.cyan[400]} />
                </Pressable>
                <Pressable
                    onPress={() => router.push("/new")}
                    style={StyleSheet.compose(styles.fabPlusBtn, {
                        backgroundColor: colors.cyan[400],
                    })}
                >
                    <Feather name="plus" size={24} color={colors.surface[0]} />
                </Pressable>
                <Pressable hitSlop={8} onPress={() => {}}>
                    <Ionicons name="sparkles" size={22} color={colors.cyan[400]} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
    },
    wordmark: {
        fontSize: 24,
        fontWeight: "700",
        fontStyle: "italic",
    },
    searchBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    pillsRow: {
        gap: 8,
        paddingVertical: 8,
        height: 60,
    },
    pill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    pillLabel: {
        fontSize: 10,
        fontWeight: "600",
    },
    countBadge: {
        minWidth: 24,
        height: 24,
        borderRadius: 999,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    countBadgeText: {
        fontSize: 10,
        fontWeight: "700",
    },
    countText: {
        fontSize: 12,
        fontWeight: "600",
    },
    body: {
        paddingTop: 8,
        gap: 16,
    },
    footer: {
        position: "absolute",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        height: 64,
        borderRadius: 999,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    fabPlusBtn: {
        width: 48,
        height: 48,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    todoCard: {
        borderRadius: 28,
        padding: 20,
        gap: 16,
    },
    todoHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    todoHeaderText: {
        gap: 4,
        flex: 1,
    },
    todoTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    todoSubtitle: {
        fontSize: 13,
        fontWeight: "500",
    },
    todoArrowBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    checklist: {
        gap: 8,
    },
    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        height: 56,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    checkLabel: {
        fontSize: 16,
        fontWeight: "500",
    },
});
