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
import { act, fireEvent, render } from '@testing-library/react';
import { useHoverMode } from '../useHoverMode';
import { HoverModeProvider } from '../HoverModeProvider';
import {
  DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
  DEFAULT_HOVER_MODE_EXIT_TIME,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
} from '../constants';
beforeEach(function () {
  jest.useFakeTimers();
});
afterEach(function () {
  jest.clearAllTimers();
});
describe('Hover Mode', function () {
  function Implementation(_a) {
    var options = _a.options,
      propOnMouseEnter = _a.onMouseEnter,
      propOnMouseLeave = _a.onMouseLeave;
    var _b = useHoverMode(options),
      visible = _b.visible,
      onMouseEnter = _b.onMouseEnter,
      onMouseLeave = _b.onMouseLeave;
    return (
      <>
        <button
          type="button"
          onMouseEnter={function (event) {
            propOnMouseEnter === null || propOnMouseEnter === void 0
              ? void 0
              : propOnMouseEnter(event);
            onMouseEnter(event);
          }}
          onMouseLeave={function (event) {
            propOnMouseLeave === null || propOnMouseLeave === void 0
              ? void 0
              : propOnMouseLeave(event);
            onMouseLeave(event);
          }}
        >
          Button
        </button>
        {visible && <div role="dialog" id="dialog-id" aria-label="Dialog" />}
      </>
    );
  }
  function Test(_a) {
    var config = _a.config,
      props = __rest(_a, ['config']);
    return (
      <HoverModeProvider {...config}>
        <Implementation {...props} />
      </HoverModeProvider>
    );
  }
  it('should allow for the event handlers to be merged and prevent the behavior if they call event.stopPropagation()', function () {
    var onMouseEnter = function (event) {
      return event.stopPropagation();
    };
    var onMouseLeave = function (event) {
      return event.stopPropagation();
    };
    var _a = render(<Test onMouseEnter={onMouseEnter} />),
      getByRole = _a.getByRole,
      rerender = _a.rerender;
    var button = getByRole('button');
    fireEvent.mouseEnter(button);
    act(function () {
      jest.runAllTimers();
    });
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
    rerender(<Test onMouseLeave={onMouseLeave} />);
    fireEvent.mouseEnter(button);
    act(function () {
      jest.runOnlyPendingTimers();
    });
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.mouseLeave(button);
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
  });
  it('should work correctly with default options', function () {
    var getByRole = render(<Test />).getByRole;
    var button = getByRole('button', { name: 'Button' });
    fireEvent.mouseEnter(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_VISIBLE_IN_TIME);
    });
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.mouseLeave(button);
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
    fireEvent.mouseEnter(button);
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.mouseLeave(button);
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_DEACTIVATION_TIME);
    });
    fireEvent.mouseEnter(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
  it('should never activate if disabled', function () {
    var getByRole = render(<Test options={{ disabled: true }} />).getByRole;
    var button = getByRole('button', { name: 'Button' });
    fireEvent.mouseEnter(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_VISIBLE_IN_TIME);
    });
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
  it('should never enable hover mode if the config is disabled', function () {
    var getByRole = render(
      <Test config={{ disabled: true }} options={{ exitVisibilityDelay: 0 }} />
    ).getByRole;
    var button = getByRole('button', { name: 'Button' });
    fireEvent.mouseEnter(button);
    act(function () {
      jest.runOnlyPendingTimers();
    });
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
  it('should allow the element to be visible by default', function () {
    var getByRole = render(
      <Test options={{ defaultVisible: true }} />
    ).getByRole;
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
  });
});
describe('Sticky Hover Mode', function () {
  function Implementation(_a) {
    var propOnClick = _a.onClick,
      props = __rest(_a, ['onClick']);
    var _b = useHoverMode(__assign({}, props)),
      visible = _b.visible,
      onClick = _b.onClick,
      hoverHandlers = _b.hoverHandlers;
    return (
      <>
        <button
          {...hoverHandlers}
          onClick={function (event) {
            propOnClick === null || propOnClick === void 0
              ? void 0
              : propOnClick(event);
            onClick(event);
          }}
          type="button"
        >
          Button
        </button>
        {visible && (
          <div
            {...hoverHandlers}
            role="dialog"
            id="dialog-id"
            aria-label="Dialog"
          />
        )}
      </>
    );
  }
  function Test(props) {
    return (
      <HoverModeProvider>
        <Implementation {...props} />
      </HoverModeProvider>
    );
  }
  it('should work correctly', function () {
    var getByRole = render(<Test />).getByRole;
    var button = getByRole('button');
    fireEvent.mouseEnter(button);
    fireEvent.click(button);
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.mouseLeave(button);
    act(function () {
      jest.runOnlyPendingTimers();
    });
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.click(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
    act(function () {
      jest.runOnlyPendingTimers();
    });
    fireEvent.mouseEnter(button);
    var dialog = getByRole('dialog');
    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(dialog);
    act(function () {
      jest.runOnlyPendingTimers();
    });
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.mouseLeave(dialog);
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
  it('should allow for a custom exitVisibilityDelay', function () {
    var getByRole = render(<Test exitVisibilityDelay={500} />).getByRole;
    var button = getByRole('button');
    fireEvent.mouseEnter(button);
    act(function () {
      jest.runOnlyPendingTimers();
    });
    var dialog = getByRole('dialog');
    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(dialog);
    act(function () {
      jest.runOnlyPendingTimers();
    });
    fireEvent.mouseLeave(dialog);
    act(function () {
      jest.advanceTimersByTime(DEFAULT_HOVER_MODE_EXIT_TIME);
    });
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    act(function () {
      jest.advanceTimersByTime(200);
    });
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
  it('should toggle the visibility onClick when the hover mode behavior is disabled', function () {
    var getByRole = render(<Test disabled />).getByRole;
    var button = getByRole('button');
    fireEvent.click(button);
    expect(function () {
      return getByRole('dialog');
    }).not.toThrow();
    fireEvent.click(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
  it('should do nothing onClick if the onClick handler calls event.stopPropagation()', function () {
    var onClick = function (event) {
      event.stopPropagation();
    };
    var getByRole = render(<Test onClick={onClick} />).getByRole;
    var button = getByRole('button');
    fireEvent.click(button);
    expect(function () {
      return getByRole('dialog');
    }).toThrow();
  });
});
//# sourceMappingURL=HoverMode.jsx.map
