import { $ } from 'voby'
// import { $ } from "@react-md/utils"

import type { MergableRippleHandlers, RippleEvent } from "./types"

interface Options<E extends HTMLElement> {
    create: (event: RippleEvent<E>, disableSpacebarClick?: boolean) => void
    release: (event: RippleEvent<E>) => void
    cancel: (ease: boolean) => void
    handlers?: MergableRippleHandlers<E>
    disabled?: FunctionMaybe<Nullable<boolean>>
    disableRipple?: FunctionMaybe<Nullable<boolean>>
    disableProgrammaticRipple?: FunctionMaybe<Nullable<boolean>>
}

/**
 * This hook is used to create all the event handlers required for
 * creating ripples on an element. Each handler will be memoized and
 * merged with any provided event handlers of the same type. If the
 * ripple effect is disabled, the provided event handlers will be
 * returned instead.
 */
export function useRippleHandlers<E extends HTMLElement>({
    create,
    release,
    cancel,
    handlers = {},
    disabled: propDisabled = false,
    disableRipple = false,
    disableProgrammaticRipple = false,
}: Options<E>): MergableRippleHandlers<E> {
    const disabled = propDisabled || disableRipple
    const ref = $({ ...handlers, disableProgrammaticRipple })

    // some OS/browser don't actually focus buttons/elements that are focusable after a click
    // event which causes a double ripple effect. This ref is used to disable the programmatic
    // ripple in these cases.
    const disableProgrammatic = $(false)

    const onKeyDown = $((event: JSX.TargetedKeyboardEvent<E>) => {
        const { onKeyDown: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        create(event)
    })
    const onKeyUp = $((event: JSX.TargetedKeyboardEvent<E>) => {
        const { onKeyUp: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        release(event)
    })

    const onMouseDown = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onMouseDown: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        create(event)
        disableProgrammatic(true)
    })
    const onMouseUp = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onMouseUp: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        release(event)
    })
    const onMouseLeave = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onMouseLeave: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        cancel(true)
    })

    const onTouchStart = $((event: JSX.TargetedTouchEvent<E>) => {
        const { onTouchStart: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        create(event)
    })
    const onTouchMove = $((event: JSX.TargetedTouchEvent<E>) => {
        const { onTouchMove: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        cancel(false)
    })
    const onTouchEnd = $((event: JSX.TargetedTouchEvent<E>) => {
        const { onTouchEnd: callback } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        release(event)
    })

    const onClick = $((event: JSX.TargetedMouseEvent<E>) => {
        const { onClick: callback, disableProgrammaticRipple } = ref()
        if (callback) {
            //@ts-ignore
            callback(event)
        }

        // when a click event is triggered and the current active element is not
        // the event target, we know it was a true programmatic event and should
        // trigger a ripple for it.
        if (
            disableProgrammaticRipple ||
            document.activeElement === event.currentTarget ||
            disableProgrammatic()
        ) {
            disableProgrammatic(false)
            return
        }

        create(event)
    })

    return {
        onKeyDown: disabled ? handlers.onKeyDown : onKeyDown,
        onKeyUp: disabled ? handlers.onKeyUp : onKeyUp,
        onMouseDown: disabled ? handlers.onMouseDown : onMouseDown,
        onMouseUp: disabled ? handlers.onMouseUp : onMouseUp,
        onMouseLeave: disabled ? handlers.onMouseLeave : onMouseLeave,
        onTouchStart: disabled ? handlers.onTouchStart : onTouchStart,
        onTouchMove: disabled ? handlers.onTouchMove : onTouchMove,
        onTouchEnd: disabled ? handlers.onTouchEnd : onTouchEnd,
        onClick: disabled || disableProgrammaticRipple ? handlers.onClick : onClick,
    }
}
