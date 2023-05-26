import { render, fireEvent } from '@testing-library/react';
import { useCloseOnEscape } from '../useCloseOnEscape';
function Test(_a) {
  var onKeyDown = _a.onKeyDown,
    onRequestClose = _a.onRequestClose,
    _b = _a.disabled,
    disabled = _b === void 0 ? false : _b;
  var handleKeyDown = useCloseOnEscape(onRequestClose, disabled, onKeyDown);
  return <div tabIndex={-1} onKeyDown={handleKeyDown} data-testid="div" />;
}
describe('useCloseOnEscape', function () {
  it('should call the onRequestClose function when the escape key is pressed', function () {
    var onRequestClose = jest.fn();
    var getByTestId = render(
      <Test onRequestClose={onRequestClose} />
    ).getByTestId;
    var div = getByTestId('div');
    fireEvent.keyDown(div, { key: ' ' });
    fireEvent.keyDown(div, { key: 'A' });
    fireEvent.keyDown(div, { key: 'B' });
    fireEvent.keyDown(div, { key: 'Enter' });
    expect(onRequestClose).not.toBeCalled();
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(onRequestClose).toBeCalled();
  });
  it('should not trigger the onRequestClose if disabled', function () {
    var onRequestClose = jest.fn();
    var getByTestId = render(
      <Test onRequestClose={onRequestClose} disabled />
    ).getByTestId;
    var div = getByTestId('div');
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(onRequestClose).not.toBeCalled();
  });
  it('should call the onKeyDown prop if it was provided', function () {
    var onKeyDown = jest.fn();
    var onRequestClose = jest.fn();
    var _a = render(
        <Test onRequestClose={onRequestClose} onKeyDown={onKeyDown} />
      ),
      getByTestId = _a.getByTestId,
      rerender = _a.rerender;
    var div = getByTestId('div');
    fireEvent.keyDown(div, { key: 'A' });
    expect(onKeyDown).toBeCalled();
    expect(onRequestClose).not.toBeCalled();
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(onKeyDown).toBeCalledTimes(2);
    expect(onRequestClose).toBeCalledTimes(1);
    onKeyDown.mockClear();
    onRequestClose.mockClear();
    rerender(
      <Test onRequestClose={onRequestClose} disabled onKeyDown={onKeyDown} />
    );
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(onKeyDown).toBeCalled();
    expect(onRequestClose).not.toBeCalled();
  });
});
//# sourceMappingURL=useCloseOnEscape.jsx.map
