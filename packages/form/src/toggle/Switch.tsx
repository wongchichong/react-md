import { TextIconSpacing } from "@react-md/icon"

import { Label } from "../label/Label"
import { ToggleContainer } from "./ToggleContainer"
import { SwitchTrack } from "./SwitchTrack"

//@ts-ignore
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "readOnly"> {
  /**
   * The id for the radio or checkbox. This is required for a11y and will be
   * used as the `for` attribute if the `label` prop is provided.
   */
  id: string

  /**
   * An optional style to apply to the switch's ball.
   */
  ballStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the switch's ball.
   */
  ballClassName?: Class

  /**
   * An optional style to apply to the switch's track (this is the
   * `<input type="checkbox">` used behind the scenes).
   */
  trackStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the switch's track (this is the
   * `<input type="checkbox">` used behind the scenes).
   */
  trackClassName?: Class

  /**
   * Boolean if the input toggle is currently errored. This will update the
   * label and the input to gain error colors.
   */
  error?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the container element should be rendered as `inline-flex`
   * instead of `flex`.
   */
  inline?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the label should be stacked above/below the input toggle instead
   * of inline.
   */
  stacked?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional label to display with the input. If this prop is omitted and
   * you aren't adding a custom `<label>` anywhere else, you **should** apply an
   * `aria-label` or `aria-labelledby` for a11y.
   */
  label?: Child

  /**
   * An optional style to apply to the `<label>` when the `label` prop is used.
   */
  labelStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the `<label>` when the `label` prop is
   * used.
   */
  labelClassName?: Class

  /**
   * An optional boolean if the label should gain the disabled style. When this
   * is `undefined`, the `disabled` prop will be used instead. This is really
   * just useful when you want to disable the switch from being toggled while
   * some async action is being called, but not changing styles during the wait.
   */
  labelDisabled?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the input toggle should appear after the label instead of
   * before.
   */
  iconAfter?: FunctionMaybe<Nullable<boolean>>

  /**
   * Any optional children that should be displayed within the switch's ball.
   */
  children?: Child
}

export const Switch = (
  {
    style,
    className,
    ballStyle,
    ballClassName,
    trackStyle,
    trackClassName,
    label,
    labelStyle,
    labelClassName,
    labelDisabled,
    error = false,
    disabled = false,
    stacked = false,
    inline = false,
    iconAfter = false,
    children,
    ref,
    ...props
  }: SwitchProps
) => {
  const { id } = props

  return (
    <ToggleContainer
      style={style}
      className={["rmd-switch-container", className]}
      inline={inline}
      stacked={stacked}
    >
      <TextIconSpacing
        icon={
          //@ts-ignore
          <Label
            //@ts-ignore
            style={labelStyle}
            className={labelClassName}
            htmlFor={id}
            error={error}
            disabled={labelDisabled ?? disabled}
          >
            {label}
          </Label>
        }
        iconAfter={!iconAfter}
      >
        {/* @ts-ignore */}
        <SwitchTrack
          {...props}
          ref={ref}
          style={trackStyle as any}
          className={trackClassName}
          disabled={disabled}
          ballStyle={ballStyle}
          ballClassName={ballClassName}
        >
          {children}
        </SwitchTrack>
      </TextIconSpacing>
    </ToggleContainer>
  )
}
