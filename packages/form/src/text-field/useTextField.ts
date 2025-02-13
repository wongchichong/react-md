import {
    Observable,
    $$,
} from 'voby'
import { $ } from 'voby'
import { useIcon } from "@react-md/icon"

import type {
    FormMessageInputLengthCounterProps,
    FormMessageProps,
} from "../FormMessage"
import type { GetErrorIcon } from "./getErrorIcon"
import { defaultGetErrorIcon } from "./getErrorIcon"
import type {
    ChangeValidationBehavior,
    ErrorMessageOptions,
    GetErrorMessage,
    TextConstraints,
} from "./getErrorMessage"
import { defaultGetErrorMessage } from "./getErrorMessage"
import type { IsErrored } from "./isErrored"
import { defaultIsErrored } from "./isErrored"
import type { TextFieldProps } from "./TextField"

const noop = (): void => {
    // do nothing
}

/**
 * @remarks \@since 2.5.0
 */
export type TextFieldChangeHandlers<T extends HTMLInputElement | HTMLTextAreaElement> = Pick<HTMLAttributes<T>, "onBlur" | "onChange">

/**
 * A function that reports the error state changing. A good use-case for this is
 * to keep track of all the errors within your form and keep a submit button
 * disabled until they have been resolved.
 *
 * Example:
 *
 * ```ts
 * const [errors, setErrors] = useState<Record<string, boolean | undefined>>({});
 * const onErrorChange: ErrorChangeHandler = (id, error) =>
 *   setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
 *
 * const invalid = Object.values(errors).some(Boolean);
 *
 * // form implementation is left as an exercise for the reader
 * <Button type="submit" disabled={invalid} onClick={submitForm}>Submit</Button>
 * ```
 *
 * @remarks \@since 2.5.0
 */
export type ErrorChangeHandler = (id: string, error: boolean) => void

/**
 * @remarks \@since 2.5.0
 */
export interface TextFieldHookOptions
    extends TextConstraints,
    TextFieldChangeHandlers<HTMLInputElement | HTMLTextAreaElement>,
    Pick<TextFieldProps, "id" | "theme"> {
    /**
     * Boolean if the `FormMessage` should also display a counter for the
     * remaining letters allowed based on the `maxLength`.
     *
     * This will still be considered false if the `maxLength` value is not
     * provided.
     */
    counter?: FunctionMaybe<Nullable<boolean>>

    /**
     * The default value to use for the `TextField` or `TextArea` one initial
     * render. If you want to manually change the value to something else after
     * the initial render, either change the `key` for the component containing
     * this hook, or use the `setState` function returned from this hook.
     */
    defaultValue?: FunctionMaybe<Nullable<string>> | (() => string)

    /**
     * An optional help text to display in the `FormMessage` component when there
     * is not an error.
     */
    helpText?: Child

    /**
     * A function used to determine if the `TextField` or `TextArea` is an in
     * errored state. See {@link defaultIsErrored} for the default implementation
     * details.
     */
    isErrored?: IsErrored

    /**
     * An optional error icon used in the {@link getErrorIcon} option.
     */
    errorIcon?: Child

    /**
     * A function used to get the error icon to display at the right of the
     * `TextField` or `TextArea`. The default behavior will only show an icon when
     * the `error` state is `true` and an `errorIcon` option has been provided.
     */
    getErrorIcon?: GetErrorIcon

    /**
     * A function to get and display an error message based on the `TextField` or
     * `TextArea` validity. See {@link defaultGetErrorMessage} for the default
     * implementation details.
     */
    getErrorMessage?: GetErrorMessage

    /**
     * An optional function that will be called whenever the `error` state is
     * changed. This can be used for more complex forms to `disable` the Submit
     * button or anything else if any field has an error.
     */
    onErrorChange?: ErrorChangeHandler

    /**
     * Describes the validation behavior that should be done when the value within
     * the `TextField` changes. This can either be:
     *
     * - a boolean
     * - the string `"recommended"`
     * - a single key of the ValidityState that should trigger the validation
     * - a list of keys of the ValidityState that should trigger the validation
     */
    validateOnChange?: ChangeValidationBehavior

    /**
     * Boolean if the `TextField` or `TextArea` will **not** be rendered along
     * with a `FormMessage` component. This will prevent the `aria-describedby`
     * prop from being returned when set to `true`.
     */
    disableMessage?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the `maxLength` prop should not be passed to the `TextField`
     * component since it will prevent any additional characters from being
     * entered in the text field which might feel like weird behavior to some
     * users. This should really only be used when the `counter` option is also
     * enabled and rendering along with a `FormMessage` component.
     */
    disableMaxLength?: FunctionMaybe<Nullable<boolean>>
}

