import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, ColorTheme } from "@/constants/colors";

const ThemeContext = createContext({
    theme: {
        dark: false,
        colors: Colors.light as ColorTheme,
    },
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState({
        dark: systemColorScheme === "dark",
        colors: systemColorScheme === "dark" ? Colors.dark : Colors.light,
    });

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem("userTheme");
            if (savedTheme) {
                setTheme({
                    dark: savedTheme === "dark",
                    colors: savedTheme === "dark" ? Colors.dark : Colors.light,
                });
            } else {
                setTheme({
                    dark: systemColorScheme === "dark",
                    colors:
                        systemColorScheme === "dark"
                            ? Colors.dark
                            : Colors.light,
                });
            }
        };
        loadTheme();
    }, []);
    const toggleTheme = async () => {
        const newTheme = {
            dark: !theme.dark,
            colors: theme.dark ? Colors.light : Colors.dark,
        };
        setTheme(newTheme);
        await AsyncStorage.setItem(
            "userTheme",
            newTheme.dark ? "dark" : "light"
        );
    };
    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
