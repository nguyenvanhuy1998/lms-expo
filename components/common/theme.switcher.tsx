import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import { IsAndroid, IsHaveNotch, IsIPAD } from "@/themes/app.constant";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const animatedValue = useRef(
        new Animated.Value(theme.dark ? 0 : 1)
    ).current;

    useEffect(() => {
        // Cập nhật animation khi theme thay đổi
        Animated.timing(animatedValue, {
            toValue: theme.dark ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [theme.dark]);

    const toggleSwitch = () => {
        Animated.timing(animatedValue, {
            toValue: theme.dark ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            toggleTheme();
        });
    };

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, scale(19)],
    });
    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.common.black, Colors.common.white],
    });
    return (
        <Animated.View style={[styles.switcherContainer, { backgroundColor }]}>
            <TouchableOpacity onPress={toggleSwitch} style={styles.touchable}>
                <Animated.View
                    style={[
                        styles.circle,
                        {
                            backgroundColor: theme.colors.primary,
                            transform: [{ translateX }],
                        },
                    ]}
                />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default ThemeSwitcher;

const styles = StyleSheet.create({
    switcherContainer: {
        width: IsAndroid ? scale(44) : scale(42),
        height: !IsHaveNotch
            ? verticalScale(23)
            : IsIPAD
            ? verticalScale(28)
            : verticalScale(20),
        borderRadius: scale(13),
        padding: scale(2),
        justifyContent: "center",
    },
    touchable: {
        flex: 1,
        justifyContent: "center",
    },
    circle: {
        width: IsAndroid ? scale(20) : scale(18),
        height: IsAndroid ? scale(20) : scale(18),
        borderRadius: scale(11),
    },
});
