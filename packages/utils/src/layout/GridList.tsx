// import type { HTMLAttributes, Child } from 'voby'
// import { Children, forwardRef } from 'voby'

import { Children } from "@react-md/react"
import { GridListCell } from "./GridListCell"
import type { GridListSize, UseGridListOptions } from "./useGridList"
import {
    DEFAULT_GRID_LIST_MAX_CELL_SIZE,
    DEFAULT_GRID_LIST_PADDING,
    GridListSizeProvider,
    useGridList,
} from "./useGridList"

/**
 * The children render function that will be provided the current grid list size
 * object and should return renderable elements.
 *
 * Note: The first time this is called, the `columns` and `cellWidth` will be
 * the `defaultSize`.  Once the `GridList` has been fully mounted in the DOM, it
 * will begin the sizing calculations and update with the "real" values. This
 * doesn't cause any problems if you are only rendering client side, but it
 * might mess up server-side rendering, so it is recommended to update the
 * `defaultSize` when server-side rendering if this can be "known" service-side
 * in your app.
 */
export type RenderGridListChildren = (size: GridListSize) => Child

export interface GridListProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    UseGridListOptions {
    /**
     * Boolean if the resize observer should stop tracking width changes within
     * the `GridList`. This should normally stay as `false` since tracking width
     * changes will allow for dynamic content being added to the list to not mess
     * up the grid calculation when the user is on an OS that shows scrollbars.
     */
    disableHeightObserver?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the resize observer should stop tracking width changes within
     * the `GridList`. This should normally stay as `false` since tracking width
     * changes will allow for dynamic content being added to the list to not mess
     * up the grid calculation when the user is on an OS that shows scrollbars.
     */
    disableWidthObserver?: FunctionMaybe<Nullable<boolean>>

    /**
     * The children to display within the grid list. This can either be a callback
     * function that will provide the current calculated width for each cell that
     * should return renderable elements or any renderable elements that are sized
     * with the `--rmd-cell-width` css variable.
     */
    children: Child | RenderGridListChildren //Child

    /**
     * Boolean if the current cell sizing should automatically be cloned into each
     * child. This will only work if the `children` is renderable element or a
     * list of renderable elements that accept the `style` and `className` props.
     */
    clone?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if each child within the `GridList` should be wrapped with the
     * `GridListCell` component.  This will only work if the `children` is not a
     * `function`.
     */
    wrapOnly?: FunctionMaybe<Nullable<boolean>>
}

const isRenderFunction = (
    children: GridListProps["children"]
): children is RenderGridListChildren => typeof children === "function"

/**
 * The `GridList` component is a different way to render a list of data where
 * the number of columns is dynamic and based on the max-width for each cell.
 * Instead of setting a percentage width to each cell based on the number of
 * columns, this will dynamically add columns to fill up the remaining space and
 * have each cell grow up to a set max-width. A really good use-case for this is
 * displaying a list of images or thumbnails and allowing the user to see a full
 * screen preview once selected/clicked.
 */
export const GridList = (
    {
        style,
        className,
        children,
        clone = false,
        wrapOnly = false,
        cellMargin,
        defaultSize,
        maxCellSize = DEFAULT_GRID_LIST_MAX_CELL_SIZE,
        containerPadding = DEFAULT_GRID_LIST_PADDING,
        disableHeightObserver = false,
        disableWidthObserver = false,
        ref,
        ...props
    }: GridListProps
) => {
    const [gridListProps, gridSize] = useGridList({
        //@ts-ignore
        ref, style,
        className,
        cellMargin,
        defaultSize,
        maxCellSize,
        containerPadding,
        disableHeight: disableHeightObserver,
        disableWidth: disableWidthObserver,
    })

    let content//: Child = null
    if (isRenderFunction(children)) {
        content = children(gridSize)
    } else if (clone || wrapOnly) {
        content = Children.map(
            children,
            (child) => child && <GridListCell clone={clone}>{child}</GridListCell>
        )
    } else {
        content = children
    }

    return (
        <GridListSizeProvider value={gridSize}>
            {/** @ts-ignore */}
            <div {...props} {...gridListProps}>
                {content}
            </div>
        </GridListSizeProvider>
    )
}
