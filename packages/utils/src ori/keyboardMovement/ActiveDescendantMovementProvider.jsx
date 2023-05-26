import { useMemo } from 'react';
import { ActiveDescendantContextProvider } from './activeDescendantContext';
/**
 * This component should be used with the {@link KeyboardMovementProvider}
 * component to implement custom keyboard focusable behavior using
 * `aria-activedescendant`.
 *
 * @example
 * Base Example
 * ```tsx
 * function Descendant({ id, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement {
 *   const { ref, active } = useActiveDescendant({ id });
 *   return (
 *     <div
 *       {...props}
 *       id={id}
 *       ref={ref}
 *       role="option"
 *       tabIndex={-1}
 *       className={active ? "active" : undefined}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 *
 * function CustomFocus(): ReactElement {
 *   const { providerProps, focusIndex, ...containerProps } =
 *     useActiveDescendantFocus()
 *
 *   return (
 *     <ActiveDescendantMovementProvider>
 *       <div
 *         {...containerProps}
 *         id="some-unique-id"
 *         role="listbox"
 *         tabIndex={0}
 *       >
 *         <Descendant id="some-descendant-id">
 *           Some Option
 *         </Descendant>
 *       </div>
 *      </ActiveDescendantMovementProvider>
 *   );
 * }
 *
 * function Example() {
 *   return (
 *     <KeyboardMovementProvider loopable searchable>
 *       <CustomFocus />
 *     </KeyboardMovementProvider>
 *   );
 * }
 * ```
 *
 * @see https://www.w3.org/TR/wai-aria-practices/#kbd_focus_activedescendant
 * @internal
 * @remarks \@since 5.0.0
 */
export function ActiveDescendantMovementProvider(_a) {
  var children = _a.children,
    activeId = _a.activeId,
    setActiveId = _a.setActiveId;
  return (
    <ActiveDescendantContextProvider
      value={useMemo(
        function () {
          return {
            activeId: activeId,
            setActiveId: setActiveId,
          };
        },
        [activeId, setActiveId]
      )}
    >
      {children}
    </ActiveDescendantContextProvider>
  );
}
//# sourceMappingURL=ActiveDescendantMovementProvider.jsx.map
