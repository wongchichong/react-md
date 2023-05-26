import type { TextIconSpacingProps } from "@react-md/icon"
import { TextIconSpacing } from "@react-md/icon"
import { bem } from "@react-md/utils"
import { $$ } from "voby"

export type ListItemAddonPosition = "top" | "middle" | "bottom"
export type ListItemAddonType = "icon" | "avatar" | "media" | "large-media"

export interface ListItemAddonProps
  extends Omit<TextIconSpacingProps, "icon" | "iconAfter" | "forceIconWrap"> {
  /**
   * The addon that should be rendered.
   */
  addon: Child

  /**
   * Boolean if the addon should appear after the `children`.
   */
  addonAfter?: FunctionMaybe<Nullable<boolean>>

  /**
   * The addon type that is used to adjust the spacing styles.
   */
  type?: FunctionMaybe<Nullable<ListItemAddonType>>

  /**
   * Boolean if the addon should be forced into a `<span>` with the class names
   * applied instead of attempting to clone into the provided icon. If the
   * `type` is set to `"media"` or `"large-media"`, this will default to `true`.
   */
  forceAddonWrap?: FunctionMaybe<Nullable<boolean>>

  /**
   * The vertical position to use for the addon.
   */
  position?: FunctionMaybe<Nullable<ListItemAddonPosition>>
}

const base = bem("rmd-list-item")

/**
 * The `ListItemAddon` is used to create an addon to the left or right of the
 * text/children of a `ListItem`.
 */
export function ListItemAddon({
  className,
  children,
  addon,
  addonAfter = false,
  type = "icon",
  position = "middle",
  forceAddonWrap,
  ...props
}: ListItemAddonProps): Element {
  const isMedia = type === "media" || type === "large-media"
  const isAvatar = type === "avatar"

  return (
    <TextIconSpacing
      {...props}
      icon={addon}
      forceIconWrap={forceAddonWrap ?? isMedia}
      className={[
        base("addon", {
          [$$(position)]: position !== "middle",
          before: !addonAfter,
          "avatar-before": !addonAfter && isAvatar,
          media: isMedia,
          "media-large": type === "large-media",
        }),
        className
      ]}
      iconAfter={addonAfter}
    >
      {children}
    </TextIconSpacing>
  )
}
