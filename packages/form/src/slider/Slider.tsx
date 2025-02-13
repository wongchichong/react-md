;

import type { PropsWithRef } from "@react-md/utils"

import {
  DEFAULT_SLIDER_ANIMATION_TIME,
  DEFAULT_SLIDER_GET_VALUE_TEXT,
} from "./constants"
import { SliderContainer } from "./SliderContainer"
import { SliderThumb } from "./SliderThumb"
import { SliderTrack } from "./SliderTrack"
import type { BaseSliderProps } from "./types"
import type { SliderRequiredProps } from "./useSlider"
import { useSliderControls } from "./useSliderControls"
import { $$ } from "voby"

/**
 * @remarks \@since 2.5.0
 */
export interface SliderProps<T extends EventTarget = HTMLDivElement> extends SliderRequiredProps, Omit<BaseSliderProps<T>, 'max' | 'min' | 'step' | 'value'> {
  /**
   * An optional label to apply to the slider's thumb. This should normally be a
   * short (1-4 word) description for this slider.
   *
   * @see {@link SliderLabelProps.label}
   * @see {@link thumbLabelledBy}
   */
  thumbLabel?: FunctionMaybe<Nullable<string>>

  /**
   * An optional id point to a label describing the slider's thumb. This should
   * normally be a short (1-4 word) description for this slider.
   *
   * @see {@link SliderLabelProps.label}
   * @see {@link thumbLabel}
   */
  thumbLabelledBy?: FunctionMaybe<Nullable<string>>

  /**
   * Any additional props you'd like to pass to the track element as well as an
   * optional `ref` if you need access to the track element for some reason.
   */
  trackProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

  /**
   * Any additional props you'd like to pass to the thumb element as well as an
   * optional `ref` if you need access to the track element for some reason.
   */
  thumbProps?: PropsWithRef<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
}

/**
 * The `Slider` component allows the user to select a single value from a range
 * of numbers. The functionality for controlling the value of this component is
 * provided by the `useSlider` hook.
 *
 * @remarks \@since 2.5.0
 */
export const Slider = (
  {
    baseId,
    trackProps: propTrackProps,
    label,
    labelProps,
    thumbLabel,
    thumbLabelledBy,
    thumbProps,
    min,
    max,
    step,
    discrete = false,
    disabled = false,
    vertical = false,
    onBlur,
    onMouseDown,
    onTouchStart,
    getValueText = DEFAULT_SLIDER_GET_VALUE_TEXT,
    animationDuration = DEFAULT_SLIDER_ANIMATION_TIME,
    value,
    minimum,
    maximum,
    increment,
    incrementJump,
    decrement,
    decrementJump,
    persist,
    // setValue,
    ref,
    ...props
  }: SliderProps<HTMLSpanElement>
) => {
  const {
    thumb1Ref,
    thumb1Value,
    thumb2Ref: _thumb2Ref,
    thumb2Value: _thumb2Value,
    dragging,
    draggingIndex,
    onKeyDown,
    ...trackProps
  } = useSliderControls({
    ref: propTrackProps?.ref,
    thumb1Ref: thumbProps?.ref,
    min,
    max,
    step,
    value,
    disabled,
    vertical,
    onBlur,
    onKeyDown: thumbProps?.onKeyDown,
    onMouseDown,
    onTouchStart,
    animationDuration,
    minimum,
    maximum,
    increment,
    incrementJump,
    decrement,
    decrementJump,
    persist,
    // setValue,
  })

  let labelId = ""
  if (label) {
    labelId = $$(labelProps?.id) as string || `${baseId}-label`
  }

  return (
    <SliderContainer
      {...props}
      ref={ref}
      label={label}
      labelId={labelId}
      labelProps={labelProps}
      disabled={disabled}
      vertical={vertical}
    >
      <SliderTrack
        id={baseId}
        {...propTrackProps}
        {...trackProps}
        animate={!dragging}
        disabled={disabled}
        vertical={vertical}
      >
        <SliderThumb
          {...thumbProps}
          aria-label={thumbLabel}
          aria-labelledby={thumbLabelledBy || labelId}
          baseId={baseId}
          ref={thumb1Ref}
          getValueText={getValueText}
          min={min}
          max={max}
          discrete={discrete}
          disabled={disabled}
          vertical={vertical}
          animate={!dragging}
          animationDuration={animationDuration}
          value={thumb1Value}
          index={0}
          active={draggingIndex === 0}
          onKeyDown={onKeyDown}
        />
      </SliderTrack>
    </SliderContainer>
  )
}
