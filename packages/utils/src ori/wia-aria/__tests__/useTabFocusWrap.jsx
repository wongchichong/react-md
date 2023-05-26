import { fireEvent, render } from '@testing-library/react';
import { useTabFocusWrap } from '../useTabFocusWrap';
function Test(_a) {
  var onKeyDown = _a.onKeyDown,
    disableFocusCache = _a.disableFocusCache,
    disabled = _a.disabled,
    count = _a.count,
    tabIndex = _a.tabIndex;
  var handleKeyDown = useTabFocusWrap({
    onKeyDown: onKeyDown,
    disabled: disabled,
    disableFocusCache: disableFocusCache,
  });
  return (
    <div onKeyDown={handleKeyDown} data-testid="div" tabIndex={tabIndex}>
      {count >= 1 && <input data-testid="input-1" type="text" />}
      {count >= 2 && <input data-testid="input-2" type="text" />}
      {count >= 3 && <input data-testid="input-3" type="text" />}
    </div>
  );
}
describe('useTabFocusWrap', function () {
  it('should not focus a different element if there is only one focusable child', function () {
    var getByTestId = render(<Test count={1} tabIndex={-1} />).getByTestId;
    var input = getByTestId('input-1');
    input.focus();
    expect(document.activeElement).toBe(input);
    fireEvent.keyDown(input, { key: 'Tab' });
    expect(document.activeElement).toBe(input);
    var container = getByTestId('div');
    fireEvent.keyDown(container, { key: 'Tab' });
    expect(document.activeElement).toBe(input);
  });
  it('should not override default browser behavior until the first or last element is focused', function () {
    var getByTestId = render(<Test count={3} />).getByTestId;
    var input1 = getByTestId('input-1');
    var input2 = getByTestId('input-2');
    var input3 = getByTestId('input-3');
    // set up initial focus...
    input1.focus();
    expect(document.activeElement).toBe(input1);
    // start tracking focus changes
    var focus1 = jest.spyOn(input1, 'focus');
    var focus2 = jest.spyOn(input2, 'focus');
    var focus3 = jest.spyOn(input3, 'focus');
    fireEvent.keyDown(input1, { key: 'Tab' });
    // can't test document.activeElement focus here since JSDom doesn't implement tab focusing
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();
    fireEvent.keyDown(input2, { key: 'Tab' });
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();
    fireEvent.keyDown(input3, { key: 'Tab', shiftKey: true });
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();
    fireEvent.keyDown(input2, { key: 'Tab', shiftKey: true });
    expect(focus1).not.toBeCalled();
    expect(focus2).not.toBeCalled();
    expect(focus3).not.toBeCalled();
  });
  it('should contain focus by wrapping around', function () {
    var getByTestId = render(<Test count={2} />).getByTestId;
    var input1 = getByTestId('input-1');
    var input2 = getByTestId('input-2');
    // set up initial focus...
    input1.focus();
    expect(document.activeElement).toBe(input1);
    // start tracking focus changes
    var focus1 = jest.spyOn(input1, 'focus');
    var focus2 = jest.spyOn(input2, 'focus');
    fireEvent.keyDown(input1, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(input2);
    expect(focus2).toBeCalledTimes(1);
    fireEvent.keyDown(input2, { key: 'Tab' });
    expect(document.activeElement).toBe(input1);
    expect(focus1).toBeCalledTimes(1);
  });
  it('should call the optional onKeyDown function as well', function () {
    var onKeyDown = jest.fn();
    var getByTestId = render(
      <Test count={2} onKeyDown={onKeyDown} />
    ).getByTestId;
    var input1 = getByTestId('input-1');
    var input2 = getByTestId('input-2');
    // set up initial focus...
    input1.focus();
    expect(document.activeElement).toBe(input1);
    // start tracking focus changes
    var focus1 = jest.spyOn(input1, 'focus');
    var focus2 = jest.spyOn(input2, 'focus');
    fireEvent.keyDown(input1, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(input2);
    expect(focus2).toBeCalledTimes(1);
    expect(onKeyDown).toBeCalledTimes(1);
    // it should still be called if it's not a tab key press
    fireEvent.keyDown(input2, { key: 'Enter' });
    expect(onKeyDown).toBeCalledTimes(2);
    expect(focus1).not.toBeCalled();
    expect(focus2).toBeCalledTimes(1);
    fireEvent.keyDown(input2, { key: 'Tab' });
    expect(document.activeElement).toBe(input1);
    expect(focus1).toBeCalledTimes(1);
    expect(onKeyDown).toBeCalledTimes(3);
  });
});
//# sourceMappingURL=useTabFocusWrap.jsx.map
