// @vitest-environment jsdom

import jest, { describe, expect, it, Expect } from 'jest-web'
import { $ } from "voby"

import { applyRef } from "../applyRef"

const instance = document.createElement("div")

describe("applyRef", () => {
    it("should call the provided ref if it is a function", () => {
        const ref = jest.fn()


        applyRef(instance, ref)
        expect(ref).toBeCalledWith(instance)

        applyRef(null, ref)
        expect(ref).toBeCalledWith(null)
    })

    it("should update mutable ref objects", () => {
        const ref = $<HTMLDivElement | null>()

        expect(ref()).toBe(undefined)

        applyRef(instance, ref)
        expect(ref()).toBe(instance)

        applyRef(null, ref)
        expect(ref()).toBe(null)
    })
})
