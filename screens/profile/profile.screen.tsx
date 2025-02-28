import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeSwitcher from "@/components/common/theme.switcher";
import { fontSizes, IsAndroid } from "@/themes/app.constant";
import { scale, verticalScale } from "react-native-size-matters";

const ProfileScreen = () => {
    const { theme } = useTheme();
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.dark ? "#101010" : "#f5f5f5",
                },
            ]}
        >
            <LinearGradient
                colors={
                    theme.dark
                        ? ["#121121", "#3c43485c", "#121121"]
                        : ["#6248FF", "#8673FC"]
                }
                start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
                end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
                style={styles.header}
            >
                <StatusBar style="light" />
                <SafeAreaView
                    style={{
                        paddingTop: IsAndroid ? verticalScale(20) : 0,
                    }}
                >
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <ThemeSwitcher />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: verticalScale(180),
        borderBottomLeftRadius: scale(20),
        borderBottomRightRadius: scale(20),
        padding: scale(20),
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: fontSizes.FONT28,
        color: "#fff",
        fontFamily: "Poppins_500Medium",
    },
});