/**
 * All the props that will be generated and return from the `useTextField` hook
 * that should be passed to a `FormMessage` component.
 *
 * @remarks \@since 2.5.0
 */
export interface ProvidedFormMessageProps
    extends Pick<FormMessageProps, "id" | "theme" | "children">,
    Required<Pick<TextFieldProps, "error">>,
    Partial<Pick<FormMessageInputLengthCounterProps, "length" | "maxLength">> { }

/**
 * All the props that will be generated and returned by the `useTextField` hook
 * that should be passed to a `TextField` component.
 *
 * @remarks \@since 2.5.0
 */
export interface ProvidedTextFieldProps
    extends TextConstraints,
    Required<TextFieldChangeHandlers<HTMLInputElement | HTMLTextAreaElement>>,
    Required<Pick<TextFieldProps, "id" | "value" | "error">>,
    //@ts-ignore
    Pick<TextFieldProps, "aria-describedby" | "theme" | "rightChildren"> { }

/**
 * @remarks \@since 2.5.0
 */
export interface ProvidedTextFieldMessageProps extends ProvidedTextFieldProps {
    /**
     * These props will be defined as long as the `disableMessage` prop is not
     * `true` from the `useTextField` hook.
     */
    messageProps: ProvidedFormMessageProps
}

/**
 * @remarks \@since 2.5.0
 */
export interface TextFieldHookState {
    /**
     * The current value for the `TextField` or `TextArea`.
     */
    value: string

    /**
     * Boolean if the `TextField` or `TextArea` are in an errored state.
     *
     * Note: This can be `true` while the `errorMessage` is an empty string since
     * it's sometimes useful to show there's an error while the user is typing
     * without reporting the full error message.
     */
    error: boolean

    /**
     * The current error message that will be an empty string when there are no
     * errors for the `TextField` or `TextArea` component or the message is hidden
     * during change events.
     */
    errorMessage: string
}

/**
 * @remarks \@since 2.5.0
 */
export interface TextFieldHookControls {
    /**
     * Resets the state back to:
     * ```ts
     * {
     *   value: "",
     *   error: false,
     *   errorMessage: "",
     * }
     * ```
     */
    reset(): void
    state: Observable<TextFieldHookState>
}

/**
 * @remarks \@since 2.5.0
 */
export type TextFieldHookReturnType = [
    string,
    ProvidedTextFieldProps | ProvidedTextFieldMessageProps,
    TextFieldHookControls
]

/**
 * This hook is used to control the `value` for a `TextField` or `TextArea`
 * component along with some simple validation checks using the browser validity
 * api/constraint validation. This also provides props that can be passed to the
 * `FormMessage` component to display error messages or help text.
 *
 * Note: Even though this hook exists, it is highly recommended to use a form
 * helper library like [react-hook-form](https://react-hook-form.com/) for more
 * complex forms
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * @param options - All the options used to control the functionality of this
 * hook.
 * @returns @see {@link TextFieldHookReturnType}
 * @remarks \@since 2.5.0
 */
