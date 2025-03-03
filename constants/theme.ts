import { Dimensions, DimensionValue, PixelRatio, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const IsIOS = Platform.OS === "ios";
export const IsAndroid = Platform.OS === "android";
export const IsIPAD = IsIOS && SCREEN_HEIGHT / SCREEN_WIDTH < 1.6;

export const IsHaveNotch = IsIOS && SCREEN_HEIGHT > 750;
export const hasNotch = Platform.OS === "ios" && getStatusBarHeight() > 20;

export const Isiphone12promax = IsIOS && SCREEN_HEIGHT > 2778;

export const windowHeight = (height: DimensionValue): number => {
    if (!height) {
        return 0;
    }
    let tempHeight = SCREEN_HEIGHT * (parseFloat(height.toString()) / 667);
    return PixelRatio.roundToNearestPixel(tempHeight);
};

export const windowWidth = (width: DimensionValue): number => {
    if (!width) {
        return 0;
    }
    let tempWidth = SCREEN_WIDTH * (parseFloat(width.toString()) / 480);
    return PixelRatio.roundToNearestPixel(tempWidth);
};
