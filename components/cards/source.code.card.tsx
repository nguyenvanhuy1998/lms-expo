import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "@/context/theme.context";
import {
    fontSizes,
    SCREEN_WIDTH,
    windowHeight,
    windowWidth,
} from "@/themes/app.constant";
import { Colors } from "@/constants/colors";

const SourceCodeCard = ({
    item,
}: {
    item: {
        url: string;
        thumbnail: string;
        title: string;
    };
}) => {
    const { theme } = useTheme();
    const { colors, dark } = theme;
    const handlePress = async () => {
        await WebBrowser.openBrowserAsync(item.url);
    };
    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <View
                style={[
                    styles.cardContainer,
                    {
                        backgroundColor: colors.card,
                    },
                ]}
            >
                <Image
                    source={{
                        uri: item.thumbnail,
                    }}
                    style={styles.image}
                />
                <View style={styles.cardContent}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: colors.titleCard,
                            },
                        ]}
                    >
                        {item.title}
                    </Text>
                </View>
                <View style={styles.cardFooter} />
            </View>
        </Pressable>
    );
};

export default SourceCodeCard;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: windowWidth(20),
        paddingVertical: windowHeight(7),
    },
    cardContainer: {
        borderRadius: windowWidth(10),
        shadowOpacity: 0.1,
        shadowColor: Colors.common.turquoise,
        shadowRadius: 5,
    },
    image: {
        width: SCREEN_WIDTH - 52,
        height: (SCREEN_WIDTH - 40) * 0.5625,
        alignSelf: "center",
        borderRadius: windowWidth(5),
    },
    cardContent: {
        paddingHorizontal: windowWidth(15),
        paddingBottom: windowHeight(5),
    },
    title: {
        paddingTop: windowHeight(5),
        fontFamily: "Poppins_400Regular",
        fontSize: fontSizes.FONT18,
    },
    cardFooter: {
        paddingVertical: windowHeight(5),
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
