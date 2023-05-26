import type {
  // ChangeEvent,
  // ChangeEventHandler,
  // JSX.TargetedFocusEvent,
  // FocusEventHandler,
} from 'voby'
import { $, useEffect } from 'voby'

/**
 * @internal
 * @remarks \@since 2.5.2
 */
export type FormElement = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) & TargetedEvent<EventTarget, Event>

/**
 * @internal
 * @remarks \@since 2.5.2
 */
interface EventHandlers<E extends FormElement> {
  onBlur?: FocusEventHandler<E>
  onFocus?: FocusEventHandler<E>
  onChange?: /* Change */ JSX.EventHandler<E>
}

/**
 * @internal
 * @remarks \@since 2.5.2
 */
interface FieldStatesOptions<E extends FormElement> extends EventHandlers<E> {
  value?: FunctionMaybe<Nullable<string>> | readonly string[]
  defaultValue?: FunctionMaybe<Nullable<string>> | readonly string[]
}

/**
 * @internal
 * @remarks \@since 2.5.2
 */
interface ReturnValue<E extends FormElement>
  extends Required<EventHandlers<E>> {
  /**
   * Boolean if the TextField or TextArea current has a value with a `length > 0`
   * so that any labels will correctly float above the text field. This will
   * also make sure that number inputs will still be considered valued when
   * there is a `badInput` validity error.
   */
  valued: boolean

  /**
   * Boolean if the TextField or TextArea currently has focus.
   */
  focused: boolean
}

/**
 * This hook is used to handle the different states for the text field based on
 * the current value and user interaction.
 *
 * @internal
 * @remarks \@since 2.5.2
 */
export function useFieldStates<E extends FormElement>({
  onBlur,
  onFocus,
  onChange,
  value,
  defaultValue,
}: FieldStatesOptions<E>): ReturnValue<E> {
  const focused = $(false)
  const valued = $((() => {
    if (typeof value === "undefined") {
      return typeof defaultValue !== "undefined" && defaultValue.length > 0
    }

    return value.length > 0
  })())

  const handleBlur = $((event: JSX.TargetedFocusEvent<E>) => {
    if (onBlur) {
      //@ts-ignore
      onBlur(event)
    }

    focused(false)
    const input = event.currentTarget
    //@ts-ignore
    if (input.getAttribute("type") === "number") {
      //@ts-ignore
      input.checkValidity()
      //@ts-ignore
      valued(input.validity.badInput || (value ?? input.value).length > 0)
    }
  })

  const handleFocus = $((event: JSX.TargetedFocusEvent<E>) => {
    if (onFocus) {
      //@ts-ignore
      onFocus(event)
    }

    focused(true)
  })

  //@ts-ignore
  const handleChange = $((event: ChangeEvent<E>) => {
    if (onChange) {
      //@ts-ignore
      onChange(event)
    }

    const input = event.currentTarget
    if (input.getAttribute("type") === "number") {
      input.checkValidity()
      /* istanbul ignore next */
      if (input.validity.badInput) {
        return
      }
    }

    valued(input.value.length > 0)
  })

  // another way to handle this could be to just make the `valued` state derived
  // based on the `value`, but it gets wonky for number fields. This technically
  // still fails right now for number fields if you don't use the
  // `useNumberField` hook since the `value` will be set back to the empty
  // string on invalid numbers.
  const prevValue = $(value)
  useEffect(() => {
    if (prevValue() !== value && typeof value === "string") {
      prevValue(value)
      valued(value.length > 0)
    }
  })

  return {
    valued: valued(),
    focused: focused(),
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
  }
}
