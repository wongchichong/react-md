import { Observable, $$ } from 'voby'
import { $ } from 'voby'
import { withinRange } from "@react-md/utils"

import type {
  ProvidedTextFieldMessageProps,
  ProvidedTextFieldProps,
  TextFieldHookOptions,
} from "./useTextField"
import { useTextField } from "./useTextField"

/**
 * @remarks \@since 2.5.0
 */
export interface NumberFieldConstraints {
  /**
   * An optional min value for the number field.
   */
  min?: FunctionMaybe<Nullable<number>>

  /**
   * An optional max value for the number field.
   */
  max?: FunctionMaybe<Nullable<number>>

  /**
   * An optional step amount to use.
   *
   * Note: The `min` and `max` values must be divisible by this value when any
   * are defined.
   */
  step?: FunctionMaybe<Nullable<number>>
}

/**
 * @remarks \@since 2.5.0
 */
export interface ProvidedNumberFieldProps
  extends NumberFieldConstraints,
  ProvidedTextFieldProps {
  /**
   * Always set the `TextField` type to `number`.
   */
  type: "number"
}

/**
 * This is how the value within the text field should be "fixed" on blur. By
 * default, the value will not be fixed and continue to display an error if
 * there is an error.
 *
 * If this is set to `true`, the value will be updated to be within the `min`
 * and `max` values. Otherwise, setting this to `min` will only fix the minimum
 * value while `max` will only fix the maximum.
 *
 * @remarks \@since 2.5.0
 */
export type FixNumberOnBlur = boolean | "min" | "max"

/**
 * @remarks \@since 2.5.0
 */
export interface ProvidedNumberFieldMessageProps
  extends ProvidedNumberFieldProps,
  Pick<ProvidedTextFieldMessageProps, "messageProps"> { }

/**
 * @remarks \@since 2.5.0
 */
export interface NumberFieldHookOptions
  extends Omit<TextFieldHookOptions, "defaultValue">,
  NumberFieldConstraints {
  /**
   * The default **number** value to use which can be a `number` or `undefined`.
   * When this value is set to a `number` (or a function that returns a
   * `number`), the returned value will never be `undefined`.
   */
  defaultValue?: FunctionMaybe<Nullable<number>> | (() => number | undefined)

  /**
   * @see {@link FixNumberOnBlur}
   */
  fixOnBlur?: FixNumberOnBlur

  /**
   * Boolean if the `number` value should be updated as the user types instead
   * of only once the text field has been blurred.
   */
  updateOnChange?: FunctionMaybe<Nullable<boolean>>
}

/**
 * @remarks \@since 2.5.0
 */
export interface NumberFieldHookControls {
  /**
   * Resets the `number` value to the `defaultValue` and clears any error
   * states.
   */
  reset(): void
  // setNumber: Dispatch<SetStateAction<number | undefined>>;
  number?: Observable<number | undefined>
}

/**
 * An ordered list containing:
 * - the current `number` value of the field which will be updated based on the
 *   {@link NumberFieldHookOptions.updateOnChange} option
 *
 * @remarks \@since 2.5.0
 */
export type NumberFieldHookReturnType = [
  number | undefined,
  ProvidedNumberFieldProps | ProvidedNumberFieldMessageProps,
  NumberFieldHookControls
]

// all the overloads for the `useNumberField` -- not sure if there's an easier
// way to type these...

/**
 * This hook is used to control the value for the `TextField` component acting
 * as an `<input type="number">` and ensuring that a "valid" `number` is
 * available. There is also built-in support for using the validity
 * api/constraint validation so that real-time errors can be presented to the
 * user as they type along with the `FormMessage` component.
 *
 * Simple example:
 *
 * ```tsx
 * const [value, fieldProps] = useNumberField({
 *   id: 'field-id',
 *   min: 0,
 *   max: 10,
 *   defaultValue: 0,
 *   disableMessage: true,
 * });
 *
 * return <TextField {...fieldProps} label="Label" placeholder="0" />;
 * ```
 *
 * Step example and messaging:
 *
 * ```tsx
 * const [value, fieldProps] = useNumberField({
 *   id: 'field-id',
 *   min: 0,
 *   max: 10,
 *   step: 2,
 *   defaultValue: 0,
 * });
 *
 * return <TextFieldWithMessage {...fieldProps} label="Label" placeholder="0" />;
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * @see {@link useTextField}
 * @param options - All the options used to control the functionality of this
 * hook.
 * @returns @see {@link NumberFieldHookReturnType}
 * @remarks \@since 2.5.0
 */
