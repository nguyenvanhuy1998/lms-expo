import SourceCodeCard from "@/components/cards/source.code.card";
import { videoLessonsData } from "@/configs/constants";
import { useTheme } from "@/context/theme.context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
            <StatusBar style={!dark ? "dark" : "light"} />

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
