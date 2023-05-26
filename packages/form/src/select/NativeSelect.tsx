import {
  CSSProperties,
  ObservableMaybe,
  $$,
} from 'voby'

import { useIcon } from "@react-md/icon"
import { bem } from "@react-md/utils"

import { useFormTheme } from "../FormThemeProvider"
import { FloatingLabel } from "../label/FloatingLabel"
import type { TextFieldContainerOptions } from "../text-field/TextFieldContainer"
import { TextFieldContainer } from "../text-field/TextFieldContainer"
import { FormElement, useFieldStates } from "../useFieldStates"

//@ts-ignore
export interface NativeSelectProps<T extends EventTarget = HTMLSelectElement>
  extends SelectHTMLAttributes<T>,
  TextFieldContainerOptions {
  /**
   * The id for the select. This is required for accessibility.
   */
  id: FunctionMaybe<Nullable<string>>

  /**
   * An optional ref to apply to the text field's container div element. The
   * default ref is forwarded on to the `input` element.
   */
  containerRef?: ObservableMaybe<HTMLDivElement>

  /**
   * An optional icon to display to the right of the select. This should
   * normally be a dropdown icon to replace the native select's dropdown icon.
   * If this is set to `null`, the native select's dropdown icon will be
   * displayed instead.
   *
   * This defaults to the `IconProvider`'s dropdown icon from the
   * `@react-md/icon` package.
   */
  icon?: Child

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
   * An optional style to apply to the select itself. The `style` prop will be
   * applied to the container `<div>` instead.
   */
  selectStyle?: FunctionMaybe<string | StyleProperties>

  /**
   * An optional className to apply to the select itself. The `className` prop
   * will be applied to the container `<div>` instead.
   */
  selectClassName?: Class

  /**
   * The value to use for the text field. This will make the component
   * controlled and require the `onChange` prop to be provided as well otherwise
   * this will act as a read only text field.
   *
   * If the `multiple` prop is enabled, this **must** be a list of strings.
   */
  value?: FunctionMaybe<Nullable<string>> | readonly string[]

  /**
   * The default value for the text field which will make it uncontrolled. If
   * you manually change the `defaultValue` prop, the input's value **will not
   * change** unless you provide a different `key` as well. Use the `value` prop
   * instead for a controlled input.
   *
   * If the `multiple` prop is enabled, this **must** be a list of strings.
   */
  defaultValue?: FunctionMaybe<Nullable<string>> | readonly string[]
}

const block = bem("rmd-native-select")
const container = bem("rmd-native-select-container")

/**
 * This component is used to render a native `<select>` element with the text
 * field theme styles. This component is great to use for native behavior and
 * full accessibility.
 */
export const NativeSelect = (
  {
    style,
    className,
    labelStyle,
    labelClassName,
    selectStyle,
    selectClassName,
    icon: propIcon,
    theme: propTheme,
    dense = false,
    inline = false,
    stretch = false,
    error = false,
    disabled = false,
    label,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    containerRef,
    isLeftAddon,
    isRightAddon,
    leftChildren,
    rightChildren,
    underlineDirection: propUnderlineDirection,
    children,
    ref,
    ...props
  }: NativeSelectProps<HTMLSelectElement & TargetedEvent<EventTarget, Event>>
) => {
  const { id, value, defaultValue, multiple } = props
  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  })
  const underline = theme === "underline" || theme === "filled"

  const icon = useIcon("dropdown", propIcon)
  const { valued, focused, onBlur, onFocus, onChange } = useFieldStates<HTMLSelectElement & TargetedEvent<EventTarget, Event>>({
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    //@ts-ignore
    onChange: propOnChange,
    value,
    defaultValue,
  })

  return (
    <TextFieldContainer
      style={style}
      className={[container({
        multi: multiple,
        padded: multiple && label,
      }),
        className
      ]}
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
      rightChildren={multiple && rightChildren}
      underlineDirection={underlineDirection}
    >
      {/* @ts-ignore */}
      <FloatingLabel
        //@ts-ignore
        style={labelStyle}
        className={[block("label"), labelClassName]}
        //@ts-ignore
        htmlFor={id}
        error={error}
        active={valued && focused}
        valued={valued}
        floating={valued || $$(multiple)}
        dense={dense}
        disabled={disabled}
      >
        {label}
      </FloatingLabel>
      {/* @ts-ignore */}
      <select
        {...props}
        //@ts-ignore
        ref={ref}
        style={selectStyle}
        className={[
          block({
            icon,
            multi: multiple,
            "label-underline": label && underline,
            "placeholder-underline": !label && underline,
            floating: label && theme !== "none",
          }),
          selectClassName
        ]}
        disabled={disabled}
        //@ts-ignore
        onFocus={onFocus}
        //@ts-ignore
        onBlur={onBlur}
        //@ts-ignore
        onChange={onChange}
      >
        {children}
      </select>
      {!multiple && icon && <span className={block("icon")}>{icon}</span>}
    </TextFieldContainer>
  )
}
