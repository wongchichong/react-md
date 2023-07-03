import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { Select } from "@react-md/form"

import states from "constants/states"

export default function SimpleSelectExample(): Child {
    const value = $("")
    return (
        <Select
            id="simple-select-example"
            label="A Label"
            placeholder="Choose..."
            name="select"
            options={states.map(({ abbreviation, name }) => ({
                label: name,
                value: value(),
            }))}
            value()={value}
            onChange={(value) => value(value)}
        />
    )
}
