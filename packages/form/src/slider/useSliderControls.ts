import { $, useEffect, $$ } from 'voby'
import { applyRef, useDir, useIsomorphicLayoutEffect } from "@react-md/utils"

import { DEFAULT_SLIDER_ANIMATION_TIME } from "./constants"
import type {
    DefinedSliderValueOptions,
    SliderControls,
    SliderDragEvent,
    SliderDraggingBy,
    SliderEventHandlers,
    SliderPresentation,
    SliderThumbIndex,
    ThumbIndex,
} from "./types"
import type { CombinedSliderControls, SimpleSliderControls, SliderDragValues } from "./utils"
import {
    getDragPercentage,
    getDragValue,
    isMouseEvent,
    isRangeSlider,
    isTouchEvent,
} from "./utils"

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export type SliderControlsOptions = CombinedSliderControls &
    SliderPresentation &
    SliderEventHandlers &
    DefinedSliderValueOptions & {
        ref?: Ref<HTMLSpanElement | null>
        thumb1Ref?: Ref<HTMLSpanElement | null>
        thumb2Ref?: Ref<HTMLSpanElement | null>
        animationDuration?: FunctionMaybe<Nullable<number>>
    }

const VALID_KEYS = [
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "PageUp",
    "PageDown",
]

/**
 * @internal
 * @remarks \@since 2.5.0
 */
export interface SliderAndRangeSliderControls {
    thumb1Ref: Refs<HTMLSpanElement | null>
    thumb1Value: number
    thumb1Percentage: string
    thumb2Ref: Refs<HTMLSpanElement | null>
    thumb2Value?: FunctionMaybe<Nullable<number>>
    thumb2Percentage?: FunctionMaybe<Nullable<string>>
    dragging: boolean
    draggingIndex: SliderThumbIndex
    ref: Refs<HTMLSpanElement | null>
    onBlur: FocusEventHandler<HTMLSpanElement>
    onKeyDown: KeyboardEventHandler<HTMLSpanElement>
    onMouseDown: MouseEventHandler<HTMLSpanElement>
    onTouchStart: TouchEventHandler<HTMLSpanElement>
}

/**
 * This hook provides all the logic for updating the slider's when the user
 * interacts with the slider.
 *
 * @internal
 * @remarks \@since 2.5.0
 */
