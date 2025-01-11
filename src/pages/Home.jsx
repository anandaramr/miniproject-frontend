import { cls } from "../utils/cls"
import ThemeSelector from "../components/ThemeSelector"
import Popup from "../components/Popup"

function Home() {

	return (
		<div className={cls('p-5', 'text-xl')}>
			<Popup title="Theme">
				<ThemeSelector />
			</Popup>
		</div>
	)
}

export default Home
