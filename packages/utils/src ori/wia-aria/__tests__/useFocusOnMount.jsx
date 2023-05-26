import { useRef } from 'react';
import { render } from '@testing-library/react';
import { useFocusOnMount } from '../useFocusOnMount';
var requestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
var cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
var Test = function (_a) {
  var _b = _a.disabled,
    disabled = _b === void 0 ? false : _b,
    _c = _a.defaultFocus,
    defaultFocus = _c === void 0 ? 'first' : _c,
    _d = _a.preventScroll,
    preventScroll = _d === void 0 ? false : _d,
    _e = _a.programmatic,
    programmatic = _e === void 0 ? false : _e;
  var ref = useRef(null);
  useFocusOnMount(ref, defaultFocus, preventScroll, programmatic, disabled);
  return (
    <div ref={ref}>
      <button type="button" data-testid="button-1">
        Button 1
      </button>
      <button type="button" data-testid="button-2">
        Button 2
      </button>
    </div>
  );
};
describe('useFocusOnMount', function () {
  beforeEach(function () {
    requestAnimationFrame.mockClear();
    cancelAnimationFrame.mockClear();
    requestAnimationFrame.mockImplementation(function (cb) {
      cb(0);
      return 0;
    });
  });
  afterAll(requestAnimationFrame.mockRestore);
  it('should use the requestAnimationFrame if not disabled and cancelAnimationFrame on unmount', function () {
    var unmount = render(<Test />).unmount;
    expect(requestAnimationFrame).toBeCalledTimes(1);
    expect(cancelAnimationFrame).not.toBeCalled();
    unmount();
    expect(requestAnimationFrame).toBeCalledTimes(1);
    expect(cancelAnimationFrame).toBeCalledTimes(1);
    requestAnimationFrame.mockClear();
    cancelAnimationFrame.mockClear();
    unmount = render(<Test disabled />).unmount;
    unmount();
    expect(requestAnimationFrame).not.toBeCalled();
    expect(cancelAnimationFrame).not.toBeCalled();
  });
  it('should do focus the first element by default', function () {
    var getByTestId = render(<Test />).getByTestId;
    expect(document.activeElement).toBe(getByTestId('button-1'));
  });
  it('should be able to focus an element based on the provided defaultFocus', function () {
    var _a, _b;
    var _c = render(<Test defaultFocus="first" />),
      getByTestId = _c.getByTestId,
      unmount = _c.unmount;
    expect(document.activeElement).toBe(getByTestId('button-1'));
    unmount();
    (_a = render(<Test defaultFocus="last" />)),
      (getByTestId = _a.getByTestId),
      (unmount = _a.unmount);
    expect(document.activeElement).toBe(getByTestId('button-2'));
    unmount();
    (_b = render(<Test defaultFocus="[data-testid='button-2']" />)),
      (getByTestId = _b.getByTestId),
      (unmount = _b.unmount);
    expect(document.activeElement).toBe(getByTestId('button-2'));
    unmount();
  });
});
//# sourceMappingURL=useFocusOnMount.jsx.map
