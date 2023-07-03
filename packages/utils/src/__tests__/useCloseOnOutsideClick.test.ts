import {renderHook, jest} from "voby-jasmine"
import {$} from "voby"
import { containsElement } from "../containsElement";
import type { CloseOnOutsideClickOptions } from "../useCloseOnOutsideClick";
import { getElement, useCloseOnOutsideClick } from "../useCloseOnOutsideClick";

describe("getElement", () => {
  it("should return null when the provided element is null", () => {
    expect(getElement(null)).toBe(null);
  });

  it("should return the HTMLElement for both MutableRefObject and provided value", () => {
    const div = document.createElement("div");
    const span = document.createElement("span");  
    const button = document.createElement("button");

    expect(getElement(div)).toBe(div);
    expect(getElement(span)).toBe(span);
    expect(getElement(button)).toBe(button);
  });
});

describe("useCloseOnOutsideClick", () => {
  const target = document.createElement("div");
  target.id = "target";

  beforeEach(() => {
    document.body.appendChild(target);
  });

  afterEach(() => {
    document.body.removeChild(target);
  });

  it("should add a window click event listener when enabled", () => {
    const onOutsideClick = jest.fn();
    const addEventListener = spyOn(window, "addEventListener");
    const removeEventListener = spyOn(window, "removeEventListener");
    const e = $(true)
    const { rerender } = renderHook(()=> useCloseOnOutsideClick({enabled:e, element:null, onOutsideClick}))
        
    expect(addEventListener).toHaveBeenCalledWith("click", jasmine.any(Function))
    expect(removeEventListener).not.toHaveBeenCalledWith("click",jasmine.any(Function))

    e(false)
    expect(removeEventListener).toHaveBeenCalled();

    rerender({ enabled: false, element: null, onOutsideClick });
    expect(removeEventListener).toHaveBeenCalledWith("click", jasmine.any(Function));
    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it("should call the onOutsideClick handler if an element is clicked and the target is null", () => {
    const onOutsideClick = jest.fn();
    const initialProps: CloseOnOutsideClickOptions<HTMLElement> = {
      enabled: true,
      element: null,
      onOutsideClick,
    };
    const { rerender } = renderHook(
      () => useCloseOnOutsideClick(initialProps)
    );

    const click = new MouseEvent("click", { bubbles: true });
    target.dispatchEvent(click);
    expect(onOutsideClick).toHaveBeenCalledWith(null, target, containsElement);

    onOutsideClick.calls.reset()
    expect(onOutsideClick).not.toHaveBeenCalledWith(null, target);
    rerender({ ...initialProps, element: { current: null } });

    target.dispatchEvent(click);
    expect(onOutsideClick).toHaveBeenCalledWith(null, target, containsElement);
  });

  it("should call the onOutsideClick handler if the provided element does not contain the click target", () => {
    const onOutsideClick = jest.fn();
    const element = document.createElement("div");
    element.id = "element";

    const child = document.createElement("span");
    child.id = "child";
    element.appendChild(child);

    const initialProps: CloseOnOutsideClickOptions<HTMLElement> = {
      enabled: true,
      element,
      onOutsideClick,
    };

    const { rerender } = renderHook(
      () => useCloseOnOutsideClick(initialProps),
    );

    const click = new MouseEvent("click", { bubbles: true });
    element.dispatchEvent(click);
    child.dispatchEvent(click);

    expect(onOutsideClick).not.toHaveBeenCalled();
    target.dispatchEvent(click);
    expect(onOutsideClick).toHaveBeenCalledWith(element, target, containsElement);

    onOutsideClick.calls.reset();
    rerender({ ...initialProps, element: { current: element } });
    expect(onOutsideClick).not.toHaveBeenCalled();

    element.dispatchEvent(click);
    child.dispatchEvent(click);

    expect(onOutsideClick).not.toHaveBeenCalled();
    target.dispatchEvent(click);
    expect(onOutsideClick).toHaveBeenCalledWith(element, target, containsElement);
  });

  it("should not trigger the onOutsideClick behavior if the event is not bubbled", () => {
    const onOutsideClick = jest.fn();
    const element = document.createElement("div");
    element.id = "element";

    renderHook(() =>
      useCloseOnOutsideClick({ enabled: true, element, onOutsideClick })
    );

    const click = new MouseEvent("click", { bubbles: false });
    target.dispatchEvent(click);
    element.dispatchEvent(click);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
