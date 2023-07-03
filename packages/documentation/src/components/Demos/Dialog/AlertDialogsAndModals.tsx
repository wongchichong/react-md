import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Button } from "@react-md/button"
import { Dialog, DialogContent, DialogFooter } from "@react-md/dialog"
import { TextArea } from "@react-md/form"
import { Typography } from "@react-md/typography"

import styles from "./AlertDialogsAndModals.module.scss"

const DRAFT = `This is some initial text to show in the draft area.
When you click on "Reset", a dialog will ask you if you want to discard the
draft. When you click on "Submit", a modal confirmation dialog will ask you
if you really want to submit this.
`.replace(/\r?\n/g, " ")

export default function AlertDialogsAndModals(): Child {
    const state = $({ visible: false, modal: false })
    const hide = (): void => {
        state((prevState) => ({ ...prevState, visible: false }))
    }
    const show = (event: React.JSX.TargetedMouseEvent<HTMLButtonElement>): void => {
        state({
            visible: true,
            modal: event.currentTarget.id === "draft-submit",
        })
    }

    const { visible, modal } = state

    return (
        <>
            <form
                id="draft-form"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <TextArea
                    id="draft-area"
                    defaultValue={DRAFT}
                    className={styles.textarea}
                    resize="none"
                />
                <DialogFooter>
                    <Button
                        id="draft-discard"
                        onClick={show}
                        type="reset"
                        theme="warning"
                    >
                        Reset
                    </Button>
                    <Button id="draft-submit" onClick={show} type="submit">
                        Submit
                    </Button>
                </DialogFooter>
            </form>
            <Dialog
                id="draft-dialog"
                role="alertdialog"
                modal={modal}
                visible={visible}
                onRequestClose={hide}
                aria-labelledby="dialog-title"
            >
                <DialogContent>
                    <Typography
                        id="dialog-title"
                        type="subtitle-1"
                        margin="none"
                        color="secondary"
                    >
                        {!modal ? "Discard draft?" : "Are you sure?"}
                    </Typography>
                </DialogContent>
                <DialogFooter>
                    <Button id="dialog-cancel" onClick={hide}>
                        Cancel
                    </Button>
                    <Button
                        id="dialog-discard"
                        onClick={hide}
                        theme={modal ? "primary" : "error"}
                    >
                        {!modal ? "Discard" : "Submit"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
