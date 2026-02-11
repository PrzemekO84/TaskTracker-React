import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
    theme: Theme;
    changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({children} : {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("uiTheme");
        if(savedTheme) return savedTheme as Theme;

        return "light";
    })

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(theme);
        localStorage.setItem("uiTheme", theme);
    }, [theme])

    const changeTheme = () => {
        console.log(theme);
        console.log("Theme changed");
        setTheme((prevTheme) => {
            if(prevTheme === "dark"){
                return "light"
            }
            return "dark"
        });
    }

    console.log(theme);

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const theme = useContext(ThemeContext);

    if(theme === undefined){
        throw new Error("useThemeContext must be used within ThemeProvider")
    }

    return theme;
}