import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import useUser from "@/hooks/fetch/useUser";
import { Tabs } from "expo-router";

export default function _layout() {
    const { theme } = useTheme();
    const { loader, user } = useUser();
    console.log({ user });
    return (
        <Tabs>
            <Tabs.Screen name="index" />
        </Tabs>
    );
}

const styles = StyleSheet.create({});
