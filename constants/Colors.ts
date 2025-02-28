export const Colors = {
    common: {
        gray: "#8A8A8A",
        white: "#fff",
        lavenderMist: "#E2DDFF",
    },
    light: {
        primary: "#6D55FE",
        secondary: "#8976FC",
        background: "#fff",
        text: "#000",
        surface: "#f5f5f5",
        border: "#E2DDFF",
        success: "#19C964",
        link: "#4A90E2",
        tabInactive: "#8e8e93",
        headerGradient: ["#75ABFC", "#0047AB"] as const,
        notification: "#004FAB",
        icon: "#0047AB",
    },
    dark: {
        primary: "#6D55FE",
        secondary: "#8976FC",
        background: "#101010",
        text: "#fff",
        surface: "#121121",
        border: "#3c43485c",
        success: "#19C964",
        link: "#0047AB",
        tabInactive: "#fff",
        headerGradient: ["#3c43485c", "#3c43485c", "#3c43485c"] as const,
        notification: "transparent",
        icon: "#fff",
    },
    gradient: {
        primary: ["#6D55FE", "#8976FC"] as const,
        secondary: ["#01CED3", "#0185F7"] as const,
        third: ["#BF6FF8", "#3C1BE9"] as const,
        dark: ["#180D41", "#2A2D32", "#131313"] as const,
        light: ["#fff", "#f7f7f7"] as const,
    },
};

export type ColorTheme = typeof Colors.light & typeof Colors.dark;
