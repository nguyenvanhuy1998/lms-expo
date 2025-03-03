import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/theme.context";
import { StatusBar } from "expo-status-bar";
import { scale, verticalScale } from "react-native-size-matters";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { fontSizes } from "@/themes/app.constant";

const SettingsScreen = () => {
    const { theme, toggleTheme } = useTheme();
    const { colors, dark } = theme;
    const [courseUpdates, setCourseUpdates] = useState<any>("");
    const [supportTicketResponse, setSupportTicketResponse] = useState<any>("");
    const [latestUpdates, setLatestUpdates] = useState<any>("");

    const updatePreferences = async (e: string) => {
        console.log(e);
    };
    return (
        <SafeAreaView
            edges={["top"]}
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <StatusBar style={!dark ? "dark" : "light"} />

            {/* header item */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: verticalScale(25),
                    backgroundColor: theme.dark ? "#131313" : "#fff",
                    paddingHorizontal: scale(10),
                    paddingBottom: verticalScale(5),
                    shadowColor: theme.dark ? "#fff" : "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 1 },
                    shadowRadius: 1,
                    elevation: 5,
                }}
            >
                <Pressable
                    onPress={() => router.back()}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: scale(5),
                    }}
                >
                    <AntDesign
                        name="left"
                        size={scale(20)}
                        color={theme.dark ? "#fff" : "#005DE0"}
                    />
                    <Text
                        style={{
                            color: theme.dark ? "#fff" : "#005DE0",
                            fontSize: fontSizes.FONT20,
                        }}
                    >
                        Back
                    </Text>
                </Pressable>
                <Text
                    style={{
                        color: theme.dark ? "#fff" : "#000",
                        textAlign: "center",
                        width: scale(220),
                        fontSize: fontSizes.FONT22,
                    }}
                >
                    Settings
                </Text>
            </View>

            <ScrollView style={{ padding: scale(20) }}>
                <Text
                    style={[
                        styles.sectionHeader,
                        { color: theme.dark ? "#fff" : "#000" },
                    ]}
                >
                    Push Notifications
                </Text>
                <View style={styles.settingItem}>
                    <Text
                        style={[
                            styles.normalText,
                            { color: theme.dark ? "#fff" : "#000" },
                        ]}
                    >
                        Course Updates
                    </Text>
                    <Switch
                        value={courseUpdates}
                        onValueChange={() => updatePreferences("courseUpdates")}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text
                        style={[
                            styles.normalText,
                            { color: theme.dark ? "#fff" : "#000" },
                        ]}
                    >
                        Support Ticket Response
                    </Text>
                    <Switch
                        value={supportTicketResponse}
                        onValueChange={() =>
                            updatePreferences("supportTicketResponse")
                        }
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text
                        style={[
                            styles.normalText,
                            { color: theme.dark ? "#fff" : "#000" },
                        ]}
                    >
                        Latest Updates
                    </Text>
                    <Switch
                        value={latestUpdates}
                        onValueChange={() => updatePreferences("latestUpdates")}
                    />
                </View>

                <View style={styles.settingSection}>
                    <Text
                        style={[
                            styles.sectionHeader,
                            { color: theme.dark ? "#fff" : "#000" },
                        ]}
                    >
                        Appearance
                    </Text>
                    <View style={styles.settingItem}>
                        <Text
                            style={[
                                styles.normalText,
                                { color: theme.dark ? "#fff" : "#000" },
                            ]}
                        >
                            App Theme
                        </Text>
                        <Switch
                            value={theme.dark}
                            onValueChange={toggleTheme}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    settingSection: {
        marginBottom: verticalScale(30),
    },
    sectionHeader: {
        fontSize: fontSizes.FONT23,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: verticalScale(10),
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: verticalScale(15),
    },
    normalText: {
        fontSize: fontSizes.FONT19,
        opacity: 0.9,
        fontFamily: "Poppins_500Medium",
    },
});
