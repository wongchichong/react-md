import type { ReactElement, ReactNode } from "react"
import { GridCell } from "@react-md/utils"

export interface ConfigurationCellProps {
    fullWidth?: FunctionMaybe<Nullable<boolean>>
    children: Children
}

export default function ConfigurationCell({
    fullWidth,
    children,
}: ConfigurationCellProps): Child {
    return (
        <GridCell
            clone
            largeDesktop={fullWidth ? { colSpan: 3 } : undefined}
            tablet={{ colSpan: fullWidth ? 2 : 1 }}
        >
            {children}
        </GridCell>
    )
}
