


import { bem } from "@react-md/utils"

export interface CardContentProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * Boolean if the padding should be removed from the content. This is really
     * only useful if your child elements have their own padding.
     */
    disablePadding?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the extra `padding-bottom` that gets applied when the
     * `CardContent` is the last component within the `Card`. If the
     * `disablePadding` prop is enabled, this prop will be ignored and the extra
     * padding will not be applied.
     */
    disableExtraPadding?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the current secondary text color should be disabled from the
     * content.
     */
    disableSecondaryColor?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if any `<p>` tags that appear as children of this component should
     * no longer have their `margin-top` and `margin-bottom` removed. The default
     * behavior is to remove all `margin-top` and remove the `margin-bottom` if
     * the `<p>` is the last child.
     */
    disableParagraphMargin?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-card")

/**
 * The main content for the `Card`. This adds some additional padding and removes
 * margin from `<p>` tags by default.
 */
export const CardContent = (
    {
        disablePadding = false,
        disableExtraPadding = false,
        disableSecondaryColor = false,
        disableParagraphMargin = false,
        className,
        children,
        ref,
        ...props
    }: CardContentProps<HTMLDivElement>
) => {
    return (
        <div
            {...props}
            ref={ref}
            className={[
                block("content", {
                    padded: !disablePadding,
                    "extra-padding": !disablePadding && !disableExtraPadding,
                    "remove-margin": !disableParagraphMargin,
                    secondary: !disableSecondaryColor,
                }),
                className
            ]}
        >
            {children}
        </div>
    )
}
