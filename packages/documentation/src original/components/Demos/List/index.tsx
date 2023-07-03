import type { ReactElement } from "react"

import DemoPage from "../DemoPage"

import SingleLineExamples from "./SingleLineExamples"
import singleLineExamples from "./SingleLineExamples.md"

import TwoLineExamples from "./TwoLineExamples"
import twoLineExamples from "./TwoLineExamples.md"

import ThreeLineExamples from "./ThreeLineExamples"
import threeLineExamples from "./ThreeLineExamples.md"

import {
    ConfigurableExample,
    configurableExample,
} from "./ConfigurableExample"

import NonInteractable from "./NonInteractable"
import nonInteractable from "./NonInteractable.md"

const demos = [
    {
        name: "Single Line Examples",
        description: singleLineExamples,
        children: <SingleLineExamples />,
    },
    {
        name: "Two Line Examples",
        description: twoLineExamples,
        children: <TwoLineExamples />,
    },
    {
        name: "Three Line Examples",
        description: threeLineExamples,
        children: <ThreeLineExamples />,
    },
    {
        name: "Configurable Example",
        description: configurableExample,
        children: <ConfigurableExample />,
        disableCard: true,
    },
    {
        name: "Non Interactable",
        description: nonInteractable,
        children: <NonInteractable />,
    },
]

export default function List(): Child {
    return <DemoPage demos={demos} packageName="list" />
}
