import { $$ } from 'voby'

/**
 * A small utility function that allows me to apply a passed in ref along with
 * my own custom ref logic.
 *
 * @param instance - The DOM Node instance
 * @param ref - The prop ref
 */
export function applyRef<E>(instance: FunctionMaybe<E | null>, ref?: Refs<E>): void {
  if (!ref)
    return

  const e = $$(instance)
  if (typeof ref === "function")
    ref(e)
  else if (Array.isArray(ref))
    ref.flat().forEach(r => (r as Ref)(e))

  // else if (typeof ref === "object") {
  //   (ref as ObservableMaybe<E | null>).current = instance;
  // }
}
