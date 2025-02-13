import type { ObservableMaybe } from 'voby'
import { $, $$ } from 'voby'

import cn from "classnames"
import { bem } from "@react-md/utils"

import { useFormTheme } from "../FormThemeProvider"
import { FloatingLabel } from "../label/FloatingLabel"
import type { TextFieldContainerOptions } from "./TextFieldContainer"
import { TextFieldContainer } from "./TextFieldContainer"
import { useFieldStates } from "../useFieldStates"

/**
 * These are all the "supported" input types for react-md so that they at least
 * render reasonably well by default. There is no built-in validation or
 * anything adding onto existing browser functionality for these types.
 *
 * @remarks \@since 2.5.0 - `"search"` was added
 */
export type SupportedInputTypes =
  | "text"
  | "password"
  | "number"
  | "tel"
  | "email"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "url"
  | "color"
  | "search"

type TextFieldAttributes<T extends EventTarget = HTMLInputElement> = Omit<InputHTMLAttributes<T>, "type">

//@ts-ignore
export interface TextFieldProps<T extends EventTarget = HTMLInputElement>
  extends TextFieldAttributes<T>,
  TextFieldContainerOptions {
  /**
   * The id for the text field. This is required for accessibility.
   */
  id: FunctionMaybe<string>

  /**
   * The value to use for the text field. This will make the component
   * controlled and require the `onChange` prop to be provided as well otherwise
   * this will act as a read only text field.
   */
  value?: FunctionMaybe<Nullable<string>>

  /**
   * The default value for the text field which will make it uncontrolled. If
   * you manually change the `defaultValue` prop, the input's value **will not
   * change** unless you provide a different `key` as well. Use the `value` prop
   * instead for a controlled input.
   */
  defaultValue?: FunctionMaybe<Nullable<string>>

  /**
   * An optional floating label to use for the text field. This should really
   * only be used when the `theme` prop is not set to `"none"`. This will be
   * wrapped in the `<Label>` component itself and automatically apply the
   * `htmlFor` prop for this text field.
   */
  label?: Child

  /**
   * An optional style to apply to the label wrapper.
   */
  labelStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the label wrapper.
   */
  labelClassName?: Class

  /**
   * The type for the text field. `react-md`'s `TextField` supports rendering
   * most of the input types, but will have no built-in validation or additional
   * functionality included.
   */
  type?: FunctionMaybe<Nullable<SupportedInputTypes>>

  /**
   * An optional style to apply to the input itself. The `style` prop will be
   * applied to the container `<div>` instead.
   */
  inputStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the input itself. The `className` prop
   * will be applied to the container `<div>` instead.
   */
  inputClassName?: Class

  /**
   * An optional ref to apply to the text field's container div element. The
   * default ref is forwarded on to the `input` element.
   */
  containerRef?: ObservableMaybe<HTMLDivElement>

  /**
   * Any additional html attributes that should be applied to the main container
   * div. This is probably only going to be used internally so that additional
   * accessibility can be added to text fields for more complex widgets.
   */
  containerProps?: Omit<HTMLAttributes<HTMLDivElement>, "style" | "className">
}

const block = bem("rmd-text-field")

const SPECIAL_TYPES: readonly SupportedInputTypes[] = [
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "color",
]

/**
 * The text field is a wrapper of the `<input type="text" />` component with
 * some nice default themes. It can also be used to render other text input
 * types with _some_ support.
 */
export const TextField = (
  {
    style,
    className,
    inputStyle,
    inputClassName,
    label,
    labelStyle,
    labelClassName,
    type = "text",
    theme: propTheme,
    dense = false,
    inline = false,
    error = false,
    stretch = false,
    disabled = false,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    containerRef,
    isLeftAddon = true,
    isRightAddon = true,
    leftChildren,
    rightChildren,
    underlineDirection: propUnderlineDirection,
    containerProps,
    ref,
    ...props
  }: TextFieldProps
) => {
  const { id, value, defaultValue } = props
  const { valued, focused, onBlur, onFocus, onChange } = useFieldStates({
    //@ts-ignore
    onBlur: propOnBlur,
    //@ts-ignore
    onFocus: propOnFocus,
    //@ts-ignore
    onChange: propOnChange,
    value,
    defaultValue,
  })

  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  })

  return (
    <TextFieldContainer
      {...containerProps}
      style={style}
      className={className}
      //@ts-ignore
      ref={containerRef}
      theme={theme}
      error={error}
      active={focused}
      label={!!label}
      dense={dense}
      inline={inline}
      stretch={stretch}
      disabled={disabled}
      isLeftAddon={isLeftAddon}
      isRightAddon={isRightAddon}
      leftChildren={leftChildren}
      rightChildren={rightChildren}
      underlineDirection={underlineDirection}
    >
      {/* @ts-ignore */}
      <FloatingLabel
        //@ts-ignore
        style={labelStyle}
        className={labelClassName}
        htmlFor={id}
        error={error}
        active={focused}
        floating={focused || valued || SPECIAL_TYPES.includes($$(type))}
        valued={valued}
        dense={dense}
        disabled={disabled}
      >
        {label}
      </FloatingLabel>
      {/* @ts-ignore */}
      <input
        {...props}
        ref={ref}
        type={type}
        disabled={disabled}
        //@ts-ignore
        onFocus={onFocus}
        //@ts-ignore
        onBlur={onBlur}
        //@ts-ignore
        onChange={onChange}
        //@ts-ignore
        style={inputStyle}
        className={[
          block({
            floating: label && theme !== "none",
          }),
          inputClassName
        ]}
      />
    </TextFieldContainer>
  )
}
