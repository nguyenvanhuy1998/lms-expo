import { useTheme } from "@/context/theme.context";
import { fontSizes } from "@/themes/app.constant";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

// Component nút Back
const BackButton = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const { theme } = useTheme();
    return (
        <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name="left" size={scale(20)} color={theme.colors.icon} />
            <Text style={[styles.backText, { color: theme.colors.icon }]}>
                Back
            </Text>
        </Pressable>
    );
};

const _layout = () => {
    const { theme } = useTheme();
    const isDarkMode = theme.dark;

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Enrolled Courses",
                    headerTitleStyle: {
                        color: theme.colors.text,
                        fontSize: fontSizes.FONT22,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerShadowVisible: true,
                    headerBackVisible: true,
                    headerLeft: () => <BackButton isDarkMode={isDarkMode} />,
                }}
            />
        </Stack>
    );
};

export default _layout;

const styles = StyleSheet.create({
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(5),
    },
    backText: {
        fontSize: fontSizes.FONT20,
    },
});
