import { HEIGHT, WIDTH } from "@/configs/constants";
import {
    fontSizes,
    SCREEN_WIDTH,
    windowHeight,
    windowWidth,
} from "@/themes/app.constant";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useCallback, useState } from "react";
import {
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";
import AuthModal from "../auth/auth.modal";

interface SlideProps {
    slide: onBoardingSlidesTypes;
    index: number;
    setIndex: (value: number) => void;
    totalSlides: number;
}

const BackgroundGradient = memo(({ color }: { color: string }) => (
    <Svg style={StyleSheet.absoluteFill}>
        <Defs>
            <RadialGradient id="gradient" cx="50%" cy="35%">
                <Stop offset="0%" stopColor={color} />
                <Stop offset="100%" stopColor={color} />
            </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="url(#gradient)" />
    </Svg>
));

const SlideContent = memo(({ slide }: { slide: onBoardingSlidesTypes }) => (
    <View style={styles.container}>
        <View>{slide.image}</View>
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{slide.title}</Text>
                <Text style={styles.titleText}>{slide.secondTitle}</Text>
                <Text style={styles.subtitleText}>{slide.subTitle}</Text>
            </View>
        </View>
    </View>
));

const Indicators = memo(
    ({ index, totalSlides }: { index: number; totalSlides: number }) => (
        <View style={styles.indicatorContainer}>
            {Array.from({ length: totalSlides }).map((_, i) => (
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.indicator,
                        i === index && styles.activeIndicator,
                    ]}
                />
            ))}
        </View>
    )
);

const NextButton = memo(({ onPress }: { onPress: () => void }) => (
    <LinearGradient colors={["#6D55FE", "#8976FC"]} style={styles.nextButton}>
        <Pressable style={styles.nextButtonContent} onPress={onPress}>
            <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
    </LinearGradient>
));

const ArrowButton = memo(({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
        <Ionicons
            name="chevron-forward-outline"
            size={scale(18)}
            color="black"
        />
    </TouchableOpacity>
));

function Slide({ slide, index, setIndex, totalSlides }: SlideProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = useCallback(() => {
        if (index === 2) {
            setModalVisible(true);
        } else {
            setIndex(index + 1);
        }
    }, [index, setIndex]);

    const closeModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    return (
        <>
            <BackgroundGradient color={slide.color} />
            <SlideContent slide={slide} />
            <Indicators index={index} totalSlides={totalSlides} />

            {index <= totalSlides - 1 && <NextButton onPress={handlePress} />}
            {index < totalSlides - 1 && <ArrowButton onPress={handlePress} />}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <Pressable style={styles.modalOverlay} onPress={closeModal}>
                    <AuthModal setModalVisible={setModalVisible} />
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        padding: scale(60),
        paddingTop: verticalScale(100),
        alignItems: "center",
    },
    textContainer: {
        width: SCREEN_WIDTH,
        paddingHorizontal: verticalScale(25),
    },
    titleText: {
        fontSize: fontSizes.FONT30,
        fontWeight: "600",
        color: "#05030D",
        fontFamily: "Poppins_600SemiBold",
    },
    subtitleText: {
        paddingVertical: verticalScale(4),
        fontSize: fontSizes.FONT18,
        color: "#3E3B54",
        fontFamily: "Poppins_300Light",
    },
    indicatorContainer: {
        flexDirection: "row",
        marginTop: verticalScale(35),
        position: "absolute",
        bottom: verticalScale(55),
        left: scale(22),
    },
    indicator: {
        height: verticalScale(7),
        width: scale(18),
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        marginHorizontal: scale(4),
        borderRadius: scale(4),
    },
    activeIndicator: {
        height: verticalScale(7),
        width: scale(35),
        backgroundColor: "white",
    },
    nextButton: {
        position: "absolute",
        zIndex: 999999999,
        right: windowWidth(25),
        bottom: windowHeight(50),
        marginTop: windowHeight(30),
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth(140),
        height: windowHeight(37),
        borderRadius: windowWidth(20),
    },
    nextButtonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    nextButtonText: {
        color: "white",
        fontSize: fontSizes.FONT22,
        fontWeight: "bold",
    },
    arrowButton: {
        position: "absolute",
        width: scale(30),
        height: scale(30),
        borderRadius: scale(20),
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        right: moderateScale(5),
        top: Platform.OS === "ios" ? verticalScale(345) : verticalScale(385),
        transform: [{ translateY: -30 }],
    },
    modalOverlay: {
        flex: 1,
    },
});

export default memo(Slide);
