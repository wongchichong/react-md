import "../../../../woby/dist/index.es.mjs";
import { z as observable, h as effect } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function useTempValue(defaultValue, resetTime = 500) {
  const value = observable(defaultValue);
  const timeout = observable();
  const resetValue = () => {
    window.clearTimeout(timeout());
    value(defaultValue);
  };
  effect(() => {
    if (value() != defaultValue) {
      timeout(window.setTimeout(resetValue, resetTime));
    }
  });
  return [value, resetValue];
}
export {
  useTempValue
};
