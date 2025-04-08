export default function Collaborators({ setCollaborators }) {

    const collaborators = [{"username":"ananthu"},{"username":"kulli"},{"username":"unni"}]

    function newCollaborator(evt)
   {
        evt.preventDefault();
        const user = document.querySelector("#username").value;
   }

    return (
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="border-2 border-zinc-700 w-[25%] bg-zinc-900 h-[50%] rounded-xl flex flex-col py-7 px-4"> 
                <div className="flex justify-between w-full items-center mb-10">
                    <div></div>
                    <p className="text-xl justify-center flex">Collaborators</p>
                    <button onClick={()=>setCollaborators(false)} className="hover:text-rose-400 duration-150"><span className="material-symbols-outlined text-2xl px-2">close</span></button>
                </div>
                <div className="flex flex-col overflow-y-scroll items-center gap-5 ">
                    <form onSubmit={newCollaborator} className="flex gap-7 items-center text-zinc-400">
                        <input id="username"type="text" placeholder = "Enter the username" className="rounded-md bg-transparent border-zinc-600 border-2 text-sm px-3 py-2 outline-none"/>
                        <button onClick={newCollaborator} className="duration-75 font-semibold rounded-lg border-[1.5px] bg-zinc-200 text-zinc-950 border-zinc-400 px-4 py-1 hover:bg-zinc-50 hover:border-zinc-50">Add</button>
                    </form>
                </div>
                <div className="flex flex-col gap-3 py-7 px-6 mt-6">
                    {collaborators.map(item =>
                    <div className="flex justify-between px-4">
                        <p className="text-xl">{item.username}</p>
                        <span className="material-symbols-outlined text-zinc-600 flex items-center text-xl cursor-default hover:text-red-400 duration-200">person_remove</span>
                    </div>
                    )} 
                </div>
            </div>
        </div>
    )
}