import "../../../../woby/dist/index.es.mjs";
import { containsElement } from "./containsElement.mjs";
import { g as get, h as effect } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function getElement(element) {
  if (!get(element)) {
    return null;
  }
  if (get(element) instanceof HTMLElement)
    return get(element);
  else {
    return null;
  }
}
function useCloseOnOutsideClick({
  enabled,
  element,
  onOutsideClick
}) {
  function handleClick(event) {
    const target = event.target;
    const el = getElement(element);
    if (!containsElement(el, target)) {
      onOutsideClick(el, target, containsElement);
    }
  }
  effect(() => {
    if (!get(enabled)) {
      window.removeEventListener("click", handleClick);
      return;
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
}
export {
  getElement,
  useCloseOnOutsideClick
};
