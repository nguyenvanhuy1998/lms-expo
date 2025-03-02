import { useTheme } from "@/context/theme.context";
import { StyleSheet, Text, View } from "react-native";
import GradientText from "./gradient.text";
import { fontSizes, windowHeight } from "@/themes/app.constant";
import { scale } from "react-native-size-matters";

const SectionHeader = ({
    title,
    gradientTitle,
}: {
    title: string;
    gradientTitle: string;
}) => {
    const { theme } = useTheme();

    return (
        <View style={styles.sectionHeaderContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {title}
            </Text>
            <GradientText text={gradientTitle} styles={styles.gradientTitle} />
        </View>
    );
};
export default SectionHeader;
const styles = StyleSheet.create({
    sectionHeaderContainer: {
        flexDirection: "row",
        marginTop: windowHeight(5),
    },
    sectionTitle: {
        fontSize: fontSizes.FONT35,
        fontFamily: "Poppins_500Medium",
    },
    gradientTitle: {
        fontSize: fontSizes.FONT35,
        fontFamily: "Poppins_500Medium",
        paddingLeft: scale(5),
    },
});
