import type { ReactElement } from 'voby'
import { useEffect, $ } from 'voby'

import type { CSSTransitionClassNames } from "@react-md/transition"
import { useCSSTransition } from "@react-md/transition"

import Blind from "./Blind"
import styles from "./Blinds.module.scss"

interface BlindsProps {
    visible: boolean
}

const CLASSNAMES: CSSTransitionClassNames = {
    enter: styles.enter,
    enterActive: cn(styles.entering, styles.animate),
    exit: styles.exit,
    exitActive: cn(styles.exiting, styles.animate),
}

export default function Blinds({ visible }: BlindsProps): ReactElement | null {
    const exited = $(true)
    useEffect(() => {
        if (visible && exited()) {
            exited(false)
        }
    })

    const hide = (): void => exited(true)

    const isVisible = visible || !exited()
    const { elementProps, rendered, stage } = useCSSTransition({
        className: styles.blinds,
        transitionIn: isVisible,
        temporary: true,
        timeout: 1500,
        classNames: CLASSNAMES,
    })

    if (!rendered) {
        return null
    }

    return (
        <div {...elementProps}>
            {Array.from({ length: 11 }, (_, i) => (
                <Blind
                    key={i}
                    visible={visible && stage === "entered"}
                    onExited={i === 10 ? hide : undefined}
                />
            ))}
        </div>
    )
}
