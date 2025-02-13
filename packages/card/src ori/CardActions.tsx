import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { bem } from "@react-md/utils"

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The alignment to use for the card actions. This is really just a simple
     * pass through to the `justify-content` flex property.
     */
    align?: "start" | "end" | "center"
}

const block = bem("rmd-card")

/**
 * This component is generally used to hold the main actions for the `Card`.
 * It's a good place to add additional buttons or expansion toggles.
 */
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
    function CardActions({ className, align = "end", children, ...props }, ref) {
        return (
            <div
                {...props}
                ref={ref}
                className={cn(
                    block("actions", {
                        [align]: align !== "end",
                    }),
                    className
                )}
            >
                {children}
            </div>
        )
    }
)
