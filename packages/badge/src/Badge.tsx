import { bem } from "@react-md/utils"

import { isEmpty } from "./isEmpty"
import { $$ } from "voby"

export type BadgeTheme = "primary" | "secondary" | "default" | "clear"

export interface BadgeProps<T extends EventTarget = HTMLSpanElement> extends HTMLAttributes<T> {
    /**
     * The id for the badge. This is required for a11y since the element that the
     * badge is fixed to should include this id in the `aria-describedby` list.
     */
    id: FunctionMaybe<string>

    /**
     * The theme to use for the badge.
     */
    theme?: FunctionMaybe<Nullable<BadgeTheme>>

    /**
     * The children to display in the badge. If the children is `0` or `null`, the
     * default behavior is to not render the badge.
     */
    children?: Child

    /**
     * Boolean if the badge should still display if the children is set to `0`, or
     * `null`.  The default behavior is to render null for these cases since it
     * isn't extremely helpful to display an "empty" badge.
     */
    disableNullOnZero?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-badge")

/**
 * This component is generally used for displaying notifications with a count
 * relative to another element with the `BadgeContainer` component. However, it
 * can be used by itself to display any supplementary content if needed.
 */
export const Badge = (
    {
        className,
        theme = "default",
        children = null,
        disableNullOnZero = false,
        ref,
        ...props
    }: BadgeProps<HTMLSpanElement>
) => {
    if (isEmpty(children, $$(disableNullOnZero))) {
        return null
    }

    return (
        <span
            {...props}
            ref={ref}
            className={[block({ [$$(theme)]: theme !== "clear" }), className]}
        >
            {children}
        </span>
    )
}
