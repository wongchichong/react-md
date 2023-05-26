import { $$ } from "voby"
import type { YCoordConfig } from "./getCoord"
import {
    getAboveCoord,
    getBelowCoord,
    getBottomCoord,
    getCenterYCoord,
    getTopCoord,
} from "./getCoord"
import { getViewportSize } from "./getViewportSize"
import type { FixedPositionOptions, VerticalPosition } from "./types"

/**
 * @internal
 */
interface YPosition {
    top: FunctionMaybe<number>
    bottom?: FunctionMaybe<Nullable<number>>
    actualY: FunctionMaybe<VerticalPosition>
}

/**
 * @internal
 */
export interface FixConfig extends YCoordConfig {
    vhMargin: FunctionMaybe<number>
    screenBottom: FunctionMaybe<number>
    preventOverlap: FunctionMaybe<boolean>
    disableSwapping: FunctionMaybe<boolean>
    disableVHBounds: FunctionMaybe<boolean>
}

/**
 * @internal
 */
interface Options
    extends Required<
        Pick<
            FixedPositionOptions,
            | "yMargin"
            | "vhMargin"
            | "preventOverlap"
            | "disableSwapping"
            | "disableVHBounds"
        >
    > {
    y: FunctionMaybe<VerticalPosition>
    vh: FunctionMaybe<number>
    initialY?: FunctionMaybe<Nullable<number>>
    elHeight: FunctionMaybe<number>
    containerRect: FunctionMaybe<DOMRect>
}

/**
 * Attempts to position the fixed element so that it will appear completely
 * above the container element but also within the viewport boundaries. When
 * swapping is enabled, it will attempt to swap to the below position if it
 * can't fit within the viewport above the container element. If it can't fit in
 * the viewport even after being swapped below or swapping is disabled, it will
 * be positioned to the top viewport boundary.
 *
 * @internal
 */
export function createAnchoredAbove(config: FixConfig): YPosition {
    const {
        yMargin: ym,
        vhMargin: vm,
        screenBottom: sb,
        elHeight: eh,
        containerRect: cr,
        preventOverlap: po,
        disableSwapping: ds,
        disableVHBounds: db,
    } = config

    const vhMargin = $$(vm), elHeight = $$(eh), screenBottom = $$(sb), containerRect = $$(cr), yMargin = $$(ym), disableSwapping = $$(ds), disableVHBounds = $$(db), preventOverlap = $$(po)

    let top = getAboveCoord(config)
    let actualY: VerticalPosition = "above"

    if (disableVHBounds) {
        // can't actually allow a top value as a negative number since browsers
        // won't scroll upwards pas the normal page top
        return { actualY, top: Math.max(0, top) }
    }

    if (top > vhMargin) {
        // don't need to do anything else since the top is still in the viewport and
        // since it's positioned above, we already know it can't overlap the
        // container element
        return { actualY, top }
    }

    const swappedTop = getBelowCoord(config)
    if (disableSwapping || swappedTop + elHeight > screenBottom) {
        top = Math.min(top, vhMargin)
    } else {
        actualY = "below"
        top = swappedTop
    }

    let bottom: FunctionMaybe<number> | undefined
    if (
        preventOverlap &&
        // can't overlap if it's positioned below
        actualY === "above" &&
        top + elHeight > containerRect.top
    ) {
        bottom = window.innerHeight - containerRect.top + yMargin
    }

    return { actualY, top, bottom }
}

/**
 * Attempts to position the fixed element so that it will appear fixed to the
 * top of the container element but also within the viewport boundaries. When
 * swapping is enabled, it will attempt to swap to the bottom position if it
 * can't fit within the viewport. If it can't fit in the viewport even after
 * being swapped to the bottom position or swapping is disabled, it will be
 * positioned to the top viewport boundary.
 *
 * @internal
 */
export function createAnchoredTop(config: FixConfig): YPosition {
    const { vhMargin: vm, screenBottom: sb, elHeight: eh, disableSwapping: ds, disableVHBounds: db } = config

    const vhMargin = $$(vm), elHeight = $$(eh), screenBottom = $$(sb), disableSwapping = $$(ds), disableVHBounds = $$(db)

    let top = getTopCoord(config)
    let actualY: VerticalPosition = "top"

    if (disableVHBounds || top + elHeight <= screenBottom) {
        return { actualY, top }
    }

    const swappedTop = getBottomCoord(config)
    if (disableSwapping || swappedTop < vhMargin) {
        top = Math.max(top, vhMargin)
    } else {
        actualY = "bottom"
        top = swappedTop
    }

    return { actualY, top }
}

/**
 * Attempts to position the fixed element so that it will appear at the center
 * of the container element but also within the viewport boundaries. If the
 * entered element can't fit within the viewport, it'll update the top value
 * to either be the vhMargin or position to the screen bottom boundary
 *
 * @internal
 */