export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: number | (() => number)
    disableMessage: true
  }
): [number, ProvidedNumberFieldProps, NumberFieldHookControls]
export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: number | (() => number)
    disableMessage: false
  }
): [number, ProvidedNumberFieldMessageProps, NumberFieldHookControls]
export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: number | (() => number)
    disableMessage?: FunctionMaybe<Nullable<boolean>>
  }
): [number, ProvidedNumberFieldMessageProps, NumberFieldHookControls]

export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage: true
  }
): [number | undefined, ProvidedNumberFieldProps, NumberFieldHookControls]
export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage: false
  }
): [
    number | undefined,
    ProvidedNumberFieldMessageProps,
    NumberFieldHookControls
  ]
export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage?: FunctionMaybe<Nullable<boolean>>
  }
): [
    number | undefined,
    ProvidedNumberFieldMessageProps,
    NumberFieldHookControls
  ]
export function useNumberField({
  id,
  defaultValue,
  theme,
  pattern,
  required,
  minLength,
  maxLength,
  disableMaxLength = false,
  onBlur,
  onChange,
  helpText,
  errorIcon,
  counter = false,
  disableMessage = false,
  validateOnChange = "number-recommended",
  isErrored,
  onErrorChange,
  getErrorIcon,
  getErrorMessage,
  min: mn,
  max: mx,
  step,
  fixOnBlur = true,
  updateOnChange = true,
}: NumberFieldHookOptions): NumberFieldHookReturnType {
  const number = $($$(defaultValue))
  const initial = $(number())
  const min = $$(mn), max = $$(mx)

  const handleBlur = $((event: JSX.TargetedFocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      //@ts-ignore
      onBlur(event)
    }

    //@ts-ignore
    if (event.isPropagationStopped()) {
      return
    }

    const input = event.currentTarget
    //@ts-ignore
    input.setCustomValidity("")
    //@ts-ignore
    input.checkValidity()
    if (
      !fixOnBlur ||
      // do nothing else since it's a weird value like: `"--0"` which causes
      // the value to be `""` and `numberAsValue` to be `NaN`
      //@ts-ignore
      input.validity.badInput || (input.validity.rangeUnderflow && fixOnBlur === "max") || (input.validity.rangeOverflow && fixOnBlur === "min")
    ) {
      return
    }

    //@ts-ignore
    let value = input.valueAsNumber
    //@ts-ignore
    if (input.value === "" && typeof initial() === "number") {
      value = min ?? initial()
    }

    // can't have both rangeUnderflow and rangeOverflow at the same time, so
    // it's "safe" to always provide both
    value = withinRange(value, min, max)
    if (!Number.isNaN(value)) {
      number(value)
      //@ts-ignore
      input.value = `${value}`
    } else if (typeof initial() === "undefined") {
      number(undefined)
    }
  })

  //@ts-ignore
  const handleChange = $((event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }

    if (event.isPropagationStopped() || !updateOnChange) {
      return
    }

    const input = event.currentTarget
    input.checkValidity()
    const value = withinRange(event.currentTarget.valueAsNumber, min, max)
    if (
      !input.validity.valid &&
      !input.validity.rangeUnderflow &&
      !input.validity.rangeOverflow
    ) {
      return
    }

    if (!Number.isNaN(value)) {
      number(value)
    } else if (initial(undefined)) {
      number(undefined)
    }
  })

  const [, props, { state }] = useTextField({
    id,
    defaultValue: `${number() ?? ""}`,
    theme,
    pattern,
    required,
    minLength,
    maxLength,
    disableMaxLength,
    onBlur: handleBlur,
    onChange: handleChange,
    helpText,
    errorIcon,
    counter,
    disableMessage,
    validateOnChange,
    isErrored,
    onErrorChange,
    getErrorIcon,
    getErrorMessage,
  })

  const reset = $(() => {
    number(initial())
    state({
      value: `${initial() ?? ""}`,
      error: false,
      errorMessage: "",
    })
  })

  //@ts-ignore
  const updateNumber = $<number | undefined>($$((value) => {
    if (typeof value === "function") {
      number((prevNumber) => {
        const updated = value(prevNumber)
        state((prevState) => ({
          ...prevState,
          value: `${updated ?? ""}`,
        }))

        return updated
      })
      return
    }

    number(value)
    state((prevState) => ({
      ...prevState,
      value: `${value ?? ""}`,
    }))
  }))

  return [
    number(),
    { ...props, min, max, step, type: "number" },
    {
      reset,
      number: updateNumber,
    },
  ]
}
