import type { ButtonHTMLAttributes } from "react"
import { forwardRef } from "react"


/**
 * The props for the unstyled button are just all the normal button html
 * attributes without the `type` since this component forces the `type="button"`
 * value.
 */
export type UnstyledButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "type"
>

/**
 * The unstyled button is a really simple button element that resets the default
 * browser button styles into a clear clickable element.
 */
export const UnstyledButton = forwardRef<
    HTMLButtonElement,
    UnstyledButtonProps
>(function UnstyledButton({ className, children, ...props }, ref) {
    return (
        <button
            {...props}
            type="button"
            ref={ref}
            className={cn("rmd-button-unstyled", className)}
        >
            {children}
        </button>
    )
})
