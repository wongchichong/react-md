import { h as setChild } from "./setters-b291870e.mjs";
import { r as root } from "./use_microtask-10cd6273.mjs";
const render = (child) => {
  const fragment = document.createElement("div");
  const renderDiv = document.createElement("div");
  fragment.textContent = "";
  let unmount = root((dispose) => {
    setChild(fragment, child);
    renderDiv.append(fragment);
    console.log("f", fragment.outerHTML);
    console.log("c", fragment.children[0].outerHTML);
    return () => {
      dispose();
      fragment.textContent = "";
      fragment.remove();
      console.log("dispose");
    };
  });
  document.body.append(renderDiv);
  const getByRole = (tag) => fragment.querySelector(tag);
  const getByTestId = (id) => fragment.querySelector(`[data-testid="${id}"]`);
  return { fragment, unmount, getByRole, getByTestId };
};
export {
  render
};
