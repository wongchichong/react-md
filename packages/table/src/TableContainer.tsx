



export type TableContainerProps<T extends EventTarget= HTMLDivElement> = HTMLAttributes<T>

/**
 * An extremely "useful" component that should be used with the `Table`
 * component if you want to make a responsive table within the page. If you
 * don't want to use this component, you can just apply `overflow: auto` to a
 * parent element of the table.
 */
export const TableContainer = ({ className, children, ref, ...props }: TableContainerProps<HTMLDivElement>) =>
    <div
        {...props}
        ref={ref}
        className={["rmd-table-container", className]}
    >
        {children}
    </div>
