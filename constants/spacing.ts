import { scale, verticalScale } from "react-native-size-matters";

export const spacing = {
    // Base spacing units
    base: scale(4),

    // Spacing scale
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    "2xl": scale(48),
    "3xl": scale(64),

    // Padding
    padding: {
        screen: scale(16),
        card: scale(16),
        button: {
            x: scale(16),
            y: verticalScale(12),
        },
    },

    // Margins
    margin: {
        screen: scale(16),
        section: scale(24),
        component: scale(16),
    },

    // Gap
    gap: {
        xs: scale(4),
        sm: scale(8),
        md: scale(16),
        lg: scale(24),
    },
};
