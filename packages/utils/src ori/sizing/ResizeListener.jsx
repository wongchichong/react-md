import { useResizeListener } from './useResizeListener';
/**
 * This is a simple component that will attach a throttled resize event listener
 * when mounted, and detach when it unmounts.
 *
 * This component only works for entire app resize events. If you are looking
 * for specific element resize events, check out the `ResizeObserver` component
 * instead.
 */
export function ResizeListener(_a) {
  var onResize = _a.onResize,
    options = _a.options,
    _b = _a.immediate,
    immediate = _b === void 0 ? typeof window !== 'undefined' : _b;
  useResizeListener({
    onResize: onResize,
    options: options,
    immediate: immediate,
    enabled: true,
  });
  return null;
}
//# sourceMappingURL=ResizeListener.jsx.map
