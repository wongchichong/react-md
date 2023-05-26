


import { bem } from "@react-md/utils"

export type ListElement = HTMLUListElement | HTMLOListElement
export interface ListProps extends HTMLAttributes<ListElement> {
    /**
     * The role is set to `"none"` by default for lists screen readers announce
     * lists differently than other elements on the page. Since the major use-case
     * for lists is to contain clickable items, setting this to `"none"` fixes
     * this issue.
     */
    role?: HTMLAttributes<ListElement>["role"]

    /**
     * Boolean if the dense spec should be applied to the list.
     */
    dense?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the list's order is important. This will update the list to be
     * rendered as an `<ol>` instead of `<ul>`.
     */
    ordered?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the list should appear horizontally instead of vertically.
     */
    horizontal?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-list")

/**
 * The `List` component creates an unstyled ordered or unordered list that
 * should be used with the `ListItem`, `ListItemLink`, and `SimpleListItem`
 * components.
 */
export const List = ({
    role = "none",
    dense = false,
    ordered = false,
    horizontal = false,
    className,
    children,
    ref,
    ...props
}: ListProps
) => {
    const Component = (ordered ? "ol" : "ul") as "ul"

    return (
        <Component
            {...props}
            ref={ref}
            role={role as any}
            className={[block({ dense, horizontal }), className]}
        >
            {children}
        </Component>
    )
}
