


import { bem } from "@react-md/utils"

export interface TextFieldAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Boolean if the addon should be presentational only and prevent pointer
   * events.
   */
  presentational?: FunctionMaybe<Nullable<boolean>>
}

const block = bem("rmd-text-field-addon")

/**
 * This component is used to add an an icon before or after the text field with
 * correct styling.
 */
export const TextFieldAddon = ({ children, className, presentational = true, ref, ...props }: TextFieldAddonProps
) => {
  if (!children) {
    return null
  }

  return (
    <span
      {...props}
      ref={ref}
      className={[block({ presentational }), className]}
    >
      {children}
    </span>
  )
}
