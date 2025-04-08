import { useRef } from "react"

export default function NewProject({ create, cancel }) {

    const inputRef = useRef()

    function submit(evt) {
        evt.preventDefault()
        create(inputRef.current.value)
    }

    return (
        <div className="flex h-svh w-full justify-center items-center bg-black bg-opacity-60 absolute z-20">
            <div className="border-2 border-zinc-700 w-fit bg-zinc-900 h-[30svh] rounded-xl flex flex-col py-5 px-16 gap-5">
                <form onSubmit={submit} className="flex flex-col gap-8 items-center justify-center h-full">
                    <input ref={inputRef} type="text" placeholder="Project name" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl" autoFocus />
                    <div className="flex gap-5">
                        <button type="submit" className="duration-150 px-4 border-2 border-zinc-300 py-1 rounded-xl hover:text-black hover:bg-zinc-50 hover:border-zinc-50">Create</button>
                        <button onClick={cancel} className="duration-150 px-4 rounded-xl border-zinc-800 hover:border-rose-500 hover:bg-rose-500 hover:text-white border-2 text-base">Cancel</button>
                    </div>
                </form>
            </div>
        </div> 
    )
}