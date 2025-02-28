import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/themes/app.constant";
import { useTheme } from "@/context/theme.context";
import { Colors } from "@/constants/colors";
// Component hiển thị Avatar + Thông tin cá nhân
const ProfileInfo = ({
    isDarkMode,
    avatar,
    name,
    email,
}: {
    isDarkMode: boolean;
    avatar: string;
    name: string;
    email: string;
}) => {
    const { theme } = useTheme();
    return (
        <View style={styles.profileHeader}>
            <Image
                source={{ uri: avatar || "https://placehold.co/50x50/png" }}
                style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
                <Text
                    style={[
                        styles.profileName,
                        {
                            color: theme.colors.text,
                        },
                    ]}
                >
                    {name}
                </Text>
                <Text style={styles.profileEmail}>{email}</Text>
            </View>
        </View>
    );
};

export default ProfileInfo;

const styles = StyleSheet.create({
    profileHeader: { flexDirection: "row" },
    profileImage: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        marginBottom: verticalScale(10),
    },
    profileInfo: {
        marginLeft: scale(10),
        marginBottom: verticalScale(10),
    },
    profileName: {
        fontSize: fontSizes.FONT22,
        fontFamily: "Poppins_500Medium",
    },
    profileEmail: {
        fontSize: fontSizes.FONT17,
        fontFamily: "Poppins_400Regular",
        color: Colors.common.gray,
        width: scale(230),
        overflow: "hidden",
    },
});
