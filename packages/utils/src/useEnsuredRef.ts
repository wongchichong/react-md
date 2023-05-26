import type {  Observable/* , Refs */ } from 'voby'
import { $ } from 'voby'

import { applyRef } from "./applyRef"

/**
 * @remarks \@since 2.3.0
 */
export type EnsuredRefs<E extends HTMLElement> = [
  Observable<E | null>,
  (instance: E | null) => void
]

/**
 * This is mostly an internal hook that allows for an optional ref (normally
 * from props or hook options) to be merged with a hook's required `ref`. This
 * will return a MutableRef used for DOM manipulation in a custom hook
 * followed by a ref callback function that should be passed to the DOM node
 * that will ensure that both the optional `propRef` and hook ref are updated.
 *
 * @remarks \@since 2.3.0
 */
export function useEnsuredRef<E extends HTMLElement>(propRef?: Refs<E | null>): EnsuredRefs<E> {
  const ref = $<E | null>(null)
  const refHandler = (instance: E | null) => {
    applyRef(instance, propRef)
    ref(instance)
  }

  return [ref, refHandler]
}
