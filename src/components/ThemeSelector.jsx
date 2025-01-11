import { getTheme, handleChangeTheme } from "../utils/theme";

export default function ThemeSelector() {

    const theme = getTheme()
    
    return (
        <div className="dark:border-zinc-700 border-zinc-300 shadow-md border-2 rounded-lg m-3 p-5 w-fit">
				<form onChange={handleChangeTheme} className="">
					<input className="border-2 border-cyan-400 w-3 h-3 rounded-full checked:bg-cyan-400 duration-200 appearance-none" defaultChecked={theme=='dark'} name="theme" type="radio" id="dark" />
					<label className="px-3 text-lg" htmlFor="dark">Dark</label><br></br>

					<input className="border-2 border-cyan-400 w-3 h-3 rounded-full checked:bg-cyan-400 duration-200 appearance-none" defaultChecked={theme=='light'} name="theme" type="radio" id="light" />
					<label className="px-3 text-lg" htmlFor="light">Light</label><br></br>

					<input className="border-2 border-cyan-400 w-3 h-3 rounded-full checked:bg-cyan-400 duration-200 appearance-none" defaultChecked={theme=='system'} name="theme" type="radio" id="system" />
					<label className="px-3 text-lg" htmlFor="system">System</label><br></br>
				</form>
        </div>
    )
}