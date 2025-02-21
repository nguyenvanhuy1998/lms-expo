import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";

const AuthModal = () => {
    const googleSignIn = () => {};
    const handleGithubLogin = () => {};
    return (
        <BlurView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Pressable
                style={{
                    width: windowWidth(420),
                    height: windowHeight(250),
                    backgroundColor: "white",
                    marginHorizontal: windowWidth(50),
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: fontSizes.FONT35,
                        fontFamily: "Poppins_700Bold",
                    }}
                >
                    Join to Becodemy
                </Text>
                <Text
                    style={{
                        fontSize: fontSizes.FONT17,
                        fontFamily: "Poppins_300Light",
                        paddingTop: windowHeight(5),
                    }}
                >
                    It's easier than your imagination!
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: windowHeight(10),
                        gap: windowWidth(20),
                    }}
                >
                    <Pressable onPress={googleSignIn}>
                        <Image
                            source={require("@/assets/images/onboarding/google.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowWidth(40),
                                resizeMode: "contain",
                            }}
                        />
                    </Pressable>
                    <Pressable onPress={() => handleGithubLogin()}>
                        <Image
                            source={require("@/assets/images/onboarding/github.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowWidth(40),
                                resizeMode: "contain",
                            }}
                        />
                    </Pressable>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/onboarding/apple.png")}
                            style={{
                                width: windowWidth(40),
                                height: windowWidth(40),
                                resizeMode: "contain",
                            }}
                        />
                    </Pressable>
                </View>
            </Pressable>
        </BlurView>
    );
};

export default AuthModal;

const styles = StyleSheet.create({});
