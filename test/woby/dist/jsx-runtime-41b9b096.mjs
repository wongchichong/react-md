import { w as wrapCloneElement, a as wrapElement$1 } from "./wrap_clone_element-b5be9957.mjs";
import { j as createSVGNode, k as createHTMLNode, i as setProps } from "./setters-b291870e.mjs";
import { i as isFunction, u as untrack, c as isString, d as isSVGElement, e as isNode } from "./use_microtask-10cd6273.mjs";
const createElement = (component, props, _key, _isStatic, _source, _self) => {
  const { ...rest } = props;
  if (isFunction(component)) {
    const props2 = rest;
    return wrapElement$1(() => {
      return untrack(() => component.call(component, props2));
    });
  } else if (isString(component)) {
    const props2 = rest;
    const isSVG = isSVGElement(component);
    const createNode = isSVG ? createSVGNode : createHTMLNode;
    return wrapElement$1(() => {
      const child = createNode(component);
      if (isSVG)
        child["isSVG"] = true;
      untrack(() => setProps(child, props2));
      return child;
    });
  } else if (isNode(component)) {
    return wrapElement$1(() => component);
  } else {
    throw new Error("Invalid component");
  }
};
const creatElement = createElement;
const jsx = (component, props, key) => {
  return wrapCloneElement(creatElement(component, props), component, props);
};
export {
  creatElement as c,
  jsx as j
};
