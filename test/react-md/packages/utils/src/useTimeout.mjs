import "../../../../woby/dist/index.es.mjs";
import { useToggle } from "./useToggle.mjs";
import { z as observable, h as effect } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function useTimeout(cb, delay, defaultStarted = false) {
  const cbRef = observable(cb);
  const delayRef = observable(delay);
  const timeoutRef = observable();
  const [enabled, start, disable] = useToggle(defaultStarted);
  const clearTimeout = observable(() => {
    window.clearTimeout(timeoutRef());
    timeoutRef(void 0);
  });
  const restart = observable(() => {
    clearTimeout();
    timeoutRef(window.setTimeout(() => {
      cbRef()();
      disable();
    }, delayRef()));
  });
  const stop = observable(() => {
    clearTimeout();
    disable();
  });
  effect(() => {
    if (!enabled) {
      return;
    }
    timeoutRef(window.setTimeout(() => {
      cbRef()();
      disable();
    }, delay));
    return () => {
      clearTimeout();
    };
  });
  return [start, stop, restart];
}
export {
  useTimeout
};
