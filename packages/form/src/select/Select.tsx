import { $$, CSSProperties, } from 'voby'
import { $, useMemo } from 'voby'

import { useIcon } from "@react-md/icon"
import type { ListElement } from "@react-md/list"
import { useFixedPositioning } from "@react-md/transition"
import type { PositionAnchor, PositionWidth } from "@react-md/utils"
import {
  BELOW_CENTER_ANCHOR,
  bem,
  DEFAULT_GET_ITEM_VALUE,
  tryToSubmitRelatedForm,
  useCloseOnOutsideClick,
  useEnsuredRef,
  useToggle,
} from "@react-md/utils"

import { useFormTheme } from "../FormThemeProvider"
import { FloatingLabel } from "../label/FloatingLabel"
import type { TextFieldContainerOptions } from "../text-field/TextFieldContainer"
import { TextFieldContainer } from "../text-field/TextFieldContainer"
import { useFocusState } from "../useFocusState"
import type { ListboxOptions } from "./Listbox"
import { Listbox } from "./Listbox"
import {
  defaultIsOptionDisabled,
  getDisplayLabel as DEFAULT_GET_DISPLAY_LABEL,
  getOptionId as DEFAULT_GET_OPTION_ID,
  getOptionLabel as DEFAULT_GET_OPTION_LABEL,
} from "./utils"

type FakeSelectAttributes = Omit<
  HTMLAttributes<HTMLDivElement>,
  "placeholder" | "children" | "onChange" | "defaultValue" | "value"
>

//@ts-ignore
export interface SelectProps
  extends FakeSelectAttributes,
  TextFieldContainerOptions,
  ListboxOptions {
  /**
   * The id for the select component. This is required for a11y and will be used
   * to generate ids for the listbox and each option within the listbox.
   */
  id: string

  /**
   * Boolean if the select is currently disabled.
   */
  disabled?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional floating label to use with the select.
   */
  label?: Child

  /**
   * An optional style to apply to the label element.
   */
  labelStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the label element.
   */
  labelClassName?: Class

  /**
   * An optional style to apply to the current display value within the
   * `Select`'s button component.
   */
  displayLabelStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the current display value within the
   * `Select`'s button component.
   */
  displayLabelClassName?: Class

  /**
   * An optional style to apply to the listbox.
   */
  listboxStyle?: FunctionMaybe<Nullable<string | StyleProperties>>

  /**
   * An optional className to apply to the listbox.
   */
  listboxClassName?: Class

  /**
   * Boolean if the select should act as a read only select field which just
   * allows for all the options to be visible when toggled open.
   */
  readOnly?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional placeholder text to show while the select is unvalued and is
   * either currently focused or the `label` prop was not provided.
   */
  placeholder?: Child

  /**
   * A function that gets called whenever the Select's value changes so that the
   * selected option can be converted into a renderable element to show in the
   * Select's button. The default behavior is to use the `getOptionLabel`
   * default behavior. If the option is an object and the `disableLeftAddon`
   * prop has not been disabled, it will then attempt to also extract a
   * `leftAddon` from the option and use the `TextIconSpacing` component with
   * the label + icon/avatar.
   */
  getDisplayLabel?: typeof DEFAULT_GET_DISPLAY_LABEL

  /**
   * The positioning configuration for how the listbox should be anchored to the
   * select button.
   */
  anchor?: PositionAnchor

  /**
   * The sizing behavior for the listbox. It will default to have the same width
   * as the select button, but it is also possible to either have the
   * `min-width` be the width of the select button or just automatically
   * determine the width.
   *
   * The sizing behavior will always ensure that the left and right bounds of
   * the listbox appear within the viewport.
   */
  listboxWidth?: PositionWidth

  /**
   * Boolean if the `Select`'s button display value should not attempt to
   * extract a `leftAddon` from the current selected option to display.
   */
  disableLeftAddon?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the select's listbox should not hide if the user resizes the
   * browser while it is visible.
   */
  closeOnResize?: FunctionMaybe<Nullable<boolean>>

  /**
   * Boolean if the select's listbox should not hide if the user scrolls the
   * page while it is visible.
   */
  closeOnScroll?: FunctionMaybe<Nullable<boolean>>

  /**
   * An optional icon to display to the right of the select. This should
   * normally be a dropdown icon to replace the native select's dropdown icon.
   * If this is set to `null`, the native select's dropdown icon will be
   * displayed instead.
   *
   * This defaults to the `IconProvider`'s dropdown icon from the
   * `@react-md/icon` package.
   */
  rightChildren?: Child
}

const block = bem("rmd-select")

/**
 * This component is an accessible version of the `<select>` element that allows
 * for some more custom styles by using the `@react-md/list` package to render
 * the list of options.
 *
 * The `Select` component **must be controlled** with a `value` and `onChange`
 * handler.
 *
 * Note: Since this is not a native `<select>` component, the current value will
 * be rendered in an `<input type="hidden" />` element so that the value can be
 * sent along in forms. It is highly recommended to always provide a `name` prop
 * so this value is sent.
 */
