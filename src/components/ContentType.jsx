export default function ContentType({ setContent })
{
    return(
        <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg my-4  py-2 w-fit dark:bg-lightblack bg-white text-sm">
            <div className="flex flex-col font-medium">
                <p className="text-center py-1 text-zinc-400 font-bold">Content Type</p>
                <button onClick={()=>setContent("application/json")} className="hover:text-zinc-400 duration-200 py-2 px-5 rounded-md  text-zinc-500">application/json </button>
                <button onClick={()=>setContent("text/html")} className="hover:text-zinc-400 duration-200 py-2 px-3 rounded-md  text-zinc-500">text/html </button>
                <button onClick={()=>setContent("text/plain")} className="hover:text-zinc-400 duration-200 py-2 px-3 rounded-md  text-zinc-500">text/plain</button>
            </div>
        </div>
    )
}