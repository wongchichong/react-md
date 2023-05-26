import { } from 'voby'

import type {
    CSSTransitionClassNames,
    TransitionTimeout,
} from "@react-md/transition"

import { Ripple } from "./Ripple"
import type { RipplesState, RippleState } from "./types"

export interface RippleContainerProps {
    ripples: RipplesState
    entered: (ripple: RippleState) => void
    exited: (ripple: RippleState) => void
    className?: Class
    rippleClassName?: Class
    timeout?: FunctionMaybe<Nullable<TransitionTimeout>>
    classNames?: FunctionMaybe<Nullable<CSSTransitionClassNames>>
    key?: FunctionMaybe<Nullable<string>>
}

export function RippleContainer({
    ripples,
    className,
    rippleClassName,
    timeout,
    classNames,
    entered,
    exited,
}: RippleContainerProps): Element {
    //@ts-ignore
    return <span className={["rmd-ripple-container", className]}>
        {ripples.map((ripple) => (
            <Ripple
                key={ripple.startTime}
                ripple={ripple}
                className={rippleClassName}
                entered={entered}
                exited={exited}
                timeout={timeout}
                classNames={classNames}
            />
        ))}
    </span>
}
