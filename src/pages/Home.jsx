import { cls } from "../utils/cls"
import ThemeSelector from "../components/ThemeSelector"
import Popup from "../components/Popup"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"

function Home() {

	const { theme } = useContext(ThemeContext)

	useEffect(() => {
		const theme = document.querySelector('#theme')
		theme.animate([ { transform: 'rotate(60deg)' }, { transform: 'rotate(0deg)' } ], { duration: 200, iterations: 1 })
	}, [theme])

	return (
		<div className={cls('p-5', 'text-xl')}>
			<Popup title={<span id="theme" className="material-symbols-outlined dark:text-zinc-300 text-zinc-700 text-2xl">{ theme=='dark' ? 'dark_mode' : 'light_mode'}</span>}>
				<ThemeSelector />
			</Popup>
		</div>
	)
}

export default Home
