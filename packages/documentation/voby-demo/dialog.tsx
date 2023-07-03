import { render } from "voby"
import { Button } from "@react-md/button";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent,
    DialogFooter,
} from "@react-md/dialog";
import { Typography } from "@react-md/typography";
import { useToggle } from "@react-md/utils";
import "@react-md/button/dist/styles.scss"
import "@react-md/typography/dist/styles.scss"
import "@react-md/dialog/dist/styles.scss"

const dialog = () => {
    const [visible, enable, disable] = useToggle(false);
    return (
        <>
            <Button id="simple-dialog-toggle" onClick={enable}>
                Show Dialog
            </Button>
            <Dialog
                id="simple-dialog"
                visible={visible}
                onRequestClose={disable}
                aria-labelledby="dialog-title"
            >
                <DialogHeader>
                    <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <Typography margin="none">This is some text in a dialog.</Typography>
                </DialogContent>
                <DialogFooter>
                    <Button id="dialog-close" onClick={disable}>
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

render(dialog, document.body)