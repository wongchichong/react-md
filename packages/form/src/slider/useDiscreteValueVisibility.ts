import voby, { $, $$, useEffect } from 'voby'
import { useIsUserInteractionMode } from "@react-md/utils"

/**
 * @internal
 */
const noop = (): void => {
  // do nothing
}

/**
 * @internal
 * @remarks \@since 2.5.0
 */
interface Options {
  active: FunctionMaybe<boolean>
  animate: FunctionMaybe<boolean>
  animationDuration: FunctionMaybe<number>
  discrete: FunctionMaybe<boolean>
  disabled: FunctionMaybe<boolean>
  onBlur?: FocusEventHandler<HTMLSpanElement>
  onFocus?: FocusEventHandler<HTMLSpanElement>
}

/**
 * @internal
 * @remarks \@since 2.5.0
 */
interface ReturnedProps {
  /**
   * Boolean if the value should animate the `left`, `right`, `top`, and
   * `bottom` values to match the speed of the thumb.
   */
  animateValue: boolean
  visible: boolean
  onBlur: FocusEventHandler<HTMLSpanElement>
  onFocus: FocusEventHandler<HTMLSpanElement>
}

/**
 * This is a completely internal hook that helps control the visibility of the
 * discrete value tooltip's visibility for the `Slider` and `RangeSlider`.
 *
 * Note: This isn't 100% there since the tooltip doesn't animate in when the
 * user holds the mouse down in the same spot for the `animationDuration`.
 *
 * @internal
 * @remarks \@since 2.5.0
 */
export function useDiscreteValueVisibility({
  active,
  animate,
  animationDuration,
  discrete,
  disabled,
  onBlur: propOnBlur = noop,
  onFocus: propOnFocus = noop,
}: Options): ReturnedProps {
  const ref = $<HTMLSpanElement | null>(null)
  const isKeyboard = useIsUserInteractionMode("keyboard")

  // when the user interaction mode changes from keyboard -> mouse by clicking
  // on the track, need to make sure that the thumb value has the animation
  // state enabled so it moves at the same speed as the thumb instead of jumping
  // immediately
  const isModeTransition = $(false)
  const visible = $(false)

  useEffect(() => {
    if (!discrete) {
      visible(false)
      isModeTransition(false)
      return
    }

    if (discrete && visible() && disabled) {
      visible(false)
      return
    }

    if (!isKeyboard) {
      // only considered a "transition" when the tooltip is already visible and
      // switching away from keyboard mode
      isModeTransition(visible())
      return
    }

    // when swapping from mouse/touch -> keyboard, the tooltip's visibility will
    // need to be enabled since default drag behavior is to hide on drag end.
    // The drag process automatically focuses the current "target" thumb to help
    // the user switch between the modes more easily so if the active element is
    // the current thumb, we're good to go
    isModeTransition(false)
    visible(!disabled && document.activeElement === ref())
  })

  useEffect(() => {
    if (!discrete) {
      return
    }

    if (!active) {
      visible(false)
      isModeTransition(false)
      return
    }

    // need to delay the visibility for the same `animationDuration` as the
    // thumb's active state so that the tooltip appears at the same time the
    // thumb stops animating with click drag events
    const timeout = window.setTimeout(() => {
      visible(true)
      isModeTransition(false)
    }, $$(animationDuration))

    return () => {
      window.clearTimeout(timeout)
    }
  })

  const onBlur = $((event: JSX.TargetedFocusEvent<HTMLSpanElement>) => {
    propOnBlur(event)

    const track = event.currentTarget.parentElement
    // need to hide on blur because it _usually_ means the user clicked
    // somewhere else on the page after using the keyboard. However, it is
    // possible the user used the keyboard to update the value and then
    // clicked on the track to update more quickly, so verify that the next
    // focus element isn't the track or any children of the track.
    if (
      !track ||
      document.activeElement ||
      !track.contains(document.activeElement)
    ) {
      ref(null)
      visible(false)
    }
  })

  const onFocus = $((event: JSX.TargetedFocusEvent<HTMLSpanElement>) => {
    ref(event.currentTarget)
    propOnFocus(event)
    if (discrete && isKeyboard) {
      visible(true)
    }
  })

  return {
    onBlur,
    onFocus,
    animateValue: isModeTransition() || (animate && isKeyboard),
    visible: visible(),
  }
}
