import { $$, ObservableMaybe } from 'voby'


import type { ButtonProps } from "@react-md/button"
import { Button } from "@react-md/button"
import { useIcon } from "@react-md/icon"

import type { BadgeProps, BadgeTheme } from "./Badge"
import { Badge } from "./Badge"
import { isEmpty } from "./isEmpty"

export interface BadgedButtonProps<T = HTMLButtonElement>
    extends ButtonProps,
    Pick<BadgeProps, "disableNullOnZero"> {
    /**
     * An id to use for the button. Either this prop or the `badgeId` are required
     * for a11y when the `badgeChildren` is provided. If the `badgeId` is omitted,
     * the badge's id will be set to `${id}-badge`
     */
    id?: FunctionMaybe<Nullable<string>>

    /**
     * An optional id for the badge. Either this prop or the `id` prop is required
     * for a11y when the `badgeChildren` is provided to create the
     * `aria-describedby` value on the button.
     */
    badgeId?: FunctionMaybe<Nullable<string>>

    /**
     * An optional ref for the badge. The main `ref` will be forwarded to the
     * `button` element.
     */
    badgeRef?: ObservableMaybe<HTMLSpanElement>

    /**
     * The theme to use for the badge.
     */
    badgeTheme?: FunctionMaybe<Nullable<BadgeTheme>>

    /**
     * An optional style to apply to the badge since the `style` prop is passed
     * down to the `Button` component instead.
     */
    badgeStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to apply to the badge since the `className` prop is
     * passed down to the `Button` component instead.
     */
    badgeClassName?: Class

    /**
     * The content to display within the button since the `children` prop is
     * passed down to the `Badge` component instead.
     */
    buttonChildren?: Children
}

/**
 * This is a small wrapper for the `Button` component that will automatically
 * apply the `aria-describedby` attribute when it has been "badged". It also
 * adds some reasonable defaults for the most common use-case for badges:
 * notifications.
 */
export const BadgedButton = (
    {
        "aria-label": ariaLabel = "Notifications",
        badgeStyle,
        badgeClassName,
        badgeRef,
        badgeId: propBadgeId,
        buttonChildren: propButtonChildren,
        buttonType = "icon",
        badgeTheme,
        children = null,
        disableNullOnZero = false,
        "aria-describedby": propDescribedBy,
        ref,
        ...props
    }: BadgedButtonProps<HTMLButtonElement> & { "aria-label"?: string, "aria-describedby"?: Class }
) => {
    const { id } = props
    const buttonChildren = useIcon("notification", propButtonChildren)

    let badgeId = propBadgeId || ""
    if (!badgeId && id) {
        badgeId = `${id}-badge`
    }

    let describedBy = propDescribedBy
    if (!isEmpty(children, $$(disableNullOnZero))) {
        describedBy = [describedBy, badgeId]
    }

    return (
        <Button
            {...props}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            ref={ref}
            buttonType={buttonType}
        >
            {buttonChildren}
            <Badge
                id={badgeId}
                //@ts-ignore
                ref={badgeRef}
                theme={badgeTheme}
                style={badgeStyle}
                className={badgeClassName}
                disableNullOnZero={disableNullOnZero}
            >
                {children}
            </Badge>
        </Button>
    )
}
