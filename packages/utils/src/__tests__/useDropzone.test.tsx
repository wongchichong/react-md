import {jest, fireEvent} from "voby-jasmine"
import React from "voby"
import {render} from "voby/testing";
import type { DropzoneHandlers } from "../useDropzone"
import { useDropzone } from "../useDropzone"
import JasmineDOM from '@testing-library/jasmine-dom/dist';
import "@testing-library/dom"

function Test({
    children,
    ...options
}: DropzoneHandlers<HTMLElement> & { children? }) {
    const [isOver, handlers] = useDropzone(options)

    return (
        <div data-testid="dropzone" {...handlers} className={[isOver && "over"]}>
            {children}
        </div>
    )
}

describe("useDropzone", () => {
    beforeAll(() => {
        jasmine.getEnv().addMatchers(JasmineDOM);
    });
    
    it("should work correctly", () => {
        const onDragOver = jest.fn()
        const onDragEnter = jest.fn()
        const onDragLeave = jest.fn()
        const onDrop = jest.fn()

        const { getByTestId } = render(
            <Test
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}
            />
        )
        const dropzone = getByTestId("dropzone")
        expect(dropzone).not.toHaveClass("over")
        expect(onDragOver).not.toHaveBeenCalled()
        expect(onDragEnter).not.toHaveBeenCalled()
        expect(onDragLeave).not.toHaveBeenCalled()
        expect(onDrop).not.toHaveBeenCalled()

        fireEvent.dragEnter(dropzone)
        expect(dropzone).toHaveClass("over")
        expect(onDragOver).not.toHaveBeenCalled()
        expect(onDragEnter).toHaveBeenCalled()
        expect(onDragLeave).not.toHaveBeenCalled()
        expect(onDrop).not.toHaveBeenCalled()

        fireEvent.dragLeave(dropzone)
        expect(dropzone).not.toHaveClass("over")
        expect(onDragOver).not.toHaveBeenCalled()
        expect(onDragEnter).toHaveBeenCalled()
        expect(onDragLeave).toHaveBeenCalled()
        expect(onDrop).not.toHaveBeenCalled()

        fireEvent.dragOver(dropzone)
        expect(dropzone).toHaveClass("over")
        expect(onDragOver).toHaveBeenCalled()
        expect(onDragEnter).toHaveBeenCalled()
        expect(onDragLeave).toHaveBeenCalled()
        expect(onDrop).not.toHaveBeenCalled()

        fireEvent.drop(dropzone)
        expect(dropzone).not.toHaveClass("over")
        expect(onDragOver).toHaveBeenCalled()
        expect(onDragEnter).toHaveBeenCalled()
        expect(onDragLeave).toHaveBeenCalled()
        expect(onDrop).toHaveBeenCalled()
    })

    it("should prevent default and stop propagation", () => {
        const onDragOver = jest.fn()
        const onDragEnter = jest.fn()
        const onDragLeave = jest.fn()
        const onDrop = jest.fn()
        const { getByTestId } = render(
            <div
                data-testid="container"
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <Test />
            </div>
        )

        const dropzone = getByTestId("dropzone")
        fireEvent.dragEnter(dropzone)
        fireEvent.dragLeave(dropzone)
        fireEvent.dragOver(dropzone)
        fireEvent.drop(dropzone)

        expect(onDragOver).not.toHaveBeenCalled()
        expect(onDragEnter).not.toHaveBeenCalled()
        expect(onDragLeave).not.toHaveBeenCalled()
        expect(onDrop).not.toHaveBeenCalled()
    })

    it("should not disable the isOver state if a dragleave event is called on a child element", () => {
        const { getByTestId } = render(
            <Test>
                <div data-testid="child1" />
                <div data-testid="child2" />
            </Test>
        )

        const dropzone = getByTestId("dropzone")
        const child1 = getByTestId("child1")
        const child2 = getByTestId("child2")
        expect(dropzone).not.toHaveClass("over")

        fireEvent.dragEnter(dropzone)
        expect(dropzone).toHaveClass("over")

        fireEvent.dragOver(child1)
        expect(dropzone).toHaveClass("over")

        fireEvent.dragLeave(child1)
        expect(dropzone).toHaveClass("over")

        fireEvent.dragOver(child2)
        expect(dropzone).toHaveClass("over")

        fireEvent.dragLeave(dropzone)
        expect(dropzone).not.toHaveClass("over")
    })
})
