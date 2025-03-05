import { useEffect, useState } from "react";

export default function KeyValueEntry({setEntry})
{
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
        setEntry([key,value])
    }, [key,value]);
    return(
        <div className="flex text-xs my-2 gap-2">
            {/* <input placeholder="" className="border-zinc-700 border-opacity-70 border-2 px-2 py-2 bg-transparent outline-none w-11" /> */}
            <input onChange={(evt)=>{setKey(evt.target.value)}} id="key" placeholder="Key" className="placeholder:text-zinc-600 border-zinc-700 border-opacity-40 border-2 px-2 py-2 bg-transparent w-[60%] outline-none "/>
            <input onChange={(evt)=>{setValue(evt.target.value)}} id="value" placeholder="Value" className="placeholder:text-zinc-600 border-zinc-700 border-opacity-40 border-2 px-2 py-2 bg-transparent w-full outline-none " />
        </div>
    )
}