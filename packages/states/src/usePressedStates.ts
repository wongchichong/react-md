import { $ } from 'voby'
// import { $ } from "@react-md/utils"

import type { MergableRippleHandlers } from "./ripples/types"
import { isBubbled } from "./ripples/utils"

interface PressedStatesOptions<E extends HTMLElement = HTMLElement> {
    handlers?: MergableRippleHandlers<E>
    disableSpacebarClick?: FunctionMaybe<Nullable<boolean>>
}

interface ReturnValue<E extends HTMLElement> {
    pressed: boolean
    handlers: MergableRippleHandlers<E>
}

/**
 * This is a different version of the useRippleStates that will allow you to
 * know when a component is being pressed by the user. This is really just a
 * fallback for when the ripples are disabled.
 *
 * This will return an object containing the current pressed state of the
 * element as well as all the merged eventHandlers required to trigger the
 * different states.
 *
 * NOTE: Unlike the ripple effect, this pressed states will not be triggered
 * from a programmatic click event.
 */
export function usePressedStates<E extends HTMLElement = HTMLElement>({
    handlers = {},
    disableSpacebarClick = false,
}: PressedStatesOptions<E> = {}): ReturnValue<E> {
    const pressed = $(false)
    const ref = $({ ...handlers, pressed })

    const handleKeyDown = $((event: JSX.TargetedKeyboardEvent<E>) => {
        const { onKeyDown, pressed } = ref()
        if (onKeyDown) {
            //@ts-ignore
            onKeyDown(event)
        }

        const { key } = event
        if (
            !pressed() &&
            (key === "Enter" || (!disableSpacebarClick && key === " "))
        ) {
            pressed(true)
        }
    })

    const handleKeyUp = $((event: JSX.TargetedKeyboardEvent<E>) => {
        const { onKeyUp, pressed } = ref()
        if (onKeyUp) {
            //@ts-ignore
            onKeyUp(event)
        }

        if (pressed()) {
            pressed(false)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleMouseDown = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onMouseDown, pressed } = ref()
        if (onMouseDown) {
            //@ts-ignore
            onMouseDown(event)
        }

        if (!pressed() && event.button === 0 && !isBubbled(event)) {
            pressed(true)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleMouseUp = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onMouseUp, pressed } = ref()
        if (onMouseUp) {
            //@ts-ignore
            onMouseUp(event)
        }

        if (pressed()) {
            pressed(false)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleMouseLeave = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onMouseLeave, pressed } = ref()
        if (onMouseLeave) {
            //@ts-ignore
            onMouseLeave(event)
        }

        if (pressed()) {
            pressed(false)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleTouchStart = $((event: JSX.TargetedTouchEvent<E>) => {
        const { onTouchStart, pressed } = ref()
        if (onTouchStart) {
            //@ts-ignore
            onTouchStart(event)
        }

        if (!pressed() && !isBubbled(event)) {
            pressed(true)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleTouchMove = $((event: JSX.TargetedTouchEvent<E>) => {
        const { onTouchMove, pressed } = ref()
        if (onTouchMove) {
            //@ts-ignore
            onTouchMove(event)
        }

        if (pressed()) {
            pressed(false)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleTouchEnd = $((event: JSX.TargetedTouchEvent<E>) => {
        const { onTouchEnd, pressed } = ref()
        if (onTouchEnd) {
            //@ts-ignore
            onTouchEnd(event)
        }

        if (pressed()) {
            pressed(false)
        }
        // disabled since useRefCache for ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return {
        pressed: pressed(),
        handlers: {
            onClick: handlers.onClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp,
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseLeave,
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
        },
    }
}
