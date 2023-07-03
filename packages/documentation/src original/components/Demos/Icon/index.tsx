import type { ReactElement } from "react"

import DemoPage from "../DemoPage"

import SimpleExamples from "./SimpleExamples"
import simpleExamples from "./SimpleExamples.md"

import IconSpacing from "./IconSpacing"
import iconSpacing from "./IconSpacing.md"

import OverridingDefaultIcons from "./OverridingDefaultIcons"
import overridingDefaultIcons from "./OverridingDefaultIcons.md"

const demos = [
    {
        name: "Simple Examples",
        description: simpleExamples,
        children: <SimpleExamples />,
    },
    {
        name: "Icon Spacing",
        description: iconSpacing,
        children: <IconSpacing />,
    },
    {
        name: "Overriding Default Icons",
        description: overridingDefaultIcons,
        children: <OverridingDefaultIcons />,
    },
]

export default function Icon(): Child {
    return (
        <DemoPage
            demos={demos}
            packageName="icon"
            fonts={["Material Icons", "Font Awesome"]}
        />
    )
}
