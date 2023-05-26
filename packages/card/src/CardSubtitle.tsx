


import { bem } from "@react-md/utils"

const block = bem("rmd-card")

export interface CardSubtitleProps<T extends EventTarget = HTMLHeadingElement> extends HTMLAttributes<T> {
    /**
     * Boolean if the title should not be able to line-wrap and will ellipsis long
     * text.
     */
    noWrap?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the subtitle should no longer use the secondary text color
     * within cards.
     */
    disableSecondaryColor?: FunctionMaybe<Nullable<boolean>>
}

/**
 * A subtitle for the `Card`. This is usually used with the `CardHeader`
 * component after the `CardTitle`.
 */
export const CardSubtitle = (
    {
        className,
        children,
        noWrap = false,
        disableSecondaryColor = false,
        ref,
        ...props
    }: CardSubtitleProps<HTMLHeadingElement>
) => {
    return (
        <h6
            {...props}
            ref={ref}
            className={[
                block("subtitle", {
                    secondary: !disableSecondaryColor,
                }),
                {
                    "rmd-card--no-wrap": noWrap,
                },
                className
            ]}
        >
            {children}
        </h6>
    )
}

