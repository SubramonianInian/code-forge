import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import { Editor, EditorChange } from 'codemirror'
import './codeEditor.css'
import { MdFullscreen, MdCloseFullscreen } from 'react-icons/md'
import { useState, useId } from 'react'

interface Props {
    onChange: (value: string) => void
    editorTitle: string
    editorContent: string
    editorLanguage: string
}

const CodeEditor: React.FC<Props> = ({
    onChange,
    editorTitle,
    editorContent,
    editorLanguage,
}) => {
    const id = useId()
    const [isFullScreen, setIsFullScreen] = useState(true)

    return (
        <div
            key={editorLanguage}
            className={`editor-container ${isFullScreen ? '' : 'minimized'}`}
        >
            <div className="editor-title">
                {editorTitle}
                <button
                    className="fullscreen-button"
                    onClick={() => setIsFullScreen((prev) => !prev)}
                >
                    {isFullScreen ? <MdCloseFullscreen /> : <MdFullscreen />}
                </button>
            </div>
            <CodeMirror
                key={id}
                onBeforeChange={(
                    _editor: Editor,
                    _data: EditorChange,
                    value: string
                ) => {
                    onChange(value)
                }}
                value={editorContent}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    mode: editorLanguage,
                    theme: 'material',
                    lineNumbers: true,
                }}
            />
        </div>
    )
}

export default CodeEditor
