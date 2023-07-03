const Children = {
  count: (e) => Array.isArray(e) ? e.length : !!e ? 1 : 0,
  forEach: (e, fn, thisArg) => Array.isArray(e) ? e.forEach(fn, thisArg ?? e) : fn(e, 0, null),
  map: (e, fn, thisArg) => Array.isArray(e) ? e.map(fn, thisArg ?? e) : [fn(e, 0, null)],
  toArray: (e) => Array.isArray(e) ? e : [e],
  only: (e) => {
    if (Array.isArray(e)) {
      if (e.length) {
        return e[0];
      } else {
        throw new Error("Only 1 child is allowed");
      }
    } else {
      return e;
    }
  }
};
if (!window.process)
  window.process = {};
if (!process.env)
  process.env = { NODE_ENV: "development" };
export {
  Children
};
