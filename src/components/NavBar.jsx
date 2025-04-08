import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import ThemeSelector from "./ThemeSelector"
import Popup from "./Popup"
import AuthContext from "../context/AuthContext"
import Projects from "./Projects"

export default function NavBar({ setLogin }) {
    const { theme } = useContext(ThemeContext)
	const { user, logout, isLoading } = useContext(AuthContext)
    const [showProfile ,setShowProfile] = useState(false)
    const [proj ,setProj] = useState("Untitled")
    
    useEffect(() => {
            const theme = document.querySelector('#theme')
            theme.animate([ { transform: 'rotate(60deg)' }, { transform: 'rotate(0deg)' } ], { duration: 200, iterations: 1 })
        }, [theme])
    return(
        <div className="h-[7svh] flex justify-between py-9 gap-6 items-center px-2 text-zinc-400">
            <div className="flex gap-3 items-center">
                <Popup collapsible title={<div className="flex items-center justify-center gap-1 px-3"><div className="dark:text-zinc-400 duration-150 hover:text-zinc-200 text-zinc-700 text-xl">{proj}</div><span className="material-symbols-outlined">keyboard_arrow_down</span></div>}>
                    <Projects setProj = {setProj}/>
                </Popup>

                <button className="hover:text-zinc-200 text-zinc-400 px-3"><span className="material-symbols-outlined text-2xl">save</span></button>

                <Popup  collapsible title={<span className="material-symbols-outlined text-zinc-400 flex text-2xl hover:text-zinc-200">settings</span>}>
                    <div className="text-zinc-400 mt-2 px-3 flex flex-col gap-2 items-center w-40 dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg py-3 dark:bg-lightblack bg-slate-200 z-50 absolute text-sm">
                        <button className="hover:text-white duration-150">Add Collaborator</button>
                        <button className="hover:text-white duration-150">Delete Project</button>
                    </div>
                </Popup>
            </div>

            <div className="flex gap-6 items-center">
                {!isLoading && !user && <button onClick={()=>setLogin(true)} className="font-semibold px-3 py-4 flex items-center text-lg hover:text-zinc-400 duration-150">Login</button>}
                {!isLoading && user && <div className="flex flex-col items-center">
                    <div onClick={()=>setShowProfile(!showProfile)}className="hover:text-white hover:border-white duration-150 rounded-full border-[3.5px] border-zinc-400 text-xl h-9 w-9 flex items-center justify-center">{user?.username[0].toUpperCase()}</div>
                    {showProfile && <div className="mt-12 px-3 dark:border-zinc-700 border-zinc-400 shadow-md border-[1px] rounded-lg py-3 w-fit dark:bg-lightblack bg-slate-200 z-50 absolute">
                       <button onClick={logout} className="hover:text-rose-400 duration-150 flex items-center gap-2"><span className="material-symbols-outlined">logout</span><p>Logout</p></button> 
                    </div>}
                </div>}
                <Popup title={<span id="theme" className="material-symbols-outlined dark:text-zinc-400 text-zinc-700 text-2xl hover:text-zinc-200">{ theme=='dark' ? 'dark_mode' : 'light_mode'}</span>}>
                    <ThemeSelector/>
                </Popup>
            </div>
        </div>
    )
}