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
import JWT from "expo-jwt";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

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
    // github auth start
    const githubAuthEndpoints = {
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
    };
    const [request, response] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
            clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
            scopes: ["identity"],
            redirectUri: makeRedirectUri({
                scheme: "lmsexpo",
            }),
        },
        githubAuthEndpoints
    );

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            await authHandler({
                name: userInfo.data?.user.name!,
                email: userInfo.data?.user.email!,
                avatar: userInfo.data?.user.photo!,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const githubSignIn = async () => {
        const result = await WebBrowser.openAuthSessionAsync(
            request?.url!,
            makeRedirectUri({
                scheme: "lmsexpo",
            })
        );
        if (result.type === "success" && result.url) {
            const urlParams = new URLSearchParams(result.url.split("?")[1]);
            const code: any = urlParams.get("code");
            fetchAccessToken(code);
        }
    };
    const fetchAccessToken = async (code: string) => {
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
        const tokenData = await tokenResponse.json();
        const access_token = tokenData.access_token;
        if (access_token) {
            fetchUserInfo(access_token);
        } else {
            console.error("Error fetching access token", tokenData);
        }
    };
    const fetchUserInfo = async (access_token: string) => {
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userData = await userResponse.json();
        console.log({ userData });
        await authHandler({
            name: userData.name!,
            email: userData.email!,
            avatar: userData.avatar_url!,
        });
    };

    const authHandler = async ({
        name,
        email,
        avatar,
    }: {
        name: string;
        email: string;
        avatar: string;
    }) => {
        const user = {
            name,
            email,
            avatar,
        };
        const token = JWT.encode(
            {
                ...user,
            },
            process.env.EXPO_PUBLIC_JWT_SECRET_KEY!
        );
        const res = await axios.post(
            `${process.env.EXPO_PUBLIC_SEVER_URI}/login`,
            {
                signedToken: token,
            }
        );
        await SecureStore.setItemAsync("accessToken", res.data.accessToken);
        await SecureStore.setItemAsync("name", name);
        await SecureStore.setItemAsync("email", email);
        await SecureStore.setItemAsync("avatar", avatar);
        setModalVisible(false);
        router.push("/(tabs)");
    };

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
            onPress: () => {
                /* handle Apple login */
            },
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
