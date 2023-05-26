import { $$ } from "voby"

export interface XCoordConfig {
    xMargin: FunctionMaybe<number>
    elWidth: FunctionMaybe<number>
    initialX?: FunctionMaybe<Nullable<number>>
    containerRect: FunctionMaybe<DOMRect>
}

export interface YCoordConfig {
    yMargin: FunctionMaybe<number>
    elHeight: FunctionMaybe<number>
    initialY?: FunctionMaybe<Nullable<number>>
    containerRect: FunctionMaybe<DOMRect>
}

type Left = number
type Top = number

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) left of the container element. So the right bounds of the fixed
 * element will be equal to the left bounds of the container element (before the
 * xMargin is applied).
 * @internal
 */
export function getLeftCoord({
    xMargin: xm,
    elWidth: ew,
    initialX: ix,
    containerRect: cr
}: XCoordConfig): Left {
    const xMargin = $$(xm), elWidth = $$(ew), initialX = $$(ix), containerRect = $$(cr)
    return (initialX ?? containerRect.left) - elWidth - xMargin
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-left of the container element. So the left bounds of both the container
 * and fixed elements will overlap (before the xMargin is applied)
 * @internal
 */
export function getInnerLeftCoord({
    xMargin: xm,
    initialX: ix,
    containerRect: cr,
}: XCoordConfig): Left {
    const xMargin = $$(xm), initialX = $$(ix), containerRect = $$(cr)
    return (initialX ?? containerRect.left) + xMargin
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * center of the container element. So the center point of the fixed element
 * should be the center point of the container element.
 *
 * Note: Unlike all the other horizontal positioning logic, the center position
 * does not use the xMargin.
 * @internal
 */
export function getCenterXCoord({
    elWidth: ew,
    initialX: ix,
    containerRect: cr,
}: XCoordConfig): Left {
    const elWidth = $$(ew), initialX = $$(ix), containerRect = $$(cr)

    const containerCenter = containerRect.width / 2
    const elementCenter = elWidth / 2
    return (initialX ?? containerRect.left + containerCenter) - elementCenter
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * inner-right of the container element. So the right bounds for both the
 * container and fixed elements will overlap (before the xMargin is applied).
 * @internal
 */
export function getInnerRightCoord({
    xMargin: xm,
    elWidth: ew,
    initialX: ix,
    containerRect: cr,
}: XCoordConfig): Left {
    const xMargin = $$(xm), elWidth = $$(ew), initialX = $$(ix), containerRect = $$(cr)
    return (
        (initialX ?? containerRect.left + containerRect.width) - elWidth - xMargin
    )
}

/**
 * Creates the `left` style value for an element that should be fixed to the
 * (outer) right of the container element. So the left bounds of the fixed
 * element will overlap with the right bounds of the container element (before
 * the xMargin is applied).
 * @internal
 */
export function getRightCoord({
    xMargin: xm,
    initialX: ix,
    containerRect: cr,
}: XCoordConfig): Left {
    const xMargin = $$(xm), initialX = $$(ix), containerRect = $$(cr)
    return (initialX ?? containerRect.left + containerRect.width) + xMargin
}

/**
 * Creates the `top` style value for an element that should be fixed above the
 * container element. So the bottom bounds of the fixed element will overlap
 * with the top bounds of the container element (before the yMargin is applied).
 * @internal
 */
export function getAboveCoord({
    yMargin: ym,
    initialY: iy,
    elHeight: eh,
    containerRect: cr,
}: YCoordConfig): Top {
    const yMargin = $$(ym), elHeight = $$(eh), initialY = $$(iy), containerRect = $$(cr)

    return (initialY ?? containerRect.top) - elHeight - yMargin
}

/**
 * Creates the `top` style value for an element that should be fixed to the top
 * of the container element. So the top bounds for both the container and fixed
 * elements will overlap (before the yMargin is applied).
 * @internal
 */
export function getTopCoord({
    yMargin: ym,
    initialY: iy,
    containerRect: cr,
}: YCoordConfig): Top {
    const yMargin = $$(ym), initialY = $$(iy), containerRect = $$(cr)
    return (initialY ?? containerRect.top) + yMargin
}

/**
 * Creates the `top` style value for an element that should be fixed vertically
 * centered relative to the container element. So the vertical center point for
 * the fixed element should overlap the vertical center point of the container
 * element.
 *
 * Note: Unlike all the other vertical positioning logic, the center position
 * does not use the yMargin.
 */
export function getCenterYCoord({
    elHeight: eh,
    initialY: iy,
    containerRect: cr,
}: YCoordConfig): Top {
    const elHeight = $$(eh), initialY = $$(iy), containerRect = $$(cr)

    const containerCenter = containerRect.height / 2
    const elementCenter = elHeight / 2
    return (initialY ?? containerRect.top + containerCenter) - elementCenter
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the top bounds of the fixed element
 * should overlap the bottom bounds of the container element (before the yMargin
 * is applied).
 * @internal
 */
export function getBottomCoord({
    yMargin: ym,
    initialY: iy,
    elHeight: eh,
    containerRect: cr,
}: YCoordConfig): Top {
    const yMargin = $$(ym), elHeight = $$(eh), initialY = $$(iy), containerRect = $$(cr)

    return (
        (initialY ?? containerRect.top + containerRect.height) - elHeight - yMargin
    )
}

/**
 * Creates the `top` style value for an element that should be fixed to the
 * bottom of the container element. So the bottom bounds of both the container
 * and fixed elements should overlap (before the yMargin is applied).
 * @internal
 */
export function getBelowCoord({
    yMargin: ym,
    initialY: iy,
    containerRect: cr,
}: YCoordConfig): Top {
    const yMargin = $$(ym), initialY = $$(iy), containerRect = $$(cr)

    return (initialY ?? containerRect.top + containerRect.height) + yMargin
}
