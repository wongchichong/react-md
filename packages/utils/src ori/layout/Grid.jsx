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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { bem } from '../bem';
import { useAppSize } from '../sizing/useAppSize';
import { GridCell } from './GridCell';
/**
 * This CSS Variable allows you to override the number of columns that should be
 * displayed in the grid. This is automatically updated with media queries with
 * the default grid implementation, but is used here to add additional
 * inline-style overrides.
 *
 * @internal
 */
export var GRID_COLUMNS_VAR = '--rmd-grid-cols';
/**
 * This CSS Variable allows you to override the gutter (grid-gap) between each
 * cell in the grid.
 *
 * @internal
 */
export var GRID_GUTTER_VAR = '--rmd-grid-gutter';
var block = bem('rmd-grid');
/**
 * The grid component is generally used for a base layout in your app to provide
 * nice padding and spacing between each item.
 *
 * Note: This component relies on the `AppSizeListener` as a parent component to
 * work and will throw an error if it does not exist as a parent.
 */
export var Grid = forwardRef(function Grid(_a, ref) {
  var _b;
  var style = _a.style,
    className = _a.className,
    children = _a.children,
    _c = _a.clone,
    clone = _c === void 0 ? false : _c,
    _d = _a.cloneStyles,
    cloneStyles = _d === void 0 ? false : _d,
    _e = _a.wrapOnly,
    wrapOnly = _e === void 0 ? false : _e,
    columns = _a.columns,
    phoneColumns = _a.phoneColumns,
    tabletColumns = _a.tabletColumns,
    desktopColumns = _a.desktopColumns,
    largeDesktopColumns = _a.largeDesktopColumns,
    padding = _a.padding,
    gutter = _a.gutter,
    minCellWidth = _a.minCellWidth,
    props = __rest(_a, [
      'style',
      'className',
      'children',
      'clone',
      'cloneStyles',
      'wrapOnly',
      'columns',
      'phoneColumns',
      'tabletColumns',
      'desktopColumns',
      'largeDesktopColumns',
      'padding',
      'gutter',
      'minCellWidth',
    ]);
  var _f = useAppSize(),
    isPhone = _f.isPhone,
    isTablet = _f.isTablet,
    isDesktop = _f.isDesktop,
    isLargeDesktop = _f.isLargeDesktop;
  var mergedStyle = __assign(
    __assign(
      {
        padding: (padding !== 0 && padding) || undefined,
        gridTemplateColumns: minCellWidth
          ? 'repeat(auto-fill, minmax('.concat(minCellWidth, ', 1fr))')
          : undefined,
      },
      style
    ),
    ((_b = {}),
    (_b[GRID_COLUMNS_VAR] =
      (isPhone && phoneColumns) ||
      (isTablet && tabletColumns) ||
      (isLargeDesktop && largeDesktopColumns) ||
      (isDesktop && desktopColumns) ||
      columns),
    (_b[GRID_GUTTER_VAR] = gutter),
    _b)
  );
  var mergedClassName = cn(block({ 'no-padding': padding === 0 }), className);
  if (cloneStyles && isValidElement(children)) {
    var child = Children.only(children);
    return cloneElement(child, {
      style: __assign(__assign({}, mergedStyle), child.props.style),
      className: cn(mergedClassName, child.props.className),
    });
  }
  var content = children;
  if (clone || wrapOnly) {
    content = Children.map(children, function (child) {
      return child && <GridCell clone={clone}>{child}</GridCell>;
    });
  }
  return (
    <div {...props} ref={ref} style={mergedStyle} className={mergedClassName}>
      {content}
    </div>
  );
});
//# sourceMappingURL=Grid.jsx.map
