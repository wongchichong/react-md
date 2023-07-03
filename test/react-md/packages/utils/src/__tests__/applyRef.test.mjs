import { jest } from "../../../../../voby-jasmine/dist/jasmine.es.mjs";
import "../../../../../woby/dist/index.es.mjs";
import { applyRef } from "../applyRef.mjs";
import { z as observable } from "../../../../../woby/dist/use_microtask-10cd6273.mjs";
const instance = document.createElement("div");
describe("applyRef", () => {
  it("should call the provided ref if it is a function", () => {
    const ref = jest.fn();
    applyRef(instance, ref);
    expect(ref).toHaveBeenCalledWith(instance);
    applyRef(null, ref);
    expect(ref).toHaveBeenCalledWith(null);
  });
  it("should update mutable ref objects", () => {
    const ref = observable();
    expect(ref()).toBe(void 0);
    applyRef(instance, ref);
    expect(ref()).toBe(instance);
    applyRef(null, ref);
    expect(ref()).toBe(null);
  });
});
