import { b as assign, M as isPrimitive, i as isFunction, n as SYMBOL_CLONE } from "./use_microtask-10cd6273.mjs";
import { z, g, A, B, C, D, p, E, u, s, t, h, o, w, k, r } from "./use_microtask-10cd6273.mjs";
import { h as htm } from "./htm.module-9e0a6146.mjs";
import { s as s2, k as k2 } from "./htm.module-9e0a6146.mjs";
import { c as creatElement } from "./jsx-runtime-41b9b096.mjs";
import { j, j as j2 } from "./jsx-runtime-41b9b096.mjs";
import { w as wrapCloneElement } from "./wrap_clone_element-b5be9957.mjs";
var _a, _b;
!!((_b = (_a = globalThis.CDATASection) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a).match(/^\s*function\s+CDATASection\s*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*$/));
const cloneElement = (element, props) => {
  if (isPrimitive(element))
    return element;
  else if (isFunction(element)) {
    if (!element[SYMBOL_CLONE])
      throw new Error("target is not cloneable, it is not created by jsx.createElement");
    const { component, props: oldProps } = element[SYMBOL_CLONE];
    const newProps = { ...oldProps, ...props };
    return wrapCloneElement(creatElement(component, newProps), component, newProps);
  } else if (Array.isArray(element))
    return element.map((e2) => cloneElement(e2, props));
  else if (element.cloneNode)
    return element.cloneNode();
  throw new Error("Unknown element");
};
const cloneElement$1 = cloneElement;
const registry = {};
const h2 = (type, props, key, isStatic, source, self) => creatElement(registry[type] || type, props);
const register = (components) => void assign(registry, components);
assign(htm.bind(h2), { register });
export {
  z as $,
  g as $$,
  A as batch,
  cloneElement$1 as cloneElement,
  s2 as createContext,
  creatElement as createElement,
  B as isBatching,
  C as isObservable,
  D as isStore,
  j as jsx,
  j2 as jsxs,
  p as resolve,
  E as store,
  u as untrack,
  s as useCleanup,
  k2 as useContext,
  t as useDisposed,
  h as useEffect,
  o as useMemo,
  w as useMicrotask,
  k as useReaction,
  r as useRoot,
  wrapCloneElement
};
