import Method from "../components/Method";
import { request } from "../utils/request";
import Popup from "../components/Popup"
import { useEffect, useState } from "react"
import { parseJson, updateState } from "../utils/utils";
import { cls } from "../utils/cls";
import KeyValue from './KeyValue'
import Body from "./Body";

export default function Request({ tabId, displayResponse }) {

    const [ active, setActive] = useState("Body")
    const [ method, setMethod] = useState("GET")
    const [ url, setUrl ] = useState("")
    const [ body, setBody ] = useState()
    const [ headers, setHeaders ] = useState([])
    const [ parameters, setParameters ] = useState([])

    const [ isLoading, setIsLoading ] = useState(false)
    
    const [ controller, setController ] = useState()

    useEffect(() => {
        const { method, url, body, headers, parameters } = getTabState()
        
        setMethod(method || "GET")
        setUrl(url || "")
        setBody(body || "")
        setHeaders(headers || [])
        setParameters(parameters || [])
    }, [tabId])
    
    useEffect(() => {
        saveTabState()
    }, [method, url, body, headers, parameters])
    
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

        const savedTabId = tabId
        const response = await request(input, method, body, reqHeaders, controller).finally(() => setIsLoading(false))

        displayResponse(savedTabId, response)
    }

    function saveTabState() {
        if (!tabId) return;

        updateState(({ tabs }) => {
            let found = false
            tabs = tabs.map(item => {
                if (item.tabId === tabId) {
                    found = true
                    item = { ...item, method, url, body, headers, parameters }
                }
                return item
            })
            
            if(!found) tabs.push({ tabId, method, url, body });
            return { tabs }
        })
    }

    function getTabState() {
        const { data } = parseJson(localStorage.getItem("state"))
        if (!data) return {};
        
        return data.tabs?.find(item => item?.tabId==tabId) || {}
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

    const methodButton =<div className="py-1.5 rounded-md px-7 dark:hover:bg-zinc-900 duration-200 dark:border-zinc-600 border-zinc-300 border-[1px] flex flex-col justify-center w-28 dark:bg-lightblack">{method}</div>
    return (
        <div className="w-fit px-5 mt-3 border-r-[1px] border-zinc-700 border-opacity-20">
            <div className="flex gap-2 mb-3">
                <Popup collapsible title={methodButton} >
                    <Method setMethod={setMethod}/>
                </Popup>
                <input onChange={(evt) => setUrl(evt.target.value)} value={url} onKeyDown={handleKeyBinding} type="text" className="rounded-md text-sm py-1.5 w-[500px] dark:border-zinc-700 outline-none px-3 border-zinc-300 border-[1px] dark:bg-lightblack"/>
                <button onClick={handleButtonClick} disabled={!url?.trim()} className="font-medium rounded-lg py-1.5 dark:border-zinc-700 w-28 text-white border-zinc-300 border-[1px] bg-rose-400 hover:bg-rose-500 duration-200 disabled:opacity-50">{isLoading ? "Cancel" : "Send"}</button>
            </div>
            <div className="flex text-sm text-zinc-300">
                <button onClick={()=> setActive("Parameters")} className={cls("mx-4 dark:hover:underline underline-offset-8 decoration-2 decoration-rose-300",(active=="Parameters")&&"underline")}>Parameters</button>
                <button onClick={()=> setActive("Body")} className={cls("mx-4 dark:hover:underline underline-offset-8 decoration-2 decoration-rose-300",(active=="Body")&&"underline")}>Body</button>
                <button onClick={()=> setActive("Headers")} className={cls("mx-4 dark:hover:underline underline-offset-8 decoration-2 decoration-rose-300",(active=="Headers")&&"underline")}>Headers</button>
            </div>  
            {(active=="Headers")&& <KeyValue item="Headers" setEntries={setHeaders} entries={headers}/>}
            {(active=="Parameters")&& <KeyValue item="Parameters" setEntries={setParameters} entries={parameters}/>}
            {(active=="Body")&& <Body value={body} language={"json"} setValue={setBody}/>}
        </div>
    )
}
