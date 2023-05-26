import { bem } from "@react-md/utils"

export interface ListSubheaderProps extends HTMLAttributes<HTMLLIElement> {
    /**
     * Boolean if the subheader should be inset to match the `ListItem` text
     * keyline.
     */
    inset?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-list-subheader")

/**
 * This is a simple component that will render a `<li>` with the subheader
 * typography styles. It also supports an `inset` variant that adds some spacing
 * to the left of the text to align with other `ListItem` that have left addons.
 */
export const ListSubheader = ({ className, inset = false, ref, ...props }: ListSubheaderProps) => {
    return (
        <li {...props} ref={ref} className={[block({ inset }), className]} />
    )
}

