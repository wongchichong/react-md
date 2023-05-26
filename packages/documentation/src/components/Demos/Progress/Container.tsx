import type { HTMLAttributes, ReactElement } from "react"


import styles from "./Container.module.scss"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    inline?: FunctionMaybe<Nullable<boolean>>
}

export default function Container({
    className,
    children,
    inline,
    ...props
}: ContainerProps): Child {
    return (
        <div
            {...props}
            className={cn(
                styles.container,
                {
                    [styles.inline]: inline,
                },
                className
            )}
        >
            {children}
        </div>
    )
}
