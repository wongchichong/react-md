import type { ButtonHTMLAttributes, ReactElement } from 'voby'

import type { InteractionStatesOptions } from "@react-md/states"
import { useInteractionStates } from "@react-md/states"

import styles from "./CustomComponent.module.scss"

interface CustomButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<InteractionStatesOptions, "handlers"> { }

function CustomButton({
    disabled,
    disableRipple,
    disableSpacebarClick,
    disableProgrammaticRipple,
    className: propClassName,
    children,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...props
}: CustomButtonProps): Child {
    const { ripples, handlers, className } = useInteractionStates({
        handlers: {
            onKeyDown,
            onKeyUp,
            onMouseDown,
            onMouseUp,
            onMouseLeave,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
        },
        disabled,
        disableRipple,
        disableSpacebarClick,
        disableProgrammaticRipple,
        className: propClassName,
    })

    return (
        <button
            {...props}
            type="button"
            className={cn(styles.button, className)}
            {...handlers}
        >
            {children}
            {ripples}
        </button>
    )
}

export default function CustomComponent(): Child {
    return (
        <>
            <CustomButton id="custom-button-1">Hello</CustomButton>
        </>
    )
}
