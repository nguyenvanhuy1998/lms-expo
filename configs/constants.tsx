import { Dimensions, Image } from "react-native";
import One from "@/assets/images/onboarding/1.png";
import Two from "@/assets/images/onboarding/2.png";
import Three from "@/assets/images/onboarding/3.png";

import { IsIPAD } from "@/themes/app.constant";
import { verticalScale } from "react-native-size-matters";

export const onBoardingSlides: onBoardingSlidesTypes[] = [
    {
        color: "#40E0D0",
        title: "Explore",
        image: (
            <Image
                source={One}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }}
            />
        ),
        secondTitle: "Our Community",
        subTitle:
            "Find the perfect course to enhance your career prospects and skill set",
    },
    {
        color: "#A7F893",
        title: "Set Your",
        image: (
            <Image
                source={Two}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }}
            />
        ),
        secondTitle: "Own Goal",
        subTitle:
            "Personalize your study plan with flexible timelines that suit you best",
    },
    {
        color: "#FFC0CB",
        title: "Complete full",
        image: (
            <Image
                source={Three}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }}
            />
        ),
        secondTitle: "Course",
        subTitle:
            "Achieve certification by completing courses with dedicated effort",
    },
];
// onboarding variables
export enum Side {
    LEFT,
    RIGHT,
    NONE,
}
export const MIN_LEDGE = 25;
export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];
