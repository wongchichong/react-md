import { Observable, $$ } from 'voby'
import { ResizeObserver } from "@juggle/resize-observer"

import type { EnsuredRefs } from "../useEnsuredRef"
import { useEnsuredRef } from "../useEnsuredRef"
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect"

/**
 * @remarks \@since 2.3.0
 */
export interface UseResizeObserverOptions<E extends HTMLElement> {
    /**
     * An optional ref to merge with the returned ref handler function
     */
    ref?: Observable<E | null>

    /**
     * Boolean if the `onResize` callback should not be triggered if only the
     * height has changed for the watched element.
     */
    disableHeight?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the `onResize` callback should not be triggered if only the
     * width has changed for the watched element.
     */
    disableWidth?: FunctionMaybe<Nullable<boolean>>
}

/**
 * @remarks \@since 2.3.0
 */
export interface ResizeObserverElementSize {
    /**
     * The height for the element that was changed.
     */
    height: FunctionMaybe<number>

    /**
     * The width for the element that was changed.
     */
    width: FunctionMaybe<number>

    /**
     * The scroll height for the element that was changed.
     */
    scrollHeight: FunctionMaybe<number>

    /**
     * The scroll height for the element that was changed.
     */
    scrollWidth: FunctionMaybe<number>
}

/**
 * @remarks \@since 2.3.0
 */
export interface ResizeObserverElementData<E extends HTMLElement = HTMLElement>
    extends ResizeObserverElementSize {
    /**
     * The element that changed due to the resize observer.
     */
    element: E
}

/**
 * The callback that is triggered each time an element's size change has been
 * observed.
 * @remarks \@since 2.3.0
 */
export type OnResizeObserverChange<E extends HTMLElement = HTMLElement> = (resizeData: ResizeObserverElementData<E>) => void

/**
 * @internal
 */
interface ResizeObserverSubscription<E extends HTMLElement> {
    readonly target: E
    readonly handler: OnResizeObserverChange<E>
    readonly disableHeight: FunctionMaybe<boolean>
    readonly disableWidth: FunctionMaybe<boolean>
    prevSize: FunctionMaybe<ResizeObserverElementSize | undefined>
}

/**
 * @internal
 */
function isHeightChange(
    prevSize: ResizeObserverElementSize | undefined,
    nextSize: ResizeObserverElementSize
): boolean {
    return (
        !prevSize ||
        prevSize.height !== nextSize.height ||
        prevSize.scrollHeight !== nextSize.scrollHeight
    )
}

/**
 * @internal
 */
function isWidthChange(
    prevSize: ResizeObserverElementSize | undefined,
    nextSize: ResizeObserverElementSize
): boolean {
    return (
        !prevSize ||
        prevSize.width !== nextSize.width ||
        prevSize.scrollWidth !== nextSize.scrollWidth
    )
}

/**
 * Why is there a single shared observer instead of multiple and a
 * "subscription" model?
 *
 * Note: Probably a bit of a premature optimization right now...
 *
 * @see https://github.com/WICG/resize-observer/issues/59
 * @internal
 */
let sharedObserver: ResizeObserver | undefined

/**
 *
 * @internal
 */
const subscriptions: ResizeObserverSubscription<HTMLElement>[] = []

/**
 * Lazy initializes the shared resize observer which will loop through all the
 * subscriptions when a resize event is called.
 *
 * @internal
 */
function init(): void {
    if (sharedObserver || typeof document === "undefined") {
        return
    }

    sharedObserver = new ResizeObserver((entries) => {
        // Note: might need to wait until an requestAnimationFrame has completed to
        // fix the resize observer loop exceeded error if switching to
        // `useIsomorphicLayoutEffect` and a shared observer didn't fix that error:
        // https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        for (let i = 0; i < entries.length; i += 1) {
            const entry = entries[i]
            const currentSubscriptions = subscriptions.filter(
                ({ target }) => target === entry.target
            )
            if (!currentSubscriptions.length) {
                return
            }

            const { height, width } = entry.contentRect
            const { scrollHeight, scrollWidth } = entry.target
            const nextSize: ResizeObserverElementSize = {
                height,
                width,
                scrollHeight,
                scrollWidth,
            }

            for (let j = 0; j < currentSubscriptions.length; j += 1) {
                const subscription = currentSubscriptions[j]
                const { handler, prevSize: ps, disableHeight, disableWidth } = subscription
                const prevSize = $$(ps)
                const isNewHeight = isHeightChange(prevSize, nextSize)
                const isNewWidth = isWidthChange(prevSize, nextSize)
                if ((isNewHeight && !disableHeight) || (isNewWidth && !disableWidth)) {
                    subscription.prevSize = nextSize
                    handler({
                        ...nextSize,
                        element: entry.target as typeof subscription.target,
                    })
                }
            }
        }
    })
}

/**
 *
 * @internal
 */
function subscribe<E extends HTMLElement>(
    target: E,
    onResize: OnResizeObserverChange<E>,
    disableHeight: boolean,
    disableWidth: boolean
): void {
    const exists = subscriptions.find((sub) => sub.target === target)
    subscriptions.push({
        target,
        handler: onResize as OnResizeObserverChange<HTMLElement>,
        disableWidth,
        disableHeight,
        prevSize: undefined,
    })

    if (!exists) {
        // I'll silently fail non-initialized observers for now until it becomes an
        // issue... But how will I ever know?
        sharedObserver?.observe(target)
    }
}

/**
 *
 * @internal
 */
function unsubscribe<E extends HTMLElement>(
    target: E,
    onResize: OnResizeObserverChange<E>,
    disableHeight: boolean,
    disableWidth: boolean
): void {
    const i = subscriptions.findIndex(
        (sub) =>
            sub.target === target &&
            sub.handler === onResize &&
            sub.disableWidth === disableWidth &&
            sub.disableHeight === disableHeight
    )
    if (i !== -1) {
        subscriptions.splice(i, 1)
    }

    const remaining = subscriptions.some((sub) => sub.target === target)
    if (!remaining) {
        // I'll silently fail non-initialized observers for now until it becomes an
        // issue... But how will I ever know?
        sharedObserver?.unobserve(target)
    }
}

/**
 * The new resize observer API that returns a `refHandler` to attach to a DOM
 * node instead of using the weird `target` API.
 *
 * @remarks \@since 2.3.0
 * @param onResize - The resize handler to call when the element has changed
 * height or width. If you notice performance issues or other oddities, it is
 * recommended to wrap this function in `useCallback`.
 * @param options - Any additional options to use for the resize observer.
 */
export function useResizeObserver<E extends HTMLElement>(
    onResize: OnResizeObserverChange<E>,
    options: UseResizeObserverOptions<E> = {}
): EnsuredRefs<E> {
    const { ref: propRef, disableWidth: dw = false, disableHeight: dh = false } = options
    const [ref, refHandler] = useEnsuredRef<E>(propRef)

    const disableHeight = $$(dh), disableWidth = $$(dw)

    useIsomorphicLayoutEffect(() => {
        const target = ref()
        if ((disableHeight && disableWidth) || !target) {
            return
        }

        init()
        subscribe(target, onResize, disableHeight, disableWidth)
        return () => {
            unsubscribe(target, onResize, disableHeight, disableWidth)
        }
    })

    return [ref, refHandler]
}
