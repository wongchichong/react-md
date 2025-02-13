import { $$ } from 'voby'


import type { RenderConditionalPortalProps } from "@react-md/portal"
import { ConditionalPortal } from "@react-md/portal"
import type {
    CSSTransitionClassNames,
    CSSTransitionComponentProps,
    TransitionTimeout,
} from "@react-md/transition"
import { useCSSTransition } from "@react-md/transition"
import type { SimplePosition } from "@react-md/utils"
import { bem } from "@react-md/utils"

import {
    DEFAULT_TOOLTIP_CLASSNAMES,
    DEFAULT_TOOLTIP_POSITION,
    DEFAULT_TOOLTIP_TIMEOUT,
} from "./constants"

/**
 * The base props for the `Tooltip` component. This can be extended when
 * creating custom tooltip implementations.
 *
 * @remarks \@since 2.8.0 Supports the {@link RenderConditionalPortalProps}
 */
export interface TooltipProps
    extends HTMLAttributes<HTMLSpanElement>,
    RenderConditionalPortalProps,
    CSSTransitionComponentProps {
    /**
     * An id for the tooltip. This is required for accessibility and finding an
     * element to attach event listeners to show and hide the tooltip.
     */
    id: FunctionMaybe<Nullable<string>>

    /**
     * An optional style to apply to the tooltip.
     */
    style?: FunctionMaybe<Nullable<string | StyleProperties>>

    /**
     * An optional class name to apply to the tooltip.
     */
    className?: Class

    /**
     * The contents of the tooltip to display. This can be any renderable element,
     * but this is normally just text.
     *
     * If this is placed within a `<button>` element, make sure that there are no
     * `<div>` since it is invalid html to have a `<div>` as a child of a
     * `<button>`.
     */
    children?: Child

    /**
     * Boolean if the tooltip is using the dense spec. This will reduce the
     * padding, margin and font size for the tooltip and is usually used for
     * desktop displays.
     */
    dense?: FunctionMaybe<Nullable<boolean>>

    /**
     * Boolean if the tooltip should allow line wrapping. This is disabled by
     * default since the tooltip will display weirdly when its container element
     * is small in size. It is advised to only enable line wrapping when there are
     * long tooltips or the tooltips are bigger than the container element.
     *
     * Once line wrapping is enabled, you will most likely need to set some
     * additional padding and widths.
     */
    lineWrap?: FunctionMaybe<Nullable<boolean>>

    /**
     * This ties directly into the CSSTransition `classNames` prop and is used to
     * generate and apply the correct class names during the tooltip's transition.
     */
    classNames?: FunctionMaybe<Nullable<CSSTransitionClassNames>>

    /**
     * The enter duration in milliseconds for the tooltip to fully animate into
     * view. This should match whatever value is set for
     * `$rmd-tooltip-enter-duration`. A manual timeout is used instead of
     * `onTransitionEnd` to handle cancel animations easier.
     */
    timeout?: FunctionMaybe<Nullable<TransitionTimeout>>

    /**
     * This is the position that the tooltip should appear related to its
     * container element as well as updating the animation direction.
     */
    position?: FunctionMaybe<Nullable<SimplePosition>>

    /**
     * Boolean if the tooltip is visible. This value changing will trigger the
     * different animations.
     */
    visible: FunctionMaybe<boolean>
}

const block = bem("rmd-tooltip")

/**
 * This is the base tooltip component that can only be used to render a tooltip
 * with an animation when the visibility changes. If this component is used, you
 * will need to manually add all the event listeners and triggers to change the
 * `visible` prop.
 *
 * @example
 * Simple Usage
 * ```tsx
 * import { Button } from "@react-md/button";
 * import { useTooltip, Tooltip } from "@react-md/tooltip";
 *
 * function Example() {
 *   const { tooltipProps, elementProps } = useTooltip({
 *     baseId: 'my-element',
 *   });
 *
 *   return (
 *     <>
 *       <Button {...elementProps}>Button</Button>
 *       <Tooltip {...tooltipProps}>
 *         Tooltip Content
 *       </Tooltip>
 *     </>
 *   );
 * }
 * ```
 */
export const Tooltip = (
    {
        className,
        classNames = DEFAULT_TOOLTIP_CLASSNAMES,
        visible,
        timeout = DEFAULT_TOOLTIP_TIMEOUT,
        dense = false,
        lineWrap = true,
        position = DEFAULT_TOOLTIP_POSITION,
        children,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        portal = true,
        portalInto,
        portalIntoId,
        temporary = true,
        ref: nodeRef,
        ...props
    }: TooltipProps
) => {
    const { elementProps, rendered } = useCSSTransition({
        //@ts-ignore
        nodeRef,
        timeout,
        className: [
            block({
                dense,
                "line-wrap": lineWrap,
                "dense-line-wrap": dense && lineWrap,
                [$$(position)]: true,
            }),
            className
        ],
        classNames,
        transitionIn: visible,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        temporary,
    })

    return (
        <ConditionalPortal
            portal={portal}
            portalInto={portalInto}
            portalIntoId={portalIntoId}
        >
            {rendered && (
                <span {...props} {...elementProps} role="tooltip">
                    {children}
                </span>
            )}
        </ConditionalPortal>
    )
}

