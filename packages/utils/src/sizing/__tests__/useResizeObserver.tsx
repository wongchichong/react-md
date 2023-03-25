import { act, render } from "@testing-library/react";
import { ResizeObserver } from "@juggle/resize-observer";

import type {
  OnResizeObserverChange,
  ResizeObserverElementData,
} from "../useResizeObserver";
import { useResizeObserver } from "../useResizeObserver";

jest.mock("@juggle/resize-observer");

const ResizeObserverMock = jest.mocked(ResizeObserver);
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

const DEFAULT_DOM_RECT: DOMRectReadOnly = {
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  toJSON: () => "",
};

class MockedObserver implements ResizeObserver {
  public _callback: ResizeObserverCallback;

  public _elements: Element[];

  public constructor(callback: ResizeObserverCallback) {
    this._elements = [];
    this._callback = callback;
  }

  public observe(target: Element): void {
    observe(target);
    this._elements.push(target);
  }

  public unobserve(target: Element): void {
    unobserve(target);
    this._elements = this._elements.filter((el) => el !== target);
  }

  public disconnect(): void {
    disconnect();
    this._elements = [];
  }

  public trigger(rect: Partial<DOMRectReadOnly> = {}) {
    const contentRect: DOMRectReadOnly = {
      ...rect,
      ...DEFAULT_DOM_RECT,
    };

    act(() => {
      this._callback(
        this._elements.map((target) => ({
          target,
          contentRect,
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: [],
        })),
        this
      );
    });
  }

  public triggerTarget(
    element: HTMLElement,
    contentRect: DOMRectReadOnly = DEFAULT_DOM_RECT
  ) {
    act(() => {
      const target = this._elements.find((el) => element === el);
      if (!target) {
        throw new Error("Unable to find triggerable element");
      }

      this._callback(
        [
          {
            target,
            contentRect,
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
          },
        ],
        this
      );
    });
  }
}

