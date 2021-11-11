import { useEffect, useState } from "react"
import { darkTheme, lightTheme, Theme } from "../theme"

export const useDarkMode = () => {
    const [theme, setTheme] = useState<Theme>(lightTheme);

    const setMode = (mode: Theme) => {
        mode === lightTheme
            ? window.localStorage.setItem('theme', 'light')
            : window.localStorage.setItem('theme', 'dark');
        setTheme(mode);
    }

    const toggleTheme = () => {
        if (theme === lightTheme) {
            document.body.className = "dark";
            setMode(darkTheme);
        } else {
            document.body.className = "light";
            setMode(lightTheme);
        }

        //theme === lightTheme ? {setMode(darkTheme)} : setMode(lightTheme);
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if (localTheme !== null) {
            if (localTheme === 'dark') {
                setTheme(darkTheme);
            }
            else {
                setTheme(lightTheme);
            }
        }
    }, []);

    return { theme, toggleTheme };
};