
export default function Method({fn})
{

    return(
    <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg my-4 px-3 py-4 w-fit dark:bg-lightblack">
        <div className="flex flex-col font-medium">
            <button onClick={()=>fn("GET")} className="dark:hover:bg-zinc-800 text-emerald-500 hover:bg-slate-300 py-2 px-3 rounded-md text-base">GET </button>
            <button onClick={()=>fn("POST")} className="dark:hover:bg-zinc-800 text-yellow-400 hover:bg-slate-300 py-2 px-3 rounded-md text-base">POST </button>
            <button onClick={()=>fn("PUT")} className="dark:hover:bg-zinc-800 text-blue-400 hover:bg-slate-300 py-2 px-3 rounded-md text-base">PUT </button>
            <button onClick={()=>fn("PATCH")} className="dark:hover:bg-zinc-800 text-violet-400 hover:bg-slate-300 py-2 px-3 rounded-md text-base">PATCH </button>
            <button onClick={()=>fn("DELETE")} className="dark:hover:bg-zinc-800 text-red-500 hover:bg-slate-300 py-2 px-3 rounded-md text-base">DELETE </button>
        </div>
    </div>
)}