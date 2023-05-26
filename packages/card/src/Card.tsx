


import { bem } from "@react-md/utils"

export interface CardProps<T extends EventTarget = HTMLDivElement> extends HTMLAttributes<T> {
    /**
     * Boolean if the card should gain additional box-shadow elevation once
     * hovered.
     */
    raisable?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the card should no longer be `display: inline-block`, but
     * instead `display: block; width: 100%;`.
     */
    fullWidth?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the card should use a border instead of box-shadow. Enabling
     * this prop will always disable the `raisable` prop.
     */
    bordered?: FunctionMaybe<Nullable<boolean>>

    /** @deprecated \@since 5.1.3 Use {@link raisable} instead. */
    raiseable?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-card")

/**
 * This is the root card component that should be used along side all the other
 * card parts. It adds some general styles and elevation to help show
 * prominence.
 */
export const Card = (
    {
        className,
        children,
        raiseable = false,
        raisable = raiseable,
        fullWidth = false,
        bordered = false,
        ref,
        ...props
    }: CardProps<HTMLDivElement>
) => {
    return (
        <div
            {...props}
            ref={ref}
            className={[
                block({
                    bordered,
                    shadowed: !bordered,
                    raisable: !bordered && raisable,
                    "full-width": fullWidth,
                }),
                className
            ]}
        >
            {children}
        </div>
    )
}