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
import { Children, forwardRef } from 'react';
import { GridListCell } from './GridListCell';
import {
  DEFAULT_GRID_LIST_MAX_CELL_SIZE,
  DEFAULT_GRID_LIST_PADDING,
  GridListSizeProvider,
  useGridList,
} from './useGridList';
var isRenderFunction = function (children) {
  return typeof children === 'function';
};
/**
 * The `GridList` component is a different way to render a list of data where
 * the number of columns is dynamic and based on the max-width for each cell.
 * Instead of setting a percentage width to each cell based on the number of
 * columns, this will dynamically add columns to fill up the remaining space and
 * have each cell grow up to a set max-width. A really good use-case for this is
 * displaying a list of images or thumbnails and allowing the user to see a full
 * screen preview once selected/clicked.
 */
export var GridList = forwardRef(function GridList(_a, forwardedRef) {
  var style = _a.style,
    className = _a.className,
    children = _a.children,
    _b = _a.clone,
    clone = _b === void 0 ? false : _b,
    _c = _a.wrapOnly,
    wrapOnly = _c === void 0 ? false : _c,
    cellMargin = _a.cellMargin,
    defaultSize = _a.defaultSize,
    _d = _a.maxCellSize,
    maxCellSize = _d === void 0 ? DEFAULT_GRID_LIST_MAX_CELL_SIZE : _d,
    _e = _a.containerPadding,
    containerPadding = _e === void 0 ? DEFAULT_GRID_LIST_PADDING : _e,
    _f = _a.disableHeightObserver,
    disableHeightObserver = _f === void 0 ? false : _f,
    _g = _a.disableWidthObserver,
    disableWidthObserver = _g === void 0 ? false : _g,
    props = __rest(_a, [
      'style',
      'className',
      'children',
      'clone',
      'wrapOnly',
      'cellMargin',
      'defaultSize',
      'maxCellSize',
      'containerPadding',
      'disableHeightObserver',
      'disableWidthObserver',
    ]);
  var _h = __read(
      useGridList({
        ref: forwardedRef,
        style: style,
        className: className,
        cellMargin: cellMargin,
        defaultSize: defaultSize,
        maxCellSize: maxCellSize,
        containerPadding: containerPadding,
        disableHeight: disableHeightObserver,
        disableWidth: disableWidthObserver,
      }),
      2
    ),
    gridListProps = _h[0],
    gridSize = _h[1];
  var content = null;
  if (isRenderFunction(children)) {
    content = children(gridSize);
  } else if (clone || wrapOnly) {
    content = Children.map(children, function (child) {
      return child && <GridListCell clone={clone}>{child}</GridListCell>;
    });
  } else {
    content = children;
  }
  return (
    <GridListSizeProvider value={gridSize}>
      <div {...props} {...gridListProps}>
        {content}
      </div>
    </GridListSizeProvider>
  );
});
//# sourceMappingURL=GridList.jsx.map
