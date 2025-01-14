import { useEffect } from "react";
import { cls } from "../utils/cls";

export default function Tab({ title, active, onClick, close }) {

    function closeSelf(evt) {
        evt.stopPropagation()
        close()
    }

    return (
        <div draggable onClick={onClick} className={cls("gap-5 flex items-center border-[1px] dark:border-zinc-800 rounded-sm px-3 py-1 cursor-pointer select-none", active && "bg-zinc-300 dark:bg-zinc-700")}>
            <span className={cls(active ? "dark:text-zinc-400 text-zinc-800" : "text-zinc-500")}>{title || "Untitled"}</span>
            {close && <span onClick={closeSelf} className="text-base hover:text-rose-400 duration-200 text-zinc-500 material-symbols-outlined">close</span>}
        </div>
    )
}