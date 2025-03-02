import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontSizes } from "@/themes/app.constant";
import { Colors } from "@/constants/colors";
import { verticalScale } from "react-native-size-matters";

const EmptyText = ({ text }: { text: string }) => {
    return <Text style={styles.emptyText}>{text}</Text>;
};

export default EmptyText;

const styles = StyleSheet.create({
    emptyText: {
        textAlign: "center",
        fontSize: fontSizes.FONT18,
        marginTop: verticalScale(16),
        color: Colors.common.gray,
    },
});
