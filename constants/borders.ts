import { scale } from "react-native-size-matters";

export const borders = {
    radius: {
        none: 0,
        sm: scale(4),
        md: scale(8),
        lg: scale(12),
        xl: scale(16),
        full: 9999,
    },
    width: {
        thin: scale(1),
        medium: scale(2),
        thick: scale(4),
    },
};
