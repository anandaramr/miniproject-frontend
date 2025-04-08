import { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import { cls } from "../utils/cls";

export default function Response({ response }) {

    const [ extension, setExtension ] = useState("txt")
    const [ showResponse, setShowResponse ] = useState("response")
    const [headers, setHeaders] = useState();
    const [ time, setTime ] = useState()
    
    const copyMessage = useRef()

    useEffect(()=>{
        setHeaders(response.headers)
    },[response])           

    function download() {
        if (!response?.headers) return;

        const contentType = response?.headers['content-type']
        const type = contentType?.split(';')[0].trim() || 'text/plain'
        const downloadData = new Blob([response.data], { type });
        const url = URL.createObjectURL(downloadData);

        const link = document.createElement('a');
        link.href = url;
        link.download = `response.${extension}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function copy() {
        navigator.clipboard.writeText(response.data)
        .then(() => {
            copyMessage.current.animate(
                [ { opacity: 0, display: 'block', offset: 0 }, 
                  { opacity: 1, offset: 0.1 }, 
                  { opacity: 1, offset: 0.9 }, 
                  { opacity: 0, display: 'none', offset: 1 } ],
                { duration: 2000, iterations: 1 }
            )
        })
    }
    
    useEffect(() => {
        if (!response.headers) return;
        const contentType = response?.headers['content-type']
        const type = contentType?.split(';')[0].trim() || 'text/plain'
        const ext = type == 'application/json' ? 'json' : type =='text/html' ? 'html' : 'txt'
        setExtension(ext)
    }, [response])

    return (
        <div className="pl-10 pt-3 w-full">
            {!response.error && 
            <div className="flex flex-col gap-1">
                <div className={cls("flex gap-2 text-xs font-semibold select-none", response?.ok ? "text-emerald-400" : "text-rose-400")}>
                    <span>{response.statusCode && "Status"}</span>
                    <span>{response.statusCode}</span>
                    <span>{response.statusText}</span>
                    <span className="px-3">{response.time && `${response.time} ms`}</span>
                </div>
                <div className="text-sm dark:text-zinc-300 mt-3">
                    <button onClick={()=>setShowResponse("response")}className={cls("mx-4 dark:hover:underline underline-offset-8 decoration-2 decoration-rose-300",(showResponse=="response")&&"underline")}>Response</button>
                    <button onClick={()=>setShowResponse("headers")}className={cls("mx-4 dark:hover:underline underline-offset-8 decoration-2 decoration-rose-300",(showResponse=="headers")&&"underline")}>Headers</button>
                </div>
                {showResponse=="response" && <div className="flex flex-col justify-between">
                    <div className="flex items-center gap-3 select-none justify-end">
                        <div className="flex-col">
                            <span onClick={copy} className="dark:text-gray-500 text-xl dark:hover:text-gray-300 duration-200 cursor-pointer material-symbols-outlined">content_copy</span>
                            <div ref={copyMessage} className="text-xs opacity-0 hidden font-medium absolute -translate-x-5 z-10 bg-white bg-opacity-80 cursor-default rounded-md shadow-lg border-[1px] border-zinc-200 text-black px-3 py-1">Copied!</div>
                        </div>
                        <span onClick={download} className="dark:text-gray-500 dark:hover:text-gray-300 duration-200 cursor-pointer material-symbols-outlined">download</span>
                    </div>
                    <Editor value={response.data} language={extension} readOnly width="700px" height="450px"/>
                </div>}
                {showResponse=="headers" && <div className="flex flex-col justify-between">
                    <p className="mt-5 mb-2 text-xs font-bold border-b-[1.5px] dark:border-zinc-800 py-1 px-2 dark:text-zinc-400">Headers List</p>
                    {headers && Object.keys(headers).map((item)=>
                    <div className="flex gap-3 text-xs my-2">
                        <div className="font-semibold dark:text-zinc-400 border-zinc-700 border-opacity-40 border-2 px-2 py-2 bg-transparent w-[40%]">{item}</div>
                        <div className="border-zinc-700 dark:text-zinc-400 border-opacity-40 border-2 px-2 py-2 bg-transparent w-[80%]">{headers[item]}</div>
                    </div>)}
                </div>}

            </div>}

            {response.error &&
            <div className="flex justify-center items-center text-3xl text-gray-600 gap-3 h-[60%]">
                <span className="font-bold">Error:</span><span>{response.error?.message || "Unable to fetch endpoint"} :&#40;</span>
            </div>
            }
        </div>
    )
}