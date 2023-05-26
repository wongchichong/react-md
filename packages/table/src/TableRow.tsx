


import { bem } from "@react-md/utils"

import type { TableRowConfiguration } from "./config"
import { useTableConfig } from "./config"

export interface TableRowProps<T extends EventTarget = HTMLTableRowElement>
    extends HTMLAttributes<T>,
    TableRowConfiguration {
    /**
     * Boolean if the current row has been selected and should apply the selected
     * background-color.
     */
    selected?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the row should be clickable and update the cursor while hovered
     * to be a pointer.
     */
    clickable?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-tr")

/**
 * Creates a `<tr>` element with some general styles that are inherited from the
 * base table configuration.
 */
export const TableRow = (
    {
        className,
        disableHover: propDisableHover,
        disableBorders: propDisableBorders,
        children,
        selected = false,
        clickable = false,
        ref,
        ...props
    }: TableRowProps<HTMLTableRowElement>
) => {
    const { disableHover, disableBorders } = useTableConfig({
        disableHover: propDisableHover,
        disableBorders: propDisableBorders,
    })

    return (
        <tr
            {...props}
            ref={ref}
            className={[
                block({
                    bordered: !disableBorders,
                    hoverable: !disableHover,
                    clickable,
                    selected,
                    "selected-hoverable": selected && !disableHover,
                }),
                className
            ]}
        >
            {children}
        </tr>
    )
}