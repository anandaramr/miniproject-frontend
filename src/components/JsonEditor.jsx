import CodeMirror from "@uiw/react-codemirror"
import { json, jsonParseLinter } from "@codemirror/lang-json"
import { editorDarkTheme, editorLightTheme } from "../utils/codemirror-theme"
import { linter } from "@codemirror/lint"
import { useCallback, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function JsonEditor({ value, setValue, readOnly, height, width }) {

    const onChange = useCallback((val) => {
        setValue(val);
    }, []);

    const { theme } = useContext(ThemeContext)

    return (
        <CodeMirror
            className="mx-5 border-[0.5px] border-zinc-800 text-sm w-fit"
            value={value}
            theme={theme == "dark" ? editorDarkTheme : editorLightTheme}
            height={height || "500px"}
            width={width || "500px"}
            extensions={[json(), linter(jsonParseLinter())]}
            onChange={onChange}
            editable={!readOnly}
        />
    );
}
