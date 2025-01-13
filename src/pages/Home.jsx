import NavBar from "../components/NavBar";
import { useState } from "react";
import Request from "../components/Request";
import Response from "../components/Response";

function Home() {

	const [ response, setResponse ] = useState({})

	return (
		<div className="h-svh p-2">
			<NavBar/>
			<div className="flex">
				<Request tabId={1} setResponse={setResponse} />
				<Response response={response} />
			</div>
		</div>
	)
}

export default Home
