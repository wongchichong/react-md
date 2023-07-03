import { n as SYMBOL_CLONE, m as SYMBOL_UNTRACKED_UNWRAPPED } from "./use_microtask-10cd6273.mjs";
const wrapElement = (element) => {
  element[SYMBOL_UNTRACKED_UNWRAPPED] = true;
  return element;
};
const wrapElement$1 = wrapElement;
const wrapCloneElement = (target, component, props) => {
  target[SYMBOL_CLONE] = { component, props };
  return target;
};
export {
  wrapElement$1 as a,
  wrapCloneElement as w
};
