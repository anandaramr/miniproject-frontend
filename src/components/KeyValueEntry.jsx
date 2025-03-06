export default function KeyValueEntry({ setEntry, entry }) {

    function setKey(value) {
        const newEntry = [ ...entry ]
        newEntry[0] = value
        setEntry(newEntry)
    }

    function setValue(value) {
        const newEntry = [ ...entry ]
        newEntry[1] = value
        setEntry(newEntry)
    }

    return(
        <div className="flex text-xs my-2 gap-2 w-[90%]">
            {/* <input placeholder="" className="border-zinc-700 border-opacity-70 border-2 px-2 py-2 bg-transparent outline-none w-11" /> */}
            <input value={entry[0] || ""} onChange={(evt)=>{setKey(evt.target.value)}} id="key" placeholder="Key" className="placeholder:text-zinc-600 border-zinc-700 border-opacity-40 border-2 px-2 py-2 bg-transparent w-[60%] outline-none "/>
            <input value={entry[1] || ""} onChange={(evt)=>{setValue(evt.target.value)}} id="value" placeholder="Value" className="placeholder:text-zinc-600 border-zinc-700 border-opacity-40 border-2 px-2 py-2 bg-transparent w-full outline-none " />
        </div>
    )
}