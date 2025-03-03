import { scale } from "react-native-size-matters";

export const typography = {
    // Font families
    fonts: {
        regular: "Poppins_400Regular",
        medium: "Poppins_500Medium",
        semiBold: "Poppins_600SemiBold",
        bold: "Poppins_700Bold",
    },
    // Font sizes
    sizes: {
        xs: scale(12),
        sm: scale(14),
        md: scale(16),
        lg: scale(18),
        xl: scale(20),
        "2xl": scale(24),
        "3xl": scale(30),
        "4xl": scale(36),
        "5xl": scale(48),
    },
    // Line heights
    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
    // Text variants
    variants: {
        h1: {
            fontSize: scale(30),
            fontFamily: "Poppins_700Bold",
            lineHeight: scale(36),
            letterSpacing: -0.5,
        },
        h2: {
            fontSize: scale(24),
            fontFamily: "Poppins_600SemiBold",
            lineHeight: scale(32),
            letterSpacing: -0.3,
        },
        h3: {
            fontSize: scale(20),
            fontFamily: "Poppins_600SemiBold",
            lineHeight: scale(28),
            letterSpacing: -0.2,
        },
        body1: {
            fontSize: scale(16),
            fontFamily: "Poppins_400Regular",
            lineHeight: scale(24),
        },
        body2: {
            fontSize: scale(14),
            fontFamily: "Poppins_400Regular",
            lineHeight: scale(20),
        },
        caption: {
            fontSize: scale(12),
            fontFamily: "Poppins_400Regular",
            lineHeight: scale(16),
        },
        button: {
            fontSize: scale(16),
            fontFamily: "Poppins_500Medium",
            lineHeight: scale(24),
            letterSpacing: 0.5,
        },
    },
};
