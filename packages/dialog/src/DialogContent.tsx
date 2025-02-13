


import { bem } from "@react-md/utils"

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Boolean if the default padding for the content should be removed. This is
     * helpful when the child elements already have the required padding (such as
     * lists).  In all other cases, it is recommended to apply a custom className
     * with the padding overrides instead.
     */
    disablePadding?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-dialog")

/**
 * This component is used to render the main content within a dialog. There are
 * really only benefits when using the component alongside the `DialogHeader`
 * and/or `DialogFooter` since it is set up so only the content will scroll
 * while the header and footer will be "fixed".
 */
export const DialogContent = (
    { children, className, disablePadding = false, ref, ...props }: DialogContentProps
) => {
    return (
        <div
            {...props}
            ref={ref}
            className={[
                block("content", {
                    padded: !disablePadding,
                }),
                className
            ]}
        >
            {children}
        </div>
    )
}
