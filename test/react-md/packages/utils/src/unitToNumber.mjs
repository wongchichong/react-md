import "../../../../woby/dist/index.es.mjs";
import { g as get } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function unitToNumber(unit, options = {}) {
  const { fontSizeFallback: fsfb = 16, element } = options;
  const fontSizeFallback = get(fsfb);
  if (typeof unit === "number") {
    return unit;
  }
  const parsed = parseFloat(unit);
  if (/px$/.test(unit)) {
    return parsed;
  }
  if (typeof document === "undefined") {
    return parsed * fontSizeFallback;
  }
  const rem = /rem$/.test(unit);
  let el = document.documentElement;
  if (!rem && element) {
    el = element.parentElement || element;
  }
  const fontSize = parseFloat(
    window.getComputedStyle(el).fontSize || `${fontSizeFallback}px`
  );
  return parsed * fontSize;
}
export {
  unitToNumber
};
