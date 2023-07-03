import { $, useEffect, store, ObservableMaybe, $$ } from 'voby'
import { useTimeout, useToggle } from "@react-md/utils"

import type {
    AddMessage,
    DuplicateBehavior,
    Message,
    MessageQueueActions,
    PopMessage,
    ResetQueue,
    ToastMessage,
} from "./MessageQueueContext"
import { DEFAULT_MESSAGE_QUEUE_TIMEOUT } from "./MessageQueueContext"
import { useWindowBlurPause } from "./useWindowBlurPause"

export const ADD_MESSAGE = "ADD_MESSAGE"
export const POP_MESSAGE = "POP_MESSAGE"
export const RESET_QUEUE = "RESET_QUEUE"

/**
 * @internal
 */
export interface AddMessageAction<M extends Message = ToastMessage> {
    type: typeof ADD_MESSAGE
    message: M
    duplicates: DuplicateBehavior
}

/**
 * @internal
 */
export function addMessage<M extends Message = ToastMessage>(
    message: M,
    duplicates: DuplicateBehavior
): AddMessageAction {
    return { type: ADD_MESSAGE, message, duplicates }
}

/**
 * @internal
 */
export interface PopMessageAction {
    type: typeof POP_MESSAGE
}

/**
 * @internal
 */
export const popMessage = (): PopMessageAction => ({ type: POP_MESSAGE })

/**
 * @internal
 */
export interface ResetQueueAction {
    type: typeof RESET_QUEUE
}

/**
 * @internal
 */
export const resetQueue = (): ResetQueueAction => ({ type: RESET_QUEUE })

/**
 * @internal
 */
export type MessageActions<M extends Message = ToastMessage> =
    | AddMessageAction<M>
    | PopMessageAction
    | ResetQueueAction

/**
 * This function is used to update the message queue state by adding a new
 * message when needed.
 *
 * @internal
 */
export function handleAddMessage<M extends Message = ToastMessage>(state: Array<M>, message: M, duplicates: DuplicateBehavior): Array<M> {
    if (duplicates !== "allow" && !message.messageId) {
        throw new Error(
            `A messageId is required when the "${duplicates}" duplicate behavior is enabled but it was not provided in the current message.`
        )
    }

    if (state.length === 0) {
        state.push(message)
        return state
    }

    const { messageId, messagePriority = "normal" } = message
    const i = state.findIndex((mes) => mes.messageId === messageId)
    const isNext = messagePriority === "next"
    const isNormal = messagePriority === "normal"
    const isReplace = messagePriority === "replace"
    const isImmediate = messagePriority === "immediate"
    const isDuplicable = duplicates === "allow"
    const isRestart = duplicates === "restart"
    if (isNext || isImmediate) {
        const nextState = state//.slice()

        // remove the existing message if duplicated messages aren't allowed. This
        // will kind of act like a replace + next behavior
        if (!isDuplicable && i > 0) {
            nextState.splice(i, 1)
        }

        // const [current, ...remaining] = nextState
        const current = nextState.shift()
        if (isImmediate && current.messagePriority !== "immediate") {
            // return [current, message, current, ...remaining]
            nextState.unshift(current, message, current)
            return nextState
        }

        // return [current, message, ...remaining]
        nextState.unshift(current, message)
        return nextState
    }

    if (i === -1 || (isDuplicable && isNormal)) {
        state.push(message)
        return state
    }

    if (isNormal) {
        if (isRestart) {
            // creating a new state so that the queue visibility hook can still be
            // triggered which will restart the timer
            debugger
            return state//.slice()
        }

        return state
    }

    if (isReplace) {
        const nextState = state//.slice()
        nextState[i] = message
        return nextState
    }

    state.push(message)
    return state
}

// type MessageQueueReducer<M extends Message = ToastMessage> = Reducer<
//   readonly M[],
//   MessageActions<M>
// >

/**
 * @internal
 */
export function reducer<M extends Message = ToastMessage>(state: Array<M>) {
    const addMessage = (message: M, duplicates: DuplicateBehavior) => handleAddMessage(state, message, duplicates)
    const popMessage = () => state.length ? (state.shift(), state) : state
    const resetQueue = () => state.length ? (state.length = 0, state) : state

    return { state, addMessage, popMessage, resetQueue, }
}

export interface MessageQueueOptions<M extends Message = ToastMessage> {
    timeout?: FunctionMaybe<Nullable<number>>
    duplicates?: FunctionMaybe<Nullable<DuplicateBehavior>>
    defaultQueue?: M[]
}

export interface MessageQueueResult<M extends Message = ToastMessage> extends MessageQueueActions<M> {
     queue: ReturnType<typeof reducer<M>>
    visible: ObservableMaybe<boolean>
    addMessage: AddMessage<M>;
}

/**
 * This is the main logic for the message queue behavior that will handle:
 *
 * - creating timeouts as needed to show/hide toasts within the `SnackbarQueue`
 *   component
 * - create a way to push messages with optional priority onto the queue
 *
 * @internal
 */
export function     useMessageQueue<M extends Message = ToastMessage>({
    timeout = DEFAULT_MESSAGE_QUEUE_TIMEOUT,
    duplicates = "allow",
    defaultQueue = store([]) as M[],
}: MessageQueueOptions<M>): MessageQueueResult<M> {

    const queue = reducer<M>(defaultQueue)

    const [visible, showMessage, hideMessage] = useToggle(
        defaultQueue.length > 0
    )
    const [startTimer, stopTimer, restartTimer] = useTimeout(
        hideMessage,
        $$(timeout)
    )

    useEffect(() => {
        // this effect will handle all the "logic" for transitioning between each
        // message along with the message priority updates.

        const [message, nextMessage] = queue.state
        if (!message) {
            return
        }

        const prevQueue = queue.state//queueRef()
        const [prevMessage] = prevQueue
        if (
            message.messagePriority !== "immediate" &&
            nextMessage &&
            nextMessage.messagePriority === "immediate"
        ) {
            stopTimer()
            if (!visible) {
                queue.popMessage()
                // popMessageDispatch()
                return
            }

            hideMessage()
            return
        }

        if (!visible) {
            showMessage()
        }

        if (queue.state.length === prevQueue.length && message === prevMessage) {
            restartTimer()
        }

        // only want to run this on queue changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    useWindowBlurPause({
        startTimer,
        stopTimer,
        visible,
        message: queue[0],
    })

    return {
        queue,
        resetQueue,
        visible,
        hideMessage,
        addMessage,
        popMessage,
        startTimer,
        stopTimer,
        restartTimer,
    }
}
