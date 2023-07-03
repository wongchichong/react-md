import type { ReactElement } from "react"
import { Switch, useChecked } from "@react-md/form"

import Heading from "components/Heading"
import CodeBlock from "components/CodeBlock"
import type { CompiledExample } from "@react-md/dev-utils/src/utils"
import "@react-md/dev-utils/@types/sassdoc"

interface ExampleProps extends CompiledExample {
    id: string
}
let a: ExampleProps; a
export default function Example({
    id,
    code,
    type,
    description,
    compiled,
}: ExampleProps): Child {
    const [enabled, handleChange] = useChecked(false)

    return (
        <>
            <Heading id={id} level={6} margin="small">
                {description}
            </Heading>
            {compiled && (
                <Switch
                    id={`${id}-compiled`}
                    name="compiledToggle"
                    checked={enabled}
                    onChange={handleChange}
                    label="Compiled output"
                />
            )}
            <CodeBlock language={type}>{enabled ? compiled : code}</CodeBlock>
        </>
    )
}
