import { $$, CSSProperties } from 'voby'


export interface HighlightedResultProps {
    /**
     * An optional id to use for the `<span>`. This will be suffixed by the
     * current `index` if it was provided
     */
    id?: FunctionMaybe<Nullable<string>>

    /**
     * An optional style to provide to the `<span>`.
     */
    style?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to provide to the `<span>`.
     */
    className?: Class

    /**
     * The match index which is automatically added when the `repeatable` prop is
     * used for nested matches.
     */
    index?: FunctionMaybe<Nullable<number>>

    /**
     * The current value to match against.
     */
    value: FunctionMaybe<string>

    /**
     * Boolean if the highlighting functionality should be enabled. Setting this
     * to false will just return the `children` instead.
     */
    enabled?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the highlighting can be repeated multiple times within the
     * children string.
     */
    repeatable?: FunctionMaybe<Nullable<boolean>>

    /**
     * The children to highlight. If this is not a string, the highlight will not
     * work.
     */
    children: Children
}

/**
 * The `HighlightedResult` component can be used to bold specific letters
 * within the `children` if the `children` is a string.
 */
export function HighlightedResult({
    id: propId,
    style,
    className,
    enabled = true,
    value: val,
    children,
    repeatable = false,
    index: ind = 0,
}: HighlightedResultProps): Element {
    const value = $$(val), index = $$(ind)
    if (!enabled || !value || typeof children !== "string") {
        return <>{children}</>
    }

    const i = children.toLowerCase().indexOf(value.toLowerCase())
    if (i === -1) {
        return <>{children}</>
    }

    const end = i + value.length
    let id = propId
    if (id && index > 0) {
        id = `${id}-${index}`
    }

    return (
        <>
            {i > 0 && children.substring(0, i)}
            <span
                id={id}
                style={style}
                className={["rmd-typography--bold", className]}
            >
                {children.substring(i, end)}
            </span>
            {end < children.length && (
                <HighlightedResult
                    style={style}
                    className={className}
                    value={value}
                    enabled={enabled && repeatable}
                    repeatable={repeatable}
                    index={index + 1}
                >
                    {children.substring(end)}
                </HighlightedResult>
            )}
        </>
    )
}
