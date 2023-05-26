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
import { render as renderer } from '@testing-library/react';
import { AppSizeListener } from '../../sizing/AppSizeListener';
import { Grid, GRID_COLUMNS_VAR } from '../Grid';
import { GridCell } from '../GridCell';
var render = function (children, options) {
  return renderer(
    children,
    __assign(__assign({}, options), {
      wrapper: function (_a) {
        var children = _a.children;
        return <AppSizeListener>{children}</AppSizeListener>;
      },
    })
  );
};
describe('Grid', function () {
  it('should render correctly with the GridCell component', function () {
    var container = render(
      <Grid>
        <GridCell>Cell 1</GridCell>
        <GridCell>Cell 2</GridCell>
        <GridCell>Cell 3</GridCell>
      </Grid>
    ).container;
    expect(container).toMatchSnapshot();
  });
  it('should inline the padding style unless it is 0', function () {
    var props = { 'data-testid': 'grid' };
    var _a = render(<Grid {...props} padding={12} />),
      getByTestId = _a.getByTestId,
      rerender = _a.rerender;
    var grid = getByTestId('grid');
    expect(grid.style.padding).toBe('12px');
    rerender(<Grid {...props} padding={0} />);
    expect(grid.style.padding).toBe('');
  });
  it('should render correctly when the columns props are provided', function () {
    // really need to make a way for this test to be changed since it relies on the AppSizeListener
    // for the current column size
    var _a = render(<Grid columns={2} />),
      container = _a.container,
      rerender = _a.rerender;
    expect(container).toMatchSnapshot();
    rerender(
      <Grid
        phoneColumns={1}
        tabletColumns={2}
        desktopColumns={3}
        largeDesktopColumns={4}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('should be able to wrap each child in the GridCell component when the clone prop is enabled', function () {
    var _a = render(
        <Grid clone>
          {false && <span data-testid="span" />}
          {true && <div data-testid="div" />}
          <section data-testid="section" />
        </Grid>
      ),
      container = _a.container,
      getByTestId = _a.getByTestId;
    expect(function () {
      return getByTestId('span');
    }).toThrow();
    expect(getByTestId('div').className).toContain('rmd-grid__cell');
    expect(getByTestId('section').className).toContain('rmd-grid__cell');
    expect(container).toMatchSnapshot();
  });
  it('should be able to clone the style and className into the child element ignoring all other props', function () {
    var MyCustomComponent = function (_a) {
      var style = _a.style,
        className = _a.className;
      return (
        <span style={style} className={className} data-testid="span">
          Content
        </span>
      );
    };
    var _a = render(
        <Grid cloneStyles columns={3}>
          <MyCustomComponent />
        </Grid>
      ),
      container = _a.container,
      getByTestId = _a.getByTestId;
    var span = getByTestId('span');
    expect(span.className).toContain('rmd-grid');
    expect(span.style.getPropertyValue(GRID_COLUMNS_VAR)).toBe('3');
    expect(container).toMatchSnapshot();
  });
});
//# sourceMappingURL=Grid.jsx.map
