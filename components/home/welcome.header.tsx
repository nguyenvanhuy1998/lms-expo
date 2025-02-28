import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/theme.context";
import { StatusBar } from "expo-status-bar";
import useUserData from "@/hooks/useUserData";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
    fontSizes,
    IsAndroid,
    IsHaveNotch,
    IsIPAD,
    windowHeight,
    windowWidth,
} from "@/themes/app.constant";
import { router } from "expo-router";
const WelcomeHeader = () => {
    const { theme } = useTheme();
    const { name } = useUserData();
    const [notificationLength, setNotificationLength] = useState(0);

    return (
        <LinearGradient
            colors={
                theme.dark
                    ? ["#3c43485c", "#3c43485c", "#3c43485c"]
                    : ["#75ABFC", "#0047AB"]
            }
            start={theme.dark ? { x: 1, y: 1 } : { x: 1, y: 1 }}
            end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 1 }}
            style={styles.headerWrapper}
        >
            <StatusBar style="light" />
            {/*  ----- Component: Header Top ----- */}
            <View style={styles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        Hi {name?.split(" ")[0]}
                    </Text>
                    <Text style={styles.headerSubText}>
                        Let's start Learning
                    </Text>
                </View>
                <View style={styles.headerNotificationContainer}>
                    <Pressable
                        onPress={() => router.push("/(routes)/notification")}
                    >
                        <View
                            style={[
                                styles.notificationWrapper,
                                {
                                    backgroundColor: theme.dark
                                        ? "transparent"
                                        : "#004FAB",
                                    borderWidth: theme.dark ? 1 : 0,
                                    borderColor: theme.dark
                                        ? "#fff"
                                        : "transparent",
                                },
                            ]}
                        >
                            <Ionicons
                                name="notifications-sharp"
                                size={scale(25)}
                                color={"#fff"}
                            />
                            <View
                                style={[
                                    styles.notificationBadge,
                                    {
                                        position: "absolute",
                                        top: windowHeight(10),
                                        right: windowWidth(15),
                                    },
                                ]}
                            >
                                <Text style={styles.notificationBadgeText}>
                                    {notificationLength}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            {/*  ----- Component: Header Input Search ----- */}
            <View style={styles.inputSearchContainer}>
                <TextInput
                    style={[
                        styles.inputSearch,
                        {
                            backgroundColor: theme.dark
                                ? "transparent"
                                : "#fff",
                            borderWidth: theme.dark ? 1 : 0,
                            borderColor: theme.dark ? "#fff" : "",
                            color: theme.dark ? "#fff" : "#000",
                        },
                    ]}
                    placeholder="Search for Topics, Courses"
                    placeholderTextColor={theme.dark ? "#fff" : "#000"}
                />
                <Pressable style={styles.inputSearchIcon}>
                    <EvilIcons
                        name="search"
                        size={IsIPAD ? scale(20) : scale(30)}
                        color={theme.dark ? "#fff" : "blue"}
                    />
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
    headerWrapper: {
        height: IsHaveNotch
            ? IsIPAD
                ? verticalScale(175)
                : verticalScale(155)
            : IsAndroid
            ? verticalScale(168)
            : verticalScale(162),
        paddingHorizontal: moderateScale(25),
        borderBottomLeftRadius: moderateScale(40),
        borderBottomRightRadius: moderateScale(40),
        paddingTop: IsAndroid ? verticalScale(10) : verticalScale(0),
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: IsHaveNotch
            ? IsIPAD
                ? verticalScale(30)
                : verticalScale(40)
            : verticalScale(30),
    },
    headerTextContainer: {},
    headerText: {
        fontSize: fontSizes.FONT32,
        color: "#fff",
        fontFamily: "Poppins_600SemiBold",
    },
    headerSubText: {
        fontSize: fontSizes.FONT22,
        color: "#fff",
        fontFamily: "Poppins_400Regular",
    },
    headerNotificationContainer: {
        flexDirection: "row",
    },
    notificationWrapper: {
        position: "relative",
        width: scale(45),
        height: scale(45),
        borderRadius: scale(10),
        alignItems: "center",
        justifyContent: "center",
    },
    notificationBadge: {
        width: scale(13),
        height: scale(13),
        borderRadius: scale(100),
        backgroundColor: "#19C964",
        alignItems: "center",
        justifyContent: "center",
    },
    notificationBadgeText: {
        fontSize: fontSizes.FONT14,
        color: "#fff",
    },
    inputSearchContainer: {
        position: "relative",
    },
    inputSearch: {
        height: IsHaveNotch ? verticalScale(35) : verticalScale(40),
        backgroundColor: "#fff",
        color: "#000",
        marginTop: verticalScale(12),
        borderRadius: moderateScale(30),
        fontSize: IsIPAD ? fontSizes.FONT15 : fontSizes.FONT18,
        paddingHorizontal: moderateScale(15),
        fontFamily: "Poppins_400Regular",
    },
    inputSearchIcon: {
        position: "absolute",
        right: windowWidth(10),
        top: windowHeight(16),
    },
});
