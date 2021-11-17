import React, { createContext } from "react";
import Header from "./Components/Header";
import { useDarkMode } from "./hooks/useDarkMode";
import DarkModeToggle from "./Components/DarkModeToggle";
import { GlobalStyle } from "./global-style";
import { darkTheme, lightTheme, Theme } from "./theme";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Data from "./Data/Data";

export interface CurrentThemeProps {
    currentTheme: Theme;
}

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
        <>
            <BrowserRouter>
                <ThemeContext.Provider value={{ theme, toggleTheme }}>
                    <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
                    <DarkModeToggle />
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/data" element={<Data />} />
                    </Routes>
                    <Footer />
                </ThemeContext.Provider>
            </BrowserRouter>
        </>
    )
}