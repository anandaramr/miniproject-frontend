import { useState } from "react";
import { cls } from "../utils/cls";
import { updateState } from "../utils/utils";

export default function Tab({ id, title, active, onClick, close, onDragStart, onDrop }) {

    function closeSelf(evt) {
        evt.stopPropagation()
        close()
    }

    const [ tabName, setTabName ] = useState(title)
    const [ renameMode, setRenameMode ] = useState(false)

    function rename(newName) {
        updateState(({ tabs }) => {
            tabs = tabs.map(item => {
                if (item.tabId==id) {
                    item.title = newName
                }
                return item
            })
            return { tabs }
        })
        setRenameMode(false)
        setTabName(newName.trim())
    }

    function handleKeyDown(evt) {
        if (evt.code=='Escape') {
            setRenameMode(false)
        } else if (evt.code=='Enter') {
            rename(evt.target.value)
        }
    }

    return (
        <div draggable={!renameMode} onDrop={onDrop} onDragStart={onDragStart} onDragOver={(evt) => evt.preventDefault()} onClick={onClick} className={cls("gap-5 flex items-center border-[1px] dark:border-zinc-800 rounded-sm px-3 py-1 cursor-pointer select-none", active && "bg-zinc-300 dark:bg-zinc-800")}>
            {!renameMode && <span onDoubleClick={() => setRenameMode(true)} className={cls("w-[60px]", active ? "dark:text-zinc-400 text-zinc-800" : "text-zinc-500")}>{tabName || "Untitled"}</span>}
            {renameMode && <input className="w-[60px] bg-transparent text-zinc-800 dark:text-zinc-400 caret-zinc-800 dark:caret-white outline-none" onClick={rename} onFocus={(evt) => evt.target.select()} onBlur={() => setRenameMode(false)} onKeyDown={handleKeyDown} defaultValue={tabName || "Untitled"} spellCheck={false} autoFocus  />}
            <span onClick={closeSelf} className="text-base hover:text-rose-400 duration-200 text-zinc-500 material-symbols-outlined">close</span>
        </div>
    )
}