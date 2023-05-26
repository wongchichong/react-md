import type { CSSProperties } from 'voby'


import { bem } from "@react-md/utils"

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * The legend to display. This is required since a fieldset loses most of its'
   * benefit for accessibility without a legend.
   */
  legend: Child

  /**
   * An optional style to apply to the legend element.
   */
  legendStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional classname to apply to the legend.
   */
  legendClassName?: Class

  /**
   * Boolean if the legend should only be styled to be visible for screen
   * readers.
   */
  legendSROnly?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the fieldset should remove the default browser styles of margin,
   * padding, and border.
   */
  unstyled?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-fieldset")

/**
 * This is a simple wrapper for the `<fieldset>` that defaults to removing
 * the default styles of a border, padding, and margin and having a screen-reader
 * visible only legend element for added accessibility.
 */
export const Fieldset = (
  {
    className,
    legend,
    legendStyle,
    legendClassName,
    legendSROnly = false,
    unstyled = true,
    children,
    ref,
    ...props
  }: FieldsetProps
) => {
  return (
    <fieldset
      {...props}
      ref={ref}
      className={[block({ unstyled }), className]}
    >
      {/* @ts-ignore */}
      <legend
        style={legendStyle as any}
        className={[
          block("legend", { "sr-only": legendSROnly }),
          legendClassName
        ]}
      >
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}

