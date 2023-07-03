import "../../react/dist/index.es.mjs";
function modify(base, modifier) {
  if (!modifier) {
    return base;
  }
  const hasOwn = Object.prototype.hasOwnProperty;
  return Object.keys(modifier).reduce((s, mod) => {
    if (hasOwn.call(modifier, mod) && modifier[mod]) {
      s = `${s} ${base}--${mod}`;
    }
    return s;
  }, base);
}
function bem(base) {
  if (process.env.NODE_ENV !== "production") {
    if (!base) {
      throw new Error(
        "bem requires a base block class but none were provided."
      );
    }
  }
  return function block(elementOrModifier, modifier) {
    if (process.env.NODE_ENV !== "production") {
      if (typeof elementOrModifier !== "string" && modifier) {
        throw new TypeError(
          "bem does not support having two modifier arguments."
        );
      }
    }
    if (!elementOrModifier) {
      return base;
    }
    if (typeof elementOrModifier !== "string") {
      return modify(base, elementOrModifier);
    }
    return modify(`${base}__${elementOrModifier}`, modifier);
  };
}
export {
  bem
};