export function useSliderControls({
    ref,
    thumb1Ref: propThumb1Ref,
    thumb2Ref: propThumb2Ref,
    min,
    max,
    step: sp,
    disabled = false,
    vertical = false,
    onBlur,
    onKeyDown,
    onMouseDown,
    onTouchStart,
    animationDuration: ad = DEFAULT_SLIDER_ANIMATION_TIME,
    ...controls
}: SliderControlsOptions): SliderAndRangeSliderControls {
    const step = $$(sp), animationDuration = $$(ad)

    const trackRef = $<HTMLSpanElement | null>(null)
    const thumb1Ref = $<HTMLSpanElement | null>(null)
    const thumb2Ref = $<HTMLSpanElement | null>(null)
    const dragging = $(false)
    const dragValue = $<number>($$(min))
    const draggingBy = $<SliderDraggingBy>(null)
    const draggingIndex = $<SliderThumbIndex>(null)
    const controlsRef = $(controls)
    useIsomorphicLayoutEffect(() => {
        controlsRef(controls)
    })

    const { dir } = useDir()
    const isRtl = dir === "rtl"

    let thumb1Value: number
    let thumb1Percentage: FunctionMaybe<string>
    let thumb2Value: number | undefined
    let thumb2Percentage: FunctionMaybe<string | undefined>
    if (isRangeSlider(controls)) {
        [thumb1Value, thumb2Value] = $$(controls.value);
        ({ thumb1Percentage, thumb2Percentage } = getDragPercentage({
            min,
            max,
            thumb1Value,
            thumb2Value,
            dragging,
            dragValue,
            draggingIndex,
        }))
    } else {
        thumb1Value = $$((controls as SimpleSliderControls).value);
        ({ thumb1Percentage } = getDragPercentage({
            min,
            max,
            thumb1Value,
            dragging,
            dragValue,
            draggingIndex,
        }))
    }

    /**
     * The main handler for updating the value of the slider. To help keep the
     * drag experience smooth, some values are stored in refs to prevent the
     * `useEffect` from being run during renders which adds and removes the move
     * event handlers
     */
    const drag = (event: SliderDragEvent) => {
        const track = trackRef()
        const slider1 = thumb1Ref()
        const slider2 = thumb2Ref()
        const { altKey, ctrlKey, metaKey, shiftKey } = event
        if (
            altKey ||
            ctrlKey ||
            metaKey ||
            shiftKey ||
            disabled ||
            !track ||
            !slider1 ||
            (isMouseEvent(event) && event.button !== 0) ||
            (isTouchEvent(event) && event.changedTouches.length !== 1) ||
            (!isMouseEvent(event) && !isTouchEvent(event))
        ) {
            return
        }

        // prevent text from being highlighted on desktop or the page from
        // scrolling on mobile while dragging
        if (!isTouchEvent(event) || event.type === "touchmove") {
            event.preventDefault()
        }
        event.stopPropagation()

        // get the current mouse/touch position to help determine hwo far the
        // slider is being dragged
        let clientX: number
        let clientY: number
        if (isMouseEvent(event)) {
            ({ clientX, clientY } = event)
        } else {
            const touch = event.changedTouches[0];
            ({ clientX, clientY } = touch)
        }

        let index: ThumbIndex = 0
        let slider: HTMLSpanElement = slider1
        if (slider2) {
            // if we aren't dragging yet, try to find the slider closest to the
            // mouse/touch position and use that one
            if (draggingIndex() === null) {
                const x1 = slider1.getBoundingClientRect().x
                const x2 = slider2.getBoundingClientRect().x
                const y1 = slider1.getBoundingClientRect().y
                const y2 = slider2.getBoundingClientRect().y
                if (vertical) {
                    index = Math.abs(clientY - y1) < Math.abs(clientY - y2) ? 0 : 1
                } else {
                    index = Math.abs(clientX - x1) < Math.abs(clientX - x2) ? 0 : 1
                }
            } else {
                index = draggingIndex()
            }

            slider = index === 0 ? slider1 : slider2
        }

        // if we aren't dragging yet, want to focus the slider element to make it
        // easier to switch between mouse dragging and keyboard "dragging"
        if (draggingIndex() !== index) {
            slider.focus()
            draggingIndex(index)
        }

        draggingBy(isMouseEvent(event) ? "mouse" : "touch")

        const { left, top, height, width } = track.getBoundingClientRect()
        const options: SliderDragValues = {
            min,
            max,
            step,
            vertical,
            clientX,
            clientY,
            left,
            top,
            height,
            width,
            isRtl,
            minValue: min,
            maxValue: max,
        }

        const controls = controlsRef()
        if (isRangeSlider(controls)) {
            const [thumb1Value, thumb2Value] = $$(controls.value)
            const { value, current } = getDragValue({
                ...options,
                minValue: index === 0 ? min : thumb1Value + step,
                maxValue: index === 1 ? max : thumb2Value - step,
            })
            dragValue(current)
            controls.value(
                index === 0 ? [value, thumb2Value] : [thumb1Value, value]
            )
        } else {
            const { value, current } = getDragValue(options)
            dragValue(current)
            controls.value(value)
        }
    }

    const stop = () => {
        controlsRef().persist()
        dragging(false)
        draggingIndex(null)
        draggingBy(null)
    }

    useEffect(() => {
        if (draggingBy() === null) {
            return
        }

        if (draggingBy() === "mouse") {
            window.addEventListener("mousemove", drag)
            window.addEventListener("mouseup", stop)
        } else {
            window.addEventListener("touchmove", drag, { passive: false })
            window.addEventListener("touchend", stop)
        }

        return () => {
            if (draggingBy() === "mouse") {
                window.removeEventListener("mousemove", drag)
                window.removeEventListener("mouseup", stop)
            } else {
                window.removeEventListener("touchmove", drag)
                window.removeEventListener("touchend", stop)
            }
        }
    })

    useEffect(() => {
        if (draggingIndex() === null && draggingBy() === null) {
            return
        }

        // I don't know how to reach this flow.. so maybe can be removed?
        /* istanbul ignore if */
        if (draggingIndex() === null) {
            dragging(false)
            return
        }

        const timeout = window.setTimeout(() => {
            dragging(true)
        }, animationDuration)

        return () => {
            window.clearTimeout(timeout)
        }
    })

    const handleBlur = $<FocusEventHandler<HTMLSpanElement>>((event) => {
        if (onBlur) {
            onBlur(event)
        }

        controlsRef().persist
    })

    /**
     * Note: this should be attached to the `SliderTrack` component.
     */
    const handleMouseDown: MouseEventHandler<HTMLSpanElement> = (event) => {
        if (onMouseDown) {
            onMouseDown(event)
        }

        // only call drag again when the dragging by isn't null since it can cause
        // the "drag" events to be re-started if the mouse appears over the slider
        // thumb again
        if (draggingBy() === null) {
            drag(event)
        }
    }

    /**
     * Note: this should be attached to the `SliderTrack` component.
     */
    const handleTouchStart = $<TouchEventHandler<HTMLSpanElement>>((event) => {
        if (onTouchStart) {
            onTouchStart(event)
        }

        // only call drag again when the dragging by isn't null since it can cause
        // the "drag" events to be re-started if the user's finger appears over
        // the slider thumb again
        if (draggingBy() === null) {
            drag(event)
        }
    })

    /**
     * Note: this should be attached to each `SliderThumb` component.
     */
    const handleKeyDown = $<KeyboardEventHandler<HTMLSpanElement>>((event) => {
        if (onKeyDown) {
            onKeyDown(event)
        }

        const { key, altKey, ctrlKey, metaKey, shiftKey } = event
        if (
            altKey ||
            ctrlKey ||
            metaKey ||
            shiftKey ||
            disabled ||
            !VALID_KEYS.includes(key)
        ) {
            return
        }

        let controls: Omit<SliderControls, "setValue" | "value" | "persist">
        if (isRangeSlider(controlsRef())) {
            const {
                increment,
                incrementJump,
                decrement,
                decrementJump,
                minimum,
                maximum,
            } = controlsRef()
            const index = event.currentTarget === thumb2Ref() ? 1 : 0
            controls = {
                increment: increment.bind(null, index),
                incrementJump: incrementJump.bind(null, index),
                decrement: decrement.bind(null, index),
                decrementJump: decrementJump.bind(null, index),
                minimum: minimum.bind(null, index),
                maximum: maximum.bind(null, index),
            }
        } else {
            controls = controlsRef()
        }

        const {
            increment,
            incrementJump,
            decrement,
            decrementJump,
            minimum,
            maximum,
        } = controls
        event.preventDefault()
        event.stopPropagation()
        switch (key) {
            case "ArrowUp":
            case "ArrowRight":
                increment()
                break
            case "ArrowDown":
            case "ArrowLeft":
                decrement()
                break
            case "Home":
                minimum()
                break
            case "End":
                maximum()
                break
            case "PageUp":
                incrementJump()
                break
            case "PageDown":
                decrementJump()
                break
        }
    })

    const trackRefHandler = $((instance: HTMLSpanElement | null) => {
        applyRef(instance, ref)
        trackRef(instance)
    })

    const thumb1RefHandler = $((instance: HTMLSpanElement | null) => {
        applyRef(instance, propThumb1Ref)
        thumb1Ref(instance)
    })

    const thumb2RefHandler = $((instance: HTMLSpanElement | null) => {
        applyRef(instance, propThumb2Ref)
        thumb2Ref(instance)
    })

    return {
        thumb1Ref: thumb1RefHandler,
        thumb1Value,
        thumb1Percentage,
        thumb2Ref: thumb2RefHandler,
        thumb2Value,
        thumb2Percentage,
        dragging: dragging(),
        draggingIndex: draggingIndex(),
        ref: trackRefHandler,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,
    }
}
