import { bem } from "@react-md/utils"

export type DividerElement = HTMLHRElement | HTMLDivElement

export interface DividerProps extends HTMLAttributes<DividerElement> {
    /**
     * Boolean if the divider should appear inset instead of full width. This
     * really just applied a margin-left (or margin-right when dir="rtl").
     *
     * If you want to create a divider that is centered, you most likely want to
     * use the `rmd-divider-theme-update-var` mixin instead to update the
     * `max-size` of the divider.
     */
    inset?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the divider should be vertical instead of horizontal. This will
     * change the divider to be rendered as a `<div>` instead of an `<hr>`.
     *
     * Note: If your parent element of the divider does not have a static height
     * set, you **must** manually set the height of the divider to a static
     * non-percentage number OR use the `VerticalDivider` component instead to
     * automagically create a valid percentage height.
     */
    vertical?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-divider")

export const Divider = (
    {
        inset = false,
        vertical = false,
        role = "separator",
        className,
        ref,
        ...props
    }: DividerProps
) => {
    const Component = (vertical ? "div" : "hr") //as ElementType

    return (
        <Component
            {...props}
            ref={ref}
            role={role as any}
            className={[
                block({ inset: !vertical && inset, vertical }),
                className
            ]}
        />
    )
}
