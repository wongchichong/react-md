import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

import { Overlay } from "@react-md/overlay"
import type { RenderConditionalPortalProps } from "@react-md/portal"
import { ConditionalPortal } from "@react-md/portal"
import type {
    CSSTransitionClassNames,
    CSSTransitionComponentProps,
    TransitionActions,
    TransitionTimeout,
} from "@react-md/transition"
import { useCSSTransition } from "@react-md/transition"
import type {
    FocusContainerOptionsProps,
    LabelRequiredForA11y,
} from "@react-md/utils"
import {
    bem,
    FocusContainer,
    useCloseOnEscape,
    useScrollLock,
} from "@react-md/utils"

import { useNestedDialogFixes } from "./useNestedDialogFixes"

export interface BaseDialogProps
    extends CSSTransitionComponentProps,
    TransitionActions,
    RenderConditionalPortalProps,
    FocusContainerOptionsProps,
    HTMLAttributes<HTMLDivElement> {
    /**
     * An id required for a11y for the dialog.
     */
    id: string

    /**
     * The role for the dialog component. This should normally stay as the default
     * of `"dialog"` **unless** you want the screen reader to interrupt the normal
     * workflow for this message. It is good to set this value to `"alertdialog"`
     * error message confirmations or general confirmation prompts.
     *
     * Note: The `dialog` technically supports being rendered as a `menu`, but
     * this is really only for mobile sheet support and will not provide the menu
     * keyboard functionality automatically.
     */
    role?: "dialog" | "alertdialog" | "menu" | "none"

    /**
     * A label to apply to the dialog. Either this or the `aria-labelledby` prop
     * are required for accessibility.
     */
    "aria-label"?: string

    /**
     * An id pointing to an element that is a label for the dialog. Either this or
     * the `aria-label` prop are required for accessibility.
     */
    "aria-labelledby"?: string

    /**
     * Boolean if the dialog is currently visible.
     */
    visible: boolean

    /**
     * A function used to close the dialog when the overlay is clicked or the
     * escape key is pressed when the `modal` prop is not enabled.
     */
    onRequestClose(): void

    /**
     * The tab index for the sheet. This should normally stay at `-1`.
     */
    tabIndex?: number

    /**
     * Boolean if there should be an overlay displayed with the sheet. This is
     * recommended/required on mobile devices.
     */
    overlay?: boolean

    /**
     * An optional style to apply to the overlay.
     */
    overlayStyle?: CSSProperties

    /**
     * An optional className to apply to the overlay.
     */
    overlayClassName?: string

    /**
     * Boolean if the overlay should be "hidden" from the user once it's visible
     * be keeping the opacity set to `0`. This is really only used for custom
     * dialogs like the `FixedDialog`.
     */
    overlayHidden?: boolean

    /**
     * An optional style to apply to the dialog container when the `type` is set
     * to `"centered"` or when the `forceContainer` prop is enabled. You probably
     * don't want to use this prop in most cases.
     */
    containerStyle?: CSSProperties

    /**
     * An optional className to apply to the dialog container when the `type` is
     * set to `"centered"` or when the `forceContainer` prop is enabled. You
     * probably don't want to use this prop in most cases.
     */
    containerClassName?: string

    /**
     * Boolean if the dialog should be "forcefully" wrapped in the
     * `.md-dialog-container` element. You probably don't want to use this in most
     * cases, but the container element will be used when the `type` prop is set
     * to `"centered"`.
     */
    forceContainer?: boolean

    /**
     * Boolean if the dialog should act as a modal. This means that the user will
     * no longer be able to close the dialog by pressing the escape key or by
     * clicking on the overlay. You will be required to update the dialog to have
     * an action that closes the dialog instead.
     */
    modal?: boolean

    /**
     * The display type for the modal. If you would like to position the modal in
     * different locations within the page, you should set this prop to `"custom"`
     * and add custom styles to position it instead.
     */
    type?: "full-page" | "centered" | "custom"

    /**
     * Either the "first" or "last" string to focus the first or last focusable
     * element within the container or a query selector string to find a focusable
     * element within the container.
     */
    defaultFocus?: "first" | "last" | string

    /**
     * Boolean if the dialog should no longer add scroll locking to the page when
     * visible. You normally want this prop to stay `false`, but it is useful when
     * using custom dialogs that are more for popovers and don't require full user
     * attention.
     */
    disableScrollLock?: boolean

    /**
     * Boolean if the ability to close the dialog via the escape key should be
     * disabled. You should really not be using this as it breaks accessibility in
     * most cases.
     *
     * Note: When the `modal` prop is enabled, this flag will be considered `true`
     * as well so that the escape keypress no longer closes the dialog.
     */
    disableEscapeClose?: boolean

    /**
     * Boolean if the dialog's focus container logic should be disabled. This
     * should normally be kept at the default of `false` unless implementing a
     * custom dialog that does not require consistent user focus.
     */
    disableFocusContainer?: boolean

    /**
     * The Dialog component will attempt to automatically fix nested dialogs
     * behind the scenes using the `NestedDialogContextProvider` component. This
     * prop will disable that feature if it does not seem to be working as
     * expected.
     */
    disableNestedDialogFixes?: boolean

    /**
     * Boolean if the `appear`, `enter`, and `exit` transitions should be disabled
     * for the dialog.  This is just a shortcut so all three of those props don't
     * need to be disabled.
     */
    disableTransition?: boolean

    /**
     * The component to render the dialog as. This really shouldn't be used
     * outside of the `@react-md/layout` and `@react-md/sheet` packages to
     * conditionally render a navigation panel.
     */
    component?: "div" | "nav"

    /**
     * Any additional props that should be passed to the `Overlay` element.
     *
     * @remarks \@since 5.0.0
     */
    overlayProps?: Omit<HTMLAttributes<HTMLSpanElement>, "style" | "className">
}

