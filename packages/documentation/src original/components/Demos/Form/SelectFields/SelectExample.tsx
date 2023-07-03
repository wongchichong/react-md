import type { ReactElement } from "react"
import { useCallback, useState } from "react"
import type { ListboxOption } from "@react-md/form"
import { Checkbox, Fieldset, Select, useChecked } from "@react-md/form"

import TextFieldThemeConfig from "../TextFieldThemeConfig"

const options = Array.from({ length: 8 }, (_, i) => `Option ${i + 1}`)

export default function SelectExample(): Child {
    const [value, setValue] = useState("")
    const handleChange = useCallback(
        (nextValue: string, _option: ListboxOption) => {
            setValue(nextValue)
        },
        []
    )
    const [disableMovementChange, handleMovementChange] = useChecked(false)

    return (
        <TextFieldThemeConfig
            idPrefix="custom-select"
            disableRightIcon
            renderField={({ rightChildren: _rightChildren, ...props }) => (
                <Select
                    {...props}
                    id="custom-select-1"
                    options={options}
                    value={value}
                    onChange={handleChange}
                    disableMovementChange={disableMovementChange}
                />
            )}
        >
            <Fieldset legend="Select options">
                <Checkbox
                    id="custom-select-disable-movement"
                    label="Disable keyboard movement change"
                    checked={disableMovementChange}
                    onChange={handleMovementChange}
                />
            </Fieldset>
        </TextFieldThemeConfig>
    )
}
