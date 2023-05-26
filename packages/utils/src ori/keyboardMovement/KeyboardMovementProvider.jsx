import { useMemo, useRef } from 'react';
import { useDir } from '../Dir';
import {
  DEFAULT_KEYBOARD_MOVEMENT,
  DEFAULT_LTR_KEYBOARD_MOVEMENT,
  DEFAULT_RTL_KEYBOARD_MOVEMENT,
  KeyboardMovementContextProvider,
} from './movementContext';
import { getSearchText } from './utils';
/**
 * @example
 * Main Usage
 * ```tsx
 * function Example() {
 *   return (
 *     <KeyboardMovementProvider>
 *       <CustomKeyboardFocusWidget />
 *     </KeyboardMovementProvider>
 *   );
 * }
 *
 * function CustomKeyboardFocusWidget() {
 *   const { focusIndex: _focusIndex, ...eventHandlers } = useKeyboardFocus();
 *   return (
 *     <div {...eventHandlers}>
 *       <FocusableChild />
 *       <FocusableChild />
 *       <FocusableChild />
 *       <FocusableChild />
 *     </div>
 *   );
 * }
 *
 * function FocusableChild() {
 *   const refCallback = useKeyboardFocusableElement()
 *
 *   return <div role="menuitem" tabIndex={-1} ref={refCallback}>Content</div>;
 * }
 * ```
 *
 * @remarks \@since 5.0.0
 */
export function KeyboardMovementProvider(_a) {
  var children = _a.children,
    _b = _a.loopable,
    loopable = _b === void 0 ? false : _b,
    _c = _a.searchable,
    searchable = _c === void 0 ? false : _c,
    _d = _a.horizontal,
    horizontal = _d === void 0 ? false : _d,
    _e = _a.includeDisabled,
    includeDisabled = _e === void 0 ? false : _e,
    propIncrementKeys = _a.incrementKeys,
    propDecrementKeys = _a.decrementKeys,
    propJumpToFirstKeys = _a.jumpToFirstKeys,
    propJumpToLastKeys = _a.jumpToLastKeys;
  var isRTL = useDir().dir === 'rtl';
  var defaults;
  if (horizontal) {
    defaults = isRTL
      ? DEFAULT_RTL_KEYBOARD_MOVEMENT
      : DEFAULT_LTR_KEYBOARD_MOVEMENT;
  } else {
    defaults = DEFAULT_KEYBOARD_MOVEMENT;
  }
  var incrementKeys = propIncrementKeys || defaults.incrementKeys;
  var decrementKeys = propDecrementKeys || defaults.decrementKeys;
  var jumpToFirstKeys = propJumpToFirstKeys || defaults.jumpToFirstKeys;
  var jumpToLastKeys = propJumpToLastKeys || defaults.jumpToLastKeys;
  var watching = useRef([]);
  var configuration = {
    incrementKeys: incrementKeys,
    decrementKeys: decrementKeys,
    jumpToFirstKeys: jumpToFirstKeys,
    jumpToLastKeys: jumpToLastKeys,
  };
  var config = useRef(configuration);
  config.current = configuration;
  var value = useMemo(
    function () {
      return {
        attach: function (element) {
          watching.current.push({
            element: element,
            content: getSearchText(element, searchable),
          });
        },
        detach: function (element) {
          watching.current = watching.current.filter(function (cache) {
            return cache.element !== element;
          });
        },
        watching: watching,
        config: config,
        loopable: loopable,
        searchable: searchable,
        horizontal: horizontal,
        includeDisabled: includeDisabled,
      };
    },
    [horizontal, includeDisabled, loopable, searchable]
  );
  return (
    <KeyboardMovementContextProvider value={value}>
      {children}
    </KeyboardMovementContextProvider>
  );
}
//# sourceMappingURL=KeyboardMovementProvider.jsx.map
