//
import { $, useEffect, useMemo, $$ } from 'voby'

import { useOnUnmount } from "../useOnUnmount"
import {
    DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
    DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
} from "./constants"
import type { HoverModeContext } from "./useHoverModeContext"
import { HoverModeContextProvider } from "./useHoverModeContext"

/** @remarks \@since 2.8.0 */
export interface HoverModeConfiguration {
    /**
     * Boolean if the hover mode functionality should be disabled.
     *
     * @defaultValue `false`
     */
    disabled?: FunctionMaybe<Nullable<boolean>>

    /**
     * The amount of time (in ms) the user must hover an element before the hover
     * mode is enabled and the visibility is set to `true`.
     *
     * @defaultValue {@link DEFAULT_HOVER_MODE_VISIBLE_IN_TIME}
     */
    defaultVisibleInTime?: FunctionMaybe<Nullable<number>>

    /**
     * The amount of time (in ms) the user must not hover any element connected to
     * the hover mode.
     *
     * @defaultValue {@link DEFAULT_HOVER_MODE_DEACTIVATION_TIME}
     */
    deactivateTime?: FunctionMaybe<Nullable<number>>
}

/** @remarks \@since 2.8.0 */
export interface HoverModeProviderProps extends HoverModeConfiguration {
    children: Children
}

/**
 * This component should normally be mounted near the root of your app to enable
 * hover mode for child components. However, it can also be used at other levels
 * if hover mode functionality should not carry over between two different parts
 * of the screen.
 *
 * @example
 * Separating Hover Mode
 * ```tsx
 * export default function Example(): Child {
 *   return (
 *     <>
 *       <HoverModeProvider>
 *         <HeaderActions />
 *       </HoverModeProvider>
 *       <HoverModeProvider>
 *         <MainContent />
 *       </HoverModeProvider>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 2.8.0
 */
export function HoverModeProvider({
    children,
    disabled = false,
    defaultVisibleInTime = DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
    deactivateTime = DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
}: HoverModeProviderProps): Child {
    const visibleInTime = $(defaultVisibleInTime)
    const timeoutRef = $<number>()
    const enableHoverMode = $(() => {
        if (disabled) {
            return
        }

        window.clearTimeout(timeoutRef())
        visibleInTime(0)
    })
    const disableHoverMode = $(() => {
        window.clearTimeout(timeoutRef())
        visibleInTime(defaultVisibleInTime)
    })

    const startDisableTimer = () => {
        window.clearTimeout(timeoutRef())
        timeoutRef(window.setTimeout(() => {
            visibleInTime(defaultVisibleInTime)
        }, $$(deactivateTime)))
    }

    useEffect(() => {
        if (disabled) {
            window.clearTimeout(timeoutRef())
            visibleInTime(defaultVisibleInTime)
        }
    })

    useOnUnmount(() => {
        window.clearTimeout(timeoutRef())
    })

    const context = useMemo<HoverModeContext>(() => ({
        visibleInTime: visibleInTime(),
        enableHoverMode,
        disableHoverMode,
        startDisableTimer,
    }))

    return (
        <HoverModeContextProvider value={context}>
            {children}
        </HoverModeContextProvider>
    )
}
