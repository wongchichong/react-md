import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Button } from "@react-md/button"
import type { ListboxOption } from "@react-md/form"
import { Checkbox, Fieldset, Form, Select, useChecked } from "@react-md/form"
import { ArrowDropDownSVGIcon } from "@react-md/material-icons"
import { Overlay } from "@react-md/overlay"
import type { CSSTransitionClassNames } from "@react-md/transition"
import { CSSTransition, useFixedPositioning } from "@react-md/transition"
import { Typography } from "@react-md/typography"
import type { 
 HorizontalPosition, 
 PositionAnchor, 
 PositionWidth, 
 VerticalPosition,  } from "@react-md/utils"
import { useToggle } from "@react-md/utils"

import styles from "./FixedPositioningExample.module.scss"

const horizontals: HorizontalPosition[] = [
    "left",
    "right",
    "center",
    "inner-left",
    "inner-right",
]
const verticals: VerticalPosition[] = [
    "above",
    "below",
    "center",
    "top",
    "bottom",
]

const widths: PositionWidth[] = ["auto", "equal", "min"]

const anchors = horizontals.reduce<Record<string, PositionAnchor>>(
    (value, x) => {
        verticals.forEach((y) => {
            value[`${x} ${y}`] = { x, y }
        })

        return value
    },
    {}
)

const anchorOptions = Object.entries(anchors).map(([value, anchor]) => ({
    ...anchor,
    label: value,
    value,
}))

type Anchor = typeof anchorOptions[0]
const CENTERED_ANCHOR = anchorOptions.find(
    (anchor) => anchor.label === "center center"
) as Anchor

const CLASSNAMES: CSSTransitionClassNames = {
    appear: styles.enter,
    appearActive: styles.entering,
    enter: styles.enter,
    enterActive: styles.entering,
    exit: styles.exit,
    exitActive: styles.exiting,
}

export default function FixedPositioningExample(): Child {
    const [visible, show, hide] = useToggle(false)
    const buttonRef = $<HTMLButtonElement | null>(null)
    const [disableSwapping, handleSwapChange] = useChecked(false)
    const [transformOrigin, handleOriginChange] = useChecked(false)
    const [hideOnScroll, handleScrollChange] = useChecked(true)
    const [hideOnResize, handleScrollResize] = useChecked(true)
    const anchor = $(anchorOptions[0])
    const handleAnchorChange = ((_value: string, anchor) => {
            anchor(anchor() as Anchor)
        },
        []
    )
    const width = $<PositionWidth>("auto")
    const handleWidthChange = ((nextWidth: string) => {
        anchor(CENTERED_ANCHOR)
        width(nextWidth as PositionWidth)
    })

    const { style, transitionOptions } = useFixedPositioning({
        fixedTo: buttonRef,
        anchor: { x: anchor().x, y: anchor().y ,
        width(),
        transformOrigin,
        disableSwapping,
        onScroll(_event, { fixedToElement: button }) {
            if (hideOnScroll) {
                hide()
                return
            }

            if (!button) {
                return
            }
            // hide when the button isn't in the viewport anymore if the
            // hideOnScroll behavior is disabled
            const { top } = button.getBoundingClientRect()
            if (top < 0 || top > window.innerHeight) {
                hide()
            }
        },
        onResize(_event) {
            if (hideOnResize) {
                hide()
            }
        },
    )

    return (
        <>
            <Form className={styles.form}>
                <Fieldset legend="Fixed Positioning Options">
                    <Checkbox
                        id="fixed-swap"
                        name="options"
                        label="Disable Swapping"
                        checked={disableSwapping}
                        onChange={handleSwapChange}
                    />
                    <Checkbox
                        id="fixed-origin"
                        name="options"
                        label="Transform Origin"
                        checked={transformOrigin}
                        onChange={handleOriginChange}
                    />
                    <Checkbox
                        id="fixed-hide-on-scroll"
                        name="options"
                        label="Hide on scroll"
                        checked={hideOnScroll}
                        onChange={handleScrollChange}
                    />
                    <Checkbox
                        id="fixed-hide-on-resize"
                        name="options"
                        label="Hide on resize"
                        checked={hideOnResize}
                        onChange={handleScrollResize}
                    />
                </Fieldset>
                <Select
                    id="fixed-anchor-type"
                    label="Anchor"
                    className={styles.select}
                    listboxClassName={styles.listbox}
                    inline
                    options={anchorOptions}
                    value={anchor.value}
                    onChange={handleAnchorChange}
                    rightChildren={<ArrowDropDownSVGIcon />}
                    listboxWidth="min"
                    isOptionDisabled={(option) => {
                        const opt = option as Anchor
                        return width !== "auto" && !opt.value.startsWith("center")
                    }}
                />
                <Select
                    id="fixed-anchor-width"
                    label="Fixed element width"
                    className={styles.select}
                    inline
                    options={widths}
                    value={width}
                    onChange={handleWidthChange}
                    rightChildren={<ArrowDropDownSVGIcon />}
                />
                <div className={styles.footer}>
                    <Button
                        id="fixed-positioning-button"
                        ref={buttonRef}
                        onClick={show}
                        theme="primary"
                        themeType="contained"
                        type="submit"
                    >
                        Toggle
                    </Button>
                </div>
            </Form>
            <Overlay
                id="fixed-positioning-overlay"
                onRequestClose={hide}
                hidden
                visible={visible}
            />
            <CSSTransition
                {...transitionOptions}
                className={styles.div}
                temporary
                timeout={{ enter: 200, exit: 150 }}
                classNames={CLASSNAMES}
                transitionIn={visible}
            >
                <div id="fixed-position-div" style={style}>
                    <Typography>This is some amazing text in a fixed element!</Typography>
                </div>
            </CSSTransition>
        </>
    )
}
