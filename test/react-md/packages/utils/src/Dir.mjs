import { j as jsx } from "../../../../woby/dist/jsx-runtime-41b9b096.mjs";
import { g as get, z as observable, h as effect, o as memo } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
import { Children } from "../../react/dist/index.es.mjs";
import { cloneElement as cloneElement$1 } from "../../../../woby/dist/index.es.mjs";
import { s as createContext, k as useContext } from "../../../../woby/dist/htm.module-9e0a6146.mjs";
const context = createContext({
  root: true,
  dir: "ltr",
  toggleDir: () => {
    throw new Error(
      "Tried to toggle the current writing direction without initializing the `Dir` component."
    );
  }
});
const { Provider } = context;
function useDir() {
  const { root: _root, ...current } = get(useContext(context));
  return current;
}
const DEFAULT_DIR = () => {
  let dir = "ltr";
  if (typeof document !== "undefined") {
    const rootDir = document.documentElement.getAttribute("dir");
    dir = rootDir === "rtl" ? "rtl" : "ltr";
  }
  return dir;
};
function Dir({ children, defaultDir = DEFAULT_DIR }) {
  const { root } = get(useContext(context));
  const dir = observable(get(defaultDir));
  effect(() => {
    if (!root || typeof document === "undefined") {
      return;
    }
    document.documentElement.setAttribute("dir", dir());
    return () => {
      document.documentElement.removeAttribute("dir");
    };
  });
  const toggleDir = () => {
    dir((prevDir) => prevDir === "ltr" ? "rtl" : "ltr");
  };
  const value = memo(() => ({ root: false, dir, toggleDir }));
  let child = Children.only(children);
  if (!root) {
    child = cloneElement$1(child, { dir });
  }
  return /* @__PURE__ */ jsx(Provider, { value, children: child });
}
export {
  DEFAULT_DIR,
  Dir,
  useDir
};
