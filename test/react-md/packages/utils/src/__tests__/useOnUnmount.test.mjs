import { j as jsx } from "../../../../../woby/dist/jsx-runtime-41b9b096.mjs";
import { z as observable } from "../../../../../woby/dist/use_microtask-10cd6273.mjs";
import { jest, renderHook } from "../../../../../voby-jasmine/dist/jasmine.es.mjs";
import "../../../../../woby/dist/index.es.mjs";
import { render } from "../../../../../woby/dist/testing.es.mjs";
import { useOnUnmount } from "../useOnUnmount.mjs";
describe("useOnUnmount", () => {
  it("should work correctly", () => {
    const callback = jest.fn();
    function Test() {
      useOnUnmount(callback);
      return null;
    }
    const { unmount, rerender } = renderHook(Test);
    expect(callback).not.toHaveBeenCalled();
    rerender(/* @__PURE__ */ jsx(Test, {}));
    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it("should ensure the callback function doesn't have a stale closure", () => {
    const callback = jest.fn();
    const value = observable("");
    function Test() {
      useOnUnmount(() => {
        callback(value());
      });
      return /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value,
          onChange: (event) => value(event.currentTarget.value)
        }
      );
    }
    const { getByRole, unmount } = render(/* @__PURE__ */ jsx(Test, {}));
    getByRole("input");
    value("my new value");
    expect(callback).not.toHaveBeenCalled();
    unmount();
    expect(callback).toHaveBeenCalledWith("my new value");
  });
});
