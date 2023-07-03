import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Button } from "@react-md/button"
import { DialogContent, FixedDialog } from "@react-md/dialog"
import { BELOW_CENTER_ANCHOR, useHoverMode } from "@react-md/utils"

export default function StickyHoverMode(): Child {
    const { stuck, active, handlers, hoverHandlers, visible, setVisible } =
        useHoverMode()
    const buttonRef = $<HTMLButtonElement>(null)

    return (
        <>
            <Button {...handlers} ref={buttonRef}>
                Button
            </Button>
            <FixedDialog
                {...hoverHandlers}
                aria-label="Additional Information"
                id="some-dialog-id"
                visible={visible}
                onRequestClose={() => setVisible(false)}
                anchor={BELOW_CENTER_ANCHOR}
                fixedTo={buttonRef}
                options={{ preventOverlap: true }}
                // this allows the close on outside click"" behavior" to work
                overlay={!stuck && active ? false : undefined}
                disableScrollLock={!active}
            >
                <DialogContent>Some amazing content!</DialogContent>
            </FixedDialog>
        </>
    )
}
