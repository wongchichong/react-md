var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useOnUnmount } from '../useOnUnmount';
import {
  DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
} from './constants';
import { HoverModeContextProvider } from './useHoverModeContext';
/**
 * This component should normally be mounted near the root of your app to enable
 * hover mode for child components. However, it can also be used at other levels
 * if hover mode functionality should not carry over between two different parts
 * of the screen.
 *
 * @example
 * Separating Hover Mode
 * ```tsx
 * export default function Example(): ReactElement {
 *   return (
 *     <>
 *       <HoverModeProvider>
 *         <HeaderActions />
 *       </HoverModeProvider>
 *       <HoverModeProvider>
 *         <MainContent />
 *       </HoverModeProvider>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 2.8.0
 */
export function HoverModeProvider(_a) {
  var children = _a.children,
    _b = _a.disabled,
    disabled = _b === void 0 ? false : _b,
    _c = _a.defaultVisibleInTime,
    defaultVisibleInTime =
      _c === void 0 ? DEFAULT_HOVER_MODE_VISIBLE_IN_TIME : _c,
    _d = _a.deactivateTime,
    deactivateTime = _d === void 0 ? DEFAULT_HOVER_MODE_DEACTIVATION_TIME : _d;
  var _e = __read(useState(defaultVisibleInTime), 2),
    visibleInTime = _e[0],
    setVisibleInTime = _e[1];
  var timeoutRef = useRef();
  var enableHoverMode = useCallback(
    function () {
      if (disabled) {
        return;
      }
      window.clearTimeout(timeoutRef.current);
      setVisibleInTime(0);
    },
    [disabled]
  );
  var disableHoverMode = useCallback(
    function () {
      window.clearTimeout(timeoutRef.current);
      setVisibleInTime(defaultVisibleInTime);
    },
    [defaultVisibleInTime]
  );
  var startDisableTimer = useCallback(
    function () {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(function () {
        setVisibleInTime(defaultVisibleInTime);
      }, deactivateTime);
    },
    [defaultVisibleInTime, deactivateTime]
  );
  useEffect(
    function () {
      if (disabled) {
        window.clearTimeout(timeoutRef.current);
        setVisibleInTime(defaultVisibleInTime);
      }
    },
    [disabled, defaultVisibleInTime]
  );
  useOnUnmount(function () {
    window.clearTimeout(timeoutRef.current);
  });
  var context = useMemo(
    function () {
      return {
        visibleInTime: visibleInTime,
        enableHoverMode: enableHoverMode,
        disableHoverMode: disableHoverMode,
        startDisableTimer: startDisableTimer,
      };
    },
    [disableHoverMode, enableHoverMode, startDisableTimer, visibleInTime]
  );
  return (
    <HoverModeContextProvider value={context}>
      {children}
    </HoverModeContextProvider>
  );
}
//# sourceMappingURL=HoverModeProvider.jsx.map
