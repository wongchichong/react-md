import { render, store, useMemo } from "voby";
import { Button } from "@react-md/button"
import "@react-md/button/dist/styles.scss"
import "@react-md/alert/dist/styles.scss"
import { useMessageQueue } from "@react-md/alert/src/useMessageQueue"
import { AddMessageContext, MessageQueueContext, useQueue} from "@react-md/alert/src/MessageQueueContext";
import { Toast } from "@react-md/alert/src/Toast";

const alert = () => {
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
    } = useMessageQueue({ timeout:1000, duplicates: "allow", defaultQueue:store([]) })   
    const actions = useMemo(() => ({
        popMessage,
        hideMessage,
        startTimer,
        stopTimer,
        resetQueue,
        restartTimer,
    })) 
    return (
        <>
            <h1>Alert Demo</h1>
                <Button
                    id="button-1"
                    onClick={() => {
                        // const message = addMessage({ children: "test Message" })
                        console.log("beforeq", queue)
                        queue.addMessage({children: "test message"}, "allow")
                        console.log('afterq', queue)
                    }}
                >
                    Show Message
                </Button>
        </>
    )
}
render(alert, document.body)