export type DialogProps = LabelRequiredForA11y<BaseDialogProps>

// used to disable the overlay click-to-close functionality when the `modal` prop is enabled.
const noop = (): void => {
    // do nothing
}
const block = bem("rmd-dialog")

/** @remarks \@since 4.0.0 */
export const DEFAULT_DIALOG_CLASSNAMES: Readonly<CSSTransitionClassNames> = {
    appear: "rmd-dialog--enter",
    appearActive: "rmd-dialog--enter-active",
    enter: "rmd-dialog--enter",
    enterActive: "rmd-dialog--enter-active",
    exit: "rmd-dialog--exit",
    exitActive: "rmd-dialog--exit-active",
}

/** @remarks \@since 4.0.0 */
export const DEFAULT_DIALOG_TIMEOUT: Readonly<TransitionTimeout> = {
    enter: 200,
    exit: 150,
}

/**
 * A dialog is used to show important content above all other elements within
 * the page. This is normally used for alerts, confirmations, or just temporary
 * content. The dialog within react-md also has the additional features for
 * accessibility:
 *
 * - automatically focus the dialog on mount for keyboard users
 * - prevent elements outside of the dialog to be focused
 * - close via the escape key
 * - prevent the page outside of the dialog from being scrolled
 *
 * To complete the dialog accessibility requirements, every dialog **must**
 * provide an `id` and either an `aria-label` describing the dialog or an
 * `aria-labelledby` id that points to an element describing this dialog.
 *
 * @example
 * Simple Example
 * ```tsx
 * import { ReactElement, useState } from "react";
 * import { Button } from "@react-md/button";
 * import {
 *   Dialog,
 *   DialogHeader,
 *   DialogTitle,
 *   DialogContent,
 *   DialogFooter,
 * } from "@react-md/dialog";
 * import { Typography } from "@react-md/typography";
 *
 * function Example(): ReactElement {
 *   const [visible, setVisible] = useState(false);
 *   const hide = (): void => {
 *     setVisible(false);
 *   };
 *
 *   return (
 *     <>
 *       <Button onClick={() => setVisible(!visible)}>
 *         Show Dialog
 *       </Button>
 *       <Dialog
 *         aria-labelledby="dialog-title"
 *         id="simple-dialog"
 *         visible={visible}
 *         onRequestClose={hide}
 *       >
 *         <DialogHeader>
 *           <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
 *         </DialogHeader>
 *         <DialogContent>
 *           <Typography margin="none">This is some text in a dialog.</Typography>
 *         </DialogContent>
 *         <DialogFooter>
 *           <Button onClick={hide}>
 *             Close
 *           </Button>
 *         </DialogFooter>
 *       </Dialog>
 *     </>
 *   );
 * }
 * ```
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
    {
        component = "div",
        tabIndex = -1,
        children,
        className,
        containerStyle,
        containerClassName,
        overlay: propOverlay,
        overlayStyle,
        overlayClassName,
        overlayHidden = false,
        visible,
        onRequestClose,
        forceContainer = false,
        defaultFocus = "first",
        portal = true,
        portalInto,
        portalIntoId,
        appear = false,
        enter = true,
        exit = true,
        disableTransition = false,
        classNames = DEFAULT_DIALOG_CLASSNAMES,
        timeout = DEFAULT_DIALOG_TIMEOUT,
        temporary = true,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        modal = false,
        role = "dialog",
        type = "centered",
        disableScrollLock = false,
        disableEscapeClose: propDisableEscapeClose = false,
        disableFocusContainer = false,
        disableTabFocusWrap = false,
        disableFocusOnMount = false,
        disableFocusOnUnmount = false,
        disableNestedDialogFixes = false,
        onKeyDown,
        overlayProps,
        ...props
    },
    nodeRef
) {
    const { id } = props
    const isNoneRole = role === "none"
    const isFullPage = type === "full-page"
    const isCentered = type === "centered"

    const { disableOverlay, disableEscapeClose } = useNestedDialogFixes({
        id,
        visible,
        disabled: disableNestedDialogFixes,
        disableEscapeClose: propDisableEscapeClose,
    })

    useScrollLock(visible && !isNoneRole && !disableScrollLock)

    let overlayEl: ReactNode = null
    if (typeof propOverlay === "boolean" ? propOverlay : !isFullPage) {
        // do not add the portal props to the overlay element since the portalling
        // is handled in here. With how portals work, this would be rendered **after**
        // the dialog instead of before which breaks some dialog styles
        overlayEl = (
            <Overlay
                id={`${id}-overlay`}
                {...overlayProps}
                style={overlayStyle}
                className={cn("rmd-dialog-overlay", overlayClassName)}
                hidden={overlayHidden || disableOverlay}
                visible={visible}
                clickable={!modal}
                onRequestClose={modal ? noop : onRequestClose}
            />
        )
    }

    const { elementProps, rendered } = useCSSTransition({
        nodeRef,
        transitionIn: visible,
        timeout,
        classNames,
        className: cn(
            block({
                centered: isCentered,
                "full-page": isFullPage,
            }),
            className
        ),
        appear: !disableTransition && appear,
        enter: !disableTransition && enter,
        exit: !disableTransition && exit,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        temporary,
    })

    let dialog = (
        <FocusContainer
            {...props}
            {...elementProps}
            role={isNoneRole ? undefined : role}
            aria-modal={(!isNoneRole && !!overlayEl) || undefined}
            tabIndex={tabIndex}
            component={component}
            defaultFocus={defaultFocus}
            disableTabFocusWrap={
                isNoneRole || disableTabFocusWrap || disableFocusContainer
            }
            disableFocusOnMount={
                isNoneRole || disableFocusContainer || disableFocusOnMount
            }
            disableFocusOnMountScroll
            disableFocusOnUnmount={
                isNoneRole || disableFocusContainer || disableFocusOnUnmount
            }
            onKeyDown={useCloseOnEscape(
                onRequestClose,
                disableEscapeClose || isNoneRole,
                onKeyDown
            )}
        >
            {children}
        </FocusContainer>
    )

    if (isCentered || forceContainer) {
        // the additional container is only required when we don't have a full page dialog. it's just
        // used to apply flex center to the dialog and add some margin
        dialog = (
            <span
                id={`${id}-container`}
                style={containerStyle}
                className={cn("rmd-dialog-container", containerClassName)}
            >
                {dialog}
            </span>
        )
    }

    return (
        <ConditionalPortal
            portal={!isNoneRole && portal}
            portalInto={portalInto}
            portalIntoId={portalIntoId}
        >
            {overlayEl}
            {rendered && dialog}
        </ConditionalPortal>
    )
})
