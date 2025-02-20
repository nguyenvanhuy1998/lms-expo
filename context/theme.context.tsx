import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your custom themes
const LightTheme = {
    dark: false,
    colors: {
        background: "#fff",
        text: "#000",
    },
};

const DarkTheme = {
    dark: true,
    colors: {
        background: "#000",
        text: "#fff",
    },
};

const ThemeContext = createContext({
    theme: LightTheme,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: any) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState(
        systemColorScheme === "dark" ? DarkTheme : LightTheme
    );

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem("userTheme");
            if (savedTheme) {
                setTheme(savedTheme === "dark" ? DarkTheme : LightTheme);
            } else {
                setTheme(systemColorScheme === "dark" ? DarkTheme : LightTheme);
            }
        };
        loadTheme();
    }, []);
    const toggleTheme = async () => {
        const newTheme = theme === DarkTheme ? LightTheme : DarkTheme;
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
