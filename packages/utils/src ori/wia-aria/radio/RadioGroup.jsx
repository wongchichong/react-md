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
import { createRef, forwardRef, useCallback, useMemo, useState } from 'react';
import { loop } from '../../loop';
import { tryToSubmitRelatedForm } from '../tryToSubmitRelatedForm';
import { RadioWidget } from './RadioWidget';
import {
  defaultGetRadioClassName,
  defaultGetRadioStyle,
  getRadioItemValue,
} from './utils';
/**
 * The `RadioGroup` is a low-level component that does not provide any styles
 * and instead only provides the accessibility required for a
 * `role="radiogroup"` and rendering each `role="radio"` item.
 *
 * @remarks \@since 2.7.0
 */
export var RadioGroup = forwardRef(function RadioGroup(_a, ref) {
  var id = _a.id,
    _b = _a.getRadioStyle,
    getRadioStyle = _b === void 0 ? defaultGetRadioStyle : _b,
    _c = _a.getRadioClassName,
    getRadioClassName = _c === void 0 ? defaultGetRadioClassName : _c,
    items = _a.items,
    currentValue = _a.value,
    onBlur = _a.onBlur,
    onFocus = _a.onFocus,
    onClick = _a.onClick,
    onChange = _a.onChange,
    onKeyDown = _a.onKeyDown,
    props = __rest(_a, [
      'id',
      'getRadioStyle',
      'getRadioClassName',
      'items',
      'value',
      'onBlur',
      'onFocus',
      'onClick',
      'onChange',
      'onKeyDown',
    ]);
  var refs = items.map(function () {
    return createRef();
  });
  var _d = __read(useState(false), 2),
    focused = _d[0],
    setFocused = _d[1];
  var handleBlur = useCallback(
    function (event) {
      onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
      setFocused(false);
    },
    [onBlur]
  );
  var handleFocus = useCallback(
    function (event) {
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(event);
      setFocused(true);
    },
    [onFocus]
  );
  var handleClick = useCallback(
    function (event) {
      var _a, _b;
      onClick === null || onClick === void 0 ? void 0 : onClick(event);
      /* istanbul ignore next: can't really happen */
      var radio =
        (_a = event.target) === null || _a === void 0
          ? void 0
          : _a.closest('[role="radio"]');
      var index = radio
        ? refs.findIndex(function (_a) {
            var current = _a.current;
            return radio === current;
          })
        : -1;
      if (index !== -1) {
        onChange(getRadioItemValue(items[index]));
        /* istanbul ignore next: can't really happen */
        (_b = refs[index].current) === null || _b === void 0
          ? void 0
          : _b.focus();
      }
    },
    [onChange, onClick, refs, items]
  );
  var handleKeyDown = useCallback(
    function (event) {
      var _a, _b;
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
      if (tryToSubmitRelatedForm(event)) {
        return;
      }
      if (
        ![' ', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(
          event.key
        )
      ) {
        return;
      }
      /* istanbul ignore next: can't really happen */
      var radio =
        (_a = event.target) === null || _a === void 0
          ? void 0
          : _a.closest('[role="radio"]');
      if (!radio) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (event.key === ' ') {
        radio.click();
        return;
      }
      var increment = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      var index = refs.findIndex(function (_a) {
        var current = _a.current;
        return current === radio;
      });
      /* istanbul ignore next: can't really happen */
      if (index !== -1) {
        var nextIndex = loop({
          value: index,
          max: items.length - 1,
          increment: increment,
        });
        (_b = refs[nextIndex].current) === null || _b === void 0
          ? void 0
          : _b.focus();
        onChange(getRadioItemValue(items[nextIndex]));
      }
    },
    [onChange, onKeyDown, refs, items]
  );
  var focusable = useMemo(
    function () {
      return items.some(function (value) {
        return getRadioItemValue(value) === currentValue;
      });
    },
    [currentValue, items]
  );
  return (
    <span
      {...props}
      id={id}
      ref={ref}
      role="radiogroup"
      onBlur={handleBlur}
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {items.map(function (item, i) {
        var props;
        var value;
        var checked = false;
        var children;
        var itemStyle;
        var itemClassName;
        if (typeof item === 'string') {
          value = item;
          checked = currentValue === value;
          children = value;
          itemStyle = getRadioStyle({
            index: i,
            checked: checked,
            value: item,
          });
          itemClassName = getRadioClassName({
            index: i,
            checked: checked,
            value: item,
          });
        } else {
          (value = item.value),
            (children = item.children),
            (props = __rest(item, ['value', 'children']));
          checked = currentValue === value;
          itemStyle = getRadioStyle(
            __assign({ index: i, checked: checked }, item)
          );
          itemClassName =
            getRadioClassName(__assign({ index: i, checked: checked }, item)) ||
            undefined;
          if (typeof children === 'undefined') {
            children = value;
          }
        }
        return (
          <RadioWidget
            {...props}
            key={value}
            id={''.concat(id, '-').concat(i + 1)}
            ref={refs[i]}
            style={itemStyle}
            className={itemClassName}
            checked={checked}
            tabIndex={checked || (!focused && !focusable) ? 0 : -1}
          >
            {children}
          </RadioWidget>
        );
      })}
    </span>
  );
});
//# sourceMappingURL=RadioGroup.jsx.map
