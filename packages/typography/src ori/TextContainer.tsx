import type {
    ElementType,
    HTMLAttributes,
    ReactElement,
    ReactNode,
} from "react"
import { Children, cloneElement, forwardRef, isValidElement } from "react";
;
import type { ClassNameCloneableChild } from "@react-md/utils"

/**
 * A union of the available text container sizes. One of these values must be
 * chosen to help set the max width for text.
 */
export type TextContainerSize = "auto" | "mobile" | "desktop"

/**
 * A type describing the text container's children render function. It provides
 * an object containing the correct (and merged) className and expects a
 * renderable element to be returned.
 */
export type TextContainerRenderFunction = (props: {
    className: string
}) => ReactElement

/**
 * The base props for rendering the text component.
 */
export interface TextContainerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * An optional className to merge with typography text container styles.
     */
    className?: string

    /**
     * The size for the text container. This can usually just be left at the
     * default of `"auto"` since it will automatically transition between
     * `"mobile"` and `"desktop"` based on media queries.  However, you can also
     * manually specify `"mobile"` or `"desktop"` if needed.
     */
    size?: TextContainerSize

    /**
     * The component to render as. By default this will just be a div, but
     * anything can be provided.
     */
    component?: ElementType

    /**
     * Either a child render function or a react node. If this is not the child
     * render function, a different wrapper component can be provided using the
     * `component` prop.
     */
    children?: ReactNode | ClassNameCloneableChild | TextContainerRenderFunction

    /**
     * Boolean if the `className` should be cloned into the `children` for this
     * component.
     *
     * Note: This will only work if the child component passed the `className`
     * down to to the DOM element.
     */
    clone?: boolean
}

export const TextContainer = forwardRef<
    HTMLDivElement | ElementType,
    TextContainerProps
>(function TextContainer(
    {
        className: propClassName,
        component: Component = "div",
        size = "auto",
        children,
        clone,
        ...props
    },
    ref
) {
    const className = cn(
        `rmd-text-container rmd-text-container--${size}`,
        propClassName
    )
    if (clone && isValidElement(children)) {
        const child = Children.only(children)
        return cloneElement(child, {
            className: cn((child.props as any).className, className),
        } as HTMLAttributes<HTMLDivElement>)
    }

    if (typeof children === "function") {
        return (children as TextContainerRenderFunction)({ className })
    }

    return (
        <Component {...props} className={className} ref={ref}>
            {children}
        </Component>
    )
})
