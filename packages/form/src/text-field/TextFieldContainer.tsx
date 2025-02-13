import type { } from 'voby'


import { bem } from "@react-md/utils"

import type { FormThemeOptions } from "../FormThemeProvider"
import { useFormTheme } from "../FormThemeProvider"
import { TextFieldAddon } from "./TextFieldAddon"

export interface TextFieldContainerOptions extends FormThemeOptions {
  /**
   * Boolean if the form components should be using the `dense` spec to reduce
   * the sizing slightly.
   */
  dense?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the component should be rendered inline with
   * `display: inline-flex` instead of `display: flex`.
   */
  inline?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the component should gain `flex: 1 1 auto;` which is useful for
   * full-width behavior within flex containers.
   *
   * @defaultValue `false`
   * @remarks \@since 5.0.0
   */
  stretch?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the text field should gain the error state and update the
   * colors.
   */
  error?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional addon to apply to the left of the text field. This should
   * normally be an icon. This element will not have pointer events so it can be
   * "clicked through" to focus the text field instead.
   */
  leftChildren?: Child

  /**
   * Boolean if the left children should be wrapped in the `TextFieldAddon`
   * component. This is enabled by default since this is _normally_ the behavior
   * that is desired so that icons can be positioned correctly.
   */
  isLeftAddon?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional addon to apply to the right of the text field. This should be a
   * clickable button such as a password field toggle or a reset button for the
   * field.
   */
  rightChildren?: Child

  /**
   * Boolean if the right children should be wrapped in the `TextFieldAddon`
   * component. This is enabled by default since this is _normally_ the behavior
   * that is desired so that icons can be positioned correctly.
   */
  isRightAddon?: FunctionMaybe<Nullable<boolean>>
}

//@ts-ignore
export interface TextFieldContainerProps
  extends TextFieldContainerOptions,
  HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the text field is currently active (focused) to applied the
   * active color to the current theme.
   */
  active?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if there is a floating label with the text field.
   */
  label?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the text field is currently disabled.
   */
  disabled?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-text-field-container")

/**
 * This is a container component that is used to structure the text field with
 * different parts and themes.
 */
export const TextFieldContainer = ({
  className,
  children,
  inline = false,
  theme: propTheme,
  error = false,
  active,
  label,
  dense = false,
  stretch = false,
  disabled = false,
  isLeftAddon = true,
  isRightAddon = true,
  leftChildren,
  rightChildren,
  underlineDirection: propUnderlineDirection,
  ref,
  ...props
}: TextFieldContainerProps & { className?: Class, children: Children, ref: Ref<HTMLDivElement> }
) => {
  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  })

  const underline = theme === "underline"
  const outline = theme === "outline"
  const filled = theme === "filled"
  const isUnderlined = underline || filled
  const isOutlineActive = outline && active

  return (
    <div
      {...props}
      ref={ref}
      className={[
        block({
          error,
          inline,
          stretch,
          filled,
          outline,
          disabled,
          hoverable: !disabled && !isOutlineActive,
          label: label && !dense,
          dense: !label && dense,
          "dense-label": dense && label,
          "dense-placeholder": dense && isUnderlined && !label,
          "outline-active": isOutlineActive,
          "outline-error": outline && error,
          "outline-left": outline && leftChildren,
          "outline-right": outline && rightChildren,
          underline: isUnderlined,
          "underline-labelled": label && isUnderlined,
          "underline-active": isUnderlined && active,
          [`underline-${underlineDirection}`]: isUnderlined,
          "underline-left-addon": isUnderlined && leftChildren,
          "underline-right-addon": isUnderlined && rightChildren,
        }),
        className
      ]}
    >
      {isLeftAddon ? (
        <TextFieldAddon>{leftChildren}</TextFieldAddon>
      ) : (
        leftChildren
      )}
      {children}
      {isRightAddon ? (
        <TextFieldAddon>{rightChildren}</TextFieldAddon>
      ) : (
        rightChildren
      )}
    </div>
  )
}
