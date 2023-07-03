import { throttle } from "../throttle.mjs";
import { jest } from "../../../../../voby-jasmine/dist/jasmine.es.mjs";
describe("throttle", () => {
  beforeEach(() => {
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it("should return a throttled function that is called on leading and trailing calls by default", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 300);
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    jasmine.clock().tick(200);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    jasmine.clock().tick(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
    jasmine.clock().tick(100);
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
    jasmine.clock().tick(300);
    expect(fn).toHaveBeenCalledTimes(3);
  });
  it("should call the throttled function with all the provided arguments", () => {
    const test = jest.fn().and.callFake((a, b, c) => `${a} ${b} ${c}`);
    const throttled = throttle(test, 300);
    expect(throttled("hello", 3, false)).toBe("hello 3 false");
    expect(throttled("hello", 4, false)).toBe("hello 3 false");
    expect(test).toHaveBeenCalledTimes(1);
    jasmine.clock().tick(300);
    expect(test).toHaveBeenCalledWith("hello", 4, false);
    expect(test).toHaveBeenCalledTimes(2);
  });
  it("should call with the latest value if it's called multiple times", () => {
    const test = jest.fn().and.callFake((a) => a);
    const throttled = throttle(test, 1e3);
    expect(throttled("hello")).toBe("hello");
    jasmine.clock().tick(100);
    expect(throttled("world")).toBe("hello");
    expect(throttled("something")).toBe("hello");
    jasmine.clock().tick(1e3);
    expect(throttled("something else")).toBe("something");
  });
  it("should work with promises", () => {
    const user = { id: "fake-id", name: "FirstName LastName" };
    const json = () => Promise.resolve(user);
    const fakeFetch = jest.fn().and.callFake((_url) => Promise.resolve({ json }));
    const throttled = throttle(fakeFetch, 500);
    throttled("s");
    jasmine.clock().tick(100);
    throttled("sea");
    jasmine.clock().tick(100);
    throttled("search");
    expect(fakeFetch).toHaveBeenCalledWith("s");
    expect(fakeFetch).not.toHaveBeenCalledWith("sea");
    expect(fakeFetch).not.toHaveBeenCalledWith("search");
    jasmine.clock().tick(400);
    expect(fakeFetch).toHaveBeenCalledWith("s");
    expect(fakeFetch).not.toHaveBeenCalledWith("sea");
    expect(fakeFetch).toHaveBeenCalledWith("search");
  });
});
