import { useMemo, $$, store } from 'voby'

import type { AddMessage, Message, ToastMessage } from "./MessageQueueContext"
import {
    AddMessageContext,
    MessageQueueActionsContext,
    MessageQueueContext,
    MessageVisibilityContext,
    useAddMessage,
} from "./MessageQueueContext"
import type { SnackbarProps } from "./Snackbar"
import type { ActionEventHandler } from "./SnackbarQueue"
import { SnackbarQueue } from "./SnackbarQueue"
import type { MessageQueueOptions } from "./useMessageQueue"
import { useMessageQueue } from "./useMessageQueue"

export interface MessageQueueProps<M extends ToastMessage>
    extends MessageQueueOptions<M>,
    SnackbarProps {
    /**
     * The children are required in this component since the message queue relies
     * on setting up React Context and provide hooks to add a message to the
     * queue. If there are no children, the message queue will not work.
     */
    children: Children

    /**
     * An optional function to call when the action button is clicked. This will
     * be applied to **all** toasts that appear in this message queue. You will
     * be provided the current message followed by the click event.
     */
    onActionClick?: ActionEventHandler<M>
}

/**
 * This component is used to be able to create a queue of messages with the
 * `Snackbar` and `Toast` components with a _fairly_ decent API out of the box.
 */
export function MessageQueue<M extends ToastMessage = ToastMessage>({
    timeout = 5000,
    duplicates = "allow",
    defaultQueue = [],
    children,
    ...props
}: MessageQueueProps<M>): Element {
    debugger
    const {
        queue,
        visible,
        hideMessage,
        startTimer,
        stopTimer,
        restartTimer,
        addMessage,
        popMessage,
        resetQueue,
    } = useMessageQueue<M>({ timeout, duplicates, defaultQueue })
    const actions = useMemo(() => ({
        popMessage,
        hideMessage,
        startTimer,
        stopTimer,
        resetQueue,
        restartTimer,
    }))

    return (
        <AddMessageContext.Provider value={addMessage as AddMessage<Message>}>
             <MessageQueueActionsContext.Provider value={actions}>
            <MessageVisibilityContext.Provider value={visible}>

                <MessageQueueContext.Provider value={queue.state}>
                    {children}
                </MessageQueueContext.Provider>
                <SnackbarQueue {...props} queue={queue.state} />
            </MessageVisibilityContext.Provider>  
            </MessageQueueActionsContext.Provider>    
            </AddMessageContext.Provider>
    )
}
