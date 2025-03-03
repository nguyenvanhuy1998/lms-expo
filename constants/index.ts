export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./shadows";
export * from "./borders";
export * from "./theme";
import { palette, lightTheme, darkTheme } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { shadows } from "./shadows";
import { borders } from "./borders";

export const theme = {
    light: {
        ...lightTheme,
        typography,
        spacing,
        shadows: shadows.light,
        borders,
    },
    dark: {
        ...darkTheme,
        typography,
        spacing,
        shadows: shadows.dark,
        borders,
    },
};

export type Theme = typeof theme.light;
