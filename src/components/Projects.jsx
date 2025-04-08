import { useEffect, useState } from "react"
import { getMyProjects } from "../api/projects"

export default function Projects({ setProj }) {

    const [projects, setProjects] = useState([{projectId: 0, projectName: "Untitled", isOwner:true}])

    useEffect(()=>{
        getMyProjects()
        .then(res=>{
            setProjects(res)
        })
        .catch(err => console.log(err))
    },[projects])

    return (
        <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg my-2 px-4 py-2 w-fit dark:bg-lightblack bg-white">
            <div className="flex flex-col font-medium text-sm">
                {projects.map((item) => <button key={item.projectId} onClick={()=>setProj(item.projectName)} className="dark:hover:text-white text-zinc-400 duration-150 hover:text-white px-2 rounded-md">{item.projectName}</button>)}
            </div>
        </div>
    )
}