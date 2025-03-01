import { bannerData } from "@/configs/constants";
import { Colors } from "@/constants/colors";
import { IsIPAD } from "@/themes/app.constant";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Swiper from "react-native-swiper";
const HomeBanner = () => {
    const handlePress = async (url: string) => {
        await WebBrowser.openBrowserAsync(url);
    };
    return (
        <View style={styles.container}>
            <Swiper
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                autoplay
                autoplayTimeout={5}
                style={styles.swiperContainer}
            >
                {bannerData.map((item, index: number) => (
                    <Pressable
                        key={index}
                        style={styles.slide}
                        onPress={() => handlePress(item.url)}
                    >
                        <Image
                            source={{ uri: item.image }}
                            alt=""
                            style={styles.image}
                        />
                    </Pressable>
                ))}
            </Swiper>
        </View>
    );
};

export default HomeBanner;

const styles = StyleSheet.create({
    container: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: verticalScale(7),
    },
    swiperContainer: {
        height: IsIPAD ? moderateScale(240) : moderateScale(230),
    },
    dot: {
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        backgroundColor: Colors.common.placeholderGray,
        marginHorizontal: verticalScale(3),
    },
    activeDot: {
        width: scale(8),
        height: scale(8),
        borderRadius: scale(4),
        marginHorizontal: verticalScale(3),
        backgroundColor: Colors.common.blue,
    },

    slide: {
        flex: 1,
        marginHorizontal: scale(10),
    },
    image: {
        height: IsIPAD ? moderateScale(200) : moderateScale(185),
        resizeMode: "cover",
        borderRadius: scale(5),
    },
});
