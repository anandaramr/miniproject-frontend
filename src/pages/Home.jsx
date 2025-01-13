import Popup from "../components/Popup"
import {useState } from "react"
import NavBar from "../components/NavBar";
import JsonEditor from "../components/JsonEditor";
import Method from "../components/Method";

function Home() {

	async function request()
	{
		const response = await fetch("https://dog.ceo/api/breeds/image/random");
		const result = await response.json();
	}

	const [title, setTitle] = useState("GET");
	const methodButton =<div className="py-2 rounded-md px-7 dark:border-zinc-700 border-zinc-300 border-[1px] flex flex-col justify-center w-28 dark:bg-lightblack">{title}</div>
	return (
		
		<div className="h-svh p-2">
			<NavBar/>
			<div className="flex">
				<div className="w-fit border-r-[1px] border-zinc-700 px-10">
					<div className="flex gap-8">
							<Popup title={methodButton} className="text-center">
								<Method fn={setTitle}/>
							</Popup>
						<input type="text" className="rounded-md py-2 w-[400px] dark:border-zinc-700 outline-none px-3 border-zinc-300 border-[1px] dark:bg-lightblack"/>
						<button onClick={request} className="font-medium rounded-lg py-2 dark:border-zinc-700 px-8 border-zinc-300 border-[1px] dark:bg-rose-400 ">Send</button>
					</div>
					<JsonEditor width="700px"/>
				</div>
				<div className="px-10 my-10">
					<JsonEditor readOnly width="600px"/>
				</div>
			</div>
		</div>
	)
}

export default Home
