import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/themes/app.constant";

// Component hiển thị Thống kê (Enrolled - Certificates)
const ProfileStats = ({ enrolledCount }: { enrolledCount: number }) => (
    <View style={styles.statsContainer}>
        <StatBox
            value={enrolledCount}
            label="Enrolled"
            colors={["#01CED3", "#0185F7"]}
        />
        <StatBox
            value={0}
            label="Certificates"
            colors={["#BF6FF8", "#3C1BE9"]}
        />
    </View>
);
// Component từng box thống kê
const StatBox = ({
    value,
    label,
    colors,
}: {
    value: number;
    label: string;
    colors: [string, string];
}) => (
    <LinearGradient
        style={styles.statBox}
        colors={colors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
    >
        <Text style={styles.statNumber}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </LinearGradient>
);

export default ProfileStats;

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: verticalScale(10),
    },
    statBox: {
        alignItems: "center",
        justifyContent: "center",
        width: scale(120),
        height: verticalScale(62),
        borderRadius: scale(10),
        color: "#fff",
    },
    statNumber: {
        fontSize: fontSizes.FONT25,
        fontFamily: "Poppins_700Bold",
        color: "#fff",
    },
    statLabel: {
        fontSize: fontSizes.FONT20,
        fontFamily: "Poppins_400Regular",
        color: "#fff",
    },
});
