import { useContext, useEffect } from "react"
import { ThemeContext } from "../context/ThemeContext"
import ThemeSelector from "./ThemeSelector"
import Popup from "./Popup"



export default function NavBar()
{
    const { theme } = useContext(ThemeContext)
    
    useEffect(() => {
            const theme = document.querySelector('#theme')
            theme.animate([ { transform: 'rotate(60deg)' }, { transform: 'rotate(0deg)' } ], { duration: 200, iterations: 1 })
        }, [theme])
    return(
        <div className="h-[7svh] flex justify-end p-3">
            <Popup title={<span id="theme" className="material-symbols-outlined dark:text-zinc-300 text-zinc-700 text-2xl">{ theme=='dark' ? 'dark_mode' : 'light_mode'}</span>}>
                <ThemeSelector/>
            </Popup>
        </div>
    )
}