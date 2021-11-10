import React, { createContext } from "react";
import FadeIn from "./Components/FadeIn";
import Header from "./Components/Header";
import { useDarkMode } from "./hooks/useDarkMode";
import DarkModeToggle from "./Components/DarkModeToggle";
import { GlobalStyle } from "./global-style";
import { darkTheme, lightTheme, Theme } from "./theme";
import Main from "./Components/Main";
import Footer from "./Components/Footer";

interface ContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
    theme: lightTheme,
    toggleTheme: () => {
        return null;
    }
})

export default function App() {
    const { theme, toggleTheme } = useDarkMode();

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <>
                <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
                <DarkModeToggle />
                <Header />
                <FadeIn delay={300}>
                    <Main />
                </FadeIn>
                <Footer />
            </>
        </ThemeContext.Provider>
    )
}