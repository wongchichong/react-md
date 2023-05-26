
import {  useMemo } from 'voby'

import { bem } from "@react-md/utils"

import type { TableCellConfig } from "./config"
import { TableConfigProvider, useTableConfig } from "./config"
import { StickyTableProvider } from "./sticky"

export interface TableHeaderProps<T extends EventTarget = HTMLTableSectionElement>
    extends HTMLAttributes<T>,
    Pick<TableCellConfig, "lineWrap"> {
    /**
     * This is a rename of the `disableHover` of the `TableConfig` since table
     * headers are not hoverable by default. This prop can be enabled to add the
     * row hover color within table headers, but it is not really recommended.
     */
    hoverable?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the header should be rendered as a sticky header that will cover
     * the table contents as the page or `TableContainer` is scrolled.
     */
    sticky?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-thead")

/**
 * Creates a `<thead>` element with some basic styles. This component will also
 * update the table configuration so that all the `TableCell` children will
 * automatically become `<th>` elements instead of the normal `<td>` as well as
 * disabling the hover effect and line wrapping. The hover effect and
 * line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
export const TableHeader =(
    {
        className,
        hoverable = false,
        lineWrap: propLineWrap,
        children,
        sticky = false,
        ref,
        ...props
    }: TableHeaderProps<HTMLTableSectionElement>
) =>{
    // update the table configuration with the custom overrides for the `<thead>`
    const { hAlign, vAlign, lineWrap, disableHover, disableBorders } =
        useTableConfig({
            lineWrap: propLineWrap,
            disableHover: !hoverable,
        })

    const configuration = useMemo(() => ({
        header: true,
        hAlign,
        vAlign,
        lineWrap,
        disableBorders,
        disableHover,
    }))

    return (
        <TableConfigProvider value={configuration}>
            <thead {...props} ref={ref} className={[block(), className]}>
                <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
            </thead>
        </TableConfigProvider>
    )
}