import { useEffect, $$ } from 'voby'

import type { Focus } from "./focusElementWithin"
import { focusElementWithin } from "./focusElementWithin"
import type { RefOrInstance } from "./getInstance"
import { getInstance } from "./getInstance"

/**
 * This hook is used to focus an element once a component has mounted. To help
 * with keyboard click events, it will actually wait for an animation frame
 * before attempting to focus as an enter key might click both elements at the
 * same time.
 *
 * This hook will first focus the HTMLElement (if it is focusable) and then
 * focus an element based on the defaultFocus prop.
 *
 * @param refOrInstance - This is either a ref object containing the element to
 * focus or the element itself.
 * @param defaultFocus - The element to focus within the containing element once
 * it has been mounted. This can either be "first" or "last" to focus the first
 * or last focusable elements or a query selector string to find an element to
 * focus.
 * @param preventScroll - Boolean if the focus events should try to prevent the
 * default scroll-into-view behavior. This is generally recommended to be kept
 * as `false`, but can be useful to enable if the component mounts offscreen
 * during a transition.
 * @param programmatic - Boolean if programmatically focusable elements should be
 * included instead of only tab focusable.
 * @param disabled - Boolean if the focus behavior should be disabled.
 */
export function useFocusOnMount(
    refOrInstance: RefOrInstance,
    defaultFocus: FunctionMaybe<Focus>,
    preventScroll: FunctionMaybe<boolean> = false,
    programmatic: FunctionMaybe<boolean> = false,
    disabled: FunctionMaybe<boolean> = false
): void {
    useEffect(() => {
        if (disabled) {
            return
        }

        const frame = window.requestAnimationFrame(() => {
            const instance = getInstance(refOrInstance)
            if (!instance) {
                return
            }

            instance.focus({ preventScroll: $$(preventScroll) })
            focusElementWithin(instance, $$(defaultFocus), $$(programmatic), $$(preventScroll))
        })

        return () => {
            window.cancelAnimationFrame(frame)
        }
    })
}
