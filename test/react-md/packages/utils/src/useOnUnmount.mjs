import "../../../../woby/dist/index.es.mjs";
import { h as effect, C as isObservable, g as get } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function useOnUnmount(callback) {
  return effect(() => () => {
    if (isObservable(callback))
      get(callback)();
    else {
      callback();
    }
  });
}
export {
  useOnUnmount
};
