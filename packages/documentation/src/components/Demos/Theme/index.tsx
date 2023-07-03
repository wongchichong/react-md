import type { ReactElement } from 'voby'

import DemoPage from "../DemoPage"

import SimpleExample from "./SimpleExample"
import simpleExample from "./SimpleExample.md"

const demos = [
    {
        name: "Simple Example",
        description: simpleExample,
        children: <SimpleExample />,
    },
]

export default function Theme(): Child {
    return <DemoPage demos={demos} packageName="theme" />
}
