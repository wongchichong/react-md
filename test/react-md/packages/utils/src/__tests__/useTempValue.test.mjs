import { renderHook } from "../../../../../voby-jasmine/dist/jasmine.es.mjs";
import { useTempValue } from "../useTempValue.mjs";
describe("useTempValue", () => {
  beforeEach(() => {
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it("should trigger a timeout when the setter function is called", () => {
    const { result } = renderHook(() => useTempValue("", 500));
    let [value] = result.current;
    expect(value()).toBe("");
    jasmine.clock().tick(300);
    value("hello");
    jasmine.clock().tick(400);
    expect(value()).toBe("hello");
    jasmine.clock().tick(500);
    expect(value()).toBe("");
  });
  it("should reset the timeout if the setValue is triggered again before the timeout finishes", () => {
    const { result } = renderHook(() => useTempValue("", 500));
    let [value] = result.current;
    value("hello");
    expect(value()).toBe("hello");
    value("hello, world!");
    expect(value()).toBe("hello, world!");
  });
});
