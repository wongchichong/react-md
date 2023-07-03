import "../../../../woby/dist/index.es.mjs";
import { z as observable } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function useToggle(defaultToggled) {
  const toggled = observable(typeof defaultToggled === "function" ? defaultToggled() : defaultToggled);
  const previous = observable(toggled());
  const enable = () => {
    if (!previous()) {
      toggled(true);
    }
  };
  const disable = () => {
    if (previous()) {
      toggled(false);
    }
  };
  const toggle = () => {
    toggled((prevVisible) => !prevVisible);
  };
  return [
    toggled,
    enable,
    disable,
    toggle
    /* setToggled */
  ];
}
export {
  useToggle
};
