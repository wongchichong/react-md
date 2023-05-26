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
import { forwardRef } from 'react';
/**
 * This component offers no styles and probably shouldn't be used externally
 * since it is just rendered by the `RadioGroup` component.
 *
 * @remarks \@since 2.7.0
 */
export var RadioWidget = forwardRef(function RadioGroupRadio(_a, ref) {
  var checked = _a.checked,
    children = _a.children,
    props = __rest(_a, ['checked', 'children']);
  return (
    <span {...props} aria-checked={checked} ref={ref} role="radio">
      {children}
    </span>
  );
});
//# sourceMappingURL=RadioWidget.jsx.map
