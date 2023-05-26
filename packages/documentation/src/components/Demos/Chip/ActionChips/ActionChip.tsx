import type { ReactElement } from "react"

import type { ChipProps } from "@react-md/chip"
import { Chip } from "@react-md/chip"

import styles from "./ActionChip.module.scss"

interface ActionChipProps extends ChipProps {
    yellow?: FunctionMaybe<Nullable<boolean>>
}

export default function ActionChip({
    children,
    className,
    theme = "outline",
    yellow = false,
    ...props
}: ActionChipProps): Child {
    return (
        <Chip
            {...props}
            theme={theme}
            className={cn(
                styles.chip,
                {
                    [styles.yellow]: yellow,
                },
                className
            )}
        >
            {children}
        </Chip>
    )
}
