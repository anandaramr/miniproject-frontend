import { cls } from "../utils/cls"
import ThemeSelector from "../components/ThemeSelector"

function Home() {

	return (
		<div className={cls('p-5', 'text-xl')}>
			<ThemeSelector />
		</div>
	)
}

export default Home
