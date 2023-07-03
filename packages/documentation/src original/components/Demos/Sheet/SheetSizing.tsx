import type { ReactElement } from "react"
import { useEffect, useState } from "react"
import { AppBar, AppBarAction } from "@react-md/app-bar"
import { Button } from "@react-md/button"
import { DialogContent } from "@react-md/dialog"
import {
    Checkbox,
    Fieldset,
    Form,
    Select,
    useSelectState,
} from "@react-md/form"
import { List, ListItem } from "@react-md/list"
import { ArrowDropDownSVGIcon, CloseSVGIcon } from "@react-md/material-icons"
import type {
    SheetHorizontalSize,
    SheetPosition,
    SheetVerticalSize,
} from "@react-md/sheet"
import { Sheet } from "@react-md/sheet"
import { GridList, useAppSize, useToggle } from "@react-md/utils"

import ConditionalPhone from "components/Phone/ConditionalPhone"

const positions: SheetPosition[] = ["top", "right", "bottom", "left"]
const horizontalSizes: SheetHorizontalSize[] = [
    "none",
    "touch",
    "static",
    "media",
]
const verticalSizes: SheetVerticalSize[] = ["none", "touch", "recommended"]

export default function SheetSizing(): Child {
    const [visible, show, hide] = useToggle(false)
    const [position, setPosition] = useSelectState<SheetPosition>("left")
    const [horizontalSize, setHorizontalSize] =
        useSelectState<SheetHorizontalSize>("media")
    const [verticalSize, setVerticalSize] =
        useSelectState<SheetVerticalSize>("recommended")

    const isHorizontal = position === "left" || position === "right"
    const [emulate, setEmulate] = useState(false)
    const { isDesktop } = useAppSize()

    useEffect(() => {
        if (emulate && !isDesktop) {
            setEmulate(false)
        }
    }, [emulate, isDesktop])

    return (
        <Form>
            <Fieldset legend="Position Options">
                <GridList clone maxCellSize={300}>
                    <Select
                        id="sheet-sizing-position"
                        label="Position"
                        options={positions}
                        value={position}
                        onChange={setPosition}
                        rightChildren={<ArrowDropDownSVGIcon />}
                    />
                    <Select
                        id="sheet-sizing-horizontal"
                        label="Horizontal Size"
                        options={horizontalSizes}
                        value={horizontalSize}
                        onChange={setHorizontalSize}
                        disabled={!isHorizontal}
                        rightChildren={<ArrowDropDownSVGIcon />}
                    />
                    <Select
                        id="sheet-sizing-vertical"
                        label="Vertical Size"
                        options={verticalSizes}
                        value={verticalSize}
                        onChange={setVerticalSize}
                        disabled={isHorizontal}
                        rightChildren={<ArrowDropDownSVGIcon />}
                    />
                    {isDesktop && (
                        <Checkbox
                            id="sheet-sizing-emulate"
                            checked={emulate}
                            onChange={() => setEmulate(!emulate)}
                            label="Emulate?"
                        />
                    )}
                </GridList>
            </Fieldset>
            <Button
                id="sheet-sizing-toggle"
                onClick={show}
                type="submit"
                theme="secondary"
                themeType="contained"
            >
                Show
            </Button>
            <ConditionalPhone id="example-sheet" enabled={emulate}>
                <Sheet
                    id="example-sheet"
                    aria-label="Example Sheet"
                    position={position}
                    horizontalSize={horizontalSize}
                    verticalSize={verticalSize}
                    visible={visible}
                    onRequestClose={hide}
                    portalIntoId={emulate ? "example-sheet-content" : undefined}
                    disableScrollLock={emulate}
                >
                    <AppBar theme="clear">
                        <AppBarAction first={position !== "right"} last onClick={hide}>
                            <CloseSVGIcon />
                        </AppBarAction>
                    </AppBar>
                    <DialogContent>
                        <List>
                            {Array.from({ length: 10 }, (_, i) => (
                                <ListItem id={`example-sheet-item-${i + 1}`} key={i}>
                                    {`Item ${i + 1}`}
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                </Sheet>
            </ConditionalPhone>
        </Form>
    )
}
