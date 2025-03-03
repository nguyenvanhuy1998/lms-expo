import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import useUser from "@/hooks/fetch/useUser";
import { fontSizes } from "@/themes/app.constant";
import {
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import * as WebBrowser from "expo-web-browser";

// Component OptionItem (tách ra để tái sử dụng)
const OptionItem = ({
    icon,
    title,
    description,
    onPress,
    isDarkMode,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onPress: () => void;
    isDarkMode: boolean;
}) => {
    const { theme } = useTheme();
    return (
        <Pressable onPress={onPress} style={styles.option}>
            <View style={styles.optionRow}>
                <View style={styles.optionIcon}>{icon}</View>
                <View>
                    <Text
                        style={[
                            styles.optionTitle,
                            { color: theme.colors.text },
                        ]}
                    >
                        {title}
                    </Text>
                    <Text
                        style={[
                            styles.optionDescription,
                            { color: theme.colors.text },
                        ]}
                    >
                        {description}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};
const ProfileOptions = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const { user } = useUser();
    const { theme } = useTheme();
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        router.push("/(routes)/onboarding");
    };
    // Danh sách các lựa chọn
    const options = [
        {
            title: "Enrolled Courses",
            description: "Explore your all enrolled courses",
            icon: (
                <Feather
                    name="book-open"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () =>
                router.push({
                    pathname: "/(routes)/enrolled-courses",
                    params: { courses: JSON.stringify(user?.orders) },
                }),
        },
        {
            title: "Course Leaderboard",
            description: "Let's see your position in Leaderboard",
            icon: (
                <MaterialIcons
                    name="leaderboard"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () => {},
        },
        {
            title: "My Tickets",
            description: "Explore your all support tickets",
            icon: (
                <MaterialCommunityIcons
                    name="message-alert-outline"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () => router.push("/(routes)/my-tickets"),
        },
        {
            title: "Support Center",
            description: "Explore our fastest support center",
            icon: (
                <FontAwesome
                    name="support"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () => router.push("/(routes)/support-center"),
        },
        {
            title: "Notifications",
            description: "Explore the important notifications",
            icon: (
                <Ionicons
                    name="notifications"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () => router.push("/(routes)/notification"),
        },
        {
            title: "Settings",
            description: "Control the app as per your preferences",
            icon: (
                <Ionicons
                    name="settings-sharp"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () => router.push("/(routes)/settings"),
        },
        {
            title: "Privacy & Policy",
            description: "Explore our privacy and policy",
            icon: (
                <MaterialIcons
                    name="policy"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: async () => {
                await WebBrowser.openBrowserAsync(
                    "https://www.becodemy.com/privacy-policy"
                );
            },
        },
        {
            title: "Log Out",
            description: "Logging out from your account",
            icon: (
                <MaterialIcons
                    name="logout"
                    size={scale(21)}
                    color={theme.colors.icon}
                />
            ),
            onPress: () => handleLogout(),
        },
    ];

    return (
        <FlatList
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
            data={options}
            contentContainerStyle={[
                styles.container,
                {
                    paddingBottom: isDarkMode
                        ? verticalScale(80)
                        : verticalScale(20),
                },
            ]}
            renderItem={({ item }) => (
                <OptionItem {...item} isDarkMode={isDarkMode} />
            )}
        />
    );
};

export default ProfileOptions;

const styles = StyleSheet.create({
    container: {
        padding: scale(20),
        gap: scale(20),
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionIcon: {
        width: scale(38),
        height: scale(38),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: scale(10),
        borderWidth: 1,
        borderColor: Colors.common.lavenderMist,
    },
    optionTitle: {
        marginLeft: scale(10),
        fontSize: fontSizes.FONT22,
        fontFamily: "Poppins_400Regular",
    },
    optionDescription: {
        marginLeft: scale(10),
        fontSize: fontSizes.FONT15,
        fontFamily: "Poppins_400Regular",
        opacity: 0.6,
    },
});
