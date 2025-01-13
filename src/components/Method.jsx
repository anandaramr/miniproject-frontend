
export default function Method({ setMethod }) {

    return (
        <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg my-4 px-3 py-4 w-fit dark:bg-lightblack bg-white">
            <div className="flex flex-col font-medium">
                <button onClick={()=>setMethod("GET")} className="dark:hover:bg-zinc-800 duration-200 text-emerald-500 hover:bg-slate-300 py-2 px-3 rounded-md text-base">GET </button>
                <button onClick={()=>setMethod("POST")} className="dark:hover:bg-zinc-800 duration-200 text-yellow-400 hover:bg-slate-300 py-2 px-3 rounded-md text-base">POST </button>
                <button onClick={()=>setMethod("PUT")} className="dark:hover:bg-zinc-800 duration-200 text-blue-400 hover:bg-slate-300 py-2 px-3 rounded-md text-base">PUT </button>
                <button onClick={()=>setMethod("PATCH")} className="dark:hover:bg-zinc-800 duration-200 text-violet-400 hover:bg-slate-300 py-2 px-3 rounded-md text-base">PATCH </button>
                <button onClick={()=>setMethod("DELETE")} className="dark:hover:bg-zinc-800 duration-200 text-red-500 hover:bg-slate-300 py-2 px-3 rounded-md text-base">DELETE </button>
            </div>
        </div>
    )
}