import './App.css'
import { useEffect, useState } from 'react'
import { Editor } from './interfaces/editor'
import useLocalStorage from './hooks/useLocalStorage'
import CodeEditor from './components/codeEditor/codeEditor'
import OutputViewer from './components/outputViewer/outputViewer'

function App() {
    const [js, setJs] = useLocalStorage('js', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [html, setHtml] = useLocalStorage('html', '')
    const [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
        }, 250)

        return () => clearTimeout(timeout)
    }, [html, css, js])

    const Editors = () => {
        const editors: Editor[] = [
            {
                onchange: setHtml,
                title: '🌐 HTML',
                content: html,
                language: 'xml',
            },
            {
                onchange: setCss,
                title: '🎨 CSS',
                content: css,
                language: 'css',
            },
            {
                onchange: setJs,
                title: '🔧 JS',
                content: js,
                language: 'xmjavascriptl',
            },
        ]
        return (
            <div className="editor-wrapper">
                {editors.map(
                    ({ onchange, content, language, title }: Editor) => {
                        return (
                            <CodeEditor
                                key={title}
                                onChange={onchange}
                                editorTitle={title}
                                editorContent={content}
                                editorLanguage={language}
                            />
                        )
                    }
                )}
            </div>
        )
    }

    return (
        <div className="app-wrapper">
            {Editors()}
            <OutputViewer srcDoc={srcDoc} />
        </div>
    )
}

export default App
