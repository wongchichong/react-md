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
import { fireEvent, render } from '@testing-library/react';
import { UserInteractionModeListener } from '../../mode/UserInteractionModeListener';
import { KeyboardMovementProvider } from '../KeyboardMovementProvider';
import { useKeyboardFocus } from '../useKeyboardFocus';
import { useKeyboardFocusableElement } from '../useKeyboardFocusableElement';
function FocusableChild(_a) {
  var nodeRef = _a.nodeRef,
    _b = _a.role,
    role = _b === void 0 ? 'menuitem' : _b,
    _c = _a.tabIndex,
    tabIndex = _c === void 0 ? -1 : _c,
    children = _a.children,
    props = __rest(_a, ['nodeRef', 'role', 'tabIndex', 'children']);
  var refCallback = useKeyboardFocusableElement(nodeRef);
  return (
    <div {...props} ref={refCallback} role={role} tabIndex={tabIndex}>
      {children}
    </div>
  );
}
function CustomFocusContainer(_a) {
  var children = _a.children,
    _b = _a.disabledIndexes,
    disabledIndexes = _b === void 0 ? [] : _b,
    props = __rest(_a, ['children', 'disabledIndexes']);
  var _c = useKeyboardFocus(props),
    onKeyDown = _c.onKeyDown,
    onFocus = _c.onFocus;
  return (
    <div role="menu" tabIndex={-1} onFocus={onFocus} onKeyDown={onKeyDown}>
      {children ||
        Array.from({ length: 5 }, function (_, i) {
          return (
            <FocusableChild
              aria-disabled={disabledIndexes.includes(i)}
              key={i}
              id={'child-'.concat(i + 1)}
            >
              {'Child '.concat(i + 1)}
            </FocusableChild>
          );
        })}
    </div>
  );
}
function Test(_a) {
  var children = _a.children,
    disabledIndexes = _a.disabledIndexes,
    onFocus = _a.onFocus,
    onSearch = _a.onSearch,
    onKeyDown = _a.onKeyDown,
    onDecrement = _a.onDecrement,
    onIncrement = _a.onIncrement,
    onJumpToLast = _a.onJumpToLast,
    onFocusChange = _a.onFocusChange,
    onJumpToFirst = _a.onJumpToFirst,
    props = __rest(_a, [
      'children',
      'disabledIndexes',
      'onFocus',
      'onSearch',
      'onKeyDown',
      'onDecrement',
      'onIncrement',
      'onJumpToLast',
      'onFocusChange',
      'onJumpToFirst',
    ]);
  return (
    <UserInteractionModeListener>
      <KeyboardMovementProvider {...props}>
        <CustomFocusContainer
          disabledIndexes={disabledIndexes}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onSearch={onSearch}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onJumpToLast={onJumpToLast}
          onJumpToFirst={onJumpToFirst}
          onFocusChange={onFocusChange}
        >
          {children}
        </CustomFocusContainer>
      </KeyboardMovementProvider>
    </UserInteractionModeListener>
  );
}
var list = [
  'Frozen yogurt',
  'Ice cream sandwich',
  'Eclair',
  'Cupcake',
  'Gingerbread',
  'Jelly bean',
  'Lollipop',
  'Honeycomb',
  'Custard',
  'Donut',
  'KitKat',
  'Chocolate cake',
  'Vanilla ice cream',
];
function SearchTest(_a) {
  var _b = _a.disabledNames,
    disabledNames = _b === void 0 ? [] : _b,
    props = __rest(_a, ['disabledNames']);
  return (
    <Test {...props} searchable>
      {list.map(function (name, i) {
        return (
          <FocusableChild
            key={name}
            id={'child-'.concat(i + 1)}
            aria-disabled={disabledNames.includes(name)}
          >
            {name}
          </FocusableChild>
        );
      })}
    </Test>
  );
}
describe('KeyboardMovementProvider', function () {
  it('should throw an error if a child attempts to attach or detach a ref without a parent KeyboardMovementProvider', function () {
    var error = jest.spyOn(console, 'error').mockImplementation(function () {
      // don't print error to console
    });
    expect(function () {
      return render(<CustomFocusContainer />);
    }).toThrowError('KeyboardMovementProvider must be a parent component.');
    error.mockRestore();
  });
  it('should default to focusing the first element, not looping, not focusing elements when typing, and the DEFAULT_KEYBOARD_MOVEMENT keys', function () {
    var getByRole = render(<Test />).getByRole;
    var menu = getByRole('menu');
    var child1 = getByRole('menuitem', { name: 'Child 1' });
    var child2 = getByRole('menuitem', { name: 'Child 2' });
    var child3 = getByRole('menuitem', { name: 'Child 3' });
    var child4 = getByRole('menuitem', { name: 'Child 4' });
    var child5 = getByRole('menuitem', { name: 'Child 5' });
    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child3);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(child5);
  });
  it('should allow the keyboard focus to be looped', function () {
    var getByRole = render(<Test loopable />).getByRole;
    var menu = getByRole('menu');
    var child1 = getByRole('menuitem', { name: 'Child 1' });
    var child2 = getByRole('menuitem', { name: 'Child 2' });
    var child3 = getByRole('menuitem', { name: 'Child 3' });
    var child4 = getByRole('menuitem', { name: 'Child 4' });
    var child5 = getByRole('menuitem', { name: 'Child 5' });
    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child3);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(child1);
  });
  it('should allow the focus to move by typing the first letter of the element', function () {
    var _a = render(<SearchTest />),
      getByRole = _a.getByRole,
      rerender = _a.rerender;
    var menu = getByRole('menu');
    var frozenYogurt = getByRole('menuitem', { name: 'Frozen yogurt' });
    var eclair = getByRole('menuitem', { name: 'Eclair' });
    var cupcake = getByRole('menuitem', { name: 'Cupcake' });
    var jellyBean = getByRole('menuitem', { name: 'Jelly bean' });
    var custard = getByRole('menuitem', { name: 'Custard' });
    var chocolateCake = getByRole('menuitem', { name: 'Chocolate cake' });
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(frozenYogurt);
    fireEvent.keyDown(frozenYogurt, { key: 'E' });
    expect(document.activeElement).toBe(eclair);
    fireEvent.keyDown(eclair, { key: 'J' });
    expect(document.activeElement).toBe(jellyBean);
    fireEvent.keyDown(jellyBean, { key: 'C' });
    expect(document.activeElement).toBe(custard);
    fireEvent.keyDown(custard, { key: 'C' });
    expect(document.activeElement).toBe(chocolateCake);
    fireEvent.keyDown(custard, { key: 'C' });
    expect(document.activeElement).toBe(cupcake);
    fireEvent.keyDown(custard, { key: 'C' });
    expect(document.activeElement).toBe(custard);
    fireEvent.keyDown(custard, { key: 'E' });
    expect(document.activeElement).toBe(eclair);
    rerender(<SearchTest disabledNames={['Cupcake']} />);
    expect(document.activeElement).toBe(eclair);
    fireEvent.keyDown(eclair, { key: 'C' });
    expect(document.activeElement).toBe(custard);
    fireEvent.keyDown(custard, { key: 'E' });
    expect(document.activeElement).toBe(eclair);
    rerender(<SearchTest disabledNames={['Cupcake']} includeDisabled />);
    expect(document.activeElement).toBe(eclair);
    fireEvent.keyDown(eclair, { key: 'C' });
    expect(document.activeElement).toBe(cupcake);
  });
  it('should not focus disabled elements by default', function () {
    var _a = render(<Test disabledIndexes={[0, 2, 4]} />),
      getByRole = _a.getByRole,
      rerender = _a.rerender;
    var menu = getByRole('menu');
    var child1 = getByRole('menuitem', { name: 'Child 1' });
    var child2 = getByRole('menuitem', { name: 'Child 2' });
    var child3 = getByRole('menuitem', { name: 'Child 3' });
    var child4 = getByRole('menuitem', { name: 'Child 4' });
    var child5 = getByRole('menuitem', { name: 'Child 5' });
    expect(child1).toHaveAttribute('aria-disabled', 'true');
    expect(child2).not.toHaveAttribute('aria-disabled', 'true');
    expect(child3).toHaveAttribute('aria-disabled', 'true');
    expect(child4).not.toHaveAttribute('aria-disabled', 'true');
    expect(child5).toHaveAttribute('aria-disabled', 'true');
    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(child2);
    rerender(<Test disabledIndexes={[0, 2, 4]} loopable key="reset" />);
    menu = getByRole('menu');
    child1 = getByRole('menuitem', { name: 'Child 1' });
    child2 = getByRole('menuitem', { name: 'Child 2' });
    child3 = getByRole('menuitem', { name: 'Child 3' });
    child4 = getByRole('menuitem', { name: 'Child 4' });
    child5 = getByRole('menuitem', { name: 'Child 5' });
    expect(child1).toHaveAttribute('aria-disabled', 'true');
    expect(child2).not.toHaveAttribute('aria-disabled', 'true');
    expect(child3).toHaveAttribute('aria-disabled', 'true');
    expect(child4).not.toHaveAttribute('aria-disabled', 'true');
    expect(child5).toHaveAttribute('aria-disabled', 'true');
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child2);
  });
  it('should maintain focus on the current element if there are no other focusable elements available', function () {
    var getByRole = render(<Test disabledIndexes={[2, 3, 4]} />).getByRole;
    var menu = getByRole('menu');
    var child1 = getByRole('menuitem', { name: 'Child 1' });
    var child2 = getByRole('menuitem', { name: 'Child 2' });
    var child3 = getByRole('menuitem', { name: 'Child 3' });
    var child4 = getByRole('menuitem', { name: 'Child 4' });
    var child5 = getByRole('menuitem', { name: 'Child 5' });
    expect(child1).not.toHaveAttribute('aria-disabled', 'true');
    expect(child2).not.toHaveAttribute('aria-disabled', 'true');
    expect(child3).toHaveAttribute('aria-disabled', 'true');
    expect(child4).toHaveAttribute('aria-disabled', 'true');
    expect(child5).toHaveAttribute('aria-disabled', 'true');
    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(child1, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(child2, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child2);
  });
  it('should allow disabled elements to be focusable if the includeDisabled prop is true', function () {
    var getByRole = render(
      <Test loopable includeDisabled disabledIndexes={[0, 2, 4]} />
    ).getByRole;
    var menu = getByRole('menu');
    var child1 = getByRole('menuitem', { name: 'Child 1' });
    var child2 = getByRole('menuitem', { name: 'Child 2' });
    var child3 = getByRole('menuitem', { name: 'Child 3' });
    var child4 = getByRole('menuitem', { name: 'Child 4' });
    var child5 = getByRole('menuitem', { name: 'Child 5' });
    expect(document.activeElement).toBe(document.body);
    // enable keyboard mode for tests
    fireEvent.keyDown(document.body, { key: 'Tab' });
    fireEvent.focus(menu);
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child1);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child2);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child3);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child4);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'End' });
    expect(document.activeElement).toBe(child5);
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(document.activeElement).toBe(child1);
  });
  it('should prevent default behavior if any of the KeyboardFocusContext call event.stopPropagation()', function () {
    var stopPropagation = function (_a) {
      var event = _a.event;
      event.stopPropagation();
    };
    var onFocus = jest.fn(function (event) {
      return event.stopPropagation();
    });
    var onKeyDown = jest.fn(function (event) {
      event.stopPropagation();
    });
    var onSearch = jest.fn(stopPropagation);
    var onIncrement = jest.fn(stopPropagation);
    var onDecrement = jest.fn(stopPropagation);
    var onJumpToFirst = jest.fn(stopPropagation);
    var onJumpToLast = jest.fn(stopPropagation);
    var _a = render(
        <Test
          searchable
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onSearch={onSearch}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onJumpToFirst={onJumpToFirst}
          onJumpToLast={onJumpToLast}
        />
      ),
      getByRole = _a.getByRole,
      rerender = _a.rerender;
    var menu = getByRole('menu');
    expect(document.activeElement).toBe(document.body);
    expect(onFocus).not.toBeCalled();
    expect(onKeyDown).not.toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    fireEvent.focus(menu);
    expect(onFocus).toBeCalled();
    expect(onKeyDown).not.toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    rerender(
      <Test
        searchable
        onSearch={onSearch}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onJumpToFirst={onJumpToFirst}
        onJumpToLast={onJumpToLast}
      />
    );
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).not.toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(menu, { key: 'C' });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).not.toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).not.toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).toBeCalled();
    expect(onJumpToFirst).not.toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).toBeCalled();
    expect(onJumpToFirst).toBeCalled();
    expect(onJumpToLast).not.toBeCalled();
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(menu, { key: 'End' });
    expect(onFocus).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(onSearch).toBeCalled();
    expect(onIncrement).toBeCalled();
    expect(onDecrement).toBeCalled();
    expect(onJumpToFirst).toBeCalled();
    expect(onJumpToLast).toBeCalled();
    expect(document.activeElement).toBe(document.body);
  });
});
//# sourceMappingURL=KeyboardMovementProvider.jsx.map
