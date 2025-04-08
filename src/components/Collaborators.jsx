import { useContext, useEffect, useState } from "react";
import { addCollaborator, getCollaborators, removeCollaborator } from "../api/projects";
import AuthContext from "../context/AuthContext";

export default function Collaborators({ setShowCollaborators }) {

    const [collaborators, setCollaborators] = useState([])
	const { user } = useContext(AuthContext)

    useEffect(()=>{
        getCollabs();
    },[])

    function newCollaborator(evt)
    {
            evt.preventDefault();
            const username = document.querySelector("#username").value;
            const projectId = JSON.parse(localStorage.getItem("lastActiveProject"))
            console.log(projectId,username)
            addCollaborator(projectId, username)
            .then(res=>{
                setCollaborators((l)=> [...l,{username}])
            })
            .catch(err => console.log(err))
    }

    function deleteCollaborator(username)
    {
        const projectId = JSON.parse(localStorage.getItem("lastActiveProject"))
        removeCollaborator(projectId,username)
        .then(res=>{
            setCollaborators((l)=> l.filter((item)=>(item.username!=username)))
        })
        .catch(err => console.log(err))
    }

    function getCollabs()
    {
        const projectId = JSON.parse(localStorage.getItem("lastActiveProject"))
        getCollaborators(projectId)
        .then(res=>{
            setCollaborators(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="w-[400px] dark:bg-zinc-900 bg-white h-[60%] rounded-xl flex flex-col py-7 px-4"> 
                <div className="flex justify-between w-full items-center mb-10">
                    <div></div>
                    <p className="text-xl justify-center flex">Collaborators</p>
                    <button onClick={()=>setShowCollaborators(false)} className="hover:text-rose-400 duration-150"><span className="material-symbols-outlined text-2xl px-2">close</span></button>
                </div>
                <div className="flex flex-col items-center gap-5 ">
                    <form onSubmit={newCollaborator} className="flex gap-7 items-center text-zinc-400">
                        <input id="username"type="text" placeholder = "Enter the username" className="rounded-md bg-transparent text-black dark:text-white dark:border-zinc-600 border-zinc-400 border-2 text-sm px-3 py-2 outline-none"/>
                        <button onClick={newCollaborator} className="duration-75 font-semibold rounded-lg dark:bg-zinc-200 text-zinc-950 border-zinc-400 px-4 py-1 hover:bg-zinc-50 hover:border-zinc-50">Add</button>
                    </form>
                </div>
                <div className="flex flex-col gap-3 py-7 px-6 mt-6 overflow-y-scroll">
                    {collaborators.map((item,index) =>
                    <div key={index} className="flex justify-between px-4">
                        <p id="removeUsername" className="text-xl">{item.username}</p>
                        {item.username!=user.username && !item.is_owner && <button onClick={()=>deleteCollaborator(item.username)}><span className="material-symbols-outlined text-zinc-600 flex items-center text-xl cursor-default hover:text-red-400 duration-200">person_remove</span></button>}
                        {item.is_owner && <p className="text-zinc-500 text-sm">Owner</p>}
                    </div>
                    )} 
                </div>
            </div>
        </div>
    )
}