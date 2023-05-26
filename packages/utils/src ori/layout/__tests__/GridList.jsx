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
import { act, render } from '@testing-library/react';
import { ResizeObserver } from '@juggle/resize-observer';
import { GridList } from '../GridList';
import { useGridListSize } from '../useGridList';
jest.mock('@juggle/resize-observer');
var ResizeObserverMock = jest.mocked(ResizeObserver);
var DEFAULT_DOM_RECT = {
  x: 100,
  y: 100,
  bottom: 2000,
  top: 100,
  left: 100,
  right: 2000,
  height: 100,
  width: 1000,
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
    this._elements.push(target);
  };
  MockedObserver.prototype.unobserve = function (target) {
    this._elements = this._elements.filter(function (el) {
      return el !== target;
    });
  };
  MockedObserver.prototype.disconnect = function () {
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
  return MockedObserver;
})();
var observer;
var getBoundingClientRect;
beforeAll(function () {
  ResizeObserverMock.mockImplementation(function (callback) {
    observer = new MockedObserver(callback);
    return observer;
  });
  getBoundingClientRect = jest.spyOn(
    HTMLElement.prototype,
    'getBoundingClientRect'
  );
  // this mock doesn't really matter other than the `width` value. just have to
  // provide all the rest for Typescript
  getBoundingClientRect.mockImplementation(function () {
    return __assign(__assign({}, DEFAULT_DOM_RECT), {
      toJSON: function () {
        return '';
      },
    });
  });
});
beforeEach(function () {
  observer === null || observer === void 0 ? void 0 : observer.disconnect();
});
afterAll(function () {
  ResizeObserverMock.mockRestore();
  if (getBoundingClientRect) {
    getBoundingClientRect.mockRestore();
  }
});
function trigger(width) {
  if (width === void 0) {
    width = DEFAULT_DOM_RECT.width;
  }
  act(function () {
    if (!observer) {
      throw new Error();
    }
    observer.trigger({ width: width });
  });
}
describe('GridList', function () {
  // NOTE: jsdom currently does not support rendering custom css properties (css variables)
  // so we can't actually test that part.
  it('should provide the number of columns and cellWidth to a children render function with the default of 8 padding and 150 maxCellSize', function () {
    var children = jest.fn(function (_a) {
      var columns = _a.columns,
        cellWidth = _a.cellWidth;
      return (
        <span>
          {'Columns: '.concat(columns, ', cellWidth: ').concat(cellWidth)}
        </span>
      );
    });
    var rerender = render(<GridList>{children}</GridList>).rerender;
    var containerWidth = 1000 - 16;
    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith({ cellWidth: 150, columns: -1 });
    trigger(containerWidth);
    expect(children).toHaveBeenCalledTimes(2);
    expect(children).toHaveBeenCalledWith({
      columns: 7,
      cellWidth: containerWidth / Math.ceil(containerWidth / 150),
    });
    children.mockClear();
    rerender(<GridList maxCellSize={400}>{children}</GridList>);
    expect(children).toHaveBeenCalledTimes(1);
    // first render then it recalculates
    expect(children).toHaveBeenCalledWith({
      columns: 7,
      cellWidth: containerWidth / Math.ceil(containerWidth / 150),
    });
    trigger(containerWidth);
    expect(children).toHaveBeenCalledWith({
      columns: 3,
      cellWidth: containerWidth / Math.ceil(containerWidth / 400),
    });
  });
  it('should provide the number of columns and cellWidth to a children render function with a custom maxCellSize', function () {
    var containerWidth = 1000 - 16;
    var children = jest.fn(function (_a) {
      var columns = _a.columns,
        cellWidth = _a.cellWidth;
      return (
        <span>
          {'Columns: '.concat(columns, ', cellWidth: ').concat(cellWidth)}
        </span>
      );
    });
    render(<GridList maxCellSize={400}>{children}</GridList>);
    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith({ columns: -1, cellWidth: 400 });
    trigger(containerWidth);
    expect(children).toHaveBeenCalledTimes(2);
    expect(children).toHaveBeenCalledWith({
      columns: 3,
      cellWidth: containerWidth / Math.ceil(containerWidth / 400),
    });
  });
  it('should render correctly... (lazy test)', function () {
    var _a = render(
        <GridList>
          {function (_a) {
            var columns = _a.columns,
              cellWidth = _a.cellWidth;
            return (
              <span>
                {'Columns: '.concat(columns, ', cellWidth: ').concat(cellWidth)}
              </span>
            );
          }}
        </GridList>
      ),
      container = _a.container,
      rerender = _a.rerender;
    trigger();
    expect(container).toMatchSnapshot();
    rerender(
      <GridList maxCellSize={400}>
        {function (_a) {
          var columns = _a.columns,
            cellWidth = _a.cellWidth;
          return (
            <span>
              {'Columns: '.concat(columns, ', cellWidth: ').concat(cellWidth)}
            </span>
          );
        }}
      </GridList>
    );
    trigger();
    expect(container).toMatchSnapshot();
    rerender(
      <GridList>
        <div>This is some content!</div>
      </GridList>
    );
    trigger();
    expect(container).toMatchSnapshot();
    rerender(
      <GridList maxCellSize={400}>
        <div>This is some content!</div>
      </GridList>
    );
    trigger();
    expect(container).toMatchSnapshot();
  });
  it('should allow for the current cellWidth to be accessed with the useGridListSize hook', function () {
    var Child = function () {
      var size = useGridListSize();
      return <div data-testid="child">{JSON.stringify(size)}</div>;
    };
    var getByTestId = render(
      <GridList>
        <Child />
      </GridList>
    ).getByTestId;
    trigger();
    var child = getByTestId('child');
    expect(child).toMatchInlineSnapshot(
      '\n      <div\n        data-testid="child"\n      >\n        {"cellWidth":140.57142857142858,"columns":7}\n      </div>\n    '
    );
  });
  it('should provide -1 if the useGridListSize hook is used without a parent GridList component', function () {
    var Child = function () {
      var size = useGridListSize();
      return <div data-testid="child">{JSON.stringify(size)}</div>;
    };
    var getByTestId = render(<Child />).getByTestId;
    var child = getByTestId('child');
    expect(child).toMatchInlineSnapshot(
      '\n      <div\n        data-testid="child"\n      >\n        {"columns":-1,"cellWidth":-1}\n      </div>\n    '
    );
  });
  it('should allow for all the children to be wrapped in the GridListCell component', function () {
    function Test(_a) {
      var clone = _a.clone,
        wrapOnly = _a.wrapOnly;
      return (
        <GridList clone={clone} wrapOnly={wrapOnly}>
          <div>Child 1</div>
          <div>Child 2</div>
        </GridList>
      );
    }
    var _a = render(<Test clone />),
      container = _a.container,
      rerender = _a.rerender;
    expect(container).toMatchSnapshot();
    rerender(<Test wrapOnly />);
    expect(container).toMatchSnapshot();
  });
});
//# sourceMappingURL=GridList.jsx.map
