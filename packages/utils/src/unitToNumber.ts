import { $$ } from "voby"

export interface UnitToNumberOptions {
    element?: Element
    fontSizeFallback?: FunctionMaybe<Nullable<number>>
}
/**
 * A simple util to convert a unit that is using `px`, `em`, or `rem` to a
 * number so that calculations can be made on that unit.
 *
 * @param unit - The unit to convert to a number
 * @param element - The element to use to use for calculating `em`
 * @returns the unit as a number
 */
export function unitToNumber(
    unit: string | number,
    options: UnitToNumberOptions = {}
): number {
    const { fontSizeFallback: fsfb = 16, element } = options
    const fontSizeFallback = $$(fsfb)

    if (typeof unit === "number") {
        return unit
    }

    const parsed = parseFloat(unit)
    if (/px$/.test(unit)) {
        return parsed
    }

    if (typeof document === "undefined") {
        return parsed * fontSizeFallback
    }

    const rem = /rem$/.test(unit)
    let el: HTMLElement | Element = document.documentElement as HTMLElement
    if (!rem && element) {
        el = element.parentElement || element
    }

    const fontSize = parseFloat(
        window.getComputedStyle(el).fontSize || `${fontSizeFallback}px`
    )

    return parsed * fontSize
}
