import "../../../../woby/dist/index.es.mjs";
import { g as get } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function loop({
  value,
  min: mn = 0,
  max: mx,
  increment,
  minmax = false
}) {
  const min = get(mn), max = get(mx);
  let next = value + (increment ? 1 : -1);
  if (minmax) {
    next = Math.min(max, Math.max(min, next));
  } else if (next > max) {
    next = min;
  } else if (next < min) {
    next = max;
  }
  return next;
}
export {
  loop
};
