;
import { List } from "@react-md/list"
import { ConditionalPortal } from "@react-md/portal"
import { useScaleTransition } from "@react-md/transition"
import type { LabelA11y, LabelRequiredForA11y } from "@react-md/utils"

import { MenuKeyboardFocusProvider } from "./MenuKeyboardFocusProvider"
import { MenuWidget } from "./MenuWidget"
import type { MenuProps } from "./types"

/**
 * This component conditionally renders the {@link MenuWidget} with the
 * {@link MenuKeyboardFocusProvider} based on the `visible` prop with a CSS
 * transition that can be configured.
 *
 * @remarks \@since 5.0.0
 */
export const Menu = (
  {
    className,
    listStyle,
    listClassName,
    listProps,
    visible,
    temporary = true,
    horizontal = false,
    portal = temporary,
    portalInto,
    portalIntoId,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    timeout,
    classNames,
    children,
    ref,
    ...props
  }: LabelRequiredForA11y<MenuProps & LabelA11y>
) => {
  const { elementProps, rendered, stage } = useScaleTransition({
    nodeRef: ref as any,
    className,
    transitionIn: visible,
    vertical: !horizontal,
    temporary,
    timeout,
    classNames,
    appear,
    enter,
    exit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  })

  return (
    <ConditionalPortal
      portal={portal}
      portalInto={portalInto}
      portalIntoId={portalIntoId}
    >
      {rendered && (
        <MenuKeyboardFocusProvider horizontal={horizontal}>
          {/* @ts-ignore */}
          <MenuWidget
            hidden={!temporary && stage === "exited"}
            {...props}
            {...elementProps}
            horizontal={horizontal}
          >
            {/* @ts-ignore */}
            <List
              {...listProps}
              //@ts-ignore
              style={listStyle ?? listProps?.style}
              className={listClassName ?? listProps?.className}
              horizontal={horizontal}
              onClick={(event) => {
                //@ts-ignore
                listProps?.onClick?.(event)

                // this makes it so you can click on the menu/list without
                // closing the menu
                if (event.target === event.currentTarget) {
                  event.stopPropagation()
                }
              }}
            >
              {children}
            </List>
          </MenuWidget>
        </MenuKeyboardFocusProvider>
      )}
    </ConditionalPortal>
  )
}
