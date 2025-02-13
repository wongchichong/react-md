import { forwardRef } from "react"

import type { SimpleListItemProps } from "@react-md/list"
import { SimpleListItem } from "@react-md/list"
import { bem } from "@react-md/utils"

export interface OptionProps extends SimpleListItemProps {
    /**
     * Boolean if the option is currently selected via aria-activedescendant
     * movement.
     */
    focused: boolean

    /**
     * Boolean if the option's value is equal to the current listbox's value if it
     * is acting as a select component.
     */
    selected: boolean
}

const block = bem("rmd-option")

/**
 * The Option component is a simple wrapper for the `SimpleListItem` that adds
 * some required a11y for behaving as the `option` role.
 */
export const Option = forwardRef<HTMLLIElement, OptionProps>(function Option(
    {
        className,
        selected = false,
        focused,
        children,
        textChildren = true,
        ...props
    },
    ref
) {
    return (
        <SimpleListItem
            {...props}
            ref={ref}
            role="option"
            aria-selected={selected || undefined}
            clickable
            className={cn(
                block({
                    selected,
                    focused,
                }),
                className
            )}
            textChildren={textChildren}
        >
            {children}
        </SimpleListItem>
    )
})
