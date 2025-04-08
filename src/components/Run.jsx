import { useEffect, useState } from "react";

export default function Run({ setDialog, tabs, run }) {

    const [ savedResponse, setSavedResponse ] = useState()

    useEffect(() => {
        const state = JSON.parse(localStorage.getItem("state"))
        setSavedResponse(state?.tabs?.map(item => item.response))
    }, [tabs])

    return (
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="border-2 border-zinc-700 w-[450px] dark:bg-zinc-900 bg-white h-[85%] rounded-xl flex flex-col py-5 px-3 gap-5">
                <div className="flex justify-between px-3 items-center">
                    <button onClick={run} className="hover:text-emerald-400 text-emerald-700 dark:text-emerald-200 duration-150 text-right px-2 "><span className="material-symbols-outlined text-2xl">play_arrow</span></button>
                    <button onClick={()=>setDialog(false)} className="hover:text-rose-400 duration-150 text-right px-2"><span className="material-symbols-outlined">close</span></button>
                </div>

                <div className="flex flex-col gap-5 overflow-y-scroll px-3">
                    {tabs.map((item,index)=> {
                        if (!item.url) return;

                        return(
                            <div key={index} className="px-5 py-1 rounded-xl flex flex-col">
                                {item.url &&<div className="flex justify-between">
                                    <div className="flex flex-col w-[80%]">
                                        <p className="font-bold">{item.title ? item.title : "Untitled"}</p>
                                        <span className="line-clamp-1 text-xs dark:text-zinc-400">{item.url}</span>
                                    </div>

                                    {item.isLoading && <div className="flex items-center gap-3 w-[20%]">
                                        <p className="text-sm dark:text-zinc-400 font-semibold animate-pulse">Loading...</p>
                                    </div>}

                                    {!item.isLoading && (savedResponse[index]?.statusCode < 300 ) && <div className="flex items-center gap-3 w-[20%]">
                                        <div className="w-3 h-3 border-2 border-emerald-500 rounded-full bg-emerald-300"></div>
                                        <p className="text-sm dark:text-zinc-400 font-semibold">{savedResponse[index].statusCode}</p>
                                    </div>}
                                    
                                    {!item.isLoading && savedResponse[index] && (!savedResponse[index]?.ok) && <div className="flex items-center gap-3 w-[20%]">
                                        <div className="w-3 h-3 border-2 border-rose-400 rounded-full bg-rose-400"></div>
                                        {(savedResponse[index]?.statusCode >= 300 )?<p className="text-sm dark:text-zinc-400 font-semibold">{savedResponse[index].statusCode}</p>:<p className="text-sm dark:text-zinc-400 font-semibold">Error</p>}
                                        </div>
                                    }
                                </div>
                                }
                            </div>
                        )

                    })}
                </div>
            </div>
        </div> 
    )
}