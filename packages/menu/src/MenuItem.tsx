

import { ListItem } from "@react-md/list"
import { useKeyboardFocusableElement } from "@react-md/utils"

import type { MenuItemProps } from "./types"

/**
 * This component is used as an "action" within a `Menu`/`DropdownMenu` that
 * implements some keyboard focus behavior. This component should generally have
 * an `onClick` event handler.
 *
 * @remarks \@since 5.0.0
 */
export const MenuItem = ({ className, children, role = "menuitem", tabIndex = -1, ref: nodeRef, ...props }: MenuItemProps) => {
  const ref = useKeyboardFocusableElement(nodeRef as any)
  return (
    <ListItem
      {...props}
      ref={ref}
      //@ts-ignore
      role={role}
      tabIndex={tabIndex}
      className={["rmd-menu-item", className]}
    >
      {children}
    </ListItem>
  )
}

