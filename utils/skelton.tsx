import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";

export default function SkeltonLoader() {
    const { theme } = useTheme();
    const colorMode = theme.dark ? "dark" : "light";
    return (
        <MotiView
            transition={{
                type: "timing",
            }}
            style={[styles.container, styles.padded]}
            animate={{
                backgroundColor: theme.dark
                    ? Colors.common.transparent
                    : Colors.common.white,
            }}
        >
            <Skeleton
                colorMode={colorMode}
                height={windowHeight(160)}
                width={windowWidth(440)}
            />
            <Spacer />
            <View style={styles.row}>
                <Skeleton
                    colorMode={colorMode}
                    radius={"round"}
                    height={windowWidth(80)}
                    width={windowWidth(80)}
                />
                <SkeletonRow colorMode={colorMode} />
            </View>
        </MotiView>
    );
}
const SkeletonRow = ({ colorMode }: { colorMode: "dark" | "light" }) => (
    <View>
        <Skeleton
            width={windowWidth(338)}
            height={windowHeight(20)}
            colorMode={colorMode}
        />
        <Spacer />
        <Skeleton
            width={windowWidth(338)}
            height={windowHeight(20)}
            colorMode={colorMode}
        />
        <Spacer />
    </View>
);
const Spacer = ({ height = 16 }) => <View style={{ height }} />;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    padded: {
        padding: scale(14),
    },
    row: {
        flexDirection: "row",
        gap: windowWidth(15),
    },
});
