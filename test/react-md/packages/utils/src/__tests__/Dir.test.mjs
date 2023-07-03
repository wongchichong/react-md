import { j as jsx } from "../../../../../woby/dist/jsx-runtime-41b9b096.mjs";
import { render } from "../../../../../woby/dist/testing.es.mjs";
import { Dir, useDir } from "../Dir.mjs";
import JasmineDOM from "../../../../node_modules/.pnpm/@testing-library_jasmine-dom@1.3.3/node_modules/@testing-library/jasmine-dom/dist/index.mjs";
const Child = () => {
  const { dir, toggleDir } = useDir();
  return /* @__PURE__ */ jsx("button", { type: "button", onClick: toggleDir, children: dir });
};
describe("Dir", () => {
  beforeAll(() => {
    jasmine.getEnv().addMatchers(JasmineDOM);
  });
  it("should default to the root html dir prop if exists or fallback to ltr", () => {
    document.documentElement.setAttribute("dir", "rtl");
    let { unmount } = render(
      /* @__PURE__ */ jsx(Dir, { children: /* @__PURE__ */ jsx("span", {}) })
    );
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
    ({ unmount } = render(
      /* @__PURE__ */ jsx(Dir, { children: /* @__PURE__ */ jsx("span", {}) })
    ));
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
  });
  it("should update the root html with the defaultDir", () => {
    expect(document.documentElement).not.toHaveAttribute("dir");
    const { unmount } = render(
      /* @__PURE__ */ jsx(Dir, { defaultDir: "ltr", children: /* @__PURE__ */ jsx("span", {}) })
    );
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
  });
  it("should clone the dir into a child element", () => {
    const { getByTestId } = render(
      /* @__PURE__ */ jsx(Dir, { defaultDir: "ltr", children: /* @__PURE__ */ jsx(Dir, { defaultDir: "rtl", children: /* @__PURE__ */ jsx("span", { "data-testid": "span" }) }) })
    );
    const span = getByTestId("span");
    expect(span).toHaveAttribute("dir", "rtl");
  });
  it("should allow a child component to access and toggle the direction", () => {
    const { getByRole } = render(
      /* @__PURE__ */ jsx(Dir, { children: /* @__PURE__ */ jsx(Child, {}) })
    );
    const button = getByRole("button");
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("ltr");
    button.click();
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    expect(button).toHaveTextContent("rtl");
    button.click();
  });
  it("should toggle the correct parent with multiple Dir components", () => {
    const { getByRole } = render(
      /* @__PURE__ */ jsx(Dir, { children: /* @__PURE__ */ jsx(Dir, { defaultDir: "rtl", children: /* @__PURE__ */ jsx(Child, {}) }) })
    );
    const button = getByRole("button");
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("rtl");
    button.click();
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("ltr");
  });
});