export function createAnchoredCenter(config: FixConfig): YPosition {
    const { vhMargin: vm, screenBottom: sb, elHeight: eh, /* disableSwapping: ds, */ disableVHBounds: db } = config
    const vhMargin = $$(vm), elHeight = $$(eh), screenBottom = $$(sb), /* disableSwapping = $$(ds), */ disableVHBounds = $$(db)

    let top = getCenterYCoord(config)
    const actualY: VerticalPosition = "center"
    if (disableVHBounds) {
        return { actualY, top: Math.max(0, top) }
    }

    top = Math.max(vhMargin, top)
    if (top + elHeight > screenBottom) {
        top = screenBottom - elHeight
    }

    return { actualY, top }
}

/**
 * Attempts to position the fixed element so that it will appear fixed to the
 * bottom of the container element but also within the viewport boundaries. When
 * swapping is enabled, it will attempt to swap to the top position if it can't
 * fit within the viewport. If it can't fit in the viewport even after being
 * swapped to the top position or swapping is disabled, it will be positioned to
 * the bottom viewport boundary.
 *
 * @internal
 */
export function createAnchoredBottom(config: FixConfig): YPosition {
    const { vhMargin: vm, screenBottom: sb, elHeight: eh, disableSwapping: ds, disableVHBounds: db } = config
    const vhMargin = $$(vm), elHeight = $$(eh), screenBottom = $$(sb), disableSwapping = $$(ds), disableVHBounds = $$(db)

    let top = getBottomCoord(config)
    let actualY: VerticalPosition = "bottom"
    if (disableVHBounds || top > vhMargin) {
        return { actualY, top }
    }

    const swappedTop = getTopCoord(config)
    if (disableSwapping || swappedTop + elHeight > screenBottom) {
        top = Math.min(top, screenBottom - elHeight)
    } else {
        actualY = "top"
        top = swappedTop
    }

    return { actualY, top }
}

/**
 * Attempts to position the fixed element so that it will appear completely
 * below the container element but also within the viewport boundaries. When
 * swapping is enabled, it will attempt to swap to the above position if it
 * can't fit within the viewport below the container element. If it can't fit in
 * the viewport even after being swapped above or swapping is disabled, it will
 * be positioned to the bottom viewport boundary.
 *
 * @internal
 */
export function createAnchoredBelow(config: FixConfig): YPosition {
    const { yMargin: ym, vhMargin: vm, screenBottom: sb, elHeight: eh, disableSwapping: ds, disableVHBounds: db, containerRect: cr, preventOverlap: po } = config
    const yMargin = $$(ym), vhMargin = $$(vm), elHeight = $$(eh), screenBottom = $$(sb), disableSwapping = $$(ds), disableVHBounds = $$(db), containerRect = $$(cr), preventOverlap = $$(po)

    let top = getBelowCoord(config)
    let actualY: VerticalPosition = "below"
    if (disableVHBounds || top + elHeight <= screenBottom) {
        return { actualY, top }
    }

    if (preventOverlap) {
        const availableTop = containerRect.top - yMargin
        if (disableSwapping || availableTop < screenBottom - top) {
            return {
                actualY,
                top,
                bottom: vhMargin,
            }
        }

        return {
            actualY: "above",
            top: Math.max(vhMargin, availableTop - elHeight),
            // this makes it so that the bottom of the fixed element is the top of the container
            // element. this ensures that it won't ever overlap the container element
            bottom: getViewportSize("height") - availableTop,
        }
    }

    const swappedTop = getAboveCoord(config)
    if (disableSwapping || swappedTop < vhMargin) {
        top = Math.max(top, screenBottom - elHeight)
    } else {
        actualY = "above"
        top = swappedTop
    }

    return { actualY, top }
}

/**
 * Creates the vertical position for a fixed element with the provided options.
 *
 * @internal
 */
export function createVerticalPosition({
    y: y_,
    vh: vh_,
    vhMargin: vm,
    yMargin: ym,
    elHeight: eh,
    initialY,
    containerRect: cr,
    disableSwapping: ds,
    preventOverlap: po,
    disableVHBounds: db,
}: Options): YPosition {
    const yMargin = $$(ym), vhMargin = $$(vm), elHeight = $$(eh), disableSwapping = $$(ds), disableVHBounds = $$(db), containerRect = $$(cr), preventOverlap = $$(po),
        vh = $$(vh_), y = $$(y_)


    if (!disableVHBounds && !preventOverlap && elHeight > vh - vhMargin * 2) {
        // the element is too big to be displayed in the viewport, so just span the
        // full viewport excluding margins
        return {
            top: vhMargin,
            bottom: vhMargin,
            actualY: "center",
        }
    }

    const config: FixConfig = {
        vhMargin,
        yMargin,
        elHeight,
        initialY,
        containerRect,
        screenBottom: vh - vhMargin,
        preventOverlap,
        disableSwapping,
        disableVHBounds,
    }

    switch (y) {
        case "above":
            return createAnchoredAbove(config)
        case "top":
            return createAnchoredTop(config)
        case "center":
            return createAnchoredCenter(config)
        case "bottom":
            return createAnchoredBottom(config)
        case "below":
            return createAnchoredBelow(config)
    }
}
