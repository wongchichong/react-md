import { $, $$ } from 'voby'
import type { AppBarActionProps } from "@react-md/app-bar"
import { AppBarAction } from "@react-md/app-bar"
import { useIcon } from "@react-md/icon"

import { useLayoutConfig } from "./LayoutProvider"
import { isToggleableLayout } from "./utils"

export interface LayoutCloseNavigationButtonProps extends AppBarActionProps {
    /**
     * Boolean if the button should be rendered. If this is omitted, it will only
     * be rendered for toggleable layouts.
     */
    rendered?: FunctionMaybe<Nullable<boolean>>
}

/**
 * The `LayoutCloseNavigationButton` is used to close the navigation panel for
 * toggleable layouts.
 */
export const LayoutCloseNavigationButton = (
    {
        id: propId,
        "aria-labelledby": ariaLabelledBy,
        "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Hide Navigation",
        onClick,
        first = true,
        last = true,
        buttonType = "icon",
        children: propChildren,
        rendered,
        ref,
        ...props
    }: LayoutCloseNavigationButtonProps & { "aria-labelledby"?: string, "aria-label"?: string } //<HTMLButtonElement>
) => {
    const children = useIcon("back", propChildren)
    const { baseId, layout: ly, hideNav } = useLayoutConfig()
    const layout = $$(ly)
    const handleClick = $((event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event)
        }

        hideNav()
    })

    const id = propId ?? `${baseId}-nav-x`
    const isRendered = rendered ?? isToggleableLayout(layout)
    if (!isRendered) {
        return null
    }

    return (
        <AppBarAction
            {...props}
            id={id}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            ref={ref}
            first={first}
            last={last}
            buttonType={buttonType}
            onClick={handleClick}
        >
            {children}
        </AppBarAction>
    )
}