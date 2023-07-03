import { j as jsx } from "../../../../../woby/dist/jsx-runtime-41b9b096.mjs";
import { jest, fireEvent } from "../../../../../voby-jasmine/dist/jasmine.es.mjs";
import { render } from "../../../../../woby/dist/testing.es.mjs";
import { useDropzone } from "../useDropzone.mjs";
import JasmineDOM from "../../../../node_modules/.pnpm/@testing-library_jasmine-dom@1.3.3/node_modules/@testing-library/jasmine-dom/dist/index.mjs";
import "../../../../node_modules/.pnpm/@testing-library_dom@8.20.0/node_modules/@testing-library/dom/dist/@testing-library/dom.esm.mjs";
function Test({
  children,
  ...options
}) {
  const [isOver, handlers] = useDropzone(options);
  return /* @__PURE__ */ jsx("div", { "data-testid": "dropzone", ...handlers, className: [isOver && "over"], children });
}
describe("useDropzone", () => {
  beforeAll(() => {
    jasmine.getEnv().addMatchers(JasmineDOM);
  });
  it("should work correctly", () => {
    const onDragOver = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();
    const { getByTestId } = render(
      /* @__PURE__ */ jsx(
        Test,
        {
          onDragLeave,
          onDragEnter,
          onDragOver,
          onDrop
        }
      )
    );
    const dropzone = getByTestId("dropzone");
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).not.toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass("over");
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("over");
    expect(onDragOver).toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    fireEvent.drop(dropzone);
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).toHaveBeenCalled();
    expect(onDrop).toHaveBeenCalled();
  });
  it("should prevent default and stop propagation", () => {
    const onDragOver = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();
    const { getByTestId } = render(
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-testid": "container",
          onDragLeave,
          onDragEnter,
          onDragOver,
          onDrop,
          children: /* @__PURE__ */ jsx(Test, {})
        }
      )
    );
    const dropzone = getByTestId("dropzone");
    fireEvent.dragEnter(dropzone);
    fireEvent.dragLeave(dropzone);
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone);
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).not.toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
  });
  it("should not disable the isOver state if a dragleave event is called on a child element", () => {
    const { getByTestId } = render(
      /* @__PURE__ */ jsx(Test, { children: [
        /* @__PURE__ */ jsx("div", { "data-testid": "child1" }),
        /* @__PURE__ */ jsx("div", { "data-testid": "child2" })
      ] })
    );
    const dropzone = getByTestId("dropzone");
    const child1 = getByTestId("child1");
    const child2 = getByTestId("child2");
    expect(dropzone).not.toHaveClass("over");
    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass("over");
    fireEvent.dragOver(child1);
    expect(dropzone).toHaveClass("over");
    fireEvent.dragLeave(child1);
    expect(dropzone).toHaveClass("over");
    fireEvent.dragOver(child2);
    expect(dropzone).toHaveClass("over");
    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("over");
  });
});
