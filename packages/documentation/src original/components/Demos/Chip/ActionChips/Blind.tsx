import type { ReactElement } from "react"

import type { CSSTransitionClassNames } from "@react-md/transition"
import { CSSTransition } from "@react-md/transition"

import styles from "./Blind.module.scss"

export interface BlindProps {
    visible: boolean
    onExited?(): void
}

const CLASSNAMES: CSSTransitionClassNames = {
    enter: styles.enter,
    enterActive: cn(styles.entering, styles.animate),
    enterDone: styles.done,
    exit: styles.exit,
    exitActive: cn(styles.exiting, styles.animate),
}

export default function Blind({ visible, onExited }: BlindProps): Child {
    return (
        <CSSTransition
            timeout={2500}
            classNames={CLASSNAMES}
            transitionIn={visible}
            className={styles.blind}
            onExited={onExited}
        >
            <span />
        </CSSTransition>
    )
}
