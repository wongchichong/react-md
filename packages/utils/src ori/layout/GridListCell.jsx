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
var block = bem('rmd-grid-list');
export var GridListCell = forwardRef(function GridListCell(_a, ref) {
  var className = _a.className,
    children = _a.children,
    _b = _a.square,
    square = _b === void 0 ? false : _b,
    _c = _a.clone,
    clone = _c === void 0 ? false : _c,
    props = __rest(_a, ['className', 'children', 'square', 'clone']);
  var cellClassName = cn(block('cell', { square: square }), className);
  if (clone && isValidElement(children)) {
    var child = Children.only(children);
    return cloneElement(child, {
      className: cn(cellClassName, child.props.className),
    });
  }
  return (
    <div {...props} ref={ref} className={cellClassName}>
      {children}
    </div>
  );
});
//# sourceMappingURL=GridListCell.jsx.map
