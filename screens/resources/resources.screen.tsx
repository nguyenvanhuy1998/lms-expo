import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/context/theme.context";
import { videoLessonsData } from "@/configs/constants";
import SourceCodeCard from "@/components/cards/source.code.card";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { verticalScale } from "react-native-size-matters";
const ResourcesScreen = () => {
    const { theme } = useTheme();
    const { colors, dark } = theme;
    const bottomTabBarHeight = useBottomTabBarHeight();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <View
                style={{
                    paddingBottom: bottomTabBarHeight - 20,
                }}
            >
                <FlatList
                    data={videoLessonsData}
                    renderItem={({ item }) => <SourceCodeCard item={item} />}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                />
            </View>
        </View>
    );
};

export default ResourcesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        paddingTop: verticalScale(10),
    },
});
