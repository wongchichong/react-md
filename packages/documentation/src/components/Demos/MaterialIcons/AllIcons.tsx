import type { ReactElement } from 'voby'
import * as MaterialIcons from "@react-md/material-icons"
import { Tooltip, useTooltip } from "@react-md/tooltip"

import Code from "components/Code"

import styles from "./AllIcons.module.scss"

const compare = new Intl.Collator("en-US", {
    caseFirst: "upper",
    numeric: true,
}).compare

const allIcons = Object.entries(MaterialIcons)
    .filter(([name]) => name.endsWith("SVGIcon"))
    .sort(([a], [b]) => compare(a, b))

function TooltippedName({ name }: { name: string }): Child {
    const { elementProps, tooltipProps } = useTooltip({
        baseId: `icon-${name}`,
    })

    return (
        <>
            <Code {...elementProps} className={styles.name} tabIndex={0}>
                {name.replace(/SVGIcon/, "")}
            </Code>
            <Tooltip {...tooltipProps}>{name}</Tooltip>
        </>
    )
}

export default function AllIcons(): Child {
    return (
        <div className={styles.container}>
            {allIcons.map(([name, Icon]) => (
                <div key={name} className={styles.icon}>
                    <Icon />
                    <TooltippedName name={name} />
                </div>
            ))}
        </div>
    )
}
