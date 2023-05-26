import type { } from 'voby'


import { bem } from "@react-md/utils"

/**
 * @remarks \@since 2.8.0
 */
export interface InputToggleIconProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the icon should use circle styles. This should normally be
   * enabled for radio input types.
   */
  circle?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the disabled styles should be applied.
   */
  disabled?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if using an overlay for the different icon states.
   */
  overlay?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the icon should gain the checked state.
   */
  checked?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if using the indeterminate checkbox state.
   */
  indeterminate?: FunctionMaybe<Nullable<boolean>>
}

const styles = bem("rmd-toggle")

/**
 * @remarks \@since 2.8.0
 */
export const InputToggleIcon = (
  {
    circle = false,
    disabled = false,
    overlay = false,
    checked = false,
    indeterminate = false,
    className,
    children,
    ref,
    ...props
  }: InputToggleIconProps,
): Child => {
  return (
    <span
      {...props}
      ref={ref}
      className={[
        styles("icon", {
          circle,
          disabled,
          overlay,
          checked: !indeterminate && checked,
          indeterminate,
          "indeterminate-checked": checked && indeterminate,
        }),
        className
      ]}
    >
      {children}
    </span>
  )
}
