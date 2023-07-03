function throttle(fn, wait) {
  let lastCalledTime = 0;
  let timeout;
  let result;
  let args;
  function trailingCall() {
    lastCalledTime = Date.now();
    timeout = void 0;
    result = fn(...args);
  }
  return function throttled(...nextArgs) {
    args = nextArgs;
    const now = Date.now();
    const remaining = wait - (now - lastCalledTime);
    if (remaining <= 0 || remaining > wait) {
      lastCalledTime = now;
      result = fn(...args);
    } else if (!timeout) {
      timeout = window.setTimeout(trailingCall, remaining);
    }
    return result;
  };
}
export {
  throttle
};
