import "../../../../woby/dist/index.es.mjs";
import { h as effect, g as get } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function useWindowBlurPause({ startTimer, stopTimer, visible, message, disabled = false }) {
  effect(() => {
    if (disabled || !get(visible) || !message || message.disableAutohide) {
      return;
    }
    const handleFocusEvent = (event) => {
      if (event.type === "focus") {
        startTimer();
      } else {
        stopTimer();
      }
    };
    window.addEventListener("blur", handleFocusEvent);
    window.addEventListener("focus", handleFocusEvent);
    return () => {
      window.removeEventListener("blur", handleFocusEvent);
      window.removeEventListener("focus", handleFocusEvent);
    };
  });
}
export {
  useWindowBlurPause
};
