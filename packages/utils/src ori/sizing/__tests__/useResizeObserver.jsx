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
import { act, render } from '@testing-library/react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useResizeObserver } from '../useResizeObserver';
jest.mock('@juggle/resize-observer');
var ResizeObserverMock = jest.mocked(ResizeObserver);
var observe = jest.fn();
var unobserve = jest.fn();
var disconnect = jest.fn();
var DEFAULT_DOM_RECT = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  toJSON: function () {
    return '';
  },
};
var MockedObserver = /** @class */ (function () {
  function MockedObserver(callback) {
    this._elements = [];
    this._callback = callback;
  }
  MockedObserver.prototype.observe = function (target) {
    observe(target);
    this._elements.push(target);
  };
  MockedObserver.prototype.unobserve = function (target) {
    unobserve(target);
    this._elements = this._elements.filter(function (el) {
      return el !== target;
    });
  };
  MockedObserver.prototype.disconnect = function () {
    disconnect();
    this._elements = [];
  };
  MockedObserver.prototype.trigger = function (rect) {
    var _this = this;
    if (rect === void 0) {
      rect = {};
    }
    var contentRect = __assign(__assign({}, rect), DEFAULT_DOM_RECT);
    act(function () {
      _this._callback(
        _this._elements.map(function (target) {
          return {
            target: target,
            contentRect: contentRect,
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
          };
        }),
        _this
      );
    });
  };
  MockedObserver.prototype.triggerTarget = function (element, contentRect) {
    var _this = this;
    if (contentRect === void 0) {
      contentRect = DEFAULT_DOM_RECT;
    }
    act(function () {
      var target = _this._elements.find(function (el) {
        return element === el;
      });
      if (!target) {
        throw new Error('Unable to find triggerable element');
      }
      _this._callback(
        [
          {
            target: target,
            contentRect: contentRect,
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
          },
        ],
        _this
      );
    });
  };
  return MockedObserver;
})();
describe('useResizeObserver', function () {
  var observer;
  beforeAll(function () {
    ResizeObserverMock.mockImplementation(function (callback) {
      observer = new MockedObserver(callback);
      return observer;
    });
  });
  beforeEach(function () {
    observer === null || observer === void 0 ? void 0 : observer.disconnect();
    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
  });
  afterAll(function () {
    ResizeObserverMock.mockRestore();
  });
  it('should use the ref API if the first argument is a function', function () {
    var onResize = jest.fn();
    var Test = function () {
      var _a = __read(useResizeObserver(onResize), 1),
        ref = _a[0];
      return <div data-testid="div" ref={ref} />;
    };
    var _a = render(<Test />),
      getByTestId = _a.getByTestId,
      unmount = _a.unmount;
    var div = getByTestId('div');
    expect(onResize).not.toHaveBeenCalled();
    expect(observe).toHaveBeenCalledWith(div);
    expect(observe).toHaveBeenCalledTimes(1);
    unmount();
    expect(onResize).not.toHaveBeenCalled();
    expect(unobserve).toHaveBeenCalledWith(div);
    expect(unobserve).toHaveBeenCalledTimes(1);
    expect(disconnect).not.toHaveBeenCalled();
  });
  it('should handle calling the callbacks correctly', function () {
    var onResize1 = jest.fn();
    var onResize2 = jest.fn();
    var onResize3 = jest.fn();
    var Test = function () {
      // you'll really never be attaching multiple resize event handlers to the
      // same DOM node like this...
      var _a = __read(useResizeObserver(onResize1), 2),
        ref1 = _a[1];
      var _b = __read(useResizeObserver(onResize2, { ref: ref1 }), 2),
        ref2 = _b[1];
      var _c = __read(useResizeObserver(onResize3, { ref: ref2 }), 2),
        ref3 = _c[1];
      return <div data-testid="div" ref={ref3} />;
    };
    var _a = render(<Test />),
      getByTestId = _a.getByTestId,
      unmount = _a.unmount;
    if (!observer) {
      throw new Error();
    }
    expect(onResize1).not.toHaveBeenCalled();
    expect(onResize2).not.toHaveBeenCalled();
    expect(onResize3).not.toHaveBeenCalled();
    observer.trigger();
    var expected = {
      element: getByTestId('div'),
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    expect(onResize1).toHaveBeenCalledWith(expected);
    expect(onResize2).toHaveBeenCalledWith(expected);
    expect(onResize3).toHaveBeenCalledWith(expected);
    unmount();
  });
  it('should never initialize the observer if both disableHeight and disableWidth are enabled or there is no target', function () {
    var Test1 = function () {
      var _a = __read(
          useResizeObserver(jest.fn(), {
            disableHeight: true,
            disableWidth: true,
          }),
          1
        ),
        ref = _a[0];
      return <div ref={ref} />;
    };
    var Test2 = function () {
      useResizeObserver(jest.fn());
      return null;
    };
    var unmount = render(<Test1 />).unmount;
    unmount();
    unmount = render(<Test2 />).unmount;
    unmount();
    expect(observe).not.toHaveBeenCalled();
    expect(unobserve).not.toHaveBeenCalled();
  });
  it('should not trigger the onResize callback if the height changed when the disableHeight option is enabled', function () {
    var onResize = jest.fn();
    var Test = function () {
      var _a = __read(
          useResizeObserver(onResize, {
            disableHeight: true,
          }),
          1
        ),
        ref = _a[0];
      return <div data-testid="div" ref={ref} />;
    };
    var _a = render(<Test />),
      getByTestId = _a.getByTestId,
      unmount = _a.unmount;
    if (!observer) {
      throw new Error();
    }
    var div = getByTestId('div');
    expect(onResize).not.toHaveBeenCalled();
    observer.trigger();
    expect(onResize).toHaveBeenCalledWith({
      element: div,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    });
    expect(onResize).toHaveBeenCalledTimes(1);
    observer.trigger({ height: 100 });
    expect(onResize).toHaveBeenCalledTimes(1);
    unmount();
  });
  it('should not trigger the onResize callback if the width changed when the disableWidth option is enabled', function () {
    var onResize = jest.fn();
    var Test = function () {
      var _a = __read(
          useResizeObserver(onResize, {
            disableWidth: true,
          }),
          1
        ),
        ref = _a[0];
      return <div data-testid="div" ref={ref} />;
    };
    var _a = render(<Test />),
      getByTestId = _a.getByTestId,
      unmount = _a.unmount;
    if (!observer) {
      throw new Error();
    }
    var div = getByTestId('div');
    expect(onResize).not.toHaveBeenCalled();
    observer.trigger();
    expect(onResize).toHaveBeenCalledWith({
      element: div,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    });
    expect(onResize).toHaveBeenCalledTimes(1);
    observer.trigger({ width: 1000 });
    expect(onResize).toHaveBeenCalledTimes(1);
    unmount();
  });
  it('should only trigger the resize handler for the element that has changed when multiple observers are added', function () {
    var onResize1 = jest.fn();
    var onResize2 = jest.fn();
    var onResize3 = jest.fn();
    var Demo = function (_a) {
      var onResize = _a.onResize,
        index = _a.index;
      var _b = __read(useResizeObserver(onResize), 2),
        refHandler = _b[1];
      return <div ref={refHandler} data-testid={'div-'.concat(index)} />;
    };
    var Test = function () {
      return (
        <>
          <Demo index={1} onResize={onResize1} />
          <Demo index={2} onResize={onResize2} />
          <Demo index={3} onResize={onResize3} />
        </>
      );
    };
    var _a = render(<Test />),
      getByTestId = _a.getByTestId,
      unmount = _a.unmount;
    if (!observer) {
      throw new Error();
    }
    var div1 = getByTestId('div-1');
    var div2 = getByTestId('div-2');
    var div3 = getByTestId('div-3');
    var expected1 = {
      element: div1,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    var expected2 = {
      element: div2,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    var expected3 = {
      element: div3,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    expect(onResize1).not.toHaveBeenCalled();
    expect(onResize2).not.toHaveBeenCalled();
    expect(onResize3).not.toHaveBeenCalled();
    observer.triggerTarget(div1);
    expect(onResize1).toHaveBeenCalledWith(expected1);
    expect(onResize2).not.toHaveBeenCalled();
    expect(onResize3).not.toHaveBeenCalled();
    observer.triggerTarget(div2);
    expect(onResize1).toHaveBeenCalledTimes(1);
    expect(onResize2).toHaveBeenCalledWith(expected2);
    expect(onResize3).not.toHaveBeenCalled();
    observer.triggerTarget(div3);
    expect(onResize1).toHaveBeenCalledTimes(1);
    expect(onResize2).toHaveBeenCalledTimes(1);
    expect(onResize3).toHaveBeenCalledWith(expected3);
    unmount();
  });
});
//# sourceMappingURL=useResizeObserver.jsx.map
