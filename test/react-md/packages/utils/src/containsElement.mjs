import "../../../../woby/dist/index.es.mjs";
import { g as get } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
const getElement = (thing) => {
  return get(thing);
};
function containsElement(container, child) {
  container = getElement(container);
  child = getElement(child);
  return !!(container && child && container.contains(child));
}
export {
  containsElement
};
