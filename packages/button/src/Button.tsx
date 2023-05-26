/* eslint-disable react/button-has-type */
import type { InteractionStatesOptions } from "@react-md/states"
import { useInteractionStates } from "@react-md/states"
import type { PropsWithRef } from "@react-md/utils"

import type { ButtonThemeProps } from "./buttonThemeClassNames"
import { buttonThemeClassNames } from "./buttonThemeClassNames"
import type { FABPosition, FABProps } from "./FAB"
import { FAB } from "./FAB"
import { $$ } from "voby"

/**
 * This interface includes all the props that the `Button` component accepts so
 * the main use case might be creating a functionality wrapper for the `Button`
 * component, but passes all props down as normal.
 */
export interface ButtonProps
    extends ButtonThemeProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick" | "disabled"> {
    /**
     * The button's type attribute. This is set to "button" by default so that
     * forms are not accidentally submitted when this prop is omitted since
     * buttons without a type attribute work as submit by default.
     */
    type?: FunctionMaybe<Nullable<'submit' | 'reset' | 'button'>>

    /**
     * Any children to render within the button. This will normally just be text
     * or an icon.
     *
     * Please note that it is considered invalid html to have a `<div>` as a
     * descendant of a `<button>`.
     */
    children?: Children

    /**
     * The position within the viewport to display the button as a floating action
     * button.
     */
    floating?: FunctionMaybe<Nullable<FABPosition>>

    /**
     * Any additional props to provide the to `FAB` container element when the
     * `floating` prop is provided
     */
    floatingProps?: PropsWithRef<FABProps, HTMLSpanElement>
}

/**
 * The `Button` component is a simple wrapper for the `<button>` element that
 * defaults the `type` attribute to `"button"` so that it does not automatically
 * submit forms by default. It also supports multiple themes, rendering as an
 * icon button, or even as a floating action button.
 *
 * The default theme will be a clear text button unless the `floating` prop has
 * been provided where it will render as an icon button by default instead.
 */
export const Button = //HTMLButtonElement
    ({
        type = "button",
        disabled = false,
        floating = null,
        floatingProps,
        theme = floating ? "secondary" : "clear",
        themeType = floating ? "contained" : "flat",
        buttonType = floating ? "icon" : "text",
        className: propClassName,
        children,
        disableRipple,
        disableProgrammaticRipple,
        rippleTimeout,
        rippleClassNames,
        rippleClassName,
        rippleContainerClassName,
        enablePressedAndRipple: propEnablePressedAndRipple,
        disablePressedFallback,
        onClick,
        onKeyUp,
        onKeyDown,
        onMouseUp,
        onMouseDown,
        onMouseLeave,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        ref,
        ...props
    }: ButtonProps
    ) => {
        const enablePressedAndRipple =
            typeof propEnablePressedAndRipple === "boolean"
                ? propEnablePressedAndRipple
                : themeType === "contained"
        const propHandlers = {
            onClick,
            onKeyUp,
            onKeyDown,
            onMouseUp,
            onMouseDown,
            onMouseLeave,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
        }

        const isDisabledTheme = theme === "disabled"
        const { ripples, className, handlers } = useInteractionStates({
            handlers: propHandlers,
            className: buttonThemeClassNames({
                theme,
                themeType,
                buttonType,
                disabled,
                className: propClassName,
            }),
            disabled: $$(disabled) || isDisabledTheme,
            disableRipple,
            disableProgrammaticRipple,
            disablePressedFallback,
            rippleTimeout,
            rippleClassNames,
            rippleClassName,
            rippleContainerClassName,
            enablePressedAndRipple,
        })

        return (
            <FAB position={floating} {...floatingProps}>
                <button
                    aria-disabled={isDisabledTheme || undefined}
                    {...props}
                    {...(isDisabledTheme ? undefined : handlers)}
                    ref={ref}
                    type={type}
                    className={className}
                    disabled={disabled}
                >
                    {children}
                    {ripples}
                </button>
            </FAB>
        )
    }
