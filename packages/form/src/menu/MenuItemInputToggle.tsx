import type { } from 'voby'


import { useIcon } from "@react-md/icon"
import type {
  ListItemAddonPosition,
  ListItemAddonType,
  SimpleListItemProps,
} from "@react-md/list"
import { ListItem } from "@react-md/list"
import { bem, useKeyboardFocusableElement } from "@react-md/utils"

import type { IndeterminateCheckboxProps } from "../toggle/Checkbox"
import { InputToggleIcon } from "../toggle/InputToggleIcon"
import { SwitchTrack } from "../toggle/SwitchTrack"

const styles = bem("rmd-input-toggle-menu-item")

/**
 * @remarks \@since 2.8.0
 * @internal
 */
type AllowedListItemProps = Pick<
  SimpleListItemProps,
  | "disabledOpacity"
  | "threeLines"
  | "height"
  | "children"
  | "textChildren"
  | "textClassName"
  | "primaryText"
  | "secondaryText"
  | "secondaryTextClassName"
  | "forceAddonWrap"
>

/** @remarks \@since 2.8.0 */
//@ts-ignore
export interface BaseMenuItemInputToggleProps
  extends HTMLAttributes<HTMLLIElement>,
  AllowedListItemProps {
  /**
   * An id required for a11y.
   */
  id: string

  /**
   * Boolean if the element should be disabled.
   */
  disabled?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the element is currently checked.
   */
  checked: boolean

  /**
   * A function to call that should updated the `checked` state to the new
   * value.
   */
  onCheckedChange(checked: boolean, event: JSX.TargetedMouseEvent<HTMLLIElement>): void

  /**
   * The icon will default to:
   * - {@link ConfigurableIcons.radio} when the `type` is set to `"radio"`
   * - {@link ConfigurableIcons.checkbox} when the `type` is set to `"checkbox"`
   * - {@link SwitchTrack} when the `type` is set to `"switch"`
   *
   * If this behavior isn't preferred, you can provide your own icon with this
   * prop.
   */
  icon?: Child

  /**
   * Boolean if the `icon` prop should appear as the `rightAddon` instead of the
   * `leftAddon` for the `ListItem`
   */
  iconAfter?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional {@link ListItem} addon to display on the opposite side of the
   * `icon`. So if the `iconAfter` prop is `false`, the `addon` will appear to
   * the `right` while setting `iconAfter` to `true` will render the `addon` to
   * the `left` instead.
   */
  addon?: Child

  /**
   * The {@link ListItemAddonType} for the `addon`.
   */
  addonType?: ListItemAddonType

  /**
   * The {@link ListItemAddonPosition} for the `addon`.
   */
  addonPosition?: ListItemAddonPosition
}

/** @remarks \@since 2.8.0 */
export interface MenuItemInputToggleProps extends BaseMenuItemInputToggleProps {
  /**
   * The input toggle type to render.
   *
   * Note for the `radio` type:
   * If a `menu` or `menubar` contains more than one group of `menuitemradio`
   * elements, or if the `menu` contains one group and other, unrelated menu
   * items, authors **SHOULD** nest each set of related `menuitemradio` elements
   * in an element using the `group` role, and authors **SHOULD** delimit the
   * group from other menu items with an element using the separator role.
   *
   * @see {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio}
   */
  type: "checkbox" | "radio" | "switch"
}

/** @remarks \@since 2.8.5 */
export type StrictMenuItemInputToggleProps = BaseMenuItemInputToggleProps &
  (
    | ({ type: "checkbox" } & IndeterminateCheckboxProps)
    | { type: "radio" | "switch"; indeterminate?: never }
  )

/**
 * This is a low-level component that should probably not be used externally and
 * instead the `MenuItemCheckbox`, `MenuItemRadio`, or `MenuItemSwitch` should
 * be used instead.
 *
 * @see {@link MenuItemCheckbox} for checkbox examples
 * @see {@link MenuItemRadio} for radio examples
 * @see {@link MenuItemSwitch} for switch examples
 * @remarks \@since 2.8.0
 */
export const MenuItemInputToggle = (
  {
    children,
    tabIndex = -1,
    checked,
    type,
    icon: propIcon,
    iconAfter = false,
    addon,
    addonType,
    addonPosition,
    onClick,
    onCheckedChange,
    disabled = false,
    className,
    indeterminate = false,
    ref: nodeRef,
    ...props
  }: StrictMenuItemInputToggleProps
) => {
  //@ts-ignore
  const ref = useKeyboardFocusableElement(nodeRef)
  let icon = useIcon(type === "radio" ? "radio" : "checkbox", propIcon)
  if (type === "switch" && typeof propIcon === "undefined") {
    icon = <SwitchTrack checked={checked} />
  } else if (icon && type !== "switch") {
    icon = (
      <span className={["rmd-toggle", styles("toggle")]}>
        <InputToggleIcon
          circle={type === "radio"}
          disabled={disabled}
          overlay
          checked={checked}
          indeterminate={indeterminate}
        >
          {icon}
        </InputToggleIcon>
      </span>
    )
  }

  let leftAddon: Child
  let leftAddonType: ListItemAddonType | undefined
  let leftAddonPosition: ListItemAddonPosition | undefined
  let rightAddon: Child
  let rightAddonType: ListItemAddonType | undefined
  let rightAddonPosition: ListItemAddonPosition | undefined
  if (iconAfter) {
    leftAddon = addon
    leftAddonType = addonType
    leftAddonPosition = addonPosition
    rightAddon = icon
  } else {
    leftAddon = icon
    rightAddon = addon
    rightAddonType = addonType
    rightAddonPosition = addonPosition
  }

  return (
    <ListItem
      {...props}
      disableRipple
      aria-disabled={disabled || undefined}
      aria-checked={checked}
      role={type === "radio" ? "menuitemradio" : "menuitemcheckbox"}
      onClick={(event) => {
        onClick?.(event)
        onCheckedChange(!checked, event)
      }}
      ref={ref}
      className={[styles({ switch: type === "switch" }), className]}
      tabIndex={tabIndex}
      leftAddon={leftAddon}
      leftAddonType={leftAddonType}
      leftAddonPosition={leftAddonPosition}
      rightAddon={rightAddon}
      rightAddonType={rightAddonType}
      rightAddonPosition={rightAddonPosition}
    >
      {children}
    </ListItem>
  )
}
