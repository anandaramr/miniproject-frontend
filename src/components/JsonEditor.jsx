import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { json, jsonParseLinter } from "@codemirror/lang-json"
import { editorDarkTheme, editorLightTheme } from "../utils/codemirror-theme"
import { linter } from "@codemirror/lint"
import { useCallback, useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function JsonEditor({ value, setValue, readOnly, height, width }) {

    
    const onChange = useCallback((val) => {
        if(setValue) setValue(val);
    }, []);
    
    const editorTheme = EditorView.theme({
        "&.cm-focused" : {
            "outline" : "none"
        }
    })
    const { theme } = useContext(ThemeContext)
    
    const lint = linter(jsonParseLinter());
    const extensions =[json(), editorTheme]
    if(!readOnly) extensions.push(lint)


    return (
        <div className="text-sm w-fit border-[1px] border-zinc-800 h-fit my-10 rounded-lg p-1">
            <CodeMirror
                className="border-zinc-900 outline-none"
                value={value}
                theme={theme == "dark" ? editorDarkTheme : editorLightTheme}
                height={height || "500px"}
                width={width || "500px"}
                extensions={extensions}
                onChange={onChange}
                editable={!readOnly}
            />
        </div>
    );
}
