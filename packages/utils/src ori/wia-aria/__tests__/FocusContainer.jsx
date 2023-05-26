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
import { render } from '@testing-library/react';
import { FocusContainer } from '../FocusContainer';
var requestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
function Test(_a) {
  var visible = _a.visible,
    props = __rest(_a, ['visible']);
  return (
    <>
      <button id="main-button" type="button" autoFocus>
        Button
      </button>
      {visible && (
        <FocusContainer {...props}>
          <button id="button-1" type="button">
            Button 1
          </button>
          <button id="button-2" type="button">
            Button 2
          </button>
          <button id="button-3" type="button">
            Button 3
          </button>
        </FocusContainer>
      )}
    </>
  );
}
beforeEach(function () {
  requestAnimationFrame.mockClear();
  requestAnimationFrame.mockImplementation(function (cb) {
    cb(0);
    return 0;
  });
});
afterAll(function () {
  requestAnimationFrame.mockRestore();
});
describe('FocusContainer', function () {
  it('should handle the focus mounting flow correctly', function () {
    var getMainButton = function () {
      return document.getElementById('main-button');
    };
    var getButton1 = function () {
      return document.getElementById('button-1');
    };
    var rerender = render(<Test visible={false} />).rerender;
    expect(document.activeElement).toBe(getMainButton());
    rerender(<Test visible />);
    expect(document.activeElement).toBe(getButton1());
    rerender(<Test visible={false} />);
    expect(document.activeElement).toBe(getMainButton());
  });
  it('should not focus any elements while the disableFocusOnMount and disableFocusOnUnmount props are true', function () {
    var getMainButton = function () {
      return document.getElementById('main-button');
    };
    var rerender = render(
      <Test visible={false} disableFocusOnMount disableFocusOnUnmount />
    ).rerender;
    expect(document.activeElement).toBe(getMainButton());
    rerender(<Test visible disableFocusOnMount disableFocusOnUnmount />);
    expect(document.activeElement).toBe(getMainButton());
    rerender(<Test visible={false} disableTabFocusWrap />);
    expect(document.activeElement).toBe(getMainButton());
  });
  it('should render correctly (with snapshots)', function () {
    var _a = render(
        <FocusContainer>
          <a href="#">Link</a>
        </FocusContainer>
      ),
      container = _a.container,
      rerender = _a.rerender;
    expect(container).toMatchSnapshot();
    rerender(
      <FocusContainer component="span">
        <button id="button-1" type="button">
          Button
        </button>
      </FocusContainer>
    );
    expect(container).toMatchSnapshot();
  });
});
//# sourceMappingURL=FocusContainer.jsx.map
