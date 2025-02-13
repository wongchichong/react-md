import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { bem } from "@react-md/utils"

const block = bem("rmd-card")

export interface CardSubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Boolean if the title should not be able to line-wrap and will ellipsis long
     * text.
     */
    noWrap?: boolean

    /**
     * Boolean if the subtitle should no longer use the secondary text color
     * within cards.
     */
    disableSecondaryColor?: boolean
}

/**
 * A subtitle for the `Card`. This is usually used with the `CardHeader`
 * component after the `CardTitle`.
 */
export const CardSubtitle = forwardRef<HTMLHeadingElement, CardSubtitleProps>(
    function CardSubtitle(
        {
            className,
            children,
            noWrap = false,
            disableSecondaryColor = false,
            ...props
        },
        ref
    ) {
        return (
            <h6
                {...props}
                ref={ref}
                className={cn(
                    block("subtitle", {
                        secondary: !disableSecondaryColor,
                    }),
                    {
                        "rmd-card--no-wrap": noWrap,
                    },
                    className
                )}
            >
                {children}
            </h6>
        )
    }
)
