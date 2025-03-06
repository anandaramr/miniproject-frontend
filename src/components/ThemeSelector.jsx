import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function ThemeSelector({ }) {

    const { getTheme, changeTheme } = useContext(ThemeContext)

    function setTheme(evt) {
        changeTheme(evt.target.id)
    }
    
    return (
        <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-[1px] rounded-lg my-2 pr-3 pl-5 py-4 w-fit dark:bg-lightblack bg-slate-200">
				<form onChange={setTheme} className="text-base">
					<input className="border-2 border-rose-400 w-3 h-3 rounded-full checked:bg-rose-400 duration-200 appearance-none" defaultChecked={getTheme()=='dark'} name="theme" type="radio" id="dark" />
					<label className="px-3" htmlFor="dark">Dark</label><br></br>

					<input className="border-2 border-rose-400 w-3 h-3 rounded-full checked:bg-rose-400 duration-200 appearance-none" defaultChecked={getTheme()=='light'} name="theme" type="radio" id="light" />
					<label className="px-3" htmlFor="light">Light</label><br></br>

					<input className="border-2 border-rose-400 w-3 h-3 rounded-full checked:bg-rose-400 duration-200 appearance-none" defaultChecked={getTheme()=='system'} name="theme" type="radio" id="system" />
					<label className="px-3" htmlFor="system">System</label><br></br>
				</form>
        </div>
    )
}