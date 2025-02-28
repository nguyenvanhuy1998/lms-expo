import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { IsAndroid, IsHaveNotch, IsIPAD } from "@/themes/app.constant";
import { scale, verticalScale } from "react-native-size-matters";
import { useTheme } from "@/context/theme.context";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOn, setIsOn] = useState(theme.dark ? false : true);
    const [animatedValue] = useState(new Animated.Value(theme.dark ? 0 : 1));
    const toggleSwitch = () => {
        Animated.timing(animatedValue, {
            toValue: isOn ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            toggleTheme();
        });
        setIsOn(!isOn);
    };
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, scale(19)],
    });

    return (
        <TouchableOpacity
            onPress={toggleSwitch}
            style={styles.switcherContainer}
        >
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            />
        </TouchableOpacity>
    );
};

export default ThemeSwitcher;

const styles = StyleSheet.create({
    switcherContainer: {
        backgroundColor: "#D9D9D9",
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
    circle: {
        width: IsAndroid ? scale(20) : scale(18),
        height: IsAndroid ? scale(20) : scale(18),
        borderRadius: scale(11),
        backgroundColor: "#6D55FE",
    },
});