describe("useResizeObserver", () => {
  let observer: MockedObserver | undefined;
  beforeAll(() => {
    ResizeObserverMock.mockImplementation((callback) => {
      observer = new MockedObserver(callback);
      return observer;
    });
  });

  beforeEach(() => {
    observer?.disconnect();

    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
  });

  afterAll(() => {
    ResizeObserverMock.mockRestore();
  });

  it("should use the ref API if the first argument is a function", () => {
    const onResize = jest.fn();
    const Test = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(onResize);

      return <div data-testid="div" ref={ref} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    const div = getByTestId("div");
    expect(onResize).not.toHaveBeenCalled();
    expect(observe).toHaveBeenCalledWith(div);
    expect(observe).toHaveBeenCalledTimes(1);

    unmount();
    expect(onResize).not.toHaveBeenCalled();
    expect(unobserve).toHaveBeenCalledWith(div);
    expect(unobserve).toHaveBeenCalledTimes(1);
    expect(disconnect).not.toHaveBeenCalled();
  });

  it("should handle calling the callbacks correctly", () => {
    const onResize1 = jest.fn();
    const onResize2 = jest.fn();
    const onResize3 = jest.fn();

    const Test = () => {
      // you'll really never be attaching multiple resize event handlers to the
      // same DOM node like this...

      const [, ref1] = useResizeObserver(onResize1);
      const [, ref2] = useResizeObserver(onResize2, { ref: ref1 });
      const [, ref3] = useResizeObserver(onResize3, { ref: ref2 });

      return <div data-testid="div" ref={ref3} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }

    expect(onResize1).not.toHaveBeenCalled();
    expect(onResize2).not.toHaveBeenCalled();
    expect(onResize3).not.toHaveBeenCalled();
    observer.trigger();
    const expected: ResizeObserverElementData = {
      element: getByTestId("div"),
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    expect(onResize1).toHaveBeenCalledWith(expected);
    expect(onResize2).toHaveBeenCalledWith(expected);
    expect(onResize3).toHaveBeenCalledWith(expected);

    unmount();
  });

  it("should never initialize the observer if both disableHeight and disableWidth are enabled or there is no target", () => {
    const Test1 = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(jest.fn(), {
        disableHeight: true,
        disableWidth: true,
      });

      return <div ref={ref} />;
    };
    const Test2 = () => {
      useResizeObserver(jest.fn());

      return null;
    };

    let { unmount } = render(<Test1 />);
    unmount();

    ({ unmount } = render(<Test2 />));
    unmount();

    expect(observe).not.toHaveBeenCalled();
    expect(unobserve).not.toHaveBeenCalled();
  });

  it("should not trigger the onResize callback if the height changed when the disableHeight option is enabled", () => {
    const onResize = jest.fn();
    const Test = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(onResize, {
        disableHeight: true,
      });

      return <div data-testid="div" ref={ref} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }
    const div = getByTestId("div");
    expect(onResize).not.toHaveBeenCalled();
    observer.trigger();

    expect(onResize).toHaveBeenCalledWith({
      element: div,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    });
    expect(onResize).toHaveBeenCalledTimes(1);

    observer.trigger({ height: 100 });
    expect(onResize).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("should not trigger the onResize callback if the width changed when the disableWidth option is enabled", () => {
    const onResize = jest.fn();
    const Test = () => {
      const [ref] = useResizeObserver<HTMLDivElement>(onResize, {
        disableWidth: true,
      });

      return <div data-testid="div" ref={ref} />;
    };

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }
    const div = getByTestId("div");
    expect(onResize).not.toHaveBeenCalled();
    observer.trigger();

    expect(onResize).toHaveBeenCalledWith({
      element: div,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    });
    expect(onResize).toHaveBeenCalledTimes(1);

    observer.trigger({ width: 1000 });
    expect(onResize).toHaveBeenCalledTimes(1);

    unmount();
  });

  it("should only trigger the resize handler for the element that has changed when multiple observers are added", () => {
    const onResize1 = jest.fn();
    const onResize2 = jest.fn();
    const onResize3 = jest.fn();

    interface DemoProps {
      onResize: OnResizeObserverChange<HTMLDivElement>;
      index: 1 | 2 | 3;
    }

    const Demo = ({ onResize, index }: DemoProps) => {
      const [, refHandler] = useResizeObserver<HTMLDivElement>(onResize);

      return <div ref={refHandler} data-testid={`div-${index}`} />;
    };

    const Test = () => (
      <>
        <Demo index={1} onResize={onResize1} />
        <Demo index={2} onResize={onResize2} />
        <Demo index={3} onResize={onResize3} />
      </>
    );

    const { getByTestId, unmount } = render(<Test />);
    if (!observer) {
      throw new Error();
    }
    const div1 = getByTestId("div-1");
    const div2 = getByTestId("div-2");
    const div3 = getByTestId("div-3");

    const expected1: ResizeObserverElementData = {
      element: div1,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    const expected2: ResizeObserverElementData = {
      element: div2,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };
    const expected3: ResizeObserverElementData = {
      element: div3,
      height: 0,
      width: 0,
      scrollHeight: 0,
      scrollWidth: 0,
    };

    expect(onResize1).not.toHaveBeenCalled();
    expect(onResize2).not.toHaveBeenCalled();
    expect(onResize3).not.toHaveBeenCalled();

    observer.triggerTarget(div1);
    expect(onResize1).toHaveBeenCalledWith(expected1);
    expect(onResize2).not.toHaveBeenCalled();
    expect(onResize3).not.toHaveBeenCalled();

    observer.triggerTarget(div2);
    expect(onResize1).toHaveBeenCalledTimes(1);
    expect(onResize2).toHaveBeenCalledWith(expected2);
    expect(onResize3).not.toHaveBeenCalled();

    observer.triggerTarget(div3);
    expect(onResize1).toHaveBeenCalledTimes(1);
    expect(onResize2).toHaveBeenCalledTimes(1);
    expect(onResize3).toHaveBeenCalledWith(expected3);

    unmount();
  });
});
