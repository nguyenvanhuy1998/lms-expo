import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeSwitcher from "../common/theme.switcher";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes, IsAndroid } from "@/themes/app.constant";
import { useTheme } from "@/context/theme.context";
import { Colors } from "@/constants/colors";

// Component hiển thị Header
const ProfileHeader = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const { theme } = useTheme();
    return (
        <LinearGradient
            colors={theme.colors.headerGradient}
            start={isDarkMode ? { x: 1, y: 1 } : { x: 0, y: 1 }}
            end={isDarkMode ? { x: 0, y: 1 } : { x: 0, y: 0 }}
            style={styles.header}
        >
            <StatusBar style="light" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.headerContent}>
                    <Text style={[styles.headerTitle]}>Profile</Text>
                    <ThemeSwitcher />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ProfileHeader;

const styles = StyleSheet.create({
    header: {
        height: verticalScale(180),
        borderBottomLeftRadius: scale(20),
        borderBottomRightRadius: scale(20),
        padding: scale(20),
    },
    safeArea: {
        paddingTop: IsAndroid ? verticalScale(20) : 0,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: fontSizes.FONT28,
        fontFamily: "Poppins_500Medium",
        color: Colors.dark.text,
    },
});
