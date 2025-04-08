import KeyValueEntry from "./KeyValueEntry";

export default function KeyValue({ item, setEntries, entries}) {

    function addRow() {
        setEntries((h)=>[...h,[]])
    }

    function closeEntry(index) {
        setEntries(list => [ ...list.slice(0,index), ...list.slice(index+1) ])
    }

    function setEntry(index,item) {
        setEntries((h) => {
            const newEntries = [...h];
            newEntries[index] = item;
            return newEntries;
        });
    }

    return(
        <div>
            <div className="flex justify-between my-5 px-3 text-xs items-center border-b-[1px] border-zinc-700 border-opacity-20">
                <p className="dark:text-slate-200 opacity-70 font-semibold">{ item=='Headers' ? "Headers List" : "Query Parameters" }</p>
                <button onClick={addRow} className="hover:text-emerald-300"><span className="material-symbols-outlined text-lg">add</span></button>
            </div>
            <div>
                {entries.map((item,idx) => (
                    <div key={idx} className="flex justify-normal gap-3">
                        <KeyValueEntry entry={item} setEntry={(item)=>setEntry(idx,item)}/>
                        <span onClick={() => closeEntry(idx)} className="material-symbols-outlined text-zinc-600 flex items-center text-xl cursor-default hover:text-red-400 duration-200">delete</span>
                    </div>
                ))}
            </div>
        </div>
    )
}