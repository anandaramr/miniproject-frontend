import { useEffect } from "react";
import { cls } from "../utils/cls";

export default function Tab({ title, currentTab, onClick, close }) {

    function closeSelf(evt) {
        evt.stopPropagation()
        close()
    }

    return (
        <div draggable onClick={onClick} className={cls("gap-5 flex items-center border-[1px] border-zinc-800 rounded-sm px-3 py-1 cursor-pointer select-none", title==currentTab && "bg-zinc-700")}>
            <span>{title}</span>
            {close && <span onClick={closeSelf} className="text-base hover:text-rose-400 duration-200 text-zinc-500 material-symbols-outlined">close</span>}
        </div>
    )
}