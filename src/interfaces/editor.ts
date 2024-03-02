export interface Editor {
    onchange: (content: string) => void
    title: string
    content: string
    language: string
}
