import { $, Observable, useEffect, useMemo, $$ } from 'voby'
import { nearest } from "@react-md/utils"
import '@react-md/react'

import {
    DEFAULT_SLIDER_MAX,
    DEFAULT_SLIDER_MIN,
    DEFAULT_SLIDER_STEP,
} from "./constants"
import type {
    DefinedSliderValueOptions,
    RangeSliderControls,
    RangeSliderDefaultValue,
    RangeSliderValue,
    SliderStepOptions,
    ThumbIndex,
} from "./types"
import { getJumpValue, getSteps } from "./utils"

const noop = (): void => {
    // do nothing
}

/**
 * @internal
 * @remarks \@since 2.5.0
 */
interface UpdateOptions {
    /**
     * The thumb index that is being updated.
     */
    index: FunctionMaybe<ThumbIndex>

    type: FunctionMaybe<
        | "increment"
        | "decrement"
        | "min"
        | "max"
        | "increment-jump"
        | "decrement-jump">
}

/**
 * @remarks \@since 2.5.0
 */
export interface UseRangeSliderOptions extends SliderStepOptions {
    /**
     * An optional callback that will be triggered when the value has changed when
     * the `updateOn` behavior is set to `"blur"`. When the `updateOn` behavior is
     * set to `"change"` (default), this will do nothing since the return value
     * from the hook will always be the latest value.
     */
    onChange?(value: RangeSliderValue): void
}

/**
 * @remarks \@since 2.5.0
 */
export interface RangeSliderRequiredProps
    extends RangeSliderControls,
    DefinedSliderValueOptions {
    /**
     * The current value of the slider.
     */
    value: Observable<RangeSliderValue>
}

/**
 * @remarks \@since 2.5.0
 */
export type RangeSliderValueReturnType = readonly [
    RangeSliderValue,
    RangeSliderRequiredProps
]

/**
 * This hook is used to control the value and behavior of the `RangeSlider`
 * component. The first argument will contain the current slider value while the
 * second argument will be all the props required to control the `RangeSlider`
 * component.
 *
 * @param defaultValue - An optional default value to use. When omitted, this
 * will be the `[min, max]` values
 * @param options - An object containing the `min` and `max` values allowed for
 * the slider as well as a `step` to indicate valid values between the `min` and
 * `max`.
 * @returns an ordered list containing the current value followed by the
 * `RangeSlider` props
 * @remarks \@since 2.5.0
 */
export function useRangeSlider(
    defaultValue?: RangeSliderDefaultValue,
    {
        min: mn = DEFAULT_SLIDER_MIN,
        max: mx = DEFAULT_SLIDER_MAX,
        step: sp = DEFAULT_SLIDER_STEP,
        jump: jp,//: propJump,
        updateOn = "change",
        onChange = noop,
    }: UseRangeSliderOptions = {}
): RangeSliderValueReturnType {
    const min = $$(mn), max = $$(mx), step = $$(sp), propJump = $$(jp)

    const jump = useMemo(() => getJumpValue(min, max, step, propJump))

    // since the `currentValue` is a ref, this state is used to force a re-render
    // to get the updated value from the ref.
    const hack = $([])
    const value = $<RangeSliderValue>($$(defaultValue) ?? [min, max])
    const currentValue = $(value())

    const update = ({ index, type }: UpdateOptions) => {
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== "production") {
            if (index !== 0 && index !== 1) {
                throw new TypeError("Thumb index must be 0 or 1.")
            }
        }

        value(([thumb1Value, thumb2Value]) => {
            let value: number
            let minValue = min
            let maxValue = max
            if (index === 0) {
                value = thumb1Value
                maxValue = thumb2Value - step
            } else {
                value = thumb2Value
                minValue = thumb1Value + step
            }

            switch (type) {
                case "min":
                    value = minValue
                    break
                case "max":
                    value = maxValue
                    break
                case "increment":
                    value += step
                    break
                case "decrement":
                    value -= step
                    break
                case "increment-jump":
                    value += jump()
                    break
                case "decrement-jump":
                    value -= jump()
                    break
            }

            value = Math.max(minValue, Math.min(maxValue, value))

            return index === 0 ? [value, thumb2Value] : [thumb1Value, value]
        })
    }
    const increment = (index: ThumbIndex) => update({ index, type: "increment" })
    const incrementJump = (index: ThumbIndex) => update({ index, type: "increment-jump" })
    const decrement = (index: ThumbIndex) => update({ index, type: "decrement" })
    const decrementJump = (index: ThumbIndex) => update({ index, type: "decrement-jump" })
    const minimum = (index: ThumbIndex) => update({ index, type: "min" })
    const maximum = (index: ThumbIndex) => update({ index, type: "max" })

    const persist = $(() => {
        const [prev1, prev2] = currentValue()
        if (prev1 === value()[0] && prev2 === value()[1]) {
            return
        }

        onChange(value())
        currentValue(value())
        hack([])
    })

    const prev = $({ min, max, step })
    useEffect(() => {
        if (
            prev().min !== min ||
            prev().max !== max ||
            prev().step !== step
        ) {
            // ensure that if the `min`, `max`, or `step` value changes that the value
            // is updated as well. Without this, there will be a runtime error if the
            // value is not within the new range.
            prev({ min, max, step })
            const steps = getSteps(min, max, step)
            const nextValue: RangeSliderValue = [
                nearest(value()[0], min, max, steps),
                nearest(value()[1], min, max, steps),
            ]
            currentValue(nextValue)
            value(nextValue)
        }
    })

    if (updateOn === "change" && currentValue() !== value())
        currentValue(value())

    return [
        currentValue(),
        {
            min,
            max,
            step,
            // value(),
            minimum,
            maximum,
            increment,
            incrementJump,
            decrement,
            decrementJump,
            persist,
            value,
        },
    ]

}
