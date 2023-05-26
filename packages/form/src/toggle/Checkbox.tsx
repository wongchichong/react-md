;
import { useIcon } from "@react-md/icon"

import type { InputToggleProps } from "./InputToggle"
import { InputToggle } from "./InputToggle"

/** @remarks \@since 2.8.5 */
export interface IndeterminateCheckboxProps {
  /**
   * If the indeterminate prop is enabled, the this prop must be a
   * space-delimited string of **all** the checkboxes that it controls.
   */
  "aria-controls"?: FunctionMaybe<Nullable<string>>

  /**
   * Boolean if the checkbox can have an indeterminate state. This is used when
   * there is a checkbox group where a single checkbox and select/deselect all
   * related checkboxes. This should be enabled when not all the related
   * checkboxes have been checked.
   */
  indeterminate?: FunctionMaybe<Nullable<boolean>>
}

export interface CheckboxProps
  extends InputToggleProps,
  IndeterminateCheckboxProps { }

/**
 * The `Checkbox` component is just a wrapper for the `InputToggle` that
 * defaults to reasonable defaults for a checkbox input.
 */
export const Checkbox = ({ icon: propIcon, indeterminate = false, ref, ...props }: CheckboxProps) => {
  const icon = useIcon("checkbox", propIcon)

  return (
    <InputToggle
      {...props}
      icon={icon}
      ref={ref}
      type="checkbox"
      indeterminate={indeterminate}
    />
  )
}
