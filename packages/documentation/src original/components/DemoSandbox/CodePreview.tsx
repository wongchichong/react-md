import type { ReactElement } from "react"
import { useEffect, useRef } from "react"

import type { IFiles } from "codesandbox-import-utils/lib/api/define"

import CodeBlock from "components/CodeBlock"

import styles from "./CodePreview.module.scss"
import FileNotFound from "./FileNotFound"
import { LoadingCode } from "./LoadingCode"

export interface CodePreviewProps {
    loading: boolean
    fileName: string
    sandbox: IFiles | null
    offset: boolean
    onFileChange: (fileName: string) => void
}

export default function CodePreview({
    fileName,
    sandbox,
    offset,
    loading,
    onFileChange,
}: CodePreviewProps): Child {
    let content = ""
    let language = "markdown"
    if (sandbox && sandbox[fileName]) {
        if (fileName.endsWith(".env")) {
            language = "properties"
        } else {
            language = fileName.substring(fileName.lastIndexOf(".") + 1)
        }

        ({ content } = sandbox[fileName])
        if (typeof content !== "string") {
            content = `${JSON.stringify(content, null, 2)}\n`
        }

        content = content.trim()
    }

    const code = useRef<HTMLPreElement | null>(null)
    useEffect(() => {
        if (code.current) {
            code.current.scrollTop = 0
        }
    }, [content])

    if (loading) {
        return <LoadingCode offset={offset} />
    }

    if (!content) {
        return (
            <FileNotFound
                fileName={fileName}
                sandbox={sandbox}
                offset={offset}
                onFileChange={onFileChange}
            />
        )
    }

    return (
        <CodeBlock
            ref={code}
            language={language}
            className={cn(styles.code, {
                [styles.offset]: offset,
            })}
            lineNumbers
            // need to make this focusable so keyboard users can scroll
            // the page
            tabIndex={0}
        >
            {content}
        </CodeBlock>
    )
}
