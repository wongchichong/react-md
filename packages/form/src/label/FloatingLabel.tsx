

import { bem } from "@react-md/utils"

import type { LabelProps } from "./Label"
import { Label } from "./Label"

export interface FloatingLabelProps extends LabelProps {
  /**
   * Boolean if the text input or textarea currently have a value.
   */
  valued: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if it should use the dense spec.
   */
  dense?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the label is currently floating over the text field.
   */
  floating?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-floating-label")

/**
 * This is an extension of the `Label` component that is used with text fields
 * and textareas to float above the input area.
 */
export const FloatingLabel = (
  {
    className,
    dense,
    valued,
    floating,
    error = false,
    active = false,
    disabled = false,
    ref,
    ...props
  }: FloatingLabelProps
) => {
  return (
    <Label
      {...props}
      ref={ref}
      className={[block({
        dense,
        active: floating,
        inactive: valued && !active && !error && !disabled,
      }),
        className
      ]}
      error={error}
      active={active}
      disabled={disabled}
    />
  )
}
