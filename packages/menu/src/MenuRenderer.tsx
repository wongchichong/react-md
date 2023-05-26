import type { ObservableMaybe } from 'voby'
import { useAppSize } from "@react-md/utils"

import { Menu } from "./Menu"
import {
  MenuConfigurationProvider,
  useMenuConfiguration,
} from "./MenuConfigurationProvider"
import { MenuSheet } from "./MenuSheet"
import type {
  BaseMenuRendererProps,
  MenuListProps,
  MenuTransitionProps,
  ProvidedMenuProps,
} from "./types"

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export type MenuRendererProps = ProvidedMenuProps &
  BaseMenuRendererProps &
  MenuListProps &
  MenuTransitionProps & {
    menuRef: ObservableMaybe<HTMLDivElement>
    children: Children
    onRequestClose(): void
  }

/**
 * This component conditionally renders either the `Menu` or `MenuSheet`
 * component based on the current menu configuration.
 *
 * @internal
 * @remarks \@since 5.0.0
 */
export function MenuRenderer({
  menuRef,
  menuProps,
  menuStyle,
  menuClassName,
  sheetProps,
  sheetHeader: propSheetHeader,
  sheetFooter: propSheetFooter,
  sheetStyle,
  sheetClassName,
  sheetMenuProps,
  children,
  horizontal: propHorizontal,
  renderAsSheet: propRenderAsSheet,
  sheetPosition: propSheetPosition,
  sheetVerticalSize: propSheetVerticalSize,
  onRequestClose,
  onClick,
  onKeyDown,
  ...props
}: MenuRendererProps): Element {
  const { isPhone } = useAppSize()
  const {
    horizontal,
    renderAsSheet,
    sheetHeader,
    sheetFooter,
    sheetPosition,
    sheetVerticalSize,
  } = useMenuConfiguration({
    horizontal: propHorizontal,
    renderAsSheet: propRenderAsSheet,
    sheetHeader: propSheetHeader,
    sheetFooter: propSheetFooter,
    sheetPosition: propSheetPosition,
    sheetVerticalSize: propSheetVerticalSize,
  })
  const handlers = {
    onClick,
    onKeyDown,
  }

  const sheet =
    renderAsSheet === true || (renderAsSheet === "phone" && isPhone)
  return (
    <MenuConfigurationProvider
      horizontal={horizontal}
      renderAsSheet={renderAsSheet}
      sheetHeader={sheetHeader}
      sheetFooter={sheetFooter}
      sheetPosition={sheetPosition}
      sheetVerticalSize={sheetVerticalSize}
    >
      {!sheet && (
        <Menu
          {...props}
          {...menuProps}
          {...handlers}
          ref={menuRef as any}
          style={menuStyle as any}
          className={menuClassName}
          horizontal={horizontal}
        >
          {children}
        </Menu>
      )}
      {sheet && (
        /* @ts-ignore */
        <MenuSheet
          {...props}
          {...sheetProps}
          //@ts-ignore
          style={sheetStyle}
          className={sheetClassName}
          horizontal={horizontal}
          onRequestClose={onRequestClose}
          header={sheetHeader}
          footer={sheetFooter}
          menuRef={menuRef}
          menuProps={{ ...sheetMenuProps, ...handlers }}
          position={sheetPosition}
          verticalSize={sheetVerticalSize}
        >
          {children}
        </MenuSheet>
      )}
    </MenuConfigurationProvider>
  )
}
