import { TextContainer } from "@react-md/typography"

import type { MarkdownProps } from "./Markdown"
import Markdown from "./Markdown"

export interface MarkdownPageProps extends MarkdownProps {
    containerClassName?: Class
}

export default function MarkdownPage({
    containerClassName,
    children,
    ...props
}: MarkdownPageProps): Child {
    return (
        <TextContainer className={["markdown-page", containerClassName]}>
            <Markdown {...props}>{children}</Markdown>
        </TextContainer>
    )
}
