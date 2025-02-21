import { LogBox, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ThemeProvider } from "@/context/theme.context";
import { SplashScreen, Stack } from "expo-router";
import {
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Poppins_600SemiBold,
        Poppins_300Light,
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_500Medium,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);
    if (!loaded && !error) {
        return null;
    }

    return (
        <ThemeProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(routes)/onboarding/index" />
            </Stack>
        </ThemeProvider>
    );
}
