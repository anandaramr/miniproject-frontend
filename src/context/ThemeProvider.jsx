import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider ({ children }) {

    const [ theme, setTheme ] = useState()

    useEffect(() => {
        const theme = getTheme()

        if(theme=='system') {
            setToSystemTheme()
        } else {
            setTheme(theme)
        }
    })

    function changeTheme (newTheme) {
        if (newTheme=="system") {
            localStorage.removeItem("theme")
            setToSystemTheme()    
        } else {
            localStorage.setItem("theme", newTheme)
            if (newTheme=='dark') {
                document.documentElement.classList.add('dark');
                setTheme('dark')
            }
            else {
                document.documentElement.classList.remove('dark');
                setTheme('light')
            }
        }
    }

    function getTheme() {
        if (!('theme' in localStorage)) {
            return 'system'
        } else if (localStorage.getItem('theme')=='dark') {
            return 'dark'
        } else {
            return 'light'
        }
    }
    
    function setToSystemTheme () {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        }
    }

    const data = { theme, changeTheme, getTheme }
    
    return (
        <ThemeContext.Provider value={data}>
            {children}
        </ThemeContext.Provider>
    )
}