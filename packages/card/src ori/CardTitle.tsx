import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { bem } from "@react-md/utils"

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Boolean if the title should be smaller than normal. You should usually
     * enable this prop when using the `CardSubtitle` with this component in the
     * `CardHeader`.
     */
    small?: boolean

    /**
     * Boolean if the title should not be able to line-wrap and will ellipsis long
     * text.
     */
    noWrap?: boolean
}

const block = bem("rmd-card")

/**
 * The `CardTitle` component should normally be used within the `CardHeader` to
 * create a nicely styled `<h5>` title for your card. This can also be used
 * along with the `CardSubtitle` component within the `CardHeader` for a main
 * title and a subtitle.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    function CardTitle(
        { className, children, small = false, noWrap = false, ...props },
        ref
    ) {
        return (
            <h5
                {...props}
                ref={ref}
                className={cn(
                    block("title", { small }),
                    {
                        "rmd-card--no-wrap": noWrap,
                    },
                    className
                )}
            >
                {children}
            </h5>
        )
    }
)
