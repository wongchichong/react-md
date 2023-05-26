import type { ReactElement, ReactNode } from "react"


import styles from "./Container.module.scss"

interface Props {
    centered?: FunctionMaybe<Nullable<boolean>>
    children: ReactNode
}

export default function Container({ children, centered }: Props): Child {
    return (
        <div
            className={cn(styles.container, {
                [styles.centered]: centered,
            })}
        >
            {children}
        </div>
    )
}
