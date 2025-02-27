import {
    fontSizes,
    IsIOS,
    windowHeight,
    windowWidth,
} from "@/themes/app.constant";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { BlurView } from "expo-blur";
import JWT from "expo-jwt";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// ----- Interfaces -----
interface AuthModalProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SocialButtonProps {
    onPress: () => void;
    imageSource: any;
    alt: string;
}

// ----- Component: Social Button -----
const SocialButton = ({ onPress, imageSource, alt }: SocialButtonProps) => (
    <Pressable onPress={onPress} style={styles.socialButton}>
        <Image
            source={imageSource}
            style={styles.socialIcon}
            accessibilityLabel={alt}
        />
    </Pressable>
);

// ----- Component: Auth Modal -----
const AuthModal = ({ setModalVisible }: AuthModalProps) => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_API_KEY,
            iosClientId: IsIOS
                ? process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY
                : undefined,
        });
    }, []);
    // ----- GitHub Auth Config -----
    const githubAuthEndpoints = {
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
    };

    const [request] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
            scopes: ["identity"],
            redirectUri: makeRedirectUri({ scheme: "lmsexpo" }),
        },
        githubAuthEndpoints
    );
    // ----- Xử lý Sign In với Google -----
    const googleSignIn = useCallback(async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { name, email, photo } = userInfo.data?.user || {};
            if (name && email && photo) {
                await authHandler({ name, email, avatar: photo });
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    }, []);
    // ----- Xử lý Sign In với GitHub -----
    const githubSignIn = useCallback(async () => {
        try {
            const result = await WebBrowser.openAuthSessionAsync(request?.url!);
            if (result.type === "success" && result.url) {
                const code = new URLSearchParams(result.url.split("?")[1]).get(
                    "code"
                );
                if (code) fetchGitHubAccessToken(code);
            }
        } catch (error) {
            console.error("GitHub Sign-In Error:", error);
        }
    }, [request]);
    const fetchGitHubAccessToken = async (code: string) => {
        try {
            const tokenResponse = await fetch(
                "https://github.com/login/oauth/access_token",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`,
                }
            );
            const { access_token } = await tokenResponse.json();
            if (access_token) fetchGitHubUserInfo(access_token);
        } catch (error) {
            console.error("Error fetching GitHub token:", error);
        }
    };
    const fetchGitHubUserInfo = async (access_token: string) => {
        try {
            const userResponse = await fetch("https://api.github.com/user", {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            const { name, email, avatar_url } = await userResponse.json();
            if (name && email && avatar_url) {
                await authHandler({ name, email, avatar: avatar_url });
            }
        } catch (error) {
            console.error("Error fetching GitHub user data:", error);
        }
    };

    // ----- Lưu dữ liệu user vào SecureStore -----
    const authHandler = async ({
        name,
        email,
        avatar,
    }: {
        name: string;
        email: string;
        avatar: string;
    }) => {
        try {
            const token = JWT.encode(
                { name, email, avatar },
                process.env.EXPO_PUBLIC_JWT_SECRET_KEY!
            );
            const { data } = await axios.post(
                `${process.env.EXPO_PUBLIC_SERVER_URI}/login`,
                { signedToken: token }
            );

            await SecureStore.setItemAsync("accessToken", data.accessToken);
            await SecureStore.setItemAsync("name", name);
            await SecureStore.setItemAsync("email", email);
            await SecureStore.setItemAsync("avatar", avatar);

            setModalVisible(false);
            router.push("/(tabs)");
        } catch (error) {
            console.error("Error handling authentication:", error);
        }
    };

    // ----- Social Buttons Config -----
    const socialButtons = [
        {
            onPress: googleSignIn,
            imageSource: require("@/assets/images/onboarding/google.png"),
            alt: "Sign in with Google",
        },
        {
            onPress: githubSignIn,
            imageSource: require("@/assets/images/onboarding/github.png"),
            alt: "Sign in with Github",
        },
        {
            onPress: () => {}, // Apple Sign-In chưa xử lý
            imageSource: require("@/assets/images/onboarding/apple.png"),
            alt: "Sign in with Apple",
        },
    ];

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

// ----- Styles -----
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    modalContent: {
        width: windowWidth(420),
        height: windowHeight(250),
        backgroundColor: "white",
        marginHorizontal: windowWidth(50),
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
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
    socialButton: { padding: windowWidth(5) },
    socialIcon: {
        width: windowWidth(40),
        height: windowWidth(40),
        resizeMode: "contain",
    },
});

export default AuthModal;
