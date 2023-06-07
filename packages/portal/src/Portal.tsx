import { useEffect, $, Portal as VPortal, $$ } from 'voby'
import type { Element} from 'voby'

import type { PortalInto } from "./getContainer"
import { getContainer } from "./getContainer"

export interface PortalProps {
    /**
     * Either a function that returns an HTMLElement, an HTMLElement, or a
     * `document.querySelector` string that will return the HTMLElement to render
     * the children into. If both the `into` and `intoId` props are `undefined`,
     * the `document.body` will be chosen instead.
     *
     * If the `querySelector` string does not return a valid HTMLElement, an error
     * will be thrown.
     */
    into?: PortalInto

    /**
     * The id of an element that the portal should be rendered into. If an element
     * with the provided id can not be found on the page at the time of mounting,
     * an error will be thrown.
     */
    intoId?: FunctionMaybe<Nullable<string>>

    /**
     * The children to render within the portal.
     */
    children?: Children
}

/**
 * This component is a simple wrapper for the `createPortal` API from ReactDOM
 * that will just ensure that `null` is always returned for server side
 * rendering as well as a "nice" way to choose specific portal targets or just
 * falling back to the `document.body`.
 */
export function Portal({ into, intoId, children, }: PortalProps): Element {
    const container = $<ReturnType<typeof getContainer>>(null)

    // setting the container via useEffect instead of immediately in the render
    // just so that it doesn't throw an error immediately if the dom hasn't fully
    // painted after a SSR
    useEffect(() => {
        const nextContainer = getContainer(into, $$(intoId))
        if (container() !== nextContainer) {
            container($$(nextContainer))
        }
    })

    if (!container()) {
        return null
    }

    //@ts-ignore
    return (<VPortal wrapper={container()} children={children} />) as any
}
