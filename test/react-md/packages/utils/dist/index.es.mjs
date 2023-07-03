import "../../../../woby/dist/index.es.mjs";
import { s as createContext } from "../../../../woby/dist/htm.module-9e0a6146.mjs";
import { z as observable } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
import { h } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
if (!window.process)
  window.process = {};
if (!process.env)
  process.env = { NODE_ENV: "development" };
function modify(base, modifier) {
  if (!modifier) {
    return base;
  }
  const hasOwn = Object.prototype.hasOwnProperty;
  return Object.keys(modifier).reduce((s, mod) => {
    if (hasOwn.call(modifier, mod) && modifier[mod]) {
      s = `${s} ${base}--${mod}`;
    }
    return s;
  }, base);
}
function bem(base) {
  if (process.env.NODE_ENV !== "production") {
    if (!base) {
      throw new Error(
        "bem requires a base block class but none were provided."
      );
    }
  }
  return function block2(elementOrModifier, modifier) {
    if (process.env.NODE_ENV !== "production") {
      if (typeof elementOrModifier !== "string" && modifier) {
        throw new TypeError(
          "bem does not support having two modifier arguments."
        );
      }
    }
    if (!elementOrModifier) {
      return base;
    }
    if (typeof elementOrModifier !== "string") {
      return modify(base, elementOrModifier);
    }
    return modify(`${base}__${elementOrModifier}`, modifier);
  };
}
createContext({
  root: true,
  dir: "ltr",
  toggleDir: () => {
    throw new Error(
      "Tried to toggle the current writing direction without initializing the `Dir` component."
    );
  }
});
const DEFAULT_HOVER_MODE_VISIBLE_IN_TIME = 1e3;
const noop$2 = () => {
};
createContext({
  visibleInTime: DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
  enableHoverMode: noop$2,
  disableHoverMode: noop$2,
  startDisableTimer: noop$2
});
createContext("mouse");
createContext(false);
Object.assign(createContext({
  activeId: observable("")
  // // setActiveId() {
  // //   throw new Error(
  // //     "ActiveDescendantMovementProvider must be a parent component."
  // //   )
  // },
}), { displayName: "ActiveDescendant" });
const noop$1 = () => {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("KeyboardMovementProvider must be a parent component.");
  }
};
const DEFAULT_KEYBOARD_MOVEMENT = {
  incrementKeys: ["ArrowDown"],
  decrementKeys: ["ArrowUp"],
  jumpToFirstKeys: ["Home"],
  jumpToLastKeys: ["End"]
};
Object.assign(createContext({
  attach: noop$1,
  detach: noop$1,
  watching: [],
  loopable: false,
  searchable: false,
  horizontal: false,
  includeDisabled: false,
  config: observable(DEFAULT_KEYBOARD_MOVEMENT)
}), { displayName: "KeyboardMovement" });
const DEFAULT_APP_SIZE = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false,
  isLandscape: true
};
createContext({
  ...DEFAULT_APP_SIZE,
  __initialized: false
});
bem("rmd-grid");
bem("rmd-grid");
bem("rmd-grid-list");
var ResizeObserverBoxOptions;
(function(ResizeObserverBoxOptions2) {
  ResizeObserverBoxOptions2["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions2["CONTENT_BOX"] = "content-box";
  ResizeObserverBoxOptions2["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
var freeze = function(obj) {
  return Object.freeze(obj);
};
var ResizeObserverSize = function() {
  function ResizeObserverSize2(inlineSize, blockSize) {
    this.inlineSize = inlineSize;
    this.blockSize = blockSize;
    freeze(this);
  }
  return ResizeObserverSize2;
}();
var DOMRectReadOnly = function() {
  function DOMRectReadOnly2(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return freeze(this);
  }
  DOMRectReadOnly2.prototype.toJSON = function() {
    var _a = this, x = _a.x, y = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
    return { x, y, top, right, bottom, left, width, height };
  };
  DOMRectReadOnly2.fromRect = function(rectangle) {
    return new DOMRectReadOnly2(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };
  return DOMRectReadOnly2;
}();
var global = typeof window !== "undefined" ? window : {};
/msie|trident/i.test(global.navigator && global.navigator.userAgent);
var size = function(inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }
  if (blockSize === void 0) {
    blockSize = 0;
  }
  if (switchSizes === void 0) {
    switchSizes = false;
  }
  return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};
freeze({
  devicePixelContentBoxSize: size(),
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
const context = createContext({
  columns: -1,
  cellWidth: -1
});
if (process.env.NODE_ENV !== "production") {
  context.displayName = "GridListSizeProvider";
}
var IncrementMovementKey = /* @__PURE__ */ ((IncrementMovementKey2) => {
  IncrementMovementKey2["ArrowUp"] = "ArrowUp";
  IncrementMovementKey2["ArrowDown"] = "ArrowDown";
  IncrementMovementKey2["ArrowLeft"] = "ArrowLeft";
  IncrementMovementKey2["ArrowRight"] = "ArrowRight";
  IncrementMovementKey2["PageDown"] = "PageDown";
  IncrementMovementKey2["PageUp"] = "PageUp";
  IncrementMovementKey2["ShiftArrowUp"] = "Shift+ArrowUp";
  IncrementMovementKey2["ShiftArrowDown"] = "Shift+ArrowDown";
  IncrementMovementKey2["ShiftArrowLeft"] = "Shift+ArrowLeft";
  IncrementMovementKey2["ShiftArrowRight"] = "Shift+ArrowRight";
  IncrementMovementKey2["AltArrowDown"] = "Alt+ArrowDown";
  IncrementMovementKey2["AltArrowUp"] = "Alt+ArrowUp";
  IncrementMovementKey2["AltArrowLeft"] = "Alt+ArrowLeft";
  IncrementMovementKey2["AltArrowRight"] = "Alt+ArrowRight";
  IncrementMovementKey2["AltPageDown"] = "Alt+PageDown";
  IncrementMovementKey2["AltPageUp"] = "Alt+PageUp";
  IncrementMovementKey2["ControlArrowDown"] = "Control+ArrowDown";
  IncrementMovementKey2["ControlArrowUp"] = "Control+ArrowUp";
  return IncrementMovementKey2;
})(IncrementMovementKey || {});
var JumpMovementKey = /* @__PURE__ */ ((JumpMovementKey2) => {
  JumpMovementKey2["Home"] = "Home";
  JumpMovementKey2["End"] = "End";
  JumpMovementKey2["AltHome"] = "Alt+Home";
  JumpMovementKey2["AltEnd"] = "Alt+End";
  JumpMovementKey2["ControlHome"] = "Control+Home";
  JumpMovementKey2["ControlEnd"] = "Control+End";
  JumpMovementKey2["ControlShiftHome"] = "Control+Shift+Home";
  JumpMovementKey2["ControlShiftEnd"] = "Control+Shift+End";
  return JumpMovementKey2;
})(JumpMovementKey || {});
const VERTICAL_MENU = {
  loopable: true,
  searchable: true,
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  jumpToFirstKeys: [JumpMovementKey.Home],
  jumpToLastKeys: [JumpMovementKey.End]
};
const HORIZONTAL_MENU = {
  ...VERTICAL_MENU,
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft]
};
({
  ...VERTICAL_MENU,
  loopable: false
});
({
  ...HORIZONTAL_MENU,
  loopable: false
});
({
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  // don't want to be able to jump since home and end should do default behavior
  // in text field
  jumpToFirstKeys: [],
  jumpToLastKeys: [],
  searchable: false
});
({
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
  // don't want to be able to jump since home and end should do default behavior
  // in text field
  jumpToFirstKeys: [],
  jumpToLastKeys: [],
  searchable: false
});
({
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  jumpToFirstKeys: [JumpMovementKey.Home, JumpMovementKey.ControlShiftHome],
  jumpToLastKeys: [JumpMovementKey.End, JumpMovementKey.ControlShiftEnd],
  loopable: true,
  searchable: true
});
({
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
  jumpToFirstKeys: [JumpMovementKey.Home, JumpMovementKey.ControlShiftHome],
  jumpToLastKeys: [JumpMovementKey.End, JumpMovementKey.ControlShiftEnd],
  loopable: true,
  searchable: true
});
({
  incrementKeys: [IncrementMovementKey.ArrowRight],
  decrementKeys: [IncrementMovementKey.ArrowLeft],
  jumpToFirstKeys: [JumpMovementKey.Home],
  jumpToLastKeys: [JumpMovementKey.End],
  loopable: true,
  searchable: false
});
({
  incrementKeys: [IncrementMovementKey.ArrowDown],
  decrementKeys: [IncrementMovementKey.ArrowUp],
  jumpToFirstKeys: [JumpMovementKey.Home],
  jumpToLastKeys: [JumpMovementKey.End],
  loopable: true,
  searchable: false
});
export {
  DEFAULT_APP_SIZE,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
  DEFAULT_KEYBOARD_MOVEMENT,
  IncrementMovementKey,
  JumpMovementKey,
  bem,
  h as useIsomorphicLayoutEffect
};
