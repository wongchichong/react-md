import type { Observable } from 'voby'
import { $ } from 'voby'

import { applyRef } from "../applyRef"
import { useKeyboardFocusContext } from "./movementContext"

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export function useKeyboardFocusableElement<E extends HTMLElement>(ref?: Observable<E>): Observable<(i: E) => void> {
  const { attach, detach } = useKeyboardFocusContext()
  const nodeRef = $<E | null>(null)

  return $(
    (instance: E | null) => {
      applyRef(instance, ref)
      if (instance) {
        attach(instance)
      } else if (nodeRef()) {
        detach(nodeRef())
      }

      nodeRef(instance)
    },
  )
}
