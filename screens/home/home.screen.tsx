import CourseCard from "@/components/cards/course.card";
import GradientText from "@/components/common/gradient.text";
import HomeBanner from "@/components/home/home.banner";
import WelcomeHeader from "@/components/home/welcome.header";
import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import useGetCourses from "@/hooks/fetch/useGetCourses";
import { fontSizes, windowHeight, windowWidth } from "@/themes/app.constant";
import SkeltonLoader from "@/utils/skelton";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

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

const HomeScreen = () => {
    const { theme } = useTheme();
    const { loading, courses } = useGetCourses();
    const isDarkMode = theme.dark;
    return (
        <LinearGradient
            colors={isDarkMode ? Colors.gradient.dark : Colors.gradient.light}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <WelcomeHeader />
            <View style={styles.content}>
                {loading ? (
                    <>
                        <SkeltonLoader />
                        <SkeltonLoader />
                    </>
                ) : (
                    <FlatList
                        ListHeaderComponent={() => (
                            <>
                                <HomeBanner />
                                <View style={styles.sectionContainer}>
                                    <SectionHeader
                                        title="Popular"
                                        gradientTitle="Courses"
                                    />
                                    <DescriptionText />
                                </View>
                            </>
                        )}
                        data={courses}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <CourseCard item={item} />}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>
                                No courses available yet!
                            </Text>
                        }
                        ListFooterComponent={
                            <View
                                style={{
                                    height: theme.dark
                                        ? verticalScale(60)
                                        : verticalScale(10),
                                }}
                            />
                        }
                    />
                )}
            </View>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    sectionContainer: {
        marginHorizontal: windowWidth(20),
        marginTop: verticalScale(-25),
    },
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
    emptyText: {
        textAlign: "center",
        fontSize: fontSizes.FONT18,
        marginTop: 20,
        color: Colors.common.gray,
    },
});
