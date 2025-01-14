import { cls } from "../utils/cls";

export default function Tab({ title, onClick, active, onDoubleClick }) {

    return (
        <div id={title} onClick={onClick} onDoubleClick={onDoubleClick} className={cls("border-[1px] border-zinc-800 rounded-sm px-3 py-1 cursor-pointer select-none", active && "bg-zinc-700")}>{title}</div>
    )
}