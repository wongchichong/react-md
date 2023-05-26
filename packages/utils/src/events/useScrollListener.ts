import { $, useEffect } from 'voby'

// import { useRefCache } from "../useRefCache"
import { delegateEvent } from "./utils"

/**
 * @remarks \@since 5.0.0
 */
export interface ScrollListenerHookOptions extends AddEventListenerOptions {
    /**
     * The event handler that will be fired when the page scrolls or if any child
     * element scrolls when the {@link capture} option is `true`.
     */
    onScroll: EventListener

    /** @defaultValue `true` */
    enabled?: FunctionMaybe<Nullable<boolean>>
}

/**
 *
 * @remarks \@since 5.0.0 Moved the `AddEventListenerOptions` to no longer be
 * part of an `options` object.
 */
export function useScrollListener({
    once,
    passive = true,
    signal,
    capture,
    enabled = true,
    onScroll,
}: ScrollListenerHookOptions): void {
    const scrollHandlerRef = $(onScroll)
    useEffect(() => {
        if (!enabled) {
            return
        }

        const eventHandler = delegateEvent("scroll", window, true, {
            once,
            passive,
            signal,
            capture,
        })
        const scrollHandler = scrollHandlerRef()
        eventHandler.add(scrollHandler)

        return () => {
            eventHandler.remove(scrollHandler)
        }
    })
}
