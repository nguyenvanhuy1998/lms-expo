import CourseCard from "@/components/cards/course.card";
import DescriptionText from "@/components/common/description.text";
import EmptyText from "@/components/common/empty.text";
import FooterView from "@/components/common/footer.view";
import GradientText from "@/components/common/gradient.text";
import SectionHeader from "@/components/common/section.header";
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
                            <EmptyText text="No courses available yet!" />
                        }
                        ListFooterComponent={<FooterView />}
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
});
