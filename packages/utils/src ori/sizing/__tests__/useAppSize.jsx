import { render } from '@testing-library/react';
import { DEFAULT_DESKTOP_MIN_WIDTH } from '../constants';
import { useAppSize } from '../useAppSize';
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
describe('useAppSize', function () {
  it('should throw an error when not used as a child of the AppSizeListener', function () {
    // can't use renderHook for this since the error will be caught in the ErrorBoundary
    var Test = function () {
      useAppSize();
      return null;
    };
    var consoleError = jest.spyOn(console, 'error');
    // hide React uncaught error message
    consoleError.mockImplementation();
    expect(function () {
      return render(<Test />);
    }).toThrowError(
      'Unable to get the current `AppSize` from `react-md` because the `AppSizeListener` ' +
        'could not be found when using the `useAppSize` hook. To fix this error, either ' +
        'initialize the `AppSizeListener` component from `@react-md/utils` or the ' +
        '`Configuration` component from `@react-md/layout` near the root of your app.'
    );
  });
});
//# sourceMappingURL=useAppSize.jsx.map
