import cn from "classnames"
import { bem } from "@react-md/utils"

export interface FontIconProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * The font icon class name to use.
   */
  iconClassName?: string

  /**
   * Boolean if the font icon should use the dense spec.
   */
  dense?: boolean

  /**
   * Any children to render to create the font icon. This is required for
   * material-icons.
   */
  children?: JSX.Children

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a
   * number of the size to enforce. This is useful when using other font icon
   * libraries that do not have a consistent size.
   */
  forceSize?: boolean

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead
   * of only `width` and `height`.
   */
  forceFontSize?: boolean
}

const block = bem("rmd-icon")

/**
 * The `FontIcon` component is used for rendering a font-icon library's icon.
 * The default is to use the `material-icons` library, but others can be used as
 * well.
 *
 * If you are using another font icon library that does not always create icons
 * with a perfect 1:1 scale (such as font awesome), it is recommended to use the
 * `forceSize` and `forceFontSize` props to fix the sizing issues.
 */
export const FontIcon = (
  {
    className,
    children,
    "aria-hidden": ariaHidden = true,
    dense = false,
    iconClassName = "material-icons",
    forceSize = false,
    forceFontSize = false,
    ref,
    ...props
  }: FontIconProps & { "aria-hidden"?: boolean }) => <i
    {...props}
    aria-hidden={ariaHidden}
    ref={ref}
    className={cn(block({ font: true, dense, "forced-font": forceFontSize, "forced-size": forceSize, }) as any, iconClassName, className)}
  >
    {children}
  </i>
