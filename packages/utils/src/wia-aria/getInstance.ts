import type { ObservableMaybe } from 'voby'

/**
 * A simple type that can be used to get a DOM node either as a ref object from
 * react, an HTMLElement, or null
 */
export type RefOrInstance =
    | HTMLElement
    | null
    | ObservableMaybe<HTMLElement | null>

/**
 * Simple private util to get the DOM "instance" from either a ref object or an
 * HTMLElement.
 *
 * @param refOrInstance - The ref or instance to get an HTMLElement from
 * @returns The HTMLElement or null.
 * @internal
 */
export function getInstance(refOrInstance: RefOrInstance): HTMLElement | null {
    let instance: HTMLElement | null = null
    if (refOrInstance) {
        if (refOrInstance instanceof HTMLElement) {
            instance = refOrInstance
        } else {
            instance = refOrInstance()
        }
    }

    return instance
}
