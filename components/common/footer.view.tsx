import { useTheme } from "@/context/theme.context";
import React from "react";
import { View } from "react-native";
import { verticalScale } from "react-native-size-matters";

const FooterView = () => {
    const { theme } = useTheme();
    return (
        <View
            style={{
                height: theme.dark ? verticalScale(60) : verticalScale(10),
            }}
        />
    );
};

export default FooterView;
