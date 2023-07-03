import {jest} from "voby-jasmine"
import { $ } from "voby"

import { applyRef } from "../applyRef"

const instance = document.createElement("div")

describe("applyRef", () => {
    it("should call the provided ref if it is a function", () => {
        const ref = jest.fn()


        applyRef(instance, ref)
        expect(ref).toHaveBeenCalledWith(instance)

        applyRef(null, ref)
        expect(ref).toHaveBeenCalledWith(null)
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
