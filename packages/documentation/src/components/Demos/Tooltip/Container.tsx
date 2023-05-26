import type { HTMLAttributes, ReactElement } from "react"


import styles from "./Container.module.scss"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    stacked?: FunctionMaybe<Nullable<boolean>>
}

export default function Container({
    className,
    children,
    stacked = false,
    ...props
}: ContainerProps): Child {
    return (
        <div
            {...props}
            className={cn(
                styles.container,
                {
                    [styles.stacked]: stacked,
                },
                className
            )}
        >
            {children}
        </div>
    )
}
