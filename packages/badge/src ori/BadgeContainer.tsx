import type { HTMLAttributes, ReactElement, Ref } from "react"
import { forwardRef } from "react"

import { bem } from "@react-md/utils"

export type BadgeContainerProps = HTMLAttributes<HTMLSpanElement>

const block = bem("rmd-badge-container")

/**
 * This is a really simple component that will just allow you to position a
 * badge relative to another component.
 */
export const BadgeContainer = forwardRef<HTMLSpanElement, BadgeContainerProps>(
    function BadgeContainer(
        { className, children, ...props }: BadgeContainerProps,
        ref?: Ref<HTMLSpanElement>
    ): ReactElement {
        return (
            <span {...props} className={cn(block(), className)} ref={ref}>
                {children}
            </span>
        )
    }
)
