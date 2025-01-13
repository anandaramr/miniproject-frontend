import NavBar from "../components/NavBar";
import Editor from "../components/Editor";
import { cls } from "../utils/cls";
import { useState } from "react";
import Request from "../components/Request";

function Home() {

	const [ response, setResponse ] = useState({})
	// const [ method, setMethod] = useState("GET")
	// const [ url, setUrl ] = useState("")
	// const [ body, setBody ] = useState("")
	// const [ headers, setHeaders ] = useState({})
	// const [ isLoading, setIsLoading ] = useState(false)
	
	// const [ controller, setController ] = useState()

	// useEffect(() => {
	// 	const { data: state, err } = parseJson(localStorage.getItem("state"))
	// 	if(err || !state) return;
		
	// 	const { method, url, body } = state

	// 	setMethod(method)
	// 	setUrl(url)
	// 	setBody(body)
	// }, [])

	// useEffect(() => {
	// 	if(!url && !body) return;
	// 	saveTabState({ method, url, body })
	// }, [method, url, body, headers])
	
	// async function sendRequest() {
	// 	let input = url.trim()
	// 	if(!input) {
	// 		setUrl("")
	// 		return;
	// 	}

		
	// 	if(!input.startsWith("http://") && !input.startsWith("https://")) input = "https://" + url;
	// 	setUrl(input)
	// 	const reqHeaders = { ...headers, 'Content-Type': 'application/json' }
	// 	setIsLoading(true)

	// 	const controller = new AbortController()
	// 	setController(controller)
	// 	const response = await request(input, method, body, reqHeaders, controller);

	// 	setResponse(response)
	// 	setIsLoading(false)
	// }

	// function saveTabState({ method, url, body }) {
	// 	const methods = [ "GET", "POST", "PUT", "PATCH", "DELETE" ]
	// 	if(!methods.includes(method)) method = "GET";

	// 	const data = { method, url, body }
	// 	localStorage.setItem("state", JSON.stringify(data))
	// }

	// function handleButtonClick() {
	// 	if(!isLoading) {
	// 		sendRequest()
	// 	} else {
	// 		abortRequest()
	// 	}
	// }

	// function abortRequest() {
	// 	if(!controller){
	// 		console.error("Couldn't find controller")
	// 		return;
	// 	}
	// 	controller.abort()
	// 	setIsLoading(false)
	// }

    // const methodButton =<div className="py-2 rounded-md px-7 dark:hover:bg-zinc-900 duration-200 dark:border-zinc-600 border-zinc-300 border-[1px] flex flex-col justify-center w-28 dark:bg-lightblack">{method}</div>

	return (
		
		<div className="h-svh p-2">
			<NavBar/>
			<div className="flex">
				<Request setResponse={setResponse} />
				<div className="px-10 my-10">
					<div className={cls("flex gap-3 text-xs font-semibold", response?.ok && "text-emerald-400")}>
						<span>{response.statusCode && "Status"}</span>
						<span>{response.statusCode}</span>
						<span>{response.statusText}</span>
					</div>
					<Editor value={response.data} readOnly width="700px"/>
				</div>
			</div>
		</div>
	)
}

export default Home
