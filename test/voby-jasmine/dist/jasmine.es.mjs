import "../../woby/dist/index.es.mjs";
import { r as render$1 } from "../../woby/dist/render_to_string-3f1f11ef.mjs";
const test2 = document.createElement("div");
function renderHook(fn) {
  let fnReturn;
  const Test = () => {
    fnReturn = fn();
  };
  let dispose = render$1(Test, test2);
  return {
    result: { get current() {
      return fnReturn;
    } },
    rerender: function(newTest) {
      dispose = render$1(newTest ?? Test, test2);
    },
    unmount: function() {
      dispose();
    }
  };
}
function act(fn) {
  fn();
}
it;
const jest = {
  fn: jasmine.createSpy,
  resetAllMocks: () => {
  },
  clearAllMocks: () => {
  }
};
const fireEvent = {
  click: (e) => {
    e.dispatchEvent(new MouseEvent("click"));
  },
  keyDown: (e) => {
    e.dispatchEvent(new KeyboardEvent("keydown", { "key": "a" }));
  },
  mouseEnter: (e) => {
    e.dispatchEvent(new MouseEvent("mouseenter"));
  },
  mouseLeave: (e) => {
    e.dispatchEvent(new MouseEvent("mouseleave"));
  },
  dragEnter: (e) => {
    e.dispatchEvent(new DragEvent("dragenter"));
    e.className = "over";
  },
  dragLeave: (e) => {
    e.dispatchEvent(new DragEvent("dragleave"));
    e.classList.remove("over");
  },
  dragOver: (e) => {
    e.dispatchEvent(new DragEvent("dragover"));
    e.className = "over";
  },
  drop: (e) => {
    e.dispatchEvent(new DragEvent("drop"));
    e.classList.remove("over");
  },
  type: (e, value) => {
    e.dispatchEvent(new InputEvent("input", { inputType: "insertText", data: value }));
  }
};
export {
  act,
  fireEvent,
  jest,
  renderHook
};
