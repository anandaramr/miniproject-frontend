import Editor from "./Editor";

export default function Body({ value, setValue, language }) {

    return(
        <div>
            <Editor value={value} language={"json"} setValue={setValue} height={"60svh"} width="700px"/>
        </div>
    )
}