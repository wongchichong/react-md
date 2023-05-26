import { $ } from 'voby'
// import { $ } from "@react-md/utils"

interface Options<E extends HTMLElement> {
    /**
     * Boolean if the keyboard click handler should be disabled. This will make it
     * so the return value is just the provided `onKeyDown` handler or undefined
     * if it was omitted
     */
    disabled?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the element does not need the Enter key polyfilled. This should
     * normally be set to `true` for `<label>` elements.
     */
    disableEnterClick?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the user should not be able to click the element with the space
     * key. This should normally only be set to `true` for link elements.
     */
    disableSpacebarClick?: FunctionMaybe<Nullable<boolean>>

    /**
     * An optional onKeyDown event handler that should be merged with the keyboard
     * click polyfill
     */
    onKeyDown?: KeyboardEventHandler<E>
}

/**
 * This small utility function will create an onKeyDown handler that allows the
 * user to "click" an element with the keyboard via Enter or Space.
 */
export function useKeyboardClickPolyfill<E extends HTMLElement = HTMLElement>({
    onKeyDown,
    disabled = false,
    disableEnterClick = false,
    disableSpacebarClick = false,
}: Options<E> = {}): KeyboardEventHandler<E> | undefined {
    const ref = $({
        onKeyDown,
        disableSpacebarClick,
        disableEnterClick,
    })

    const handleKeyDown = $((event: JSX.TargetedKeyboardEvent<E>) => {
        const { onKeyDown, disableSpacebarClick, disableEnterClick } = ref()
        if (onKeyDown) {
            //@ts-ignore
            onKeyDown(event)
        }

        const isSpace = event.key === " "
        const isEnter = event.key === "Enter"
        const { currentTarget } = event
        //@ts-ignore
        const { tagName } = currentTarget
        if (
            (!isSpace && !isEnter) ||
            (isSpace && disableSpacebarClick) ||
            (isEnter && disableEnterClick) ||
            // buttons and textareas, and inputs shouldn't be polyfilled
            /BUTTON|TEXTAREA|INPUT/.test(tagName) ||
            // native links don't click on space
            (isSpace && tagName === "A")
        ) {
            return
        }

        if (isSpace) {
            // prevent default behavior of page scrolling
            event.preventDefault()
        }

        // don't want parent keydown events to be triggered since this should now
        // be a "click" event instead.
        event.stopPropagation()
        //@ts-ignore
        event.currentTarget.click()
        // disabled since useRefCache
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return disabled ? onKeyDown : handleKeyDown
}
