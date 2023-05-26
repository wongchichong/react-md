
import { createContext, useContext, useMemo } from 'voby'
import type { HoverModeHookReturnValue } from "@react-md/utils"

/** @remarks \@since 5.0.0 */
export type MenuVisibilityContext = Pick<HoverModeHookReturnValue, "visible">

/**
 * @internal
 * @remarks \@since 5.0.0
 */
const context = createContext<MenuVisibilityContext>({
  //@ts-ignore
  visible: false,
  // setVisible() {
  //   throw new Error('"MenuVisibilityProvider" must be a parent component')
  // },
})
//@ts-ignore
context.displayName = "MenuVisibility"

/**
 * @internal
 * @remarks \@since 5.0.0
 */
const { Provider } = context

/**
 * This hook allows you control the visibility of a parent menu. The main
 * use-case for this hook is adding a custom sheet header/footer.
 *
 * @example
 * Simple Example
 * ```tsx
 * function SheetFooter(): Element {
 *   const { setVisible } = useMenuVisibility();
 *
 *   return (
 *     <DialogFooter>
 *       <Button onClick={() => setVisible(false)}>Cancel</Button>
 *     </DialogFooter>
 *   );
 * }
 * ```
 *
 * @returns the {@link MenuVisibilityContext}
 * @remarks \@since 5.0.0
 */
export function useMenuVisibility(): Readonly<MenuVisibilityContext> {
  return useContext(context)
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuVisibilityProviderProps extends MenuVisibilityContext {
  children: Children
}

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export function MenuVisibilityProvider({ visible, children, }: MenuVisibilityProviderProps): Element {
  const value = useMemo<MenuVisibilityContext>(() => ({ visible, }))

  return <Provider value={value}>{children}</Provider>
}
