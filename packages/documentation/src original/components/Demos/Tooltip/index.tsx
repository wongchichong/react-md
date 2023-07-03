import type { ReactElement } from "react"
import { HoverModeProvider } from "@react-md/utils"

import description from "./README.md"
import DemoPage from "../DemoPage"

import TooltipHookExample from "./TooltipHookExample"
import tooltipHookExample from "./TooltipHookExample.md"

import SimpleExamples from "./SimpleExamples"
import simpleExamples from "./SimpleExamples.md"

import AutoPositioningTooltips from "./AutoPositioningTooltips"
import autoPositioningTooltips from "./AutoPositioningTooltips.md"

import DenseTooltips from "./DenseTooltips"
import denseTooltips from "./DenseTooltips.md"
import DenseTooltipsWrapper /* SANDBOX_IGNORE */ from "./DenseTooltipsWrapper"

import LargeTooltips from "./LargeTooltips"
import largeTooltips from "./LargeTooltips.md"

import HoverMode from "./HoverMode"
import hoverMode from "./HoverMode.md"

import ConfigurableTooltip from "./ConfigurableTooltip"
import configurableTooltip from "./ConfigurableTooltip.md"

const demos = [
    {
        name: "Tooltip Hook Example",
        description: tooltipHookExample,
        children: <TooltipHookExample />,
    },
    {
        name: "Simple Examples",
        description: simpleExamples,
        children: <SimpleExamples />,
    },
    {
        name: "Auto Positioning Tooltips",
        description: autoPositioningTooltips,
        children: <AutoPositioningTooltips />,
    },
    {
        name: "Dense Tooltips",
        description: denseTooltips,
        children: (
            <DenseTooltipsWrapper>
                <DenseTooltips />
            </DenseTooltipsWrapper>
        ),
    },
    {
        name: "Large Tooltips",
        description: largeTooltips,
        children: <LargeTooltips />,
    },
    {
        name: "Hover Mode",
        description: hoverMode,
        children: <HoverMode />,
    },
    {
        name: "Configurable Tooltip",
        description: configurableTooltip,
        children: <ConfigurableTooltip />,
        disableCard: true,
    },
].map(({ children, ...demo }) => ({
    ...demo,
    // remove the global tooltip hover mode config from all demos since it'll
    // manually be applied in a specific demo instead
    children: <HoverModeProvider disabled>{children}</HoverModeProvider>,
}))

export default function Tooltip(): Child {
    return (
        <DemoPage demos={demos} packageName="tooltip" description={description} />
    )
}
