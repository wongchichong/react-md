import { h as setChild } from "./setters-b291870e.mjs";
import { r as root } from "./use_microtask-10cd6273.mjs";
const render = (child, parent) => {
  if (!parent || !(parent instanceof HTMLElement))
    throw new Error("Invalid parent node");
  parent.textContent = "";
  return root((dispose) => {
    setChild(parent, child);
    return () => {
      dispose();
      parent.textContent = "";
    };
  });
};
const render$1 = render;
export {
  render$1 as r
};
