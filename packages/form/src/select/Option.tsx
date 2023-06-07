
import type { SimpleListItemProps } from "@react-md/list"
import { SimpleListItem } from "@react-md/list"
import { bem } from "@react-md/utils"

export interface OptionProps<T extends EventTarget = HTMLLIElement> extends SimpleListItemProps<T> {
  /**
   * Boolean if the option is currently selected via aria-activedescendant
   * movement.
   */
  focused: FunctionMaybe<boolean>

  /**
   * Boolean if the option's value is equal to the current listbox's value if it
   * is acting as a select component.
   */
  selected: FunctionMaybe<boolean>
}

const block = bem("rmd-option")

/**
 * The Option component is a simple wrapper for the `SimpleListItem` that adds
 * some required a11y for behaving as the `option` role.
 */
export const Option = (
  {
    className,
    selected = false,
    focused,
    children,
    textChildren = true,
    ref,
    ...props
  }: OptionProps<HTMLLIElement>
) => {
  return (
    <SimpleListItem
      {...props}
      ref={ref}
      role="option"
      aria-selected={selected || undefined}
      clickable
      className={[
        block({
          selected,
          focused,
        }),
        className
      ]}
      textChildren={textChildren}
    >
      {children}
    </SimpleListItem>
  )
}
