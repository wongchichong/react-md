// ;
import { useEffect, useMemo, $, $$ } from 'voby'

import {
    DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
    DEFAULT_DESKTOP_MIN_WIDTH,
    DEFAULT_PHONE_MAX_WIDTH,
    DEFAULT_TABLET_MAX_WIDTH,
    DEFAULT_TABLET_MIN_WIDTH,
} from "./constants"
import { AppSizeContext } from "./useAppSize"
import type { AppSize, AppSizeOptions } from "./useAppSizeMedia"
import { DEFAULT_APP_SIZE, useAppSizeMedia } from "./useAppSizeMedia"

export interface AppSizeListenerProps extends AppSizeOptions {
    children: Children //Child

    /**
     * An change handler for the app size. This will be called each time the app
     * size changes based on a window resize event and will be provided the next
     * size and the previous size.
     */
    onChange?: (nextSize: AppSize, lastSize: AppSize) => void
}

/**
 * This component should be mounted near the top of your app as it will keep
 * track of the current app size based on the provided breakpoint widths.
 */
export function AppSizeListener({
    children,
    onChange,
    phoneMaxWidth = DEFAULT_PHONE_MAX_WIDTH,
    tabletMinWidth = DEFAULT_TABLET_MIN_WIDTH,
    tabletMaxWidth = DEFAULT_TABLET_MAX_WIDTH,
    desktopMinWidth = DEFAULT_DESKTOP_MIN_WIDTH,
    desktopLargeMinWidth = DEFAULT_DESKTOP_LARGE_MIN_WIDTH,
    defaultSize: ds = DEFAULT_APP_SIZE,
}: AppSizeListenerProps)/* : ReactElement */ {
    const defaultSize = $$(ds)

    const appSize = useAppSizeMedia({
        phoneMaxWidth,
        tabletMaxWidth,
        tabletMinWidth,
        desktopMinWidth,
        desktopLargeMinWidth,
        defaultSize,
    })
    const lastValue = $(appSize)

    useEffect(() => {
        // trigger the onChange prop on mount only if there is a difference between
        // the defaultSize and the mounted size.
        if (
            onChange &&
            (defaultSize.isPhone !== appSize.isPhone ||
                defaultSize.isTablet !== appSize.isTablet ||
                defaultSize.isDesktop !== appSize.isDesktop ||
                defaultSize.isLargeDesktop !== appSize.isLargeDesktop ||
                defaultSize.isLandscape !== appSize.isLandscape)
        ) {
            onChange(appSize, defaultSize)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    useEffect(() => {
        if (lastValue(appSize)) {
            if (onChange) {
                onChange(appSize, lastValue())
            }

            lastValue(appSize)
        }
    })

    const value = useMemo(() => ({
        ...appSize,
        __initialized: true,
    }))
    return (
        <AppSizeContext.Provider value={value}>{children}</AppSizeContext.Provider>
    )
}
