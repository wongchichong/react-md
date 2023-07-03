import type { HTMLAttributes, ReactElement } from "react"


import styles from "./Container.module.scss"

export default function Container({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>): Child {
    return (
        <div {...props} className={cn(styles.container, className)}>
            {children}
        </div>
    )
}
