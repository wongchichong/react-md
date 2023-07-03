import type { ReactElement } from 'voby'
import { Button } from "@react-md/button"
import { Dialog, DialogHeader, DialogTitle } from "@react-md/dialog"
import { List, ListItem } from "@react-md/list"
import { useToggle } from "@react-md/utils"

import styles from "./SimpleListExample.module.scss"

export default function SimpleExample(): Child {
    const [toggled, enable, disable] = useToggle(false)
    return (
        <>
            <Button id="dialog-toggle-1" onClick={enable}>
                Show Dialog
            </Button>
            <Dialog
                id="dialog-1"
                visible={toggled}
                onRequestClose={disable}
                aria-labelledby="dialog-title"
            >
                <DialogHeader>
                    <DialogTitle id="dialog-title">Example</DialogTitle>
                </DialogHeader>
                <List className={styles.list} onClick={disable}>
                    <ListItem id="dialog-item-1">This is the first item</ListItem>
                    <ListItem id="dialog-item-2">This is the second item</ListItem>
                    <ListItem id="dialog-item-3">This is the third item</ListItem>
                    <ListItem id="dialog-item-4">This is the fourth item</ListItem>
                </List>
            </Dialog>
        </>
    )
}
