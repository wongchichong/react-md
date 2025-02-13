
import { useIcon } from "@react-md/icon"

import type { IndeterminateCheckboxProps } from "../toggle/Checkbox"
import type { BaseMenuItemInputToggleProps } from "./MenuItemInputToggle"
import { MenuItemInputToggle } from "./MenuItemInputToggle"

/** @remarks \@since 2.8.0 */
export interface MenuItemCheckboxProps
  extends BaseMenuItemInputToggleProps,
  IndeterminateCheckboxProps { }

/**
 * This is a simple wrapper for the {@link MenuItemInputToggle} component to
 * render it as a checkbox and pulling the checkbox icon from the
 * {@link IconProvider}.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { DropdownMenu } from "@react-md/menu";
 * import { MenuItemCheckbox } from "@react-md/form";
 *
 * function Example(): Child {
 *   const [checked, setChecked] = useState(false);
 *
 *   return (
 *     <DropdownMenu id="dropdown-menu-id" buttonChildren="Button">
 *       <MenuItemCheckbox
 *         id="checkbox-1"
 *         checked={checked}
 *         onCheckedChange={(nextChecked) => setChecked(nextChecked)}
 *       >
 *         Checkbox
 *      </MenuItemCheckbox>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 */
export const MenuItemCheckbox = ({ icon: propIcon, ref, ...props }: MenuItemCheckboxProps) => {
  const icon = useIcon("checkbox", propIcon)
  return (
    <MenuItemInputToggle {...props} ref={ref} icon={icon} type="checkbox" />
  )
}
