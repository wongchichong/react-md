import { useAppSize } from './useAppSize';
/**
 * A simple component that will render the children only when the app is
 * considered in mobile mode via the `AppSizeContext`. A mobile view will be
 * true for both phones and tablets.
 */
export function MobileOnly(_a) {
  var children = _a.children,
    _b = _a.fallback,
    fallback = _b === void 0 ? null : _b;
  var _c = useAppSize(),
    isPhone = _c.isPhone,
    isTablet = _c.isTablet;
  if (isPhone || isTablet) {
    return children;
  }
  return fallback;
}
/**
 * A simple component that will render the children only when the app is
 * considered in phone mode via the `AppSizeContext`.
 */
export function PhoneOnly(_a) {
  var children = _a.children,
    _b = _a.fallback,
    fallback = _b === void 0 ? null : _b;
  var isPhone = useAppSize().isPhone;
  if (isPhone) {
    return children;
  }
  return fallback;
}
/**
 * A simple component that will render the children only when the app is
 * considered in tablet mode via the `AppSizeContext`.
 */
export function TabletOnly(_a) {
  var children = _a.children,
    _b = _a.fallback,
    fallback = _b === void 0 ? null : _b;
  var isTablet = useAppSize().isTablet;
  if (isTablet) {
    return children;
  }
  return fallback;
}
/**
 * A simple component that will render the children only when the app is
 * considered in desktop mode via the `AppSizeContext`.
 */
export function DesktopOnly(_a) {
  var children = _a.children,
    _b = _a.fallback,
    fallback = _b === void 0 ? null : _b;
  var isDesktop = useAppSize().isDesktop;
  if (isDesktop) {
    return children;
  }
  return fallback;
}
//# sourceMappingURL=MediaOnly.jsx.map
