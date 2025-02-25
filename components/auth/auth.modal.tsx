import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { BlurView } from "expo-blur";
import {
    fontSizes,
    IsIOS,
    windowHeight,
    windowWidth,
} from "@/themes/app.constant";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface AuthModalProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SocialButtonProps {
    onPress?: () => void;
    imageSource: any;
    alt: string;
}

const SocialButton = ({ onPress, imageSource, alt }: SocialButtonProps) => (
    <Pressable onPress={onPress} style={styles.socialButton}>
        <Image
            source={imageSource}
            style={styles.socialIcon}
            accessibilityLabel={alt}
        />
    </Pressable>
);

const AuthModal = ({ setModalVisible }: AuthModalProps) => {
    const socialButtons = [
        {
            onPress: async () => {
                try {
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn();
                    console.log(userInfo);
                } catch (error) {
                    console.log(error);
                }
            },
            imageSource: require("@/assets/images/onboarding/google.png"),
            alt: "Sign in with Google",
        },
        {
            onPress: () => {
                /* handle Github login */
            },
            imageSource: require("@/assets/images/onboarding/github.png"),
            alt: "Sign in with Github",
        },
        {
            onPress: () => {
                /* handle Apple login */
            },
            imageSource: require("@/assets/images/onboarding/apple.png"),
            alt: "Sign in with Apple",
        },
    ];
    const configureGoogleSignIn = () => {
        if (IsIOS) {
            GoogleSignin.configure({
                iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
            });
        } else {
            GoogleSignin.configure({
                webClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY,
            });
        }
    };

    useEffect(() => {
        configureGoogleSignIn();
    }, []);
    return (
        <BlurView intensity={80} style={styles.container}>
            <Pressable style={styles.modalContent}>
                <Text style={styles.title}>Join to Becodemy</Text>
                <Text style={styles.subtitle}>
                    It's easier than your imagination!
                </Text>
                <View style={styles.socialButtonsContainer}>
                    {socialButtons.map((button, index) => (
                        <SocialButton key={index} {...button} />
                    ))}
                </View>
            </Pressable>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: windowWidth(420),
        height: windowHeight(250),
        backgroundColor: "white",
        marginHorizontal: windowWidth(50),
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: fontSizes.FONT35,
        fontFamily: "Poppins_700Bold",
        color: "#1A1A1A",
    },
    subtitle: {
        fontSize: fontSizes.FONT17,
        fontFamily: "Poppins_300Light",
        paddingTop: windowHeight(5),
        color: "#666666",
    },
    socialButtonsContainer: {
        flexDirection: "row",
        paddingVertical: windowHeight(10),
        gap: windowWidth(20),
    },
    socialButton: {
        padding: windowWidth(5),
    },
    socialIcon: {
        width: windowWidth(40),
        height: windowWidth(40),
        resizeMode: "contain",
    },
});

export default AuthModal;
