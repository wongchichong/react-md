// import type { Dispatch, SetStateAction } from 'voby';
import { createContext, Observable, useContext, $ } from 'voby'

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export interface ActiveDescendantContext {
  activeId: Observable<string>
  //setActiveId: (val: string) => void
}

/**
 * @remarks \@since 5.0.0
 * @internal
 */
const context = Object.assign(createContext<ActiveDescendantContext>({
  activeId: $(""),
  // // setActiveId() {
  // //   throw new Error(
  // //     "ActiveDescendantMovementProvider must be a parent component."
  // //   )
  // },
}), { displayName: "ActiveDescendant" })

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export const { Provider: ActiveDescendantContextProvider } = context

/**
 * @remarks \@since 5.0.0
 * @internal
 */
export function useActiveDescendantContext(): Readonly<ActiveDescendantContext> {
  return useContext(context)
}
