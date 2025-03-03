export const palette = {
    // Primary colors
    primary: {
        100: "#E6F3FF",
        200: "#BAD9FF",
        300: "#8DBFFF",
        400: "#61A5FF",
        500: "#347BFF", // Main primary color
        600: "#0052FF",
        700: "#003ECB",
        800: "#002B98",
        900: "#001865",
    },
    // Secondary colors
    secondary: {
        100: "#F3E6FF",
        200: "#D9BAFF",
        300: "#BF8DFF",
        400: "#A561FF",
        500: "#8B34FF", // Main secondary color
        600: "#7200FF",
        700: "#5800CB",
        800: "#3F0098",
        900: "#260065",
    },
    // Grayscale
    gray: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#EEEEEE",
        300: "#E0E0E0",
        400: "#BDBDBD",
        500: "#9E9E9E",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
    },
    // Semantic colors
    success: {
        light: "#4CAF50",
        main: "#2E7D32",
        dark: "#1B5E20",
    },
    error: {
        light: "#EF5350",
        main: "#D32F2F",
        dark: "#C62828",
    },
    warning: {
        light: "#FFB74D",
        main: "#F57C00",
        dark: "#E65100",
    },
    info: {
        light: "#4FC3F7",
        main: "#0288D1",
        dark: "#01579B",
    },
    // Common colors
    common: {
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
    },
};
export const lightTheme = {
    colors: {
        // Background colors
        background: {
            primary: palette.common.white,
            secondary: palette.gray[50],
            tertiary: palette.gray[100],
        },

        // Text colors
        text: {
            primary: palette.gray[900],
            secondary: palette.gray[700],
            disabled: palette.gray[500],
            inverse: palette.common.white,
        },

        // Border colors
        border: {
            primary: palette.gray[300],
            secondary: palette.gray[200],
        },

        // Component specific colors
        button: {
            primary: palette.primary[500],
            secondary: palette.secondary[500],
            disabled: palette.gray[300],
        },

        // Status colors
        status: {
            success: palette.success.main,
            error: palette.error.main,
            warning: palette.warning.main,
            info: palette.info.main,
        },
    },
};
export const darkTheme = {
    colors: {
        // Background colors
        background: {
            primary: palette.gray[900],
            secondary: palette.gray[800],
            tertiary: palette.gray[700],
        },

        // Text colors
        text: {
            primary: palette.common.white,
            secondary: palette.gray[300],
            disabled: palette.gray[500],
            inverse: palette.gray[900],
        },

        // Border colors
        border: {
            primary: palette.gray[700],
            secondary: palette.gray[600],
        },

        // Component specific colors
        button: {
            primary: palette.primary[500],
            secondary: palette.secondary[500],
            disabled: palette.gray[700],
        },

        // Status colors
        status: {
            success: palette.success.light,
            error: palette.error.light,
            warning: palette.warning.light,
            info: palette.info.light,
        },
    },
};
export type ColorTheme = typeof Colors.light & typeof Colors.dark;