export function useTextField(
    options: TextFieldHookOptions & { disableMessage: true }
): [string, ProvidedTextFieldProps, TextFieldHookControls]
export function useTextField(
    options: TextFieldHookOptions & { disableMessage: false }
): [string, ProvidedTextFieldMessageProps, TextFieldHookControls]
export function useTextField(
    options: TextFieldHookOptions & { disableMessage?: FunctionMaybe<Nullable<boolean>> }
): [string, ProvidedTextFieldMessageProps, TextFieldHookControls]
export function useTextField({
    id: id_,
    defaultValue = "",
    theme,
    pattern,
    required,
    minLength,
    maxLength,
    disableMaxLength = false,
    onBlur,
    onChange,
    helpText,
    errorIcon: propErrorIcon,
    counter = false,
    disableMessage = false,
    validateOnChange = "recommended",
    isErrored = defaultIsErrored,
    onErrorChange = noop,
    getErrorIcon = defaultGetErrorIcon,
    getErrorMessage = defaultGetErrorMessage,
}: TextFieldHookOptions): TextFieldHookReturnType {
    const id = $$(id_)

    const state = $<TextFieldHookState>($$(() => {
        const value =
            typeof defaultValue === "function" ? defaultValue() : defaultValue

        return {
            value,
            error: false,
            errorMessage: "",
        }
    }))
    const { value, error, errorMessage } = state()
    const errored = $(false)
    const fieldRef = $<HTMLInputElement | HTMLTextAreaElement | null>(null)

    const messageId = `${id}-message`
    const isCounting = counter && typeof maxLength === "number"
    const reset = $(() => {
        /* istanbul ignore next */
        if (fieldRef()) {
            fieldRef().setCustomValidity
        }

        state({
            value: "",
            error: false,
            errorMessage: "",
        })
    })

    const updateState = (field: HTMLInputElement | HTMLTextAreaElement, isBlurEvent: boolean) => {
        fieldRef(field)

        // need to temporarily set the `maxLength` back so it can be "verified"
        // through the validity api
        /* istanbul ignore next */
        if (isBlurEvent && disableMaxLength && typeof maxLength === "number") {
            field.maxLength = maxLength
        }

        const { value } = field
        field.setCustomValidity("")
        field.checkValidity()

        // remove the temporarily set `maxLength` attribute after checking the
        // validity
        /* istanbul ignore next */
        if (disableMaxLength && typeof maxLength === "number") {
            field.removeAttribute("maxLength")
        }

        const options: ErrorMessageOptions = {
            value,
            pattern,
            required,
            minLength,
            maxLength,
            isBlurEvent,
            validity: field.validity,
            validationMessage: field.validationMessage,
            validateOnChange,
        }
        const errorMessage = getErrorMessage(options)
        const error = isErrored({ ...options, errorMessage })

        if (errored(error)) {
            errored(error)
            onErrorChange(id, error)
        }

        /* istanbul ignore next */
        if (errorMessage !== field.validationMessage) {
            field.setCustomValidity(errorMessage)
        }

        state({ value, error, errorMessage })
    }

    const handleBlur = (event: JSX.TargetedFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onBlur) {
            //@ts-ignore
            onBlur(event)
        }

        //@ts-ignore
        if (event.isPropagationStopped()) {
            return
        }

        //@ts-ignore
        updateState(event.currentTarget, true)
    }
    //@ts-ignore
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(event)
        }

        if (event.isPropagationStopped()) {
            return
        }

        if (
            !validateOnChange ||
            (Array.isArray(validateOnChange) && !validateOnChange.length)
        ) {
            state((prevState) => ({
                ...prevState,
                value: event.currentTarget.value,
            }))
            return
        }

        updateState(event.currentTarget, false)
    }

    const errorIcon = useIcon("error", propErrorIcon)
    //@ts-ignore
    const props: ProvidedTextFieldProps & { messageProps?: ProvidedFormMessageProps } = {
        id,
        value,
        theme,
        error,
        required,
        pattern,
        minLength,
        maxLength: disableMaxLength ? undefined : maxLength,
        rightChildren: getErrorIcon(errorMessage, error, errorIcon),
        onBlur: handleBlur,
        onChange: handleChange,
    }
    if (!disableMessage) {
        props["aria-describedby"] = messageId
        props.messageProps = {
            id: messageId,
            error,
            theme: $$(theme),
            length: counter ? value.length : undefined,
            maxLength: isCounting ? maxLength : undefined,
            children: errorMessage || helpText,
        }
    }

    return [
        value,
        props,
        {
            reset,
            state,
        },
    ]
}
