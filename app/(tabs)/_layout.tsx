import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import useUser from "@/hooks/fetch/useUser";
import { fontSizes, IsAndroid, IsIOS, IsIPAD } from "@/themes/app.constant";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

// Định nghĩa các tab và icon tương ứng
const TAB_CONFIG = {
    index: {
        icon: "home" as const,
        IconComponent: Feather,
        title: "",
        showHeader: false,
    },
    "courses/index": {
        icon: "book-open" as const,
        IconComponent: Feather,
        title: "Courses",
        showHeader: true,
    },
    "resources/index": {
        icon: "document-text-outline" as const,
        IconComponent: Ionicons,
        title: "Video Lessons",
        showHeader: true,
    },
    "profile/index": {
        icon: "person" as const,
        IconComponent: Octicons,
        title: "",
        showHeader: false,
    },
} as const;
// Constants cho styles
const BORDER_RADIUS = {
    borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(25) : scale(35),
    borderTopRightRadius: IsAndroid ? 0 : IsIPAD ? scale(25) : scale(35),
};

const BLUR_INTENSITY = {
    dark: IsAndroid ? 10 : 60,
    light: 100,
};

type TabRouteName = keyof typeof TAB_CONFIG;

// Component cho Tab Icon
const TabIcon = ({
    route,
    color,
}: {
    route: RouteProp<ParamListBase, string>;
    color: string;
}) => {
    const config = TAB_CONFIG[route.name as TabRouteName];
    if (!config) return null;
    const { icon, IconComponent } = config;

    return (
        <IconComponent
            name={icon as any}
            size={moderateScale(24)}
            style={{ width: IsIPAD ? scale(20) : "auto" }}
            color={color}
        />
    );
};

export default function _layout() {
    const { theme } = useTheme();
    const { loader } = useUser();
    const headerBackgroundComponent = () => (
        <BlurView
            style={{
                borderTopLeftRadius: scale(20),
                borderTopRightRadius: scale(20),
                overflow: "hidden",
                backgroundColor: "transparent",
            }}
            intensity={theme.dark ? 70 : 80}
        />
    );
    const tabBarBackgroundComponent = () => (
        <>
            {IsIOS && !theme.dark ? (
                <View
                    style={[
                        StyleSheet.absoluteFillObject,
                        styles.tabBarBackground,
                        {
                            backgroundColor: Colors.common.white,
                            ...BORDER_RADIUS,
                        },
                    ]}
                />
            ) : (
                <BlurView
                    intensity={
                        theme.dark ? BLUR_INTENSITY.dark : BLUR_INTENSITY.light
                    }
                    style={[
                        StyleSheet.absoluteFillObject,
                        styles.tabBarBackground,
                        {
                            ...BORDER_RADIUS,
                            backgroundColor: IsAndroid
                                ? theme.colors.background
                                : theme.colors.input,
                        },
                    ]}
                />
            )}
        </>
    );

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => (
                    <TabIcon route={route} color={color} />
                ),
                tabBarActiveTintColor: theme.colors.activeTab,
                tabBarInactiveTintColor: theme.colors.tabInactive,
                headerShown:
                    TAB_CONFIG[route.name as TabRouteName]?.showHeader ?? false,
                headerTitle:
                    TAB_CONFIG[route.name as TabRouteName]?.title ?? "",
                headerTitleStyle: [
                    styles.headerTitle,
                    {
                        color: theme.colors.text,
                    },
                ],
                headerBackgroundContainerStyle: [
                    styles.headerBackground,
                    {
                        backgroundColor: theme.colors.background,
                        shadowColor: theme.colors.text,
                    },
                ],
                headerBackground: headerBackgroundComponent,
                tabBarShowLabel: false,
                tabBarStyle: [
                    styles.tabBar,
                    {
                        position: IsIOS
                            ? theme.dark
                                ? "absolute"
                                : "static"
                            : "absolute",
                        opacity: loader ? 0 : 1,
                        transition: "opacity 0.3s ease-in-out",
                    },
                ],
                tabBarBackground: tabBarBackgroundComponent,
            })}
        >
            {Object.keys(TAB_CONFIG).map((name) => (
                <Tabs.Screen key={name} name={name} />
            ))}
        </Tabs>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: "center",
        width: scale(320),
        fontSize: fontSizes.FONT22,
        fontFamily: "Poppins_400Regular",
    },
    headerBackground: {
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        elevation: 1,
    },
    tabBar: {
        ...BORDER_RADIUS,
        borderTopWidth: 0,
        height: verticalScale(55),
    },
    tabBarBackground: {
        overflow: "hidden",
    },
});
