import Editor from "./Editor";

export default function Body({value,setValue})
{

    return(
        <div>
            <Editor value={value} setValue={setValue} width="700px"/>
        </div>
    )
}