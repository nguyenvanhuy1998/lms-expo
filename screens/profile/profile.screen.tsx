import ProfileHeader from "@/components/profile/profile.header";
import ProfileInfo from "@/components/profile/profile.info";
import ProfileOptions from "@/components/profile/profile.options";
import ProfileStats from "@/components/profile/profile.stats";
import { useTheme } from "@/context/theme.context";
import useUser from "@/hooks/fetch/useUser";
import useUserData from "@/hooks/useUserData";
import { IsAndroid, IsHaveNotch, IsIPAD } from "@/themes/app.constant";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const ProfileScreen = () => {
    const { theme } = useTheme();
    const { avatar, name, email } = useUserData();
    const { user } = useUser();
    const isDarkMode = theme.dark;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background,
                },
            ]}
        >
            <ProfileHeader isDarkMode={isDarkMode} />
            <View
                style={[
                    styles.profileContainer,
                    {
                        backgroundColor: theme.colors.background,
                        shadowOpacity: isDarkMode ? 0.12 : 0.25,
                    },
                ]}
            >
                <ProfileInfo
                    isDarkMode={isDarkMode}
                    avatar={avatar}
                    name={name}
                    email={email}
                />
                <ProfileStats enrolledCount={user?.orders?.length || 0} />
            </View>
            <ProfileOptions isDarkMode={isDarkMode} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    profileContainer: {
        width: scale(320),
        height: IsAndroid
            ? verticalScale(155)
            : !IsHaveNotch
            ? verticalScale(175)
            : IsIPAD
            ? verticalScale(185)
            : verticalScale(155),
        marginTop: verticalScale(-80),
        alignSelf: "center",
        borderRadius: scale(20),
        padding: scale(15),
        zIndex: 10,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
