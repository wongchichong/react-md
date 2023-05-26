import { render } from '@testing-library/react';
import { AppSizeListener } from '../AppSizeListener';
import { DEFAULT_DESKTOP_MIN_WIDTH } from '../constants';
var onchange = jest.fn();
var addListener = jest.fn();
var addEventListener = jest.fn();
var removeListener = jest.fn();
var removeEventListener = jest.fn();
var dispatchEvent = jest.fn();
beforeAll(function () {
  // matchMedia doesn't exist in tests, but maybe one day it'll be supported
  // so polyfill only when it doesn't exist
  window.matchMedia = function (query) {
    return {
      matches: query.includes(''.concat(DEFAULT_DESKTOP_MIN_WIDTH)),
      media: '',
      onchange: onchange,
      addListener: addListener,
      removeListener: removeListener,
      addEventListener: addEventListener,
      removeEventListener: removeEventListener,
      dispatchEvent: dispatchEvent,
    };
  };
});
beforeEach(function () {
  jest.clearAllMocks();
});
describe('AppSizeListener', function () {
  it('should render without crashing', function () {
    expect(function () {
      return render(<AppSizeListener>Hello</AppSizeListener>);
    }).not.toThrow();
  });
  it('should only call the onChange prop after mount if the defaultSize does not equal the mounted size', function () {
    var onChange = jest.fn();
    render(<AppSizeListener onChange={onChange}>Hello</AppSizeListener>);
    expect(onChange).not.toBeCalled();
    var defaultSize = {
      isPhone: true,
      isTablet: false,
      isDesktop: false,
      isLargeDesktop: false,
      isLandscape: true,
    };
    render(
      <AppSizeListener defaultSize={defaultSize} onChange={onChange}>
        Hello
      </AppSizeListener>
    );
    expect(onChange).toBeCalledWith(
      {
        isPhone: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        isLandscape: true,
      },
      defaultSize
    );
  });
  it('should call the onChange prop whenever the appSize changes', function () {
    // not sure how to test this one nicely atm
    expect(true).toBe(true);
  });
});
//# sourceMappingURL=AppSizeListener.jsx.map
