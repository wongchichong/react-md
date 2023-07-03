import {act, renderHook, jest, fireEvent} from "voby-jasmine"
import {$} from "voby"
import {render} from "voby/testing"
import React from "voby"
// import { useState } from "react";
// import { render } from "@testing-library/react";

import { useOnUnmount } from "../useOnUnmount";
import userEvent from "@testing-library/user-event";

describe("useOnUnmount", () => {
  it("should work correctly", () => {
    const callback = jest.fn();
    function Test() {
      useOnUnmount(callback);

      return null;
    }

    const { unmount, rerender } = renderHook(Test)
    expect(callback).not.toHaveBeenCalled();

    rerender(<Test />);
    expect(callback).not.toHaveBeenCalled();

    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should ensure the callback function doesn't have a stale closure", () => {
    const callback = jest.fn();
    const value = $("")
    function Test() {

      useOnUnmount(() => {
        callback(value());
      });

      return (
        <input
          type="text"
          value={value}
          onChange={(event) => value(event.currentTarget.value)}
        />
      );
    }

    const { getByRole, unmount } = render(<Test />);
    const input = getByRole("input");

    // userEvent.type(input, "my new value"); 
    value("my new value")
    expect(callback).not.toHaveBeenCalled();

    unmount();
    expect(callback).toHaveBeenCalledWith("my new value");
  });
});
