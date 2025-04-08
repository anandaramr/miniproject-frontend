import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import ThemeSelector from "./ThemeSelector"
import Popup from "./Popup"
import AuthContext from "../context/AuthContext"
import Projects from "./Projects"
import { convertToOpenAPI, getCurrentProject } from "../utils/utils"

export default function NavBar({ setLogin, projects, setTabs, setProjects, setCurrentTab, saveProject, newProject, setCollaborators, setRenameProject, setDeleteProject }) {

    const { theme } = useContext(ThemeContext)
    const { user, logout, isLoading } = useContext(AuthContext)
    const [ showProfile ,setShowProfile ] = useState(false)
    const [ projectName, setProjectName ] = useState()

    useEffect(() => {
        const currentProject = getCurrentProject(projects)
        if (!currentProject) return;
        setProjectName(currentProject?.projectName || "Untitled")
    }, [projects])
    
    useEffect(() => {
        const theme = document.querySelector('#theme')
        theme.animate([ { transform: 'rotate(60deg)' }, { transform: 'rotate(0deg)' } ], { duration: 200, iterations: 1 })
    }, [theme])

    function logoutUser() {
        setTabs([])
        setShowProfile(false)
        setProjects([])
        setProjectName("Untitled")

        localStorage.removeItem("state")
        localStorage.removeItem("lastActiveProject")
        logout()
    }

    function exportProject() {
        const type = 'application/json'
        const tabs = JSON.parse(localStorage.getItem("state")).tabs
        const downloadData = new Blob([convertToOpenAPI(tabs)], { type });
        const url = URL.createObjectURL(downloadData);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${projectName}.json`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

   return (
        <div className="h-[7svh] flex justify-between py-9 gap-6 items-center px-2 dark:text-zinc-400">
            {user && <div className="flex gap-5 items-center">
                <Popup collapsible title={<div className="flex items-center justify-center gap-1 px-3"><div className="dark:text-zinc-400 duration-150 hover:text-zinc-200 text-zinc-700 text-xl">{projectName}</div><span className="material-symbols-outlined">keyboard_arrow_down</span></div>}>
                    <Projects projects={projects} setProjectName={setProjectName} setTabs={setTabs} setCurrentTab={setCurrentTab} newProject={newProject} />
                </Popup>

                <button onClick={saveProject} className="dark:hover:text-zinc-200 dark:text-zinc-400"><span className="material-symbols-outlined text-2xl">save</span></button>
                <span onClick={() => setCollaborators(true)} className="material-symbols-outlined dark:text-zinc-400 flex text-2xl dark:hover:text-zinc-200 cursor-pointer">settings</span>

                {/* <Popup collapsible title={<span className="material-symbols-outlined dark:text-zinc-400 flex text-2xl dark:hover:text-zinc-200">settings</span>}>
                    <div className="dark:text-zinc-400 mt-2 px-3 flex flex-col gap-4 items-center w-40 dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg py-5 dark:bg-lightblack bg-white z-50 absolute text-base">
                        <button onClick={()=>setCollaborators(true)} className="dark:hover:text-white duration-150">Collaborators</button>
                        <button onClick={()=>setRenameProject(true)} className="dark:hover:text-white duration-150">Rename Project</button>
                    </div>
                </Popup> */}

                <button onClick={exportProject}><span className="material-symbols-outlined text-2xl dark:hover:text-zinc-200 dark:text-zinc-400">file_export</span></button>
            </div>}

            {!user && <div></div> }

            <div className="flex gap-6 items-center select-none">
                {user && <div className="text-lg">Hello, {user.username}</div>}
                {!isLoading && !user && <button onClick={()=>setLogin(true)} className="font-semibold px-3 py-4 flex items-center text-lg hover:text-zinc-400 duration-150">Login</button>}
                {!isLoading && user && <div className="flex flex-col items-center">
                    <div onClick={()=>setShowProfile(!showProfile)} className="dark:hover:text-white hover: dark:hover:border-white duration-150 rounded-full border-2 dark:border-zinc-400 border-gray-800 text-xl h-9 w-9 flex items-center justify-center cursor-pointer">{user?.username[0].toUpperCase()}</div>
                    {showProfile && <div className="mt-12 px-3 dark:border-zinc-700 border-zinc-400 shadow-md border-[1px] rounded-lg py-3 w-fit dark:bg-lightblack bg-slate-200 z-50 absolute">
                       <button onClick={logoutUser} className="hover:text-rose-400 duration-150 flex items-center gap-2"><span className="material-symbols-outlined">logout</span><p>Logout</p></button> 
                    </div>}
                </div>}
                <Popup title={<span id="theme" className="material-symbols-outlined dark:text-zinc-400 text-zinc-700 hover:text-black text-2xl dark:hover:text-zinc-200">{ theme=='dark' ? 'dark_mode' : 'light_mode'}</span>}>
                    <ThemeSelector/>
                </Popup>
            </div>
        </div>
    )
}