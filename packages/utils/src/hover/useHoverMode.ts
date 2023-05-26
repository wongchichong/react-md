// import type { Dispatch, JSX.TargetedMouseEvent, SetStateAction } from 'voby'
import { $, Observable, useEffect, $$ } from 'voby'

import { useUserInteractionMode } from "../mode"
import { useOnUnmount } from "../useOnUnmount"
import { DEFAULT_HOVER_MODE_EXIT_TIME } from "./constants"
import type { HoverModeActions } from "./useHoverModeContext"
import { useHoverModeContext } from "./useHoverModeContext"

/** @remarks \@since 5.0.0 */
export interface HoverModeHoverEventHandlers {
    /**
     * An optional event handler to merge with the hover mode visibility handler.
     * If this function calls `event.stopPropagation()`, the hover mode behavior
     * will be disabled.
     */
    onMouseEnter<E extends HTMLElement>(event: JSX.TargetedMouseEvent<E>): void

    /**
     * An optional event handler to merge with the hover mode visibility handler.
     * If this function calls `event.stopPropagation()`, the hover mode behavior
     * will be disabled.
     */
    onMouseLeave<E extends HTMLElement>(event: JSX.TargetedMouseEvent<E>): void
}

/**
 * An object of event handlers that should be provided to a component to enable
 * and disable the visibility of a temporary element while hovering over that
 * component.
 *
 * @remarks \@since 2.8.0
 * @remarks \@since 5.0.0 The `HTMLElement` type will be correctly inferred when
 * using them on multiple components.
 */
export interface HoverModeEventHandlers extends HoverModeHoverEventHandlers {
    /**
     * An optional event handler to merge with the hover mode visibility handler.
     * If this function calls `event.stopPropagation()`, the hover mode behavior
     * will be disabled.
     */
    onClick<E extends HTMLElement>(event: JSX.TargetedMouseEvent<E>): void
}

/**
 * @remarks \@since 2.8.0
 * @remarks \@since 5.0.0 No longer has event handlers or a separate "sticky" API.
 */
export interface HoverModeOptions {
    /**
     * Boolean if the hover mode functionality should be disabled.
     *
     * @defaultValue `false`
     */
    disabled?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the element should start visible.
     *
     * @defaultValue `false`
     */
    defaultVisible?: FunctionMaybe<Nullable<boolean>>

    /**
     * The amount of time to wait once the mouse has left the element before
     * setting the visibility to `false`.
     *
     * @defaultValue {@link DEFAULT_HOVER_MODE_EXIT_TIME}
     */
    exitVisibilityDelay?: FunctionMaybe<Nullable<number>>
}

/**
 * @remarks \@since 5.0.0
 */
export interface HoverModeHookReturnValue
    extends HoverModeActions,
    HoverModeEventHandlers {
    /**
     * Boolean if the hover mode is currently working.
     */
    active: FunctionMaybe<boolean>

    /**
     * Boolean if the the `visible` state is `true` because the user clicked an
     * element.
     */
    stuck: Observable<boolean>

    /**
     * Boolean if the temporary element should be visible.
     */
    visible: Observable<boolean>

    /**
     * A function to manually set the visibility state if you need even more
     * custom behavior.
     */
    // setVisible: ObservableMaybe<boolean>

    /**
     * A convenience prop that allows you to spread all the hover mode event
     * handlers onto a single component if no custom functionality is required.
     *
     * @remarks \@since 5.0.0
     */
    handlers: Readonly<HoverModeEventHandlers>

    /**
     * A convenience prop that allows you to spread only the `onMouseEnter` and
     * `onMouseLeave` the hover mode event handlers onto a single component if no
     * custom functionality is required.
     *
     * @remarks \@since 5.0.0
     */
    hoverHandlers: Readonly<HoverModeHoverEventHandlers>

    /**
     * Clears the current `onMouseEnter` visibility timer.
     *
     * @remarks \@since 5.0.0
     */
    clearHoverTimeout(): void
}

