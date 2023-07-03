import type { CSSProperties, /*JSX*/ } from 'voby'
import Voby, { cloneElement } from 'voby'

import type { ClassNameCloneableChild } from "@react-md/utils"
import { bem } from "@react-md/utils"
import { Children } from '@react-md/react'

export interface IconRotatorBaseProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * An optional style to apply to the surrounding span when the `forceIconWrap`
     * prop is enabled or the children is not a single react element.
     */
    // style?: FunctionMaybe<Nullable<string | StyleProperties>>|?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional className to apply.
     */
    className?: Class

    /**
     * Boolean if the rotation should be animated instead of static.
     */
    animate?: ObservableMaybe<boolean>

    /**
     * Boolean if the icon is currently rotated.
     */
    rotated: ObservableMaybe<boolean>

    /**
     * Boolean if the child icon should be "forcefully" wrapped in a `<span>`
     * element. This should be enabled if you have a custom icon that does not
     * pass the `className` prop down.
     */
    forceIconWrap?: ObservableMaybe<boolean>
}

export interface IconRotatorProps extends IconRotatorBaseProps {
    /**
     * The icon that should be rotated. If this is a valid React Element, the
     * class names will be cloned into that icon, otherwise the icon will be
     * wrapped in a span with the correct class names applied.
     */
    children: Children
}

const block = bem("rmd-icon-rotator")

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a
 * one degrees to another.
 */
export const IconRotator = (
    {
        style,
        className: propClassName,
        animate = true,
        rotated,
        children,
        forceIconWrap = false,
        ref,
        ...props
    }: IconRotatorBaseProps
) => {
    const className = [block({ animate, rotated }), propClassName]
    if (!forceIconWrap/*  && isValidElement(children) */) {
        const child = Children.only(children)
        return cloneElement(child, {
            className: [className] //, child.props.className),
        })
    }

    return (
        <span {...props} style={style} className={className} ref={ref}>
            {children}
        </span>
    )
}

