import type { ReactElement } from "react"

import { CircularProgress } from "@react-md/progress"

import styles from "./LoadingCode.module.scss"

export interface LoadingCodeProps {
    offset: boolean
}

export function LoadingCode({ offset }: LoadingCodeProps): Child {
    return (
        <div
            className={cn(styles.container, {
                [styles.offset]: offset,
            })}
        >
            <CircularProgress id="loading-code" />
        </div>
    )
}