/**
 * This hook is used to add the hover mode functionality to any component.
 *
 * @example
 * Displaying a Color Preview when hovering a Hex Code
 * ```tsx
 * import type { ReactElement } from "react";
 * import { CSSTransition } from "@react-md/transition";
 * import { useHoverMode } from "@react-md/utils";
 *
 * interface Props {
 *   value: string;
 * }
 *
 * export default function Color({ value }: Props): Child {
 *   const { visible, onMouseEnter, onMouseLeave } =
 *     useHoverMode({ exitVisibilityDelay: 0 });
 *
 *   return (
 *     <>
 *       <span
 *         onMouseEnter={onMouseEnter}
 *         onMouseLeave={onMouseLeave}
 *         style={{
 *           // pretend styles
 *         }}
 *       >
 *         {value}
 *       </span>
 *       <CSSTransition
 *         transitionIn={visible}
 *         classNames="opacity-change"
 *         timeout={150}
 *         temporary
 *       >
 *         <span
 *           style={{
 *             backgroundColor: value,
 *             // other styles
 *           }}
 *         />
 *      </CSSTransition>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Sticky Usage with a Fixed Dialog
 * ```tsx
 * const {
 *   stuck,
 *   active,
 *   visible,
 *   setVisible,
 *   handlers,
 *   hoverHandlers,
 * } = useHoverMode();
 * const buttonRef = useRef<HTMLButtonElement>(null);
 *
 * return (
 *   <>
 *     <Button {...handlers} ref={buttonRef}>
 *       Click Me
 *     </Button>
 *     <FixedDialog
 *       {...hoverHandlers}
 *       aria-labelledby="dialog-title-id"
 *       id="dialog-id"
 *       visible={visible}
 *       onRequestClose={() => setVisible(false)}
 *       fixedTo={buttonRef}
 *       anchor={BELOW_CENTER_ANCHOR}
 *       options={{ preventOverlap: true }}
 *       // this allows the close on outside click"" behavior" to work
 *       overlay={!stuck && active ? false : undefined}
 *       disableScrollLock={active}
 *     >
 *       <YourDialogContent />
 *    </FixedDialog>
 *   </>
 * );
 * ```
 *
 * @remarks \@since 2.8.0
 * @remarks \@since 5.0.0 This hook no longer returns `handlers` or
 * `stickyHandlers` and does not hide when an element on the page is clicked.
 * @param options - An optional object of options to use. See
 * {@link HoverModeOptions} for more details.
 * @returns either the {@link HoverModeReturnValue} or {@link HoverModeReturnValue}
 */
export function useHoverMode({
    disabled = false,
    defaultVisible = false,
    exitVisibilityDelay = DEFAULT_HOVER_MODE_EXIT_TIME,
}: HoverModeOptions = {}): HoverModeHookReturnValue {
    const mode = useUserInteractionMode()
    const isTouch = mode === "touch"
    const visible = $($$(defaultVisible))
    const stuck = $(false)
    const timeoutRef = $<number>()
    const {
        visibleInTime,
        enableHoverMode,
        disableHoverMode,
        startDisableTimer,
    } = useHoverModeContext()
    const active = visibleInTime === 0

    useEffect(() => {
        if (!visible()) {
            stuck(false)
        }
    })

    useOnUnmount(() => {
        window.clearTimeout(timeoutRef())
    })

    const clearHoverTimeout = $(() => {
        window.clearTimeout(timeoutRef())
    })

    const onMouseEnter = $(<E extends HTMLElement>(event: JSX.TargetedMouseEvent<E>) => {
        //@ts-ignore
        if (stuck() || disabled || isTouch || event.isPropagationStopped()) {
            return
        }

        clearHoverTimeout()
        if (visibleInTime === 0) {
            enableHoverMode()
            visible(true)
            return
        }

        timeoutRef(window.setTimeout(() => {
            enableHoverMode()
            visible(true)
        }, $$(visibleInTime)))
    })

    const onMouseLeave = $(<E extends HTMLElement>(event: JSX.TargetedMouseEvent<E>) => {
        //@ts-ignore
        if (stuck() || disabled || isTouch || event.isPropagationStopped()) {
            return
        }

        startDisableTimer()
        clearHoverTimeout()
        if (exitVisibilityDelay === 0) {
            visible(false)
            return
        }

        timeoutRef(window.setTimeout(() => {
            visible(false)
        }, $$(exitVisibilityDelay)))
    })

    const onClick = $(<E extends HTMLElement>(event: JSX.TargetedMouseEvent<E>) => {
        //@ts-ignore
        if (event.isPropagationStopped()) {
            return
        }

        // If the hover mode functionality is disabled, just allow this to behave
        // like a toggle visibility handler.
        if (!stuck() && !disabled) {
            stuck(true)
            visible(true)
        } else {
            stuck(false)
            visible((prevVisible) => !prevVisible)
        }
    })

    return {
        active,
        stuck,
        // setVisible: visible,
        visible, //: visible(),
        onClick,
        onMouseEnter,
        onMouseLeave,
        enableHoverMode,
        disableHoverMode,
        startDisableTimer,
        clearHoverTimeout,
        handlers: {
            onClick,
            onMouseEnter,
            onMouseLeave,
        },
        hoverHandlers: {
            onMouseEnter,
            onMouseLeave,
        },
    }
}
