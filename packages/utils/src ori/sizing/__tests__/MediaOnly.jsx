import { render } from '@testing-library/react';
import { AppSizeListener } from '../AppSizeListener';
import { DEFAULT_DESKTOP_MIN_WIDTH } from '../constants';
import { DesktopOnly, MobileOnly, PhoneOnly, TabletOnly } from '../MediaOnly';
var onchange = jest.fn();
var addListener = jest.fn();
var addEventListener = jest.fn();
var removeListener = jest.fn();
var removeEventListener = jest.fn();
var dispatchEvent = jest.fn();
beforeAll(function () {
  // matchMedia doesn't exist in tests, but maybe one day it'll be supported
  // so polyfill only when it doesn't exist
  window.matchMedia =
    window.matchMedia ||
    function (query) {
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
describe('MediaOnly', function () {
  it('should throw an error if any of the components are mounted without an AppSizeListener parent', function () {
    var consoleError = jest.spyOn(console, 'error');
    // hide React uncaught error message
    consoleError.mockImplementation();
    expect(function () {
      return render(
        <MobileOnly>
          <span>Hello</span>
        </MobileOnly>
      );
    }).toThrow();
    expect(function () {
      return render(
        <AppSizeListener>
          <MobileOnly>
            <span>Hello</span>
          </MobileOnly>
        </AppSizeListener>
      );
    }).not.toThrow();
    expect(function () {
      return render(
        <PhoneOnly>
          <span>Hello</span>
        </PhoneOnly>
      );
    }).toThrow();
    expect(function () {
      return render(
        <AppSizeListener>
          <PhoneOnly>
            <span>Hello</span>
          </PhoneOnly>
        </AppSizeListener>
      );
    }).not.toThrow();
    expect(function () {
      return render(
        <TabletOnly>
          <span>Hello</span>
        </TabletOnly>
      );
    }).toThrow();
    expect(function () {
      return render(
        <AppSizeListener>
          <TabletOnly>
            <span>Hello</span>
          </TabletOnly>
        </AppSizeListener>
      );
    }).not.toThrow();
    expect(function () {
      return render(
        <DesktopOnly>
          <span>Hello</span>
        </DesktopOnly>
      );
    }).toThrow();
    expect(function () {
      return render(
        <AppSizeListener>
          <DesktopOnly>
            <span>Hello</span>
          </DesktopOnly>
        </AppSizeListener>
      );
    }).not.toThrow();
  });
});
//# sourceMappingURL=MediaOnly.jsx.map
