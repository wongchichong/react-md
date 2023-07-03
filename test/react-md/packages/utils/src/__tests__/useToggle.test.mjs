import { renderHook, act } from "../../../../../voby-jasmine/dist/jasmine.es.mjs";
import { useToggle } from "../useToggle.mjs";
describe("useToggle", () => {
  it("should default the visibility to the provided defaultToggled value", () => {
    let { result } = renderHook(() => useToggle(false));
    let [toggled] = result.current;
    expect(toggled()).toBe(false);
    ({ result } = renderHook(() => useToggle(true)));
    [toggled] = result.current;
    expect(toggled()).toBe(true);
  });
  it("should provided memoized handlers that do not change", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, enable, disable, toggle] = result.current;
    act(() => enable());
    expect(enable).toBe(enable);
    expect(disable).toBe(disable);
    expect(toggle).toBe(toggle);
  });
  it("should set the visibility to true when the enable callback is called", () => {
    const { result } = renderHook(() => useToggle(false));
    const [toggled, enable] = result.current;
    act(() => enable());
    expect(toggled()).toBe(true);
  });
  it("should set the visibility to false when the disable callback is called", () => {
    const { result } = renderHook(() => useToggle(true));
    const [toggled, , disable] = result.current;
    act(() => disable());
    expect(toggled()).toBe(false);
  });
  it("should toggle the visibility to false when the toggle callback is called", () => {
    const { result } = renderHook(() => useToggle(false));
    const [toggled, , , toggle] = result.current;
    act(() => toggle());
    expect(toggled()).toBe(true);
    act(() => toggle());
    expect(toggled()).toBe(false);
  });
});
