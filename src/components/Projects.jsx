import { setLastActiveProject, updateState } from "../utils/utils"

export default function Projects({ setProjectName, projects, setTabs, setCurrentTab, newProject }) {

    function openProject(project) {
        setProjectName(project.projectName)
        setLastActiveProject(project.projectId)

        const tabs = JSON.parse(project.state)
        
        const newState = {
            lastActiveTab: tabs[0]?.tabId,
            tabs
        }

        updateState(() => {
            setTabs(tabs)
            setCurrentTab(newState.lastActiveTab)
            return newState
        })
    }

    return (
        <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg my-2 px-4 py-2 w-fit dark:bg-lightblack bg-white">
            <div className="flex flex-col font-medium text-md gap-2 p-3">
                <button onClick={newProject} className="w-full px-5 text-base border-2 border-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:text-gray-200 dark:border-gray-200 duration-200 dark:hover:bg-gray-200 dark:hover:text-gray-800 rounded-lg font-semibold mb-3 py-[0.15rem]">New</button>
                {projects.map((item) => <button key={item.projectId} onClick={() => openProject(item)} className="dark:hover:text-white hover:text-black text-gray-800 dark:text-gray-300 duration-150 px-2 rounded-md">{item.projectName}</button>)}
            </div>
        </div>
    )
}