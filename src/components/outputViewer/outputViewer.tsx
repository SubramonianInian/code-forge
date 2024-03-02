import './outputViewer.css'
interface Props {
    srcDoc: string
}
const OutputViewer: React.FC<Props> = ({ srcDoc }) => {
    return (
        <div className="output-wrapper">
            <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default OutputViewer
