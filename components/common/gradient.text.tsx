import { Text } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

const GradientText = ({ text, styles }: { text: string; styles: any }) => {
    return (
        <MaskedView
            maskElement={
                <Text
                    style={[
                        styles,
                        {
                            backgroundColor: "transparent",
                        },
                    ]}
                >
                    {text}
                </Text>
            }
        >
            <LinearGradient
                colors={Colors.gradient.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={[styles, { opacity: 0 }]}>{text}</Text>
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;
