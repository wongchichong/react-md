
import { useMemo } from 'voby'


import type { TableConfig } from "./config"
import { TableConfigProvider, useTableConfig } from "./config"

export interface TableBodyProps<T extends EventTarget = HTMLTableSectionElement>
    extends HTMLAttributes<T>,
    Omit<TableConfig, "header"> { }

/**
 * Creates a `<tbody>` element that also allows for overriding all the child
 * `TableCell` components with additional styling behavior.
 */
export const TableBody = (
    {
        className,
        children,
        hAlign: propHAlign,
        vAlign: propVAlign,
        lineWrap: propLineWrap,
        disableHover: propDisableHover,
        disableBorders: propDisableBorders,
        ref,
        ...props
    }: TableBodyProps<HTMLTableSectionElement>
) => {
    // update the table configuration with the custom overrides for the `<thead>`
    const { hAlign, vAlign, lineWrap, disableHover, disableBorders } =
        useTableConfig({
            hAlign: propHAlign,
            vAlign: propVAlign,
            lineWrap: propLineWrap,
            disableHover: propDisableHover,
            disableBorders: propDisableBorders,
        })

    const configuration = useMemo(() => ({
        header: false,
        hAlign,
        vAlign,
        lineWrap,
        disableBorders,
        disableHover,
    }))

    return (
        <TableConfigProvider value={configuration}>
            <tbody {...props} ref={ref} className={["rmd-tbody", className]}>
                {children}
            </tbody>
        </TableConfigProvider>
    )
}
