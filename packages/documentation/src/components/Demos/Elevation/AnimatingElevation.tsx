import type { ReactElement } from 'voby'


import styles from "./AnimatingElevation.module.scss"

export default function AnimatingElevation(): Child {
    return (
        <>
            <button
                id="animating-elevation-1"
                type="button"
                className={cn(styles.example, styles.simple)}
            >
                This button will animate elevation when the button is hovered or
                focused.
            </button>
            <button
                id="animating-elevation-2"
                type="button"
                className={cn(styles.example, styles.merging)}
            >
                This button will animate elevation when hovered, as well as a custom
                focus effect that merges box shadows.
            </button>
        </>
    )
}
