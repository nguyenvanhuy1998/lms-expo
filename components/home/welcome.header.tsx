import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import useUserData from "@/hooks/useUserData";
import {
    fontSizes,
    IsAndroid,
    IsHaveNotch,
    IsIPAD,
    windowHeight,
    windowWidth,
} from "@/themes/app.constant";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const WelcomeHeader = () => {
    const { theme } = useTheme();
    const { name } = useUserData();
    const { notification, borderSecond, input, text, icon } = theme.colors;
    const { white } = Colors.common;
    const [notificationLength, setNotificationLength] = useState(0);
    const isDarkMode = theme.dark;
    return (
        <LinearGradient
            colors={theme.colors.headerGradient}
            start={isDarkMode ? { x: 1, y: 1 } : { x: 1, y: 1 }}
            end={isDarkMode ? { x: 0, y: 1 } : { x: 0, y: 1 }}
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
                                    backgroundColor: notification,
                                    borderWidth: isDarkMode ? 1 : 0,
                                    borderColor: borderSecond,
                                },
                            ]}
                        >
                            <Ionicons
                                name="notifications-sharp"
                                size={scale(25)}
                                color={white}
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
                            backgroundColor: input,
                            borderWidth: isDarkMode ? 1 : 0,
                            borderColor: borderSecond,
                            color: text,
                        },
                    ]}
                    placeholder="Search for Topics, Courses"
                    placeholderTextColor={text}
                />
                <Pressable style={styles.inputSearchIcon}>
                    <EvilIcons
                        name="search"
                        size={IsIPAD ? scale(20) : scale(30)}
                        color={icon}
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
        color: Colors.common.white,
        fontFamily: "Poppins_600SemiBold",
    },
    headerSubText: {
        fontSize: fontSizes.FONT22,
        color: Colors.common.white,
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
        backgroundColor: Colors.common.green,
        alignItems: "center",
        justifyContent: "center",
    },
    notificationBadgeText: {
        fontSize: fontSizes.FONT14,
        color: Colors.common.white,
    },
    inputSearchContainer: {
        position: "relative",
    },
    inputSearch: {
        height: IsHaveNotch ? verticalScale(35) : verticalScale(40),
        backgroundColor: Colors.common.white,
        color: Colors.common.black,
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
