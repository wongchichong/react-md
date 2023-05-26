import { Children } from "@react-md/react"
import { cloneElement, $$ } from "voby"

export interface TextIconSpacingProps {
    /**
     * An optional class to apply to the surrounding `<span>` when the
     * `forceIconWrap` prop is enabled or the icon is not a valid React Element.
     * If the `forceIconWrap` prop is not enabled, it will be cloned into the icon
     * instead.
     */
    class?: Class
    className?: Class

    /**
     * An optional icon to display with a text button. This is invalid for icon
     * buttons. If this is a single element, a new class name will be cloned into
     * the element to get correct spacing so if you have a custom icon element,
     * you **must** also pass that class name down. If you are using one of the
     * react-md icon component packages, this is handled automatically.
     *
     * If this is not a valid react element, the icon will be wrapped in a
     * `<span>` instead with the class names applied.
     */
    icon?: Child

    /**
     * Boolean if the icon should appear after the text instead of before.
     */
    iconAfter?: FunctionMaybe<Nullable<boolean>>

    /**
     * The children to render before or after the provided icon. This is defaulted
     * to `null` so that providing a `null` icon will correctly render without
     * React crashing.
     */
    children?: Children

    /**
     * The class name to use for an icon that is placed before text.
     */
    beforeclass?: FunctionMaybe<Nullable<string>>

    /**
     * The class name to use for an icon that is placed after text.
     */
    afterclass?: FunctionMaybe<Nullable<string>>

    /**
     * The class name to use for an icon that is placed before above the text.
     * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
     * disabled or omitted.
     */
    aboveclass?: FunctionMaybe<Nullable<string>>

    /**
     * The class name to use for an icon that is placed before above the text.
     * This is used when the `stacked` prop is enabled and the `iconAfter` prop is
     * enabled.
     */
    belowclass?: FunctionMaybe<Nullable<string>>

    /**
     * Boolean if the icon should be forced into a `<span>` with the class names
     * applied instead of attempting to clone into the provided icon.
     */
    forceIconWrap?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the icon and text should be stacked instead of inline. Note:
     * You'll normally want to update the container element to have
     * `display: flex` and `flex-direction: column` for this to work.
     */
    stacked?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the icon and content are in a `column-reverse` or `row-reverse`
     * `flex-direction`. This will swap the different classs as needed.
     *
     * @remarks \@since 2.5.0
     */
    flexReverse?: FunctionMaybe<Nullable<boolean>>
}

export function TextIconSpacing({
    icon: propIcon,
    children = null,
    stacked = false,
    iconAfter = false,
    flexReverse = false,
    forceIconWrap = false,
    beforeclass = "rmd-icon--before",
    afterclass = "rmd-icon--after",
    aboveclass = "rmd-icon--above",
    belowclass = "rmd-icon--below",
    ...props
}: TextIconSpacingProps): Element {
    if (!propIcon) {
        return <>{children}</>
    }

    const isAfter = flexReverse ? !iconAfter : iconAfter
    const baseclass = [
        {
            [$$(beforeclass)]: !stacked && !isAfter,
            [$$(afterclass)]: !stacked && isAfter,
            [$$(aboveclass)]: stacked && !isAfter,
            [$$(belowclass)]: stacked && isAfter,
        },
        props.class
    ]

    let iconEl: Child = propIcon
    let content = children
    if (!forceIconWrap /* && isValidElement(propIcon) */) {
        debugger
        const icon = Children.only(propIcon)
        iconEl = cloneElement(icon, {
            className: [baseclass] //, icon.className],
        })
    } else if (propIcon) {
        iconEl = <span class={["rmd-text-icon-spacing", baseclass]}>
            {propIcon}
        </span>
    }

    if (iconEl)
        content = (
            <>
                {!iconAfter && iconEl}
                {children}
                {iconAfter && iconEl}
            </>
        )


    return <>{content}</>
}
