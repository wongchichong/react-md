import { createContext, useContext } from 'react';
import { useInteractionMode } from './useInteractionMode';
/**
 * @internal
 */
var modeContext = createContext('mouse');
/**
 * @internal
 */
var parentContext = createContext(false);
/**
 * @internal
 */
var UserInteractionModeProvider = modeContext.Provider;
/**
 * @internal
 */
var ParentProvider = parentContext.Provider;
/**
 * Returns the current user interaction mode.
 *
 * @returns {@link UserInteractionMode}
 */
export function useUserInteractionMode() {
  return useContext(modeContext);
}
/**
 * Example:
 *
 * ```ts
 * const isKeyboard = useIsUserInteractionMode("keyboard");
 * // do stuff if keyboard only
 * ```
 *
 * @param mode - The {@link UserInteractionMode} to check against.
 * @returns `true` if the current user interaction mode matches the provided
 * mode.
 */
export function useIsUserInteractionMode(mode) {
  return useUserInteractionMode() === mode;
}
/**
 * This component is used to determine how the user is current interacting with
 * your app as well as modifying the `document.body`'s `className` with the
 * current mode. This is what allows the `rmd-utils-phone-only`,
 * `rmd-utils-keyboard-only`, and `rmd-utils-mouse-only` mixins to work.
 *
 * @remarks \@since 2.6.0 Renamed from `InteractionModeListener`
 * @throws When this component has been mounted multiple times in your app.
 */
export function UserInteractionModeListener(_a) {
  var children = _a.children;
  var mode = useInteractionMode();
  if (useContext(parentContext)) {
    throw new Error(
      'Mounted multiple `UserInteractionModeListener` components.'
    );
  }
  return (
    <UserInteractionModeProvider value={mode}>
      <ParentProvider value>{children}</ParentProvider>
    </UserInteractionModeProvider>
  );
}
//# sourceMappingURL=UserInteractionModeListener.jsx.map
