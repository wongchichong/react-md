

import type { AppBarTitleProps } from "@react-md/app-bar"
import { AppBarTitle } from "@react-md/app-bar"
import { bem } from "@react-md/utils"

import { useLayoutConfig } from "./LayoutProvider"
import { isFullHeightLayout } from "./utils"
import { $$ } from "voby"

export type LayoutAppBarTitleProps<T extends EventTarget> = AppBarTitleProps<T>

const styles = bem("rmd-layout-title")

/**
 * An extremely simple wrapper for the `AppBarTitle` that will automatically
 * apply an `id` and apply the correct margin for full-height layouts.
 */
export const LayoutAppBarTitle = ({ id: propId, className, children, ref, ...props }: LayoutAppBarTitleProps<HTMLDivElement>
) => {
    const { baseId, layout } = useLayoutConfig()
    const id = propId ?? `${baseId}-title`
    return (
        <AppBarTitle
            {...props}
            id={id}
            ref={ref}
            className={[styles({ offset: isFullHeightLayout($$(layout)) }), className]}
        >
            {children}
        </AppBarTitle>
    )
}