import CodeMirror, { EditorView } from "@uiw/react-codemirror"
import { json, jsonParseLinter } from "@codemirror/lang-json"
import { html } from "@codemirror/lang-html"
import { editorDarkTheme, editorLightTheme } from "../utils/codemirror-theme"
import { linter } from "@codemirror/lint"
import { useCallback, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Editor({ value, setValue, readOnly, height, width, language }) {
    
    const editorTheme = EditorView.theme({
        "&.cm-focused" : {
            "outline" : "none"
        }
    })

    const lint = linter(jsonParseLinter())
    const extensions = [editorTheme, EditorView.lineWrapping]
    if (!readOnly) extensions.push(lint);
    if (language=="json") extensions.push(json());
    else if (language=="html") extensions.push(html())
    
    const onChange = useCallback((val) => {
        if(setValue) setValue(val)
    }, []);

    const { theme } = useContext(ThemeContext)
    

    return (
        <div className="text-sm w-fit border-[1px] border-zinc-300 dark:border-zinc-800 dark:bg-lightblack bg-white h-fit my-3 rounded-lg p-1">
            <CodeMirror
                className="border-zinc-900 outline-none text-wrap"
                value={value}
                theme={theme == "dark" ? editorDarkTheme : editorLightTheme}
                height={height || "60svh"}
                width={width || "500px"}
                extensions={extensions}
                onChange={onChange}
                editable={!readOnly}
            />
        </div>
    );
}
