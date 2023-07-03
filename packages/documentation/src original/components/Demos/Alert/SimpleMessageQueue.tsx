import React from 'react'
import type { ReactElement } from "react"
import type { ToastMessage } from "@react-md/alert"
import { MessageQueue, useAddMessage } from "@react-md/alert"
import { Button } from "@react-md/button"
import { Form, Radio, useChoice } from "@react-md/form"

const SINGLE_LINE = "SINGLE_LINE"
const SINGLE_LINE_ACTION = "SINGLE_LINE_ACTION"
const TWO_LINES = "TWO_LINES"
const TWO_LINES_ACTION = "TWO_LINES_ACTION"
const TWO_LINES_STACKED = "TWO_LINES_STACKED"

type MessageKeys =
    | typeof SINGLE_LINE
    | typeof SINGLE_LINE_ACTION
    | typeof TWO_LINES
    | typeof TWO_LINES_ACTION
    | typeof TWO_LINES_STACKED
type MessageRecord = Record<MessageKeys, ToastMessage>

const messages: MessageRecord = {
    [SINGLE_LINE]: {
        children: "This is an example message",
    },
    [SINGLE_LINE_ACTION]: {
        action: "Action",
        children: "This is an example message",
    },
    [TWO_LINES]: {
        twoLines: true,
        children: (
            <>
                <p>This is an example message</p>
                <p>With a second line of text.</p>
            </>
        ),
    },
    [TWO_LINES_ACTION]: {
        action: "Action",
        twoLines: true,
        children: (
            <>
                <p>This is an example message</p>
                <p>With a second line of text.</p>
            </>
        ),
    },
    [TWO_LINES_STACKED]: {
        action: "Action",
        stacked: true,
        twoLines: true,
        children: (
            <>
                <p>This is an example message</p>
                <p>With a second line of text.</p>
            </>
        ),
    },
}

function SimpleMessageQueue(): Child {
    const addMessage = useAddMessage()
    const [key, handleKeyChange] = useChoice<MessageKeys>(SINGLE_LINE)

    return (
        <Form onSubmit={() => addMessage(messages[key])}>
            <Radio
                id="mqr-1"
                name="message"
                value={SINGLE_LINE}
                checked={key === SINGLE_LINE}
                onChange={handleKeyChange}
                label="Single Line Message"
            />
            <Radio
                id="mqr-2"
                name="message"
                value={SINGLE_LINE_ACTION}
                checked={key === SINGLE_LINE_ACTION}
                onChange={handleKeyChange}
                label="Single Line Message with Action"
            />
            <Radio
                id="mqr-3"
                name="message"
                value={TWO_LINES}
                checked={key === TWO_LINES}
                onChange={handleKeyChange}
                label="Two Line Message"
            />
            <Radio
                id="mqr-4"
                name="message"
                value={TWO_LINES_ACTION}
                checked={key === TWO_LINES_ACTION}
                onChange={handleKeyChange}
                label="Two Line Message with Action"
            />
            <Radio
                id="mqr-5"
                name="message"
                value={TWO_LINES_STACKED}
                checked={key === TWO_LINES_STACKED}
                onChange={handleKeyChange}
                label="Two Line Message with Stacked Action"
            />
            <Button id="mqr-submit" type="submit" theme="primary">
                Add Message
            </Button>
        </Form>
    )
}

export default function SimpleMessageQueueContainer(): Child {
    return (
        <MessageQueue id="simple-message-queue">
            <SimpleMessageQueue />
        </MessageQueue>
    )
}
