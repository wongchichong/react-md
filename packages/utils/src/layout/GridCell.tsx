// ;
import { cloneElement/* , forwardRef, isValidElement */ } from 'voby'


import { bem } from "../bem"
import { useAppSize } from "../sizing/useAppSize"
import { Children } from '@react-md/react'

export interface GridCSSProperties {
    /**
     * The number of rows that a cell should span. If this value is provided, it
     * will be used instead of the `rowEnd` property. When this is `undefined`, it
     * will span 1 row as normal.
     */
    rowSpan?: FunctionMaybe<Nullable<number>>

    /**
     * The row that the cell should start at. This is a nice way to be able to
     * reorder cells within your grid.
     */
    rowStart?: FunctionMaybe<Nullable<number>> | string

    /**
     * The row that the cell should end at. This is a nice way to be able to
     * reorder cells within your grid but will be ignored if the `rowSpan`
     * property is provided.
     */
    rowEnd?: FunctionMaybe<Nullable<number>> | string

    /**
     * The number of columns that the cell should span. If this value is provided,
     * it will be used instead of the `colEnd` property.
     *
     * Note: If this value is larger than the number of columns allowed in the
     * current grid, it will shrink all the other columns.
     */
    colSpan?: FunctionMaybe<Nullable<number>>

    /**
     * The column that the cell should start at. When this is `undefined`, it will
     * just appear in normal order within the grid.
     */
    colStart?: FunctionMaybe<Nullable<number>> | string

    /**
     * The column that the cell should stop at. When this is `undefined`, it will
     * just appear in normal order within the grid and span only 1 column. If the
     * `colSpan` property was provided, this will be ignored.
     */
    colEnd?: FunctionMaybe<Nullable<number>> | string
}

//@ts-ignore
export interface GridCellProps
    extends HTMLAttributes<HTMLDivElement>,
    GridCSSProperties {
    /**
     * Boolean if the className should be cloned into the child instead of
     * wrapping in another div. This will only work if the `children` is a single
     * ReactElement.
     */
    clone?: FunctionMaybe<Nullable<boolean>>

    /**
     * The number of columns that the cell should span. If this value is provided,
     * it will be used instead of the `colEnd` property.
     *
     * Note: If this value is larger than the number of columns allowed in the
     * current grid, it will shrink all the other columns.
     */
    colSpan?: FunctionMaybe<Nullable<number>>

    /**
     * Optional Grid CSS Property overries that should be applied on phones only.
     */
    phone?: GridCSSProperties

    /**
     * Optional Grid CSS Property overries that should be applied on tablets and
     * above.
     */
    tablet?: GridCSSProperties

    /**
     * Optional Grid CSS Property overries that should be applied on desktop
     * screens.
     */
    desktop?: GridCSSProperties

    /**
     * Optional Grid CSS Property overries that should be applied on large
     * desktops only.
     */
    largeDesktop?: GridCSSProperties
}

const block = bem("rmd-grid")

export const GridCell = (
    {
        style,
        className,
        clone,
        children,
        colSpan: propColSpan,
        colStart: propColStart,
        colEnd: propColEnd,
        rowSpan: propRowSpan,
        rowStart: propRowStart,
        rowEnd: propRowEnd,
        phone,
        tablet,
        desktop,
        largeDesktop,
        ref,
        ...props
    }: GridCellProps
) => {
    const { isPhone, isTablet, isDesktop, isLargeDesktop } = useAppSize()

    let colSpan = propColSpan
    let colStart = propColStart
    let colEnd = propColEnd
    let rowSpan = propRowSpan
    let rowStart = propRowStart
    let rowEnd = propRowEnd
    const media =
        (isPhone && phone) ||
        (isTablet && tablet) ||
        (isLargeDesktop && largeDesktop) ||
        (isDesktop && desktop)

    if (media) {
        ({
            rowSpan = propRowSpan,
            rowStart = propRowStart,
            rowEnd = propRowEnd,
            colSpan = propColSpan,
            colStart = propColStart,
            colEnd = propColEnd,
        } = media)
    }

    const cellStyle = {
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowSpan ? `span ${rowSpan}` : rowEnd,
        //@ts-ignore
        ...style,
    }
    const cellClassName = [block("cell", { [`${colSpan}`]: colSpan, }), className]

    if (clone /* && isValidElement(children) */) {
        const child = Children.only(children)
        return cloneElement(child, {
            //@ts-ignore
            style: { ...child.style, ...cellStyle },
            //@ts-ignore
            className: cn(cellClassName, child.className),
        } as HTMLAttributes<HTMLDivElement>)
    }

    return (
        <div {...props} ref={ref} style={cellStyle} className={cellClassName}>
            {children}
        </div>
    )
}
