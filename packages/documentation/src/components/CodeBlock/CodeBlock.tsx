import Code from "../Code"
import styles from "./CodeBlock.module.scss"
import LineNumbers from "./LineNumbers"
import { highlightCode } from "./utils"

export interface CodeBlockProps<T extends HTMLPreElement> extends HTMLAttributes<T> {
    /**
     * An optional code language. This should be one of:
     * - js
     * - jsx
     * - javascript
     * - ts
     * - tsx
     * - typescript
     * - css
     * - scss
     * - markup
     * - markdown
     * - bash
     * - shell
     * - git
     * - diff
     * - json
     * - properties
     *
     * And whatever the default Prism languages are. Update the `.babelrc` to add
     * additional languages for the `prismjs` plugin.
     */
    language?: FunctionMaybe<Nullable<string>>

    /**
     * Boolean if the code should be highlighted using Prism
     */
    highlight?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if line numbers should be displayed with the code.
     */
    lineNumbers?: FunctionMaybe<Nullable<boolean>>

    /**
     * This should normally be a string of code to display, but can also be any
     * renderable thing. The {@link highlight} prop will only work for string
     * `children`.
     */
    children: ReactNode
}

/**
 * Renders a code block with highlighted code using PrismJS.
 */
export default function CodeBlock(
    {
        className,
        language = "markdown",
        children,
        highlight = true,
        lineNumbers: propLineNumbers,
        suppressHydrationWarning = false,
        ref,
        ...props
    }:CodeBlockProps<HTMLPreElement>) 
    {
    const code = typeof children === "string" ? children : ""

    const lineNumbers =
        propLineNumbers ??
        (!/markup|markdown|shell/.test(language) &&
            (code.match(/\r?\n/g) || []).length + 1 > 3)

    let dangerouslySetInnerHTML: DOMAttributes<HTMLElement>["dangerouslySetInnerHTML"]
    if (code && highlight) {
        dangerouslySetInnerHTML = {
            __html: highlightCode(code, language),
        }
    }

    return (
        <pre
            {...props}
            data-linenumbers={lineNumbers || undefined}
            ref={ref}
            className={[
                styles.block,
                lineNumbers && styles.counted,
                `language-${language}`,
                className
            ]}
            suppressHydrationWarning={suppressHydrationWarning}
        >
            {lineNumbers && code && <LineNumbers code={code} />}
            <Code
                inline={!highlight || !code}
                dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                suppressHydrationWarning={suppressHydrationWarning}
            >
                {dangerouslySetInnerHTML ? undefined : children}
            </Code>
        </pre>
    )
}
