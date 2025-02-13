var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import { useEffect, useMemo, useRef } from 'react';
import {
  DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
  DEFAULT_DESKTOP_MIN_WIDTH,
  DEFAULT_PHONE_MAX_WIDTH,
  DEFAULT_TABLET_MAX_WIDTH,
  DEFAULT_TABLET_MIN_WIDTH,
} from './constants';
import { AppSizeContext } from './useAppSize';
import { DEFAULT_APP_SIZE, useAppSizeMedia } from './useAppSizeMedia';
/**
 * This component should be mounted near the top of your app as it will keep
 * track of the current app size based on the provided breakpoint widths.
 */
export function AppSizeListener(_a) {
  var children = _a.children,
    onChange = _a.onChange,
    _b = _a.phoneMaxWidth,
    phoneMaxWidth = _b === void 0 ? DEFAULT_PHONE_MAX_WIDTH : _b,
    _c = _a.tabletMinWidth,
    tabletMinWidth = _c === void 0 ? DEFAULT_TABLET_MIN_WIDTH : _c,
    _d = _a.tabletMaxWidth,
    tabletMaxWidth = _d === void 0 ? DEFAULT_TABLET_MAX_WIDTH : _d,
    _e = _a.desktopMinWidth,
    desktopMinWidth = _e === void 0 ? DEFAULT_DESKTOP_MIN_WIDTH : _e,
    _f = _a.desktopLargeMinWidth,
    desktopLargeMinWidth = _f === void 0 ? DEFAULT_DESKTOP_LARGE_MIN_WIDTH : _f,
    _g = _a.defaultSize,
    defaultSize = _g === void 0 ? DEFAULT_APP_SIZE : _g;
  var appSize = useAppSizeMedia({
    phoneMaxWidth: phoneMaxWidth,
    tabletMaxWidth: tabletMaxWidth,
    tabletMinWidth: tabletMinWidth,
    desktopMinWidth: desktopMinWidth,
    desktopLargeMinWidth: desktopLargeMinWidth,
    defaultSize: defaultSize,
  });
  var lastValue = useRef(appSize);
  useEffect(function () {
    // trigger the onChange prop on mount only if there is a difference between
    // the defaultSize and the mounted size.
    if (
      onChange &&
      (defaultSize.isPhone !== appSize.isPhone ||
        defaultSize.isTablet !== appSize.isTablet ||
        defaultSize.isDesktop !== appSize.isDesktop ||
        defaultSize.isLargeDesktop !== appSize.isLargeDesktop ||
        defaultSize.isLandscape !== appSize.isLandscape)
    ) {
      onChange(appSize, defaultSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (lastValue.current !== appSize) {
      if (onChange) {
        onChange(appSize, lastValue.current);
      }
      lastValue.current = appSize;
    }
  });
  var value = useMemo(
    function () {
      return __assign(__assign({}, appSize), { __initialized: true });
    },
    [appSize]
  );
  return (
    <AppSizeContext.Provider value={value}>{children}</AppSizeContext.Provider>
  );
}
//# sourceMappingURL=AppSizeListener.jsx.map
