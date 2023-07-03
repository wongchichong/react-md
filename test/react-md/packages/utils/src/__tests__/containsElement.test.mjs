import "../../../../../woby/dist/index.es.mjs";
import { containsElement } from "../containsElement.mjs";
import { z as observable } from "../../../../../woby/dist/use_microtask-10cd6273.mjs";
describe("containsElement", () => {
  it("should return false if either the element or target are null", () => {
    const div = document.createElement("div");
    expect(containsElement(null, null)).toBe(false);
    expect(containsElement(div, null)).toBe(false);
    expect(containsElement(null, div)).toBe(false);
  });
  it("should return true if the element contains the target", () => {
    const parent = document.createElement("div");
    parent.setAttribute("id", "parent");
    const child = document.createElement("span");
    child.setAttribute("id", "child");
    parent.appendChild(child);
    const outside = document.createElement("div");
    outside.setAttribute("id", "outside");
    expect(containsElement(parent, child)).toBe(true);
    expect(containsElement(parent, parent)).toBe(true);
    expect(containsElement(child, parent)).toBe(false);
    expect(containsElement(parent, outside)).toBe(false);
  });
  it("should work for RefObject", () => {
    const container = document.createElement("div");
    const child = document.createElement("div");
    const containerRef = observable(null);
    expect(containsElement(containerRef, child)).toBe(false);
    containerRef(container);
    expect(containsElement(containerRef, child)).toBe(false);
    container.appendChild(child);
    expect(containsElement(containerRef, child)).toBe(true);
  });
});
