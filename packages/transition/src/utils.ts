import { getViewportSize } from "@react-md/utils"
import type {
    CSSTransitionClassNames,
    CSSTransitionClassNamesObject,
    TransitionActions,
    TransitionTimeout,
    TransitionTimeoutObject,
} from "./types"
import { CSSProperties, $$ } from "voby"

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface TransitionTimeoutOptions extends Required<TransitionActions> {
    timeout: FunctionMaybe<TransitionTimeout>
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export function getTransitionTimeout({ timeout, appear, enter, exit, }: Readonly<TransitionTimeoutOptions>): Readonly<Required<TransitionTimeoutObject>> {
    const to = $$(timeout)

    if (typeof to === "number") {
        return {
            appear: appear ? to : 0,
            enter: enter ? to : 0,
            exit: exit ? to : 0,
        }
    }

    return {
        appear: (appear && (to.appear ?? to.enter)) || 0,
        enter: (enter && to.enter) || 0,
        exit: (exit && to.exit) || 0,
    }
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface CollapseSizing {
    maxHeight?: CSSProperties['maxHeight']
    paddingTop?: CSSProperties['paddingTop']
    paddingBottom?: CSSProperties['paddingBottom']
}

/**
 * A small util that will find the max-height, padding-top, and padding-bottom
 * for the provided element. This is really used to be able to transition the
 * max-height value since `max-height: auto` does not transition. The only way
 * to get transition is to change max-height values manually.
 *
 * @remarks \@since 4.0.0
 * @internal
 */
export function getElementSizing(element: HTMLElement | null): CollapseSizing {
    let maxHeight
    let paddingTop
    let paddingBottom
    if (element) {
        maxHeight = element.scrollHeight

        // clone the element (not deep) just to figure out it's padding without the
        // inline styles applied
        const cloned = element.cloneNode(false) as HTMLElement
        cloned.style.maxHeight = ""
        cloned.style.padding = ""
        cloned.style.paddingLeft = element.style.paddingLeft
        cloned.style.paddingRight = element.style.paddingRight
        cloned.style.visibility = "hidden"

        const container = element.parentElement || document.body
        container.appendChild(cloned)
        const style = window.getComputedStyle(cloned)
        if (style.paddingTop) {
            paddingTop = parseFloat(style.paddingTop)
        }

        if (style.paddingBottom) {
            paddingBottom = parseFloat(style.paddingBottom)
        }
        container.removeChild(cloned)
    }

    return { maxHeight, paddingTop, paddingBottom }
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export interface TransitionClassNamesOptions extends TransitionTimeoutOptions {
    classNames: FunctionMaybe<CSSTransitionClassNames>
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export function getTransitionClassNames({ classNames: cs, ...timeoutOptions }: TransitionClassNamesOptions): Readonly<Required<CSSTransitionClassNamesObject>> {
    const classNames = $$(cs)
    const timeout = getTransitionTimeout(timeoutOptions)

    if (typeof classNames === "string") {
        const { appear, enter, exit } = timeout
        return {
            appear: appear ? `${classNames}--appear` : "",
            appearActive: appear ? `${classNames}--appear-active` : "",
            appearDone: "",
            enter: enter ? `${classNames}--enter` : "",
            enterActive: enter ? `${classNames}--enter-active` : "",
            enterDone: "",
            exit: exit ? `${classNames}--exit` : "",
            exitActive: exit ? `${classNames}--exit-active` : "",
            exitDone: "",
        }
    }

    const {
        enter = "",
        enterActive = "",
        enterDone = "",
        exit = "",
        exitActive = "",
        exitDone = "",
        appear = (timeout.appear && enter) || "",
        appearActive = (timeout.appear && enterActive) || "",
        appearDone = (timeout.appear && enterDone) || "",
    } = classNames

    return {
        appear,
        appearActive,
        appearDone,
        enter,
        enterActive,
        enterDone,
        exit,
        exitActive,
        exitDone,
    }
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
interface IsWithinViewportOptions {
    fixedElement: HTMLElement
    fixedToElement: HTMLElement
}

/**
 * @remarks \@since 4.0.0
 * @internal
 */
export function isWithinViewport({
    fixedElement,
    fixedToElement,
}: IsWithinViewportOptions): boolean {
    const fixedElementRect = fixedElement.getBoundingClientRect()
    const fixedToElementRect = fixedToElement.getBoundingClientRect()
    const vh = getViewportSize("height")
    const vw = getViewportSize("width")
    const top = Math.min(fixedElementRect.top, fixedToElementRect.top)
    const right = Math.max(fixedElementRect.right, fixedToElementRect.right)
    const bottom = Math.max(fixedElementRect.bottom, fixedToElementRect.bottom)
    const left = Math.min(fixedElementRect.left, fixedToElementRect.left)

    return bottom >= 0 && top <= vh && right >= 0 && left <= vw
}
