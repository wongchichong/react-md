

import type { IconRotatorBaseProps } from "@react-md/icon"
import { IconRotator, useIcon } from "@react-md/icon"
import { bem } from "@react-md/utils"

export interface TreeItemExpanderIconProps extends IconRotatorBaseProps {
    children?: Child
}

const block = bem("rmd-tree-item")

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to
 * be used within a `TreeView`.
 */
export function TreeItemExpanderIcon({
    className,
    children,
    rotated = false,
    ...props
}: TreeItemExpanderIconProps): Element {
    const icon = useIcon("expander", children)

    return (
        <IconRotator
            {...props}
            rotated={rotated}
            className={[block("rotator-icon"), className]}
        >
            {icon}
        </IconRotator>
    )
}
