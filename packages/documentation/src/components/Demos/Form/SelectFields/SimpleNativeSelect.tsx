import type { ReactElement } from 'voby'
import { $ } from 'voby'
import { NativeSelect } from "@react-md/form"

import states from "constants/states"

export default function SimpleNativeSelect(): Child {
    const value = $("")
    return (
        <NativeSelect
            id="simple-native-select"
            name="select"
            label="A Label"
            value={value}
            onChange={(event) => value(event.currentTarget.value)}
        >
            <option value="" disabled hidden />
            {states.map(({ name, abbreviation }) => (
                <option key={abbreviation} value={abbreviation}>
                    {name}
                </option>
            ))}
        </NativeSelect>
    )
}
