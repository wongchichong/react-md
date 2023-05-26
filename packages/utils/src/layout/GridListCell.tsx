// ;
import { cloneElement, /* forwardRef, isValidElement */ } from 'voby'
import { Children } from '@react-md/react'


import { bem } from "../bem"

export interface GridListCellProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Boolean if the className should be cloned into the child instead of
     * wrapping in another div. This will only work if the `children` is a single
     * ReactElement.
     */
    clone?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the cell should be square by also setting the current cell size
     * to the `height`.
     */
    square?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-grid-list")

export const GridListCell = /* <HTMLDivElement, GridListCellProps> */(
    { className, children, square = false, clone = false, ref, ...props }: GridListCellProps
) => {
    const cellClassName = [block("cell", { square }), className]
    if (clone /* && isValidElement(children) */) {
        const child = Children.only(children)
        return cloneElement(child, {
            //@ts-ignore
            className: cn(cellClassName, child.props.className),
        } as HTMLAttributes<HTMLDivElement>)
    }

    const a = <div {...props} ref={ref} className={cellClassName}>
        {children}
    </div>
    console.log(a)
    return (
        <div {...props} ref={ref} className={cellClassName}>
            {children}
        </div>
    )
}
