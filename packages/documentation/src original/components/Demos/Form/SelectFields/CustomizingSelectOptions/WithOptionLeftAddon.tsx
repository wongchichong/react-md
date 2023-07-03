import type { ReactElement } from "react"
import { Avatar } from "@react-md/avatar"
import scssVariables from "@react-md/avatar/dist/scssVariables"
import type { ListboxOption } from "@react-md/form"
import { Checkbox, Select, useChecked } from "@react-md/form"
import { CloseSVGIcon } from "@react-md/material-icons"

import immutableStates from "constants/states"

import useSelect from "./useSelect"
import styles from "./WithOptionLeftAddon.module.scss"

const COLORS = Object.keys(scssVariables["rmd-avatar-colors"])
const states: ListboxOption[] = immutableStates.map(
    ({ name, abbreviation }, i) => ({
        leftAddon: (
            <Avatar color={COLORS[i % COLORS.length]}>{abbreviation}</Avatar>
        ),
        leftAddonType: "avatar",
        label: name,
        value: abbreviation,
        children: (
            <span>
                {name} (<span className="rmd-typography--italic">{abbreviation}</span>)
            </span>
        ),
        rightAddon: <CloseSVGIcon />,
    })
)

export default function WithOptionLeftAddon(): Child {
    const [value, handleChange] = useSelect("")
    const [disableLeftAddon, handleLeftAddonChange] = useChecked(false)
    return (
        <>
            <Checkbox
                id="enable-left-addon"
                label="Disable Left Addon"
                checked={disableLeftAddon}
                onChange={handleLeftAddonChange}
            />
            <Select
                id="select-using-left-addon"
                label="State"
                placeholder="Colorado"
                options={states}
                value={value}
                onChange={handleChange}
                disableLeftAddon={disableLeftAddon}
                displayLabelClassName={styles.label}
            />
        </>
    )
}
