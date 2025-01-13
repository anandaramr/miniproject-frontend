import Method from "../components/Method";
import { request } from "../utils/request";
import Popup from "../components/Popup"
import { useEffect, useState } from "react"
import { parseJson } from "../utils/utils";
import Editor from "./Editor";

export default function Request({ tabId, setResponse }) {

    const [ method, setMethod] = useState("GET")
    const [ url, setUrl ] = useState("")
    const [ body, setBody ] = useState("")
    const [ headers, setHeaders ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    
    const [ controller, setController ] = useState()

    useEffect(() => {
        const { method, url, body } = getTabState()

        setMethod(method || "GET")
        setUrl(url || "")
        setBody(body || "")
    }, [])

    useEffect(() => {
        if(!url && !body) return;
        saveTabState()
    }, [method, url, body, headers])
    
    async function sendRequest() {
        let input = url.trim()
        if(!input) {
            setUrl("")
            return;
        }
        
        if(!input.startsWith("http://") && !input.startsWith("https://")) input = "https://" + url;
        setUrl(input)
        const reqHeaders = { ...headers, 'Content-Type': 'application/json' }
        setIsLoading(true)

        const controller = new AbortController()
        setController(controller)
        const response = await request(input, method, body, reqHeaders, controller);

        setResponse(response)
        setIsLoading(false)
    }

    function saveTabState() {
        const methods = [ "GET", "POST", "PUT", "PATCH", "DELETE" ]
        if(!methods.includes(method)) method = "GET";
        
        let { data } = parseJson(localStorage.getItem("state"))
        
        let tabs = data?.tabs || []
        tabs = tabs?.filter(item => item.tabId != tabId)

        tabs = [ ...tabs, { tabId, method, url, body }]
        data = { lastActiveTab: tabId, tabs }

        localStorage.setItem("state", JSON.stringify(data))
    }

    function getTabState() {
        const { data } = parseJson(localStorage.getItem("state"))
        if (!data) return {};
        
        return data.tabs?.find(item => item.tabId==tabId) || {}
    }

    function handleButtonClick() {
        if(!isLoading) {
            sendRequest()
        } else {
            abortRequest()
        }
    }

    function handleKeyBinding(evt) {
        if(evt.code=='Enter') {
            sendRequest()
        }
    }

    function abortRequest() {
        if(!controller){
            console.error("Couldn't find controller")
            return;
        }
        controller.abort()
        setIsLoading(false)
    }

    const methodButton =<div className="py-2 rounded-md px-7 dark:hover:bg-zinc-900 duration-200 dark:border-zinc-600 border-zinc-300 border-[1px] flex flex-col justify-center w-28 dark:bg-lightblack">{method}</div>

    return (
        <div className="w-fit border-r-[1px] border-zinc-700 border-opacity-20 px-10">
            <div className="flex gap-2">
                <Popup collapsible title={methodButton} >
                    <Method setMethod={setMethod}/>
                </Popup>
                <input onChange={(evt) => setUrl(evt.target.value)} value={url} onKeyDown={handleKeyBinding} type="text" className="rounded-md text-sm py-2 w-[500px] dark:border-zinc-700 outline-none px-3 border-zinc-300 border-[1px] dark:bg-lightblack"/>
                <button onClick={handleButtonClick} disabled={!url?.trim()} className="font-medium rounded-lg py-2 dark:border-zinc-700 w-28 border-zinc-300 border-[1px] dark:bg-rose-400 dark:hover:bg-rose-500 duration-200 disabled:opacity-50">{isLoading ? "Cancel" : "Send"}</button>
            </div>
            <Editor value={body} setValue={setBody} width="700px"/>
        </div>
    )
}