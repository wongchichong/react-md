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
import { useEffect } from 'react';
import { UserInteractionModeListener } from '../../mode/UserInteractionModeListener';
import { useActiveDescendantContext } from '../activeDescendantContext';
import { ActiveDescendantMovementProvider } from '../ActiveDescendantMovementProvider';
import { KeyboardMovementProvider } from '../KeyboardMovementProvider';
import { useActiveDescendant } from '../useActiveDescendant';
import { useActiveDescendantFocus } from '../useActiveDescendantFocus';
function Descendant(_a) {
  var id = _a.id,
    nodeRef = _a.nodeRef,
    _b = _a.role,
    role = _b === void 0 ? 'option' : _b,
    _c = _a.tabIndex,
    tabIndex = _c === void 0 ? -1 : _c,
    children = _a.children,
    props = __rest(_a, ['id', 'nodeRef', 'role', 'tabIndex', 'children']);
  var _d = useActiveDescendant({
      id: id,
      ref: nodeRef,
    }),
    ref = _d.ref,
    active = _d.active;
  return (
    <div
      {...props}
      id={id}
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      className={active ? 'active' : undefined}
    >
      {children}
    </div>
  );
}
function ActiveDescendantContainer(_a) {
  var children = _a.children,
    options = __rest(_a, ['children']);
  var _b = useActiveDescendantFocus(options),
    providerProps = _b.providerProps,
    _focusIndex = _b.focusIndex,
    props = __rest(_b, ['providerProps', 'focusIndex']);
  return (
    <div {...props} id="listbox" role="listbox" tabIndex={0}>
      <ActiveDescendantMovementProvider {...providerProps}>
        {children ||
          Array.from({ length: 5 }, function (_, i) {
            return (
              <Descendant id={'option-'.concat(i + 1)} key={i}>
                {'Option '.concat(i + 1)}
              </Descendant>
            );
          })}
      </ActiveDescendantMovementProvider>
    </div>
  );
}
function Test(_a) {
  var onFocus = _a.onFocus,
    onSearch = _a.onSearch,
    onKeyDown = _a.onKeyDown,
    onDecrement = _a.onDecrement,
    onIncrement = _a.onIncrement,
    onJumpToLast = _a.onJumpToLast,
    onJumpToFirst = _a.onJumpToFirst,
    defaultActiveId = _a.defaultActiveId,
    props = __rest(_a, [
      'onFocus',
      'onSearch',
      'onKeyDown',
      'onDecrement',
      'onIncrement',
      'onJumpToLast',
      'onJumpToFirst',
      'defaultActiveId',
    ]);
  return (
    <UserInteractionModeListener>
      <KeyboardMovementProvider {...props}>
        <ActiveDescendantContainer
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          onSearch={onSearch}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onJumpToLast={onJumpToLast}
          onJumpToFirst={onJumpToFirst}
          defaultActiveId={defaultActiveId}
        />
      </KeyboardMovementProvider>
    </UserInteractionModeListener>
  );
}
describe('ActiveDescendantMovementProvider', function () {
  it('should throw an error if there is not a KeyboardMovementProvider or ActiveDescendantMovementProvider as a parent component', function () {
    function NoKeyboardMovementProvider() {
      return (
        <ActiveDescendantMovementProvider
          activeId=""
          setActiveId={function () {}}
        >
          <Descendant id="child-1">Child 1</Descendant>
        </ActiveDescendantMovementProvider>
      );
    }
    function NoActiveDescendantMovementProvider() {
      var setActiveId = useActiveDescendantContext().setActiveId;
      useEffect(
        function () {
          setActiveId('boop');
        },
        [setActiveId]
      );
      return null;
    }
    var error = jest.spyOn(console, 'error').mockImplementation(function () {
      // don't print error to console
    });
    expect(function () {
      render(<NoKeyboardMovementProvider />);
    }).toThrowError('KeyboardMovementProvider must be a parent component.');
    expect(function () {
      render(<NoActiveDescendantMovementProvider />);
    }).toThrowError(
      'ActiveDescendantMovementProvider must be a parent component.'
    );
    error.mockRestore();
  });
  // TODO
  it('should correctly focus elements when there is no default active id', function () {
    var getByRole = render(<Test />).getByRole;
    var listbox = getByRole('listbox');
    var option1 = getByRole('option', { name: 'Option 1' });
    var option2 = getByRole('option', { name: 'Option 2' });
    var option3 = getByRole('option', { name: 'Option 3' });
    var option4 = getByRole('option', { name: 'Option 4' });
    var option5 = getByRole('option', { name: 'Option 5' });
    expect(document.activeElement).toBe(document.body);
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    expect(option1).not.toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
    fireEvent.keyDown(document.body, { key: 'Tab' });
    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    expect(document.activeElement).toBe(listbox);
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1');
    expect(option1).toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-2');
    expect(option1).not.toHaveClass('active');
    expect(option2).toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
  });
  it('should allow for a defaultActiveId', function () {
    var getByRole = render(<Test defaultActiveId="option-1" />).getByRole;
    var listbox = getByRole('listbox');
    var option1 = getByRole('option', { name: 'Option 1' });
    var option2 = getByRole('option', { name: 'Option 2' });
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1');
    expect(option1).toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1');
    expect(option1).toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-2');
    expect(option1).not.toHaveClass('active');
    expect(option2).toHaveClass('active');
  });
  it('should handle looping correctly', function () {
    var getByRole = render(<Test loopable />).getByRole;
    var listbox = getByRole('listbox');
    var option1 = getByRole('option', { name: 'Option 1' });
    var option2 = getByRole('option', { name: 'Option 2' });
    var option3 = getByRole('option', { name: 'Option 3' });
    var option4 = getByRole('option', { name: 'Option 4' });
    var option5 = getByRole('option', { name: 'Option 5' });
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    expect(option1).not.toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-5');
    expect(option1).not.toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).toHaveClass('active');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1');
    expect(option1).toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
  });
  it('should handle searching correctly', function () {
    var getByRole = render(<Test searchable />).getByRole;
    var listbox = getByRole('listbox');
    var option1 = getByRole('option', { name: 'Option 1' });
    var option2 = getByRole('option', { name: 'Option 2' });
    var option3 = getByRole('option', { name: 'Option 3' });
    var option4 = getByRole('option', { name: 'Option 4' });
    var option5 = getByRole('option', { name: 'Option 5' });
    expect(document.activeElement).toBe(document.body);
    fireEvent.keyDown(document.body, { key: 'Tab' });
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    expect(option1).not.toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
    listbox.focus();
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    fireEvent.keyDown(listbox, { key: 'A' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', '');
    expect(option1).not.toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
    fireEvent.keyDown(listbox, { key: 'O' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1');
    expect(option1).toHaveClass('active');
    expect(option2).not.toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
    fireEvent.keyDown(listbox, { key: 'O' });
    expect(document.activeElement).toBe(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-2');
    expect(option1).not.toHaveClass('active');
    expect(option2).toHaveClass('active');
    expect(option3).not.toHaveClass('active');
    expect(option4).not.toHaveClass('active');
    expect(option5).not.toHaveClass('active');
  });
});
//# sourceMappingURL=ActiveDescendantMovementProvider.jsx.map
