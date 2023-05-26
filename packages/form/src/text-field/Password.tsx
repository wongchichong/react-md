import type { CSSProperties, } from 'voby'
import { $ } from 'voby'

import { Button } from "@react-md/button"
import { useIcon } from "@react-md/icon"
import { bem } from "@react-md/utils"

import type { TextFieldProps } from "./TextField"
import { TextField } from "./TextField"

export interface ConfigurableVisibilityIcon {
  /**
   * The icon to display while the password is currently visible as plain text.
   */
  visible: Child

  /**
   * The icon to display while the password is currently invisible as the
   * password input.
   */
  invisible: Child
}

export type GetVisibilityIcon = (type: "text" | "password") => Child

export interface PasswordProps extends Omit<TextFieldProps, "type"> {
  /**
   * The icon to use to toggle the visibility of the password by changing the
   * input type to text temporarily. This can either be a renderable React node
   * or an object for the `visible` and `invisible` states.
   */
  visibilityIcon?: Child | ConfigurableVisibilityIcon

  /**
   * An optional style to apply to the visibility toggle button.
   */
  visibilityStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional classname to apply to the visibility toggle button.
   */
  visibilityClassName?: Class

  /**
   * An optional `aria-label` to apply to the visibility toggle button.
   *
   * Note: The visibility button is being treated as a [toggle
   * button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) which means
   * that the label **should not change** based on the visibility state and
   * should not include the word "toggle" since it will be redundant.
   */
  visibilityLabel?: FunctionMaybe<Nullable<string>>

  /**
   * Boolean if the visibility toggle feature should be disabled.
   */
  disableVisibility?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional function to return the current icon to display within the
   * visibility toggle button for additional control.
   *
   * Depending on the customization needs, it will probably be easier to just
   * implement your own `Password` component using the native `TextField`.
   */
  getVisibilityIcon?: GetVisibilityIcon

  /**
   * An optional function to call when the visibility button has been clicked.
   * This is only a simple `MouseEventHandler` for the button element.
   *
   * Depending on the customization needs, it will probably be easier to just
   * implement your own `Password` component using the native `TextField`.
   */
  onVisibilityClick?: MouseEventHandler<HTMLButtonElement>
}

const block = bem("rmd-password")

function isConfigurableIcon(icon: Child | ConfigurableVisibilityIcon): icon is ConfigurableVisibilityIcon {
  return !!icon //&& !isValidElement(icon)
}

/**
 * This component is a simple wrapper of the `TextField` that can only be
 * rendered for password inputs. There is built-in functionality to be able to
 * temporarily show the password's value by swapping the `type` to `"text"`.
 */
export const Password = (
  {
    className,
    inputClassName,
    visibilityIcon: propVisibilityIcon,
    visibilityStyle,
    visibilityClassName,
    visibilityLabel = "Show password",
    onVisibilityClick,
    getVisibilityIcon,
    disableVisibility = false,
    rightChildren: propRightChildren,
    isRightAddon = disableVisibility,
    ref,
    ...props
  }: PasswordProps
) => {
  const { id } = props
  const type = $<"password" | "text">("password")
  const toggle = $((event: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    if (onVisibilityClick) {
      //@ts-ignore
      onVisibilityClick(event)
    }

    type((prevType) => (prevType === "password" ? "text" : "password"))
  })

  const visible = type() === "text"
  let visibilityIcon = useIcon("password", propVisibilityIcon as any)
  if (isConfigurableIcon(propVisibilityIcon)) {
    visibilityIcon = visible
      ? propVisibilityIcon.visible
      : propVisibilityIcon.invisible
  }

  let rightChildren: Child = propRightChildren
  if (!disableVisibility) {
    rightChildren = (
      //@ts-ignore
      <Button
        id={`${id}-password-toggle`}
        aria-label={visibilityLabel}
        aria-pressed={visible}
        buttonType="icon"
        onClick={toggle}
        //@ts-ignore
        style={visibilityStyle}
        className={[block("toggle"), visibilityClassName]}
      >
        {typeof getVisibilityIcon === "function"
          //@ts-ignore
          ? getVisibilityIcon(type)
          : visibilityIcon}
      </Button>
    )
  }

  return (
    <TextField
      {...props}
      className={[block({ offset: !disableVisibility }), className]}
      inputClassName={[
        block("input", { offset: !disableVisibility }),
        inputClassName
      ]}
      ref={ref}
      //@ts-ignore
      type={type}
      isRightAddon={isRightAddon}
      rightChildren={rightChildren}
    />
  )
}

