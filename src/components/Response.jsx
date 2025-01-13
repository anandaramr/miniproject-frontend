import Editor from "../components/Editor";
import { cls } from "../utils/cls";

export default function Response({ response }) {

    return (
        <div className="px-10 my-10">
            <div className={cls("flex gap-3 text-xs font-semibold", response?.ok && "text-emerald-400")}>
                <span>{response.statusCode && "Status"}</span>
                <span>{response.statusCode}</span>
                <span>{response.statusText}</span>
            </div>
            <Editor value={response.data} readOnly width="700px"/>
        </div>
    )
}