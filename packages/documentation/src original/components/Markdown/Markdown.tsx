import type { HTMLAttributes, ReactElement } from "react"
import { useEffect, useState } from "react"

import { Markdown as MarkdownRenderer } from "react-marked-renderer"

import { getLanguage, highlightCode } from "../../components/CodeBlock/utils"

import styles from "./Markdown.module.scss"
import { renderers } from "./renderers"
import { transformMarkdown } from "./utils"

function useMarkdownResolver(markdown: MarkdownProps["children"]): string {
    /* eslint-disable react-hooks/rules-of-hooks */
    // i will never swap between strings and promises
    if (typeof markdown === "string") {
        return transformMarkdown(markdown)
    }

    const [resolved, setResolved] = useState("")
    useEffect(() => {
        markdown().then((md) => {
            if (typeof md === "string") {
                setResolved(transformMarkdown(md))
            } else if (typeof md.default === "string") {
                setResolved(transformMarkdown(md.default))
            }
        })
    }, [markdown])

    return resolved
}

export type ResolveMarkdown = () => Promise<string | { default: string }>
export type MarkdownChildren = string | ResolveMarkdown

export type MarkdownProps = HTMLAttributes<HTMLDivElement> & {
    children: ResolveMarkdown | string
    disableSinglePMargin?: FunctionMaybe<Nullable<boolean>>
}

export default function Markdown({
    className,
    children,
    disableSinglePMargin,
    ...props
}: MarkdownProps): Child {
    const markdown = useMarkdownResolver(children)

    return (
        <>
            <div
                {...props}
                className={cn(
                    styles.container,
                    {
                        [styles.marginless]: disableSinglePMargin,
                    },
                    className
                )}
            >
                <MarkdownRenderer
                    markdown={markdown}
                    renderers={renderers}
                    getLanguage={getLanguage}
                    highlightCode={highlightCode}
                />
            </div>
        </>
    )
}
