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
import { usePreviousFocus } from '../usePreviousFocus';
var requestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
beforeEach(function () {
  requestAnimationFrame.mockClear();
  // need the frame to be run sync for testing this
  requestAnimationFrame.mockImplementation(function (cb) {
    cb(0);
    return 0;
  });
});
afterAll(requestAnimationFrame.mockRestore);
function Test(_a) {
  var disabled = _a.disabled,
    fallback = _a.fallback,
    _b = _a.previousElement,
    previousElement = _b === void 0 ? null : _b;
  usePreviousFocus(disabled, fallback, previousElement);
  return (
    <button type="button" id="button-2" autoFocus>
      Button 2
    </button>
  );
}
function TestComponent(_a) {
  var mounted = _a.mounted,
    _b = _a.buttonMounted,
    buttonMounted = _b === void 0 ? true : _b,
    props = __rest(_a, ['mounted', 'buttonMounted']);
  return (
    <>
      {buttonMounted && (
        <button type="button" id="button-1" autoFocus>
          Button 1
        </button>
      )}
      {mounted && <Test {...props} />}
    </>
  );
}
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('usePreviousFocus', function () {
  it('should attempt to focus the previous active element in the dom when the component unmounts', function () {
    var _a = render(<TestComponent mounted={false} disabled={false} />),
      rerender = _a.rerender,
      queryByText = _a.queryByText;
    var button1 = queryByText('Button 1');
    expect(button1).not.toBeNull();
    expect(document.activeElement).toBe(button1);
    rerender(<TestComponent mounted disabled={false} />);
    var button2 = queryByText('Button 2');
    expect(document.activeElement).toBe(button2);
    rerender(<TestComponent mounted={false} disabled={false} />);
    expect(document.activeElement).toBe(button1);
  });
  it('should request an animation frame and then check if the previous focus exists in the dom', function () {
    var docContains = jest.spyOn(document, 'contains');
    var _a = render(<TestComponent mounted={false} disabled={false} />),
      rerender = _a.rerender,
      queryByText = _a.queryByText;
    expect(requestAnimationFrame).not.toBeCalled();
    rerender(<TestComponent mounted disabled={false} />);
    expect(requestAnimationFrame).not.toBeCalled();
    // start testing unmount...
    rerender(<TestComponent mounted={false} disabled={false} />);
    expect(requestAnimationFrame).toBeCalledTimes(1);
    expect(docContains).toBeCalledWith(queryByText('Button 1'));
    docContains.mockRestore();
  });
  it('should use the fallback value if the previous focus no longer exists in the dom when the component unmounts for string fallbacks', function () {
    var fallbackEl = document.createElement('button');
    document.body.appendChild(fallbackEl);
    var docContains = jest.spyOn(document, 'contains');
    var querySelector = jest.spyOn(document, 'querySelector');
    querySelector.mockImplementation(function (query) {
      return query === '#fallback' ? fallbackEl : null;
    });
    var _a = render(
        <TestComponent mounted={false} disabled={false} fallback="#fallback" />
      ),
      rerender = _a.rerender,
      queryByText = _a.queryByText;
    rerender(<TestComponent mounted disabled={false} fallback="#fallback" />);
    var button1 = queryByText('Button 1');
    docContains.mockImplementation(function (el) {
      return el !== button1;
    });
    rerender(
      <TestComponent
        mounted={false}
        buttonMounted={false}
        disabled={false}
        fallback="#fallback"
      />
    );
    expect(docContains).toBeCalledWith(button1);
    expect(querySelector).toBeCalledWith('#fallback');
    expect(document.activeElement).toBe(fallbackEl);
    docContains.mockRestore();
    document.body.removeChild(fallbackEl);
  });
  it('should use the fallback value if the previous focus no longer exists in the dom when the component unmounts for function fallbacks', function () {
    var fallbackEl = document.createElement('button');
    document.body.appendChild(fallbackEl);
    var docContains = jest.spyOn(document, 'contains');
    var getFallback = jest.fn(function () {
      return fallbackEl;
    });
    var _a = render(
        <TestComponent
          mounted={false}
          disabled={false}
          fallback={getFallback}
        />
      ),
      rerender = _a.rerender,
      queryByText = _a.queryByText;
    rerender(<TestComponent mounted disabled={false} fallback={getFallback} />);
    var button1 = queryByText('Button 1');
    docContains.mockImplementation(function (el) {
      return el !== button1;
    });
    rerender(
      <TestComponent
        mounted={false}
        buttonMounted={false}
        disabled={false}
        fallback={getFallback}
      />
    );
    expect(docContains).toBeCalledWith(button1);
    expect(getFallback).toBeCalledTimes(1);
    expect(document.activeElement).toBe(fallbackEl);
    docContains.mockRestore();
    document.body.removeChild(fallbackEl);
  });
  it('should use the fallback value if the previous focus no longer exists in the dom when the component unmounts for HTMLElement fallbacks', function () {
    var fallbackEl = document.createElement('button');
    document.body.appendChild(fallbackEl);
    var docContains = jest.spyOn(document, 'contains');
    var _a = render(
        <TestComponent mounted={false} disabled={false} fallback={fallbackEl} />
      ),
      rerender = _a.rerender,
      queryByText = _a.queryByText;
    rerender(<TestComponent mounted disabled={false} fallback={fallbackEl} />);
    var button1 = queryByText('Button 1');
    docContains.mockImplementation(function (el) {
      return el !== button1;
    });
    rerender(
      <TestComponent
        mounted={false}
        buttonMounted={false}
        disabled={false}
        fallback={fallbackEl}
      />
    );
    expect(docContains).toBeCalledWith(button1);
    expect(document.activeElement).toBe(fallbackEl);
    docContains.mockRestore();
    document.body.removeChild(fallbackEl);
  });
  it('should do nothing if disabled', function () {
    var rerender = render(<TestComponent mounted={false} disabled />).rerender;
    expect(requestAnimationFrame).not.toBeCalled();
    rerender(<TestComponent mounted disabled />);
    expect(requestAnimationFrame).not.toBeCalled();
    rerender(<TestComponent mounted={false} disabled />);
    expect(requestAnimationFrame).not.toBeCalled();
  });
});
//# sourceMappingURL=usePreviousFocus.jsx.map
