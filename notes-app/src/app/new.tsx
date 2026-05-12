import { noteCategories } from "@/constants";
import { useColors } from "@/theme/useColors";
import { getTodayString } from "@/util";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function New() {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const todayString = getTodayString();

    const [notes, setNotes] = useState({ title: "", content: "" });

    const [noteState, setNoteState] = useState<'view' | 'edit'>('view');

    const [selectedCategoryId, setSelectedCategoryId] = useState(noteCategories[0].id);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={[]}>
            <StatusBar style="light" />

            <View
                style={StyleSheet.compose(styles.header, {
                    backgroundColor: colors.cyan[400],
                    paddingTop: insets.top + 16,
                })}
            >
                <View style={styles.topRow}>
                    <Pressable hitSlop={8} onPress={() => router.back()}>
                        <Feather name="chevron-left" size={24} color={colors.ink[900]} />
                    </Pressable>

                    <View style={styles.rightGroup}>
                        <Pressable
                            style={StyleSheet.compose(styles.pencilBtn, {
                                backgroundColor: colors.toolbar[900],
                            })}
                            onPress={() => setNoteState(noteState === 'view' ? 'edit' : 'view')}
                        >
                            {
                                noteState === 'view' ? (
                                    <Feather name="edit-2" size={18} color={colors.surface[0]} />
                                ) : (
                                    <Feather name="save" size={24} color={colors.surface[0]} />
                                )
                            }
                        </Pressable>
                        <Pressable hitSlop={8}>
                            <Feather name="x" size={24} color={colors.ink[900]} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <Dropdown
                        style={StyleSheet.compose(styles.dropdownTrigger, {
                            backgroundColor: colors.surface[0],
                        })}
                        containerStyle={StyleSheet.compose(styles.dropdownMenu, {
                            backgroundColor: colors.surface[0],
                        })}
                        selectedTextStyle={StyleSheet.compose(styles.dropdownLabel, {
                            color: colors.ink[900]
                        })}
                        placeholderStyle={StyleSheet.compose(styles.dropdownLabel, {
                            color: colors.ink[700],
                        })}
                        itemTextStyle={StyleSheet.compose(styles.dropdownItemText, {
                            color: colors.ink[900],
                        })}
                        activeColor={colors.cyan[50]}
                        data={noteCategories}
                        labelField="title"
                        valueField="id"
                        placeholder="Select category"
                        value={selectedCategoryId}
                        onChange={(item) => setSelectedCategoryId(item.id)}
                        renderLeftIcon={() => (
                            <Feather
                                name="folder"
                                size={14}
                                color={colors.ink[700]}
                                style={styles.dropdownLeftIcon}
                            />
                        )}
                        renderRightIcon={() => (
                            <Feather
                                name="chevron-down"
                                size={14}
                                color={colors.ink[700]}
                                style={styles.dropdownRightIcon}
                            />
                        )}
                        maxHeight={240}
                    />

                    <Text style={StyleSheet.compose(styles.dateText, { color: colors.ink[900] })}>
                        {todayString}
                    </Text>
                </View>
            </View>
            <KeyboardAvoidingView
                style={styles.noteBody}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback>
                    <View style={{ flex: 1 }}>
                        {noteState === 'view' ? (
                            <Text style={StyleSheet.compose(
                                styles.noteTitle,
                                { color: notes.title ? colors.ink[900] : colors.ink[700] }
                            )}>{notes.title || 'No title'}</Text>
                        ) : (
                            <TextInput
                                style={StyleSheet.compose(
                                    styles.noteTitle,
                                    { color: notes.title ? colors.ink[900] : colors.ink[700] }
                                )}
                                multiline
                                onChangeText={(text) => setNotes((prev) => ({ ...prev, title: text }))}
                                placeholder="No Title"
                            >
                                {notes.title}
                            </TextInput>
                        )}

                        {noteState === 'view' ? (
                            <Text style={styles.noteContent}>{notes.content || 'No content'}</Text>
                        ) : (
                            <TextInput
                                multiline
                                style={styles.noteContent}
                                onChangeText={(text) => setNotes((prev) => ({ ...prev, content: text }))}
                                placeholder="No content"
                            >
                                {notes.content}
                            </TextInput>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        gap: 32,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rightGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    pencilBtn: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownTrigger: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        minHeight: 40,
        width: 160,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
    },
    dropdownMenu: {
        borderRadius: 16,
        paddingVertical: 4,
        width: 160,
        marginTop: 4,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    dropdownLabel: {
        fontSize: 14,
        fontWeight: "600",
    },
    dropdownItemText: {
        fontSize: 14,
        fontWeight: "500",
    },
    dropdownLeftIcon: {
        marginRight: 4,
    },
    dropdownRightIcon: {
        marginLeft: 4,
    },
    dateText: {
        fontSize: 14,
        fontWeight: "500",
    },
    noteBody: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    noteTitle: {
        fontSize: 34,
        fontWeight: "800",
        marginBottom: 12,
    },
    noteContent: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 24,
    }
});
