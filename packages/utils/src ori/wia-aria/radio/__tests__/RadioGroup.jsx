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
import { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { RadioGroup } from '../RadioGroup';
var ITEMS = ['Item 1', 'Item 2', 'Item 3'];
function Test(_a) {
  var _b = _a.defaultValue,
    defaultValue = _b === void 0 ? '' : _b,
    _c = _a.items,
    items = _c === void 0 ? ITEMS : _c,
    props = __rest(_a, ['defaultValue', 'items']);
  var _d = __read(useState(defaultValue), 2),
    value = _d[0],
    setValue = _d[1];
  return (
    <RadioGroup
      id="radio-group"
      aria-label="Radio Group"
      {...props}
      items={items}
      value={value}
      onChange={setValue}
    />
  );
}
describe('RadioGroup, RadioGroupProps', function () {
  it('should handle the roving tab index correctly and other keyboard behavior', function () {
    var getByRole = render(<Test />).getByRole;
    var item1 = getByRole('radio', { name: 'Item 1' });
    var item2 = getByRole('radio', { name: 'Item 2' });
    var item3 = getByRole('radio', { name: 'Item 3' });
    expect(item1).toHaveAttribute('tabIndex', '0');
    expect(item2).toHaveAttribute('tabIndex', '0');
    expect(item3).toHaveAttribute('tabIndex', '0');
    fireEvent.focus(item1);
    expect(item1).toHaveAttribute('tabIndex', '-1');
    expect(item2).toHaveAttribute('tabIndex', '-1');
    expect(item3).toHaveAttribute('tabIndex', '-1');
    fireEvent.blur(item1);
    expect(item1).toHaveAttribute('tabIndex', '0');
    expect(item2).toHaveAttribute('tabIndex', '0');
    expect(item3).toHaveAttribute('tabIndex', '0');
    fireEvent.focus(item1);
    expect(item1).toHaveAttribute('tabIndex', '-1');
    expect(item2).toHaveAttribute('tabIndex', '-1');
    expect(item3).toHaveAttribute('tabIndex', '-1');
    fireEvent.keyDown(item1, { key: ' ' });
    expect(document.activeElement).toBe(item1);
    expect(item1).toHaveAttribute('tabIndex', '0');
    expect(item2).toHaveAttribute('tabIndex', '-1');
    expect(item3).toHaveAttribute('tabIndex', '-1');
    expect(item1).toHaveAttribute('aria-checked', 'true');
    expect(item2).toHaveAttribute('aria-checked', 'false');
    expect(item3).toHaveAttribute('aria-checked', 'false');
    fireEvent.keyDown(item1, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(item2);
    expect(item1).toHaveAttribute('tabIndex', '-1');
    expect(item2).toHaveAttribute('tabIndex', '0');
    expect(item3).toHaveAttribute('tabIndex', '-1');
    expect(item1).toHaveAttribute('aria-checked', 'false');
    expect(item2).toHaveAttribute('aria-checked', 'true');
    expect(item3).toHaveAttribute('aria-checked', 'false');
    fireEvent.keyDown(item2, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(item3);
    expect(item1).toHaveAttribute('tabIndex', '-1');
    expect(item2).toHaveAttribute('tabIndex', '-1');
    expect(item3).toHaveAttribute('tabIndex', '0');
    expect(item1).toHaveAttribute('aria-checked', 'false');
    expect(item2).toHaveAttribute('aria-checked', 'false');
    expect(item3).toHaveAttribute('aria-checked', 'true');
    // looping
    fireEvent.keyDown(item3, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(item1);
    expect(item1).toHaveAttribute('tabIndex', '0');
    expect(item2).toHaveAttribute('tabIndex', '-1');
    expect(item3).toHaveAttribute('tabIndex', '-1');
    expect(item1).toHaveAttribute('aria-checked', 'true');
    expect(item2).toHaveAttribute('aria-checked', 'false');
    expect(item3).toHaveAttribute('aria-checked', 'false');
    fireEvent.keyDown(item1, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(item3);
    expect(item1).toHaveAttribute('tabIndex', '-1');
    expect(item2).toHaveAttribute('tabIndex', '-1');
    expect(item3).toHaveAttribute('tabIndex', '0');
    expect(item1).toHaveAttribute('aria-checked', 'false');
    expect(item2).toHaveAttribute('aria-checked', 'false');
    expect(item3).toHaveAttribute('aria-checked', 'true');
    fireEvent.keyDown(item3, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(item2);
    expect(item1).toHaveAttribute('tabIndex', '-1');
    expect(item2).toHaveAttribute('tabIndex', '0');
    expect(item3).toHaveAttribute('tabIndex', '-1');
    expect(item1).toHaveAttribute('aria-checked', 'false');
    expect(item2).toHaveAttribute('aria-checked', 'true');
    expect(item3).toHaveAttribute('aria-checked', 'false');
  });
  it("shouldn't have custom keyboard behavior of other keys or a radio cannot be found", function () {
    var getByRole = render(<Test />).getByRole;
    var item1 = getByRole('radio', { name: 'Item 1' });
    var group = getByRole('radiogroup');
    fireEvent.keyDown(group, { key: ' ' });
    fireEvent.click(group);
    expect(item1).toHaveAttribute('aria-checked', 'false');
    expect(item1).toHaveAttribute('tabIndex', '0');
    fireEvent.focus(item1);
    fireEvent.keyDown(item1, { key: 'A' });
    expect(item1).toHaveAttribute('aria-checked', 'false');
    expect(item1).toHaveAttribute('tabIndex', '-1');
  });
  it('should try to submit a form when the enter key is pressed', function () {
    // Error: Not implemented: HTMLFormElement.prototype.submit
    var error = jest.spyOn(console, 'error').mockImplementation(function () {});
    var onSubmit = jest.fn();
    var _a = render(
        <form onSubmit={onSubmit}>
          <Test />
          <button type="submit">Submit</button>
        </form>
      ),
      getByRole = _a.getByRole,
      rerender = _a.rerender;
    var item1 = getByRole('radio', { name: 'Item 1' });
    fireEvent.click(item1);
    expect(onSubmit).not.toBeCalled();
    fireEvent.keyDown(item1, { key: 'Enter' });
    expect(onSubmit).toBeCalledTimes(1);
    onSubmit.mockClear();
    rerender(
      <>
        <form id="form-id" onSubmit={onSubmit}>
          <Test />
        </form>
        <button type="submit" form="form-id">
          Submit
        </button>
      </>
    );
    item1 = getByRole('radio', { name: 'Item 1' });
    fireEvent.click(item1);
    expect(onSubmit).not.toBeCalled();
    fireEvent.keyDown(item1, { key: 'Enter' });
    expect(onSubmit).toBeCalledTimes(1);
    error.mockRestore();
  });
  it('should be able to render object items', function () {
    var items = [{ value: 'Item 1' }, { value: 'Item 2' }, { value: 'Item 3' }];
    var _a = render(<Test />),
      container = _a.container,
      rerender = _a.rerender;
    expect(container).toMatchSnapshot();
    rerender(<Test items={items} />);
    expect(container).toMatchSnapshot();
    var items2 = [
      { value: 'a', children: 'Item 1' },
      { value: 'b', children: <span>Item 2</span> },
      { value: 'Item 3', children: null },
    ];
    rerender(<Test items={items2} />);
    expect(container).toMatchSnapshot();
  });
  it('should still call the onBlur, onFocus, onClick, and onKeyDown props', function () {
    var onBlur = jest.fn();
    var onFocus = jest.fn();
    var onClick = jest.fn();
    var onKeyDown = jest.fn();
    var getByRole = render(
      <Test
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
    ).getByRole;
    var item1 = getByRole('radio', { name: 'Item 1' });
    fireEvent.focus(item1);
    expect(onFocus).toBeCalledTimes(1);
    fireEvent.keyDown(item1, { key: ' ' });
    expect(onKeyDown).toBeCalledTimes(1);
    expect(onClick).toBeCalledTimes(1);
    fireEvent.click(item1);
    expect(onClick).toBeCalledTimes(2);
    fireEvent.blur(item1);
    expect(onBlur).toBeCalledTimes(1);
  });
  it('should default to applying any style and className found on the item objects', function () {
    var items = [
      {
        value: 'a',
        children: 'Item 1',
        style: { color: 'red' },
      },
      {
        value: 'b',
        children: 'Item 2',
        className: 'item--orange',
      },
      {
        value: 'c',
        children: 'Item 2',
        style: { backgroundColor: 'purple' },
        className: 'item--boop',
      },
    ];
    var container = render(<Test items={items} />).container;
    expect(container).toMatchSnapshot();
  });
  it('should allow for custom style and classes with the getRadioStyle and getRadioClassName props', function () {
    var getByRole = render(
      <Test
        getRadioStyle={function (item) {
          if (item.checked) {
            return { color: 'red' };
          }
        }}
        getRadioClassName={function (item) {
          return 'item--'.concat(item.index);
        }}
      />
    ).getByRole;
    var item1 = getByRole('radio', { name: 'Item 1' });
    var item2 = getByRole('radio', { name: 'Item 2' });
    var item3 = getByRole('radio', { name: 'Item 3' });
    expect(item1).toHaveClass('item--0');
    expect(item2).toHaveClass('item--1');
    expect(item3).toHaveClass('item--2');
    expect(item1.style.color).toBe('');
    expect(item2.style.color).toBe('');
    expect(item3.style.color).toBe('');
    fireEvent.click(item2);
    expect(item1).toHaveClass('item--0');
    expect(item2).toHaveClass('item--1');
    expect(item3).toHaveClass('item--2');
    expect(item1.style.color).toBe('');
    expect(item2.style.color).toBe('red');
    expect(item3.style.color).toBe('');
  });
});
//# sourceMappingURL=RadioGroup.jsx.map
