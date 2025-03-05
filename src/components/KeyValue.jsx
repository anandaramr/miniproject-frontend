import { useEffect, useRef, useState } from "react";
import KeyValueEntry from "./KeyValueEntry";

export default function KeyValue({ item, setEntries, entries}) {

    function addRow()
    {
        setEntries((h)=>[...h,[]])
    }

    function setEntry(index,item)
    {
        setEntries((h) => {
            h[index]=item
            return h
        });
    }
    

    return(
        <div>
            <div className="flex justify-between my-5 px-3 text-xs items-center border-b-[1px] border-zinc-700 border-opacity-20">
                <p className=" text-slate-200 opacity-70 font-semibold">{(item == 'Headers')?  "Headers List":"Query Parameters"}</p>
                <button onClick={addRow} className="hover:text-emerald-300"><span className="material-symbols-outlined text-lg">add</span></button>
            </div>
            <div>
        {entries.map((item,index) =><KeyValueEntry key={index} setEntry={(item)=>setEntry(index,item)}/>)}
        </div>
        </div>
    )
}