export const Select = (
  {
    onBlur,
    onFocus,
    onKeyDown,
    onClick,
    className,
    label,
    labelStyle,
    labelClassName,
    displayLabelStyle,
    displayLabelClassName,
    listboxStyle: propListboxStyle,
    listboxClassName,
    anchor = BELOW_CENTER_ANCHOR,
    theme: propTheme,
    dense = false,
    inline = false,
    error = false,
    stretch = false,
    disabled = false,
    isLeftAddon = true,
    isRightAddon = true,
    underlineDirection: propUnderlineDirection,
    listboxWidth = "equal",
    portal = true,
    portalInto,
    portalIntoId,
    name,
    options,
    labelKey: lk = "label",
    valueKey: vk = "value",
    getOptionId = DEFAULT_GET_OPTION_ID,
    getOptionLabel = DEFAULT_GET_OPTION_LABEL,
    getOptionValue = DEFAULT_GET_ITEM_VALUE,
    getDisplayLabel = DEFAULT_GET_DISPLAY_LABEL,
    isOptionDisabled = defaultIsOptionDisabled,
    disableLeftAddon = false,
    disableMovementChange = false,
    closeOnResize = false,
    closeOnScroll = false,
    readOnly,
    placeholder,
    value,
    onChange,
    rightChildren: propRightChildren,
    ref: forwardedRef,
    ...props
  }: SelectProps
) => {
  const labelKey = $$(lk), valueKey = $$(vk)

  const { id } = props
  const rightChildren = useIcon("dropdown", propRightChildren)
  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  })

  const valued = typeof value === "number" || !!value
  const displayValue = useMemo(() => {
    const currentOption =
      options.find((option) => getOptionValue(option, valueKey) === value) ||
      null

    return getDisplayLabel(currentOption, labelKey, !disableLeftAddon)
  })

  const [visible, show, hide] = useToggle(false)
  //@ts-ignore
  const [focused, handleFocus, handleBlur] = useFocusState({ onBlur, onFocus })
  const handleKeyDown = $((event: JSX.TargetedKeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      //@ts-ignore
      onKeyDown(event)
    }

    if (tryToSubmitRelatedForm(event)) {
      return
    }

    switch (event.key) {
      case " ":
      case "ArrowUp":
      case "ArrowDown":
        // prevent page scroll
        event.preventDefault()
        show()
        break
      // no default
    }
  })

  //@ts-ignore
  const [ref, refHandler] = useEnsuredRef(forwardedRef)

  useCloseOnOutsideClick({
    enabled: visible(),
    element: ref(),
    onOutsideClick: hide,
  })

  const nodeRef = $<ListElement | null>(null)
  const {
    ref: listboxRef,
    style: listboxStyle,
    callbacks: transitionOptions,
  } = useFixedPositioning({
    style: propListboxStyle,
    fixedTo: ref,
    nodeRef,
    anchor,
    onScroll: closeOnScroll ? hide : undefined,
    onResize: closeOnResize ? hide : undefined,
    transformOrigin: true,
    //@ts-ignore
    width: listboxWidth,
    onEntering() {
      // can't do onEnter since the positioning styles haven't been applied to the
      // dom node at this time. this means the list is the last element in the DOM
      // when portalled, which causes the page to scroll to the end. Moving it to
      // onEntering will ensure the styles have been applied and won't cause page
      // scrolling
      nodeRef().focus
    },
  })

  const handleClick = $((event: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    if (onClick) {
      //@ts-ignore
      onClick(event)
    }

    show()
  })

  const handleKeyboardClose = $(() => {
    hide()
    if (ref()) {
      ref().focus()
    }
  })

  const labelId = `${id}-label`
  const valueId = `${id}-value`
  const listboxId = `${id}-listbox`
  const displayValueId = `${id}-display-value`

  return (
    <>
      <TextFieldContainer
        {...props}
        aria-haspopup="listbox"
        aria-disabled={disabled || undefined}
        ref={refHandler}
        role="button"
        dense={dense}
        tabIndex={disabled ? undefined : 0}
        label={!!label}
        //@ts-ignore
        onFocus={handleFocus}
        //@ts-ignore
        onBlur={handleBlur}
        onKeyDown={disabled ? undefined : handleKeyDown}
        onClick={disabled ? undefined : handleClick}
        theme={theme}
        error={error}
        active={focused || visible}
        inline={inline}
        stretch={stretch}
        disabled={disabled}
        underlineDirection={underlineDirection}
        isLeftAddon={isLeftAddon}
        isRightAddon={isRightAddon}
        rightChildren={rightChildren}
        className={[block({ disabled }), className]}
      >
        <FloatingLabel
          id={labelId}
          //@ts-ignore
          style={labelStyle}
          className={[block("label"), labelClassName]}
          htmlFor={id}
          error={error}
          active={valued && (focused || visible)}
          valued={valued}
          floating={focused || valued || visible}
          dense={dense}
          disabled={disabled}
          component="span"
        >
          {label}
        </FloatingLabel>
        {/* @ts-ignore */}
        <span
          id={displayValueId}
          //@ts-ignore
          style={displayLabelStyle}
          className={[
            block("value", {
              disabled,
              readonly: readOnly,
              placeholder: !valued && placeholder,
              "placeholder-active":
                !valued && placeholder && (focused || visible),
            }),
            displayLabelClassName
          ]}
        >
          {displayValue || (!valued && placeholder)}
        </span>
        <input id={valueId} type="hidden" name={name} value={value} />
      </TextFieldContainer>
      {/* @ts-ignore */}
      <Listbox
        id={listboxId}
        ref={listboxRef}
        {...transitionOptions}
        aria-labelledby={id}
        //@ts-ignore
        style={listboxStyle}
        className={listboxClassName}
        //@ts-ignore
        name={name}
        readOnly={readOnly}
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
        value={value}
        onChange={onChange}
        visible={visible()}
        temporary
        onRequestClose={handleKeyboardClose}
        options={options}
        labelKey={labelKey}
        valueKey={valueKey}
        getOptionId={getOptionId}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isOptionDisabled={isOptionDisabled}
        disableMovementChange={disableMovementChange}
      />
    </>
  )
}
