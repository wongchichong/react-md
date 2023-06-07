import type { ReactElement } from 'voby'
import React, { $, useEffect } from 'voby'
import type { Message, MessagePriority } from "@react-md/alert"
import { MessageQueue, useAddMessage, useQueue } from "@react-md/alert"
import { Button } from "@react-md/button"
import { Fieldset, Form, Radio, useChoice } from "@react-md/form"
import { Typography } from "@react-md/typography"

import styles from "./UpdatingMessagePriority.scss?inline"

interface ExampleMessage
    extends Required<Pick<Message, "messageId" | "messagePriority">> {
    children: string
}

const PRIORITIES: MessagePriority[] = ["next", "immediate", "replace"]

function UpdatingMessagePriority(): Child {
    const addMessage = useAddMessage<ExampleMessage>()
    const [priority, handlePriorityChange] = useChoice<MessagePriority>("next")
    const queue = useQueue<ExampleMessage>()
    const running = $(false)

    useEffect(() => {
        if (running() && !queue.length) {
            running(false)
        }
    })

    const exampleNextFlow = (() => {
        addMessage({
            messageId: "message-1",
            children: "First normal message",
            messagePriority: "normal",
        })
        addMessage({
            messageId: "message-2",
            children: "Second normal message",
            messagePriority: "normal",
        })
        running(true)
    })

    useEffect(() => {
        if (!running()) {
            return
        }

        const timeout = window.setTimeout(() => {
            addMessage({
                messageId: priority === "replace" ? "message-1" : "message-3",
                children: "Incoming Message!",
                messagePriority: priority,
            })
        }, 2000)

        return () => {
            window.clearTimeout(timeout)
        }

        // only want to run on running changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return (
        <>
            <div className={styles.output}>
                <Typography type="headline-6" margin="bottom">
                    Message queue:
                </Typography>
                {queue.map((message, i) => (
                    // actually want to disable it since when the immediate flow is triggered, there will be two messageId
                    // with "message-1" for a few milliseconds
                    <pre key={i}>{JSON.stringify(message, null, 2)}</pre>
                ))}
            </div>
            <Form onSubmit={exampleNextFlow}>
                <Fieldset legend="Priority">
                    {PRIORITIES.map((p) => (
                        <Radio
                            key={p}
                            id={`priority-${p}`}
                            name="messagePriority"
                            label={`Example with "${p}" priority`}
                            value={p}
                            checked={p === priority}
                            onChange={handlePriorityChange}
                        />
                    ))}
                </Fieldset>
                <Button
                    id="update-message-priority-submit"
                    type="submit"
                    disabled={queue.length > 0}
                >
                    Create message
                </Button>
            </Form>
        </>
    )
}

export default function UpdatingMessagePriorityContainer(): Child {
    return (
        <MessageQueue<ExampleMessage> id="updating-message-priority">
            <UpdatingMessagePriority />
        </MessageQueue>
    )
}
