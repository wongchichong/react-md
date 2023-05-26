


import { TextIconSpacing } from "@react-md/icon"
import type { InteractionStatesOptions } from "@react-md/states"
import { useInteractionStates } from "@react-md/states"
import { bem, useKeyboardFocusableElement } from "@react-md/utils"

import type { TabConfig } from "./types"

export interface TabProps<T extends EventTarget = HTMLButtonElement>
    extends TabConfig,
    Omit<HTMLAttributes<T>,'icon'>,
    Omit<InteractionStatesOptions<HTMLButtonElement>, "disableSpacebarClick"> {
    /**
     * The id for the tab. This is required for a11y and linking the `TabPanel` to
     * a specific tab.
     */
    id: FunctionMaybe<string>

    /**
     * Boolean if the tab is currently active. Only one tab should be active at a
     * time.
     */
    active: FunctionMaybe<boolean>

    /**
     * The id for the `TabPanel` that the `Tab` controls. This is really just used
     * to create an `aria-controls` attribute on the `Tab` itself, but Googling
     * this results in some "interesting" results showing `aria-controls` doesn't
     * really do much so this prop can be omitted.
     *
     * In addition, if you are using dynamically rendered tab panels, this value
     * should only be provided when the tab becomes active as the `id` will not
     * exist in the DOM until then and will be invalid.
     */
    panelId?: FunctionMaybe<Nullable<string>>
}

const block = bem("rmd-tab")

/**
 * The `Tab` is a low-level component that just renders an accessible tab widget
 * along with some general styles and an optional icon.
 */
export const Tab = (
    {
        className: propClassName,
        contentStyle,
        contentClassName,
        disabled = false,
        icon,
        stacked = false,
        iconAfter = false,
        children,
        active,
        panelId,
        disableRipple,
        disableProgrammaticRipple,
        rippleTimeout,
        rippleClassNames,
        rippleClassName,
        rippleContainerClassName,
        enablePressedAndRipple,
        ref,
        ...props
    }: TabProps<HTMLButtonElement>
) =>{
    const { ripples, className, handlers } = useInteractionStates({
        handlers: props,
        className: propClassName,
        disabled,
        disableRipple,
        disableProgrammaticRipple,
        rippleTimeout,
        rippleClassNames,
        rippleClassName,
        rippleContainerClassName,
        enablePressedAndRipple,
    })
    const Refs = useKeyboardFocusableElement(ref as any)

    return (
        <button
            {...props}
            {...handlers}
            ref={Refs}
            aria-selected={active}
            aria-controls={panelId}
            type="button"
            role="tab"
            disabled={disabled}
            className={[block({ active, stacked: icon && stacked }), className]}
            tabIndex={active ? undefined : -1}
        >
            <TextIconSpacing icon={icon} stacked={stacked} iconAfter={iconAfter}>
                <span
                    style={contentStyle}
                    className={[block("content"), contentClassName]}
                >
                    {children}
                </span>
            </TextIconSpacing>
            {ripples}
        </button>
    )
}