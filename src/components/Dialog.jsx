export default function Dialog({setDialog})
{   
      const state = JSON.parse(localStorage.getItem("state"));
      const tabs = state.tabs
      
    return(
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="border-2 border-zinc-700 w-[35%] bg-zinc-900 h-[85%] rounded-xl flex flex-col py-5 px-3 gap-5">
                <div className="flex justify-between px-3 items-center">
                    <button className="hover:text-emerald-400 text-emerald-200 duration-150 text-right px-2 "><span className="material-symbols-outlined text-2xl">play_arrow</span></button>
                    <button onClick={()=>setDialog(false)} className="hover:text-rose-400 duration-150 text-right px-2"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="flex flex-col gap-5 overflow-y-scroll px-3">
                    {tabs.map((item,index)=>
                        <div key={index} className="px-5 py-1 rounded-xl flex flex-col">
                            {item.url &&<div className="flex justify-between">
                                <div className="flex flex-col w-[80%]">
                                    <p className="font-bold">{item.title?item.title:"Untitled"}</p>
                                    <span className="line-clamp-1 text-xs text-zinc-400">{item.url}</span>
                                </div>
                                {(item.response?.statusCode < 300 )&& <div className="flex items-center gap-3 w-[20%]">
                                    <div className="w-3 h-3 border-2 border-emerald-500 rounded-full bg-emerald-300"></div>
                                    <p className="text-sm text-zinc-400 font-semibold">{item.response.statusCode}</p>
                                </div>}
                                
                                {item.response && (!item.response?.ok) && <div className="flex items-center gap-3 w-[20%]">
                                    <div className="w-3 h-3 border-2 border-rose-400 rounded-full bg-rose-400"></div>
                                    {(item.response?.statusCode >= 300 )?<p className="text-sm text-zinc-400 font-semibold">{item.response.statusCode}</p>:<p className="text-sm text-zinc-400 font-semibold">Error</p>}
                                    </div>
                                }

                                {(!item.response) && <div className="flex items-center gap-3 w-[20%]">
                                    <div className="w-3 h-3 border-2 border-yellow-400 rounded-full bg-yellow-400"></div>
                                    <p className="text-sm text-zinc-400 font-semibold">Loading...</p>
                                    </div>
                                }
                            </div>}
                        </div>
                    )}
                </div>
            </div>
        </div> 
    )
}