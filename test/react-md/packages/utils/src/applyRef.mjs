import "../../../../woby/dist/index.es.mjs";
import { g as get } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function applyRef(instance, ref) {
  if (!ref)
    return;
  const e = get(instance);
  if (typeof ref === "function")
    ref(e);
  else if (Array.isArray(ref))
    ref.flat().forEach((r) => r(e));
}
export {
  applyRef
};
