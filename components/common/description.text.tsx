import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import { StyleSheet, Text, View } from "react-native";

const DescriptionText = () => {
    const { theme } = useTheme();
    return (
        <View style={styles.descriptionContainer}>
            <View style={styles.indicatorCircle} />
            <Text
                style={[styles.descriptionText, { color: theme.colors.text }]}
            >
                Our comprehensive project-based courses
            </Text>
        </View>
    );
};
export default DescriptionText;
const styles = StyleSheet.create({
    descriptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: windowHeight(5),
    },
    indicatorCircle: {
        backgroundColor: Colors.common.green,
        width: windowWidth(15),
        height: windowWidth(15),
        borderRadius: 100,
    },
    descriptionText: {
        fontFamily: "Poppins_400Regular",
        fontSize: fontSizes.FONT18,
        paddingLeft: windowWidth(5),
    },
});
