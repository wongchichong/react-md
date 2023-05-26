import { Observable, $$ } from 'voby'
import type { ButtonProps } from "@react-md/button"
import { Button } from "@react-md/button"

import type { ToastMessage } from "./MessageQueueContext"
import {
    useMessageQueueActions,
    useMessageVisibility,
} from "./MessageQueueContext"
import type { SnackbarProps } from "./Snackbar"
import { Snackbar } from "./Snackbar"
import { Toast } from "./Toast"
import { reducer } from './useMessageQueue'

export type ActionEventHandler<M extends ToastMessage> = (
    message: M,
    event: JSX.TargetedMouseEvent<HTMLButtonElement>
) => void

export interface SnackbarQueueProps<M extends ToastMessage>
    extends SnackbarProps {
    queue: ReturnType<typeof reducer>
    onActionClick?: ActionEventHandler<M>
}

function getId(
    snackbarId: string,
    toastId: string | number | undefined,
    actionId: string | undefined
): string | undefined {
    if (actionId) {
        return actionId
    }

    if (toastId) {
        return `${toastId}-action`
    }

    return `${snackbarId}-action`
}

/**
 * Because the toast renderer is a callback function instead of a React
 * component, it's actually required to create a separate component instance so
 * that the context API can be
 *
 * @internal
 */
function SnackbarQueueT<M extends ToastMessage = ToastMessage>(
    { queue, onActionClick, ...props }: SnackbarQueueProps<M>,
    ref?: Observable<HTMLDivElement>
): Element {
    const [toast] = queue.state
    const visible = useMessageVisibility()
    const { /* popMessage, */ hideMessage, startTimer } = useMessageQueueActions()

    let content = null
    if (toast) {
        const snackbarId = props.id
        const toastId = toast.messageId //.id
        const {
            messageId: _messageId,
            messagePriority: _messagePriority,
            disableAutohide = false,
            //@ts-ignore
            disableActionHide = false,
            //@ts-ignore
            action: providedAction,
            ...toastProps
        } = toast

        let action: Child = null
        if (providedAction) {
            const actionProps = providedAction as ButtonProps
            const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
                if (onActionClick) {
                    //@ts-ignore
                    onActionClick(toast, event)
                }

                if (actionProps.onClick) {
                    //@ts-ignore
                    actionProps.onClick(event)
                }

                if (!disableActionHide) {
                    hideMessage()
                }
            }

            const t = typeof providedAction
            if (/* isValidElement(providedAction) || */ t !== "object") {
                action = (
                    <Button
                        id={getId($$(snackbarId), $$(toastId), undefined)}
                        onClick={onClick}
                        theme="secondary"
                    >
                        {providedAction as any}
                    </Button>
                )
            } else {
                action = (
                    <Button
                        id={getId($$(snackbarId), $$(toastId), $$(actionProps.id) as any)}
                        theme="secondary"
                        {...actionProps}
                        onClick={onClick}
                    />
                )
            }
        }

        //@ts-ignore
        content = <Toast
            {...toastProps}
            action={action}
            visible={visible}
            onEntered={disableAutohide ? undefined : startTimer}
            onExited={queue.popMessage}
        />
    }

    return (
        //@ts-ignore
        <Snackbar {...props} ref={ref}>
            {content}
        </Snackbar>
    )
}

export const SnackbarQueue = //HTMLDivElement,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // SnackbarQueueProps<any>
    // >
    (SnackbarQueueT)
