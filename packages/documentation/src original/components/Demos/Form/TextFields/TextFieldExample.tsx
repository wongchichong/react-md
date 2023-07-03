import type { ReactElement } from "react"
import { TextField } from "@react-md/form"

import TextFieldThemeConfig from "../TextFieldThemeConfig"

export default function TextFieldExample(): Child {
    return (
        <TextFieldThemeConfig
            idPrefix="text-field"
            renderField={(props) => (
                <TextField id="configurable-text-field" {...props} />
            )}
        />
    )
}
