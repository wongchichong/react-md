import type { ObservableMaybe } from 'voby'
import { $ } from 'voby'
import type { ListElement } from "@react-md/list"
import { List } from "@react-md/list"
import type { BaseSheetProps } from "@react-md/sheet"
import { Sheet } from "@react-md/sheet"
import type {
  KeyboardFocusHookOptions,
  LabelRequiredForA11y,
} from "@react-md/utils"
import { useOnUnmount } from "@react-md/utils"

import { MenuKeyboardFocusProvider } from "./MenuKeyboardFocusProvider"
import { MenuWidget } from "./MenuWidget"
import type { MenuListProps, MenuOrientationProps } from "./types"

/** @remarks \@since 5.0.0 */
export type MenuSheetProps = {
  /** {@inheritDoc MenuConfiguration.sheetHeader} */
  header?: Child
  /** {@inheritDoc MenuConfiguration.sheetFooter} */
  footer?: Child

  /**
   * The `Menu`s children.
   */
  children: Children

  /**
   * This should be the `menuRef` returned by the `useMenu` hook so that the
   * menu can be focused on mount.
   */
  menuRef: ObservableMaybe<HTMLDivElement>

  /**
   * Any additional props that should be passed to the `Menu` component.
   */
  menuProps?: HTMLAttributes<HTMLDivElement>
} & BaseSheetProps &
  KeyboardFocusHookOptions<HTMLDivElement> &
  MenuOrientationProps &
  MenuListProps

/**
 * Implements a `Menu` using the `Sheet` component that probably shouldn't
 * really be used externally.
 *
 * @remarks \@since 5.0.0
 * @internal
 */
export function MenuSheet({
  id,
  children,
  header,
  footer,
  horizontal,
  menuRef,
  menuProps,
  listStyle,
  listClassName,
  listProps,
  position = "bottom",
  verticalSize = "touch",
  onClick,
  overlayProps,
  onRequestClose,
  ...props
}: LabelRequiredForA11y<MenuSheetProps>): Element {
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy } = props
  const listRef = $<ListElement>(null)

  // Since there is the possibility of other tab focusable elements within the
  // sheet and the menu items are programmatically focused, the menu's tabIndex
  // needs to be set to `-1` while one of the child menu items are focused. This
  // allows Shift+Tab correctly focuses the previous focusable element within
  // the sheet. Since `onFocus` and `onBlur` will be bubbled up to the menu
  // widget each time a new MenuItem is focused, only disable the focused state
  // if the blur event is fired without another focus event within an animation
  // frame.
  const focused = $(false)
  const blurredFrame = $(0)
  useOnUnmount(() => {
    window.cancelAnimationFrame(blurredFrame())
  })

  //@ts-ignore
  return <Sheet
    id={`${id}-sheet`}
    {...props}
    onRequestClose={onRequestClose}
    overlayProps={{
      ...overlayProps,
      onClick: (event) => {
        //@ts-ignore
        overlayProps?.onClick?.(event)

        // prevent closing parent menus if the overlay element is clicked.
        event.stopPropagation()
        onRequestClose()
      },
    }}
    position={position}
    verticalSize={verticalSize}
    onClick={(event) => {
      //@ts-ignore
      onClick?.(event)

      // Prevent closing parent sheet/menus if an element in the header or
      // footer is clicked
      if (
        !(event.target instanceof HTMLElement) ||
        !listRef()?.contains(event.target)
      ) {
        event.stopPropagation()
      }
    }}
  >
    {header}
    <MenuKeyboardFocusProvider horizontal={horizontal}>
      {/* @ts-ignore */}
      <MenuWidget
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy as string}
        id={id as any}
        ref={menuRef as any}
        tabIndex={focused ? -1 : 0}
        {...menuProps}
        onFocus={(event) => {
          //@ts-ignore
          menuProps?.onFocus?.(event)
          window.cancelAnimationFrame(blurredFrame())
          focused(true)
        }}
        onBlur={(event) => {
          //@ts-ignore
          menuProps?.onBlur?.(event)
          blurredFrame(window.requestAnimationFrame(() => {
            focused(false)
          }))
        }}
        onKeyDown={(event) => {
          // the tab keypress should use the sheet's behavior instead of
          // closing the menus
          if (event.key === "Tab") {
            return
          }
          //@ts-ignore
          menuProps?.onKeyDown?.(event)
        }}
        disableElevation
      >
        {/* @ts-ignore */}
        <List
          {...listProps}
          //@ts-ignore
          style={listStyle ?? listProps?.style}
          className={listClassName ?? listProps?.className}
          ref={listRef}
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
    {footer}
  </Sheet>
}
