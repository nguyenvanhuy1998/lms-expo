import CourseCard from "@/components/cards/course.card";
import DescriptionText from "@/components/common/description.text";
import EmptyText from "@/components/common/empty.text";
import FooterView from "@/components/common/footer.view";
import SectionHeader from "@/components/common/section.header";
import { Colors } from "@/constants/colors";
import { useTheme } from "@/context/theme.context";
import useGetCourses from "@/hooks/fetch/useGetCourses";
import { fontSizes } from "@/themes/app.constant";
import SkeltonLoader from "@/utils/skelton";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
const CoursesScreen = () => {
    const { theme } = useTheme();
    const { colors, dark } = theme;
    const { courses, loading } = useGetCourses();
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <StatusBar style={dark ? "light" : "dark"} />
            {loading ? (
                <>
                    <SkeltonLoader />
                    <SkeltonLoader />
                </>
            ) : (
                <FlatList
                    ListHeaderComponent={() => (
                        <View style={styles.sectionContainer}>
                            <SectionHeader
                                title="Popular"
                                gradientTitle="Courses"
                            />
                            <DescriptionText />
                        </View>
                    )}
                    data={courses}
                    contentContainerStyle={styles.coursesContainer}
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
    );
};

export default CoursesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coursesContainer: {
        paddingHorizontal: scale(16),
    },

    sectionContainer: {
        marginTop: verticalScale(24),
    },
    emptyText: {
        textAlign: "center",
        fontSize: fontSizes.FONT18,
        marginTop: verticalScale(20),
        color: Colors.common.gray,
    },
});
