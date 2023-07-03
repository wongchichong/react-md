import styles from "./Code.module.scss"

export interface CodeProps<T extends HTMLElement> extends HTMLAttributes<T> {
    /**
     * Boolean if the code is displayed inline with other text normally meaning it
     * is not a child of the `CodeBlock` component.
     *
     * @defaultValue `true` when the `dangerouslySetInnerHTML` prop is not defined
     */
    inline?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the code should no be able to line wrap. This should really only
     * be enabled when the parent element also has `white-space: nowrap` and
     * overflown text should be ellipsis-ed
     *
     * @defaultValue `false`
     */
    noWrap?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the code should display backticks before and after the content
     * to help show that this is a code block.
     *
     * @defaultValue `true` when the `dangerouslySetInnerHTML` prop is not define
     */
    ticked?: FunctionMaybe<Nullable<boolean>>
}

/**
 * This component is normally used to render inline code throughout the website.
 */
export default function Code(
    {
        children,
        className,
        dangerouslySetInnerHTML,
        inline = !dangerouslySetInnerHTML,
        ticked = inline,
        noWrap = false,
        ref,
        ...props
    }:CodeProps<HTMLElement>) {
    return (
        <code
            {...props}
            ref={ref}
            className={[
                styles.code,
                {
                    [styles.inline]: inline,
                    [styles.ticked]: ticked,
                    [styles.oneline]: inline && noWrap,
                },
                className
            ]}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
            {children}
        </code>
    )
}
