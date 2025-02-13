import { Component } from "react";
;
import { render } from "@testing-library/react"

import type { TypographyType } from "../Typography"
import { Typography } from "../Typography"

describe("Typography", () => {
    it("should render correctly based on the type prop", () => {
        const tests: { type: TypographyType; expected: string }[] = [
            { type: "headline-1", expected: "h1" },
            { type: "headline-2", expected: "h2" },
            { type: "headline-3", expected: "h3" },
            { type: "headline-4", expected: "h4" },
            { type: "headline-5", expected: "h5" },
            { type: "headline-6", expected: "h6" },
            { type: "subtitle-1", expected: "h6" },
            { type: "subtitle-2", expected: "h6" },
            { type: "body-1", expected: "p" },
            { type: "body-2", expected: "p" },
            { type: "overline", expected: "span" },
            { type: "button", expected: "button" },
        ]

        tests.forEach(({ type, expected }) => {
            const { getByTestId, unmount } = render(
                <Typography type={type} data-testid="text" />
            )
            const text = getByTestId("text")
            expect(text.tagName.toLowerCase()).toBe(expected)
            expect(text.className).toBe(`rmd-typography rmd-typography--${type}`)
            unmount()
        })

        const { getByTestId } = render(
            <table>
                <Typography type="caption" data-testid="text" />
            </table>
        )
        const text = getByTestId("text")
        expect(text.tagName).toBe("CAPTION")
        expect(text.className).toBe("rmd-typography rmd-typography--caption")
    })

    it("should default to rendering as a <p> tag with the body-1 styles", () => {
        const { getByTestId } = render(<Typography data-testid="p" />)
        const p = getByTestId("p")
        expect(p.tagName).toBe("P")
        expect(p.className).toBe("rmd-typography rmd-typography--body-1")
    })

    it("should be able to render as a string component prop", () => {
        const { getByTestId } = render(
            <Typography data-testid="text" component="section">
                Hello, world!
            </Typography>
        )
        const text = getByTestId("text")

        expect(text.tagName).toBe("SECTION")
        expect(text).toMatchSnapshot()
    })

    it("should be able to render as a functional component", () => {
        const Component = ({ className, children }: any) => (
            <section data-testid="text" className={`${className} custom`}>
                {children}
            </section>
        )

        const { getByTestId } = render(
            <Typography component={Component}>Hello, world!</Typography>
        )
        const text = getByTestId("text")
        expect(text.tagName).toBe("SECTION")
        expect(text).toMatchSnapshot()
    })

    it("should be able to render as a class component", () => {
        class TestComponent extends Component<any> {
            public render() {
                const { children, className } = this.props
                return (
                    <section data-testid="text" className={`${className} custom`}>
                        {children}
                    </section>
                )
            }
        }

        const { getByTestId } = render(
            <Typography component={TestComponent}>Hello, world!</Typography>
        )
        const text = getByTestId("text")
        expect(text.tagName).toBe("SECTION")
        expect(text).toMatchSnapshot()
    })

    it("should be able to use a children render function", () => {
        const { container } = render(
            <Typography>
                {({ className }) => (
                    <span className={cn("span", className)}>Content</span>
                )}
            </Typography>
        )
        expect(container).toMatchSnapshot()
    })
})
