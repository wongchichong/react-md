import cn from "classnames"
import type {
    CSSTransitionClassNames,
    TransitionTimeout,
} from "@react-md/transition"
import { useCSSTransition } from "@react-md/transition"

import { useStatesConfigContext } from "../StatesConfig"
import type { RippleState } from "./types"

export interface RippleProps {
    className?: Class
    classNames?: FunctionMaybe<Nullable<CSSTransitionClassNames>>
    timeout?: FunctionMaybe<Nullable<TransitionTimeout>>
    entered: (ripple: RippleState) => void
    exited: (ripple: RippleState) => void
    ripple: RippleState,
    key?: FunctionMaybe<Nullable<number>>
}

export function Ripple({
    className,
    classNames: propClassNames,
    timeout: propTimeout,
    ripple,
    entered,
    exited,
}: RippleProps): Child {
    const { exiting, style } = ripple

    let timeout = propTimeout
    let classNames = propClassNames
    const context = useStatesConfigContext()
    if (typeof timeout === "undefined" || typeof classNames === "undefined") {
        if (typeof timeout === "undefined") {
            timeout = context.rippleTimeout
        }

        if (typeof classNames === "undefined") {
            classNames = context.rippleClassNames
        }
    }

    const { elementProps, rendered } = useCSSTransition({
        appear: true,
        transitionIn: !exiting,
        timeout,
        className: ["rmd-ripple", className],
        classNames,
        onEntered() {
            entered(ripple)
        },
        onExited() {
            exited(ripple)
        },
    })

    if (!rendered) {
        return null
    }

    //@ts-ignore
    return <span {...elementProps} style={style} />
}
