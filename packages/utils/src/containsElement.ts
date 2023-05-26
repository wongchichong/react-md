import type { ObservableMaybe } from 'voby'
import  { $$ } from 'voby'

type CheckableElement = HTMLElement | null
type CheckableThing = CheckableElement | ObservableMaybe<CheckableElement>

/**
 * Typeguard that will check if the provided checkable thing is a
 * MutableRef or just an HTMLElement.
 *
 * @internal
 */
// const isMutableRef = (thing: CheckableThing): thing is Observable<CheckableElement> =>
//     !!thing && typeof $$(thing as Observable<CheckableElement>) !== "undefined"

/**
 * Gets the HTMLElement or null from the checkable thing.
 *
 * @internal
 */
const getElement = (thing: CheckableThing): CheckableElement => {
    // if (isMutableRef(thing)) {
    //     return $$(thing)
    // }

    return $$(thing)
}

/**
 * Checks if a container element contains another element as a child while
 * allowing for nulls or a MutableRef of HTMLElement or null. Mostly just
 * a convenience function that should be used internally.
 *
 * @param container - The element to use as a container element. This can be an
 * HTMLElement, null, or a MutableRef of HTMLElement or null.
 * @param child - The element that might be a child of the container
 * element. This can be an HTMLElement, null, or a MutableRef of
 * HTMLElement or null.
 * @returns True if the container contains the child element and both the
 * container and child are valid HTMLElements (not null).
 * @internal
 */
export function containsElement(container: CheckableThing, child: CheckableThing): boolean {
    container = getElement(container)
    child = getElement(child)
    return !!(container && child && container.contains(child))
